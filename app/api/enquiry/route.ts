import { NextResponse } from 'next/server';
import { emailConfigured, insertLead, notifyLead, storageConfigured, type LeadRecord } from '@/lib/leads';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { enquirySchema } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const rl = rateLimit(`enquiry:${clientIp(req)}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions from this connection. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    // A filled honeypot is a bot: respond as if accepted, store nothing.
    if (errors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, message: 'Please check the highlighted fields.', errors }, { status: 422 });
  }
  const d = parsed.data;

  // Time trap: forms completed in under three seconds are treated as automated.
  if (d.startedAt && Date.now() - d.startedAt < 3000) return NextResponse.json({ ok: true });

  if (!storageConfigured() && !emailConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'The enquiry service has not been configured yet, so this message was not sent. Please contact us directly using the details on this page.',
      },
      { status: 503 }
    );
  }

  const record: LeadRecord = {
    source: 'contact_form',
    full_name: d.fullName,
    company: d.company,
    email: d.email,
    phone: d.phone,
    country: d.country,
    project_location: d.projectLocation,
    service_category: d.serviceCategory,
    project_capacity: d.projectCapacity,
    building_type: d.buildingType,
    timeline: d.timeline,
    description: d.description,
    consent: true,
  };

  const id = await insertLead(record);
  const emailed = await notifyLead(record, id);

  if (!id && !emailed) {
    return NextResponse.json(
      { ok: false, message: 'We could not record your enquiry because of a system error. Please try again or email us directly.' },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
