import { createClient } from '@supabase/supabase-js';

export type LeadRecord = {
  source: 'contact_form' | 'chatbot';
  full_name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  country?: string | null;
  project_location?: string | null;
  service_category?: string | null;
  project_capacity?: string | null;
  building_type?: string | null;
  project_type?: string | null;
  project_stage?: string | null;
  timeline?: string | null;
  visitor_type?: string | null;
  description?: string | null;
  handover_requested?: boolean;
  session_id?: string | null;
  consent: true;
};

export function storageConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_NOTIFY_EMAIL && process.env.ENQUIRY_FROM_EMAIL);
}

/** Server-only Supabase client using the service role key. Never import in client components. */
function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const clean = (r: LeadRecord) =>
  Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v === '' || v === undefined ? null : v]));

export async function insertLead(record: LeadRecord): Promise<string | null> {
  if (!storageConfigured()) return null;
  const { data, error } = await adminClient()
    .from('leads')
    .insert({ ...clean(record), consent_at: new Date().toISOString() })
    .select('id')
    .single();
  if (error) {
    console.error('[leads] insert failed:', error.message);
    return null;
  }
  return data.id as string;
}

/** Update a chatbot lead. Scoped to the chat session that created it. */
export async function updateChatLead(id: string, sessionId: string, record: Partial<LeadRecord>): Promise<boolean> {
  if (!storageConfigured()) return false;
  const patch = Object.fromEntries(Object.entries(record).filter(([, v]) => v !== undefined && v !== '' && v !== null));
  const { data, error } = await adminClient()
    .from('leads')
    .update(patch)
    .eq('id', id)
    .eq('session_id', sessionId)
    .eq('source', 'chatbot')
    .select('id');
  if (error) console.error('[leads] update failed:', error.message);
  return !error && (data?.length ?? 0) > 0;
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function notifyLead(record: LeadRecord, leadId: string | null): Promise<boolean> {
  if (!emailConfigured()) return false;
  const rows: [string, unknown][] = [
    ['Source', record.source === 'chatbot' ? 'Website chatbot' : 'Contact form'],
    ['Name', record.full_name],
    ['Company', record.company],
    ['Email', record.email],
    ['Phone', record.phone],
    ['Visitor type', record.visitor_type],
    ['Country', record.country],
    ['Project location', record.project_location],
    ['Service', record.service_category],
    ['Project type', record.project_type],
    ['Capacity', record.project_capacity],
    ['Building type', record.building_type],
    ['Project stage', record.project_stage],
    ['Timeline', record.timeline],
    ['Human follow-up requested', record.handover_requested ? 'Yes' : ''],
    ['Details', record.description],
    ['Lead reference', leadId],
  ];
  const html =
    `<div style="font-family:Arial,sans-serif;color:#202B33"><h2 style="color:#102A43;margin:0 0 12px">New NOORLUME enquiry</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse;font-size:14px">` +
    rows
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="color:#5b6b76;vertical-align:top;border-bottom:1px solid #E8EFEC">${esc(k)}</td>` +
          `<td style="border-bottom:1px solid #E8EFEC;white-space:pre-wrap">${esc(v)}</td></tr>`
      )
      .join('') +
    `</table></div>`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: process.env.ENQUIRY_NOTIFY_EMAIL!.split(',').map((s) => s.trim()),
        reply_to: record.email || undefined,
        subject: `${record.handover_requested ? '[Follow-up requested] ' : ''}New enquiry: ${record.full_name}${record.service_category ? ' - ' + record.service_category : ''}`,
        html,
      }),
    });
    if (!res.ok) console.error('[email] Resend responded', res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error('[email] send failed:', e);
    return false;
  }
}
