import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { retrieve, systemPrompt } from '@/lib/chat/prompt';
import { emailConfigured, insertLead, notifyLead, storageConfigured, updateChatLead, type LeadRecord } from '@/lib/leads';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { chatLeadSchema, chatRequestSchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';

const tools: Anthropic.Tool[] = [
  {
    name: 'save_lead',
    description:
      'Store the visitor’s enquiry and notify the NOORLUME team. Call only after the visitor has explicitly agreed that their details may be stored and shared with the team, and has given a name plus an email address or phone number. Calling again in the same conversation updates the existing record.',
    input_schema: {
      type: 'object',
      properties: {
        consent_confirmed: { type: 'boolean', description: 'True only if the visitor explicitly agreed in this conversation.' },
        full_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        company: { type: 'string' },
        visitor_type: {
          type: 'string',
          description:
            'One of: Solar EPC contractor, Renewable energy developer, Project owner, Architect, Building contractor, Industrial client, Individual, Other',
        },
        project_location: { type: 'string' },
        project_type: { type: 'string', description: 'For example ground-mounted solar, rooftop solar, carport, commercial building MEP' },
        project_capacity: { type: 'string', description: 'Capacity or size exactly as stated by the visitor, with units' },
        service_category: { type: 'string', description: 'The NOORLUME service(s) required' },
        project_stage: { type: 'string', description: 'For example concept, feasibility, tender, detailed design, construction, operating' },
        timeline: { type: 'string' },
        summary: { type: 'string', description: 'Two to four sentence summary of the requirement for the team' },
        handover_requested: { type: 'boolean', description: 'True if the visitor asked for a person or the enquiry is serious or urgent' },
      },
      required: ['consent_confirmed', 'full_name'],
    },
  },
];

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'not_configured', message: 'The assistant is not available yet. Please use the contact page to reach our team.' },
      { status: 503 }
    );
  }

  const rl = rateLimit(`chat:${clientIp(req)}`, 20, 5 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited', message: 'You are sending messages quickly. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid request.' }, { status: 400 });
  }
  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success || parsed.data.messages[parsed.data.messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid request.' }, { status: 400 });
  }
  const { sessionId } = parsed.data;
  let leadId = parsed.data.leadId ?? null;
  const canStore = storageConfigured() || emailConfigured();

  // The API requires the conversation to start with a user turn.
  const history = parsed.data.messages.slice(-24);
  while (history.length && history[0].role !== 'user') history.shift();
  const messages: Anthropic.MessageParam[] = history.map((m) => ({ role: m.role, content: m.content }));

  const recent = history
    .slice(-4)
    .map((m) => m.content)
    .join(' ');
  const system = systemPrompt(retrieve(recent), Boolean(leadId), canStore);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let leadSaved = false;
  try {
    for (let turn = 0; turn < 4; turn++) {
      const res = await anthropic.messages.create({
        model: MODEL,
        max_tokens: 700,
        system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
        tools: canStore ? tools : [],
        messages,
      });

      if (res.stop_reason !== 'tool_use') {
        const reply = res.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('\n')
          .trim();
        return NextResponse.json({
          reply: reply || 'I’m sorry, I could not put together a reply. Could you rephrase that?',
          leadId,
          leadSaved,
        });
      }

      messages.push({ role: 'assistant', content: res.content });
      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of res.content) {
        if (block.type !== 'tool_use') continue;
        const out = await runSaveLead(block.input, sessionId, leadId);
        if (out.leadId) leadId = out.leadId;
        if (out.ok) leadSaved = true;
        results.push({ type: 'tool_result', tool_use_id: block.id, content: out.message, is_error: !out.ok });
      }
      messages.push({ role: 'user', content: results });
    }
    return NextResponse.json({
      reply: 'Thank you. If anything is still outstanding, please send it through our contact page and the team will follow up.',
      leadId,
      leadSaved,
    });
  } catch (e) {
    console.error('[chat] request failed:', e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: 'upstream', message: 'The assistant is having trouble right now. Please try again shortly or use the contact page.' },
      { status: 502 }
    );
  }
}

async function runSaveLead(input: unknown, sessionId: string, existingId: string | null) {
  const parsed = chatLeadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      leadId: null,
      message:
        'Not saved. The visitor must explicitly consent, and a valid name is required. Ask for what is missing (consent, name, valid email or phone), then call save_lead again.',
    };
  }
  const d = parsed.data;
  if (!d.email && !d.phone) {
    return { ok: false, leadId: null, message: 'Not saved. Ask for an email address or phone number so the team can respond.' };
  }
  const record: LeadRecord = {
    source: 'chatbot',
    full_name: d.full_name,
    email: d.email,
    phone: d.phone,
    company: d.company,
    visitor_type: d.visitor_type,
    project_location: d.project_location,
    project_type: d.project_type,
    project_capacity: d.project_capacity,
    service_category: d.service_category,
    project_stage: d.project_stage,
    timeline: d.timeline,
    description: d.summary,
    handover_requested: d.handover_requested ?? false,
    session_id: sessionId,
    consent: true,
  };

  if (existingId) {
    const updated = await updateChatLead(existingId, sessionId, record);
    if (updated) return { ok: true, leadId: existingId, message: 'Existing enquiry updated.' };
  }
  const id = await insertLead(record);
  const emailed = await notifyLead(record, id);
  if (!id && !emailed) {
    return {
      ok: false,
      leadId: null,
      message: 'The enquiry could NOT be saved because of a system error. Apologise and ask the visitor to use the contact page.',
    };
  }
  return { ok: true, leadId: id, message: 'Enquiry saved and passed to the NOORLUME team.' };
}
