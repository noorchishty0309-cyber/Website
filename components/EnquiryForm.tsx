'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { serviceCategories, timelines } from '@/lib/site';

type Errors = Record<string, string>;
type State = 'idle' | 'sending' | 'sent' | 'error';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Fallback store: Netlify Forms. Used only when the Supabase/Resend backend is
 * not configured. Posts to the static registration file public/__forms.html.
 * Returns true only when Netlify accepted the submission.
 */
async function submitToNetlifyForms(p: Record<string, unknown>) {
  try {
    const body = new URLSearchParams({
      'form-name': 'enquiry',
      fullName: String(p.fullName ?? ''),
      email: String(p.email ?? ''),
      company: String(p.company ?? ''),
      phone: String(p.phone ?? ''),
      country: String(p.country ?? ''),
      projectLocation: String(p.projectLocation ?? ''),
      serviceCategory: String(p.serviceCategory ?? ''),
      projectCapacity: String(p.projectCapacity ?? ''),
      buildingType: String(p.buildingType ?? ''),
      description: String(p.description ?? ''),
      timeline: String(p.timeline ?? ''),
      consent: p.consent ? 'Yes' : 'No',
      'bot-field': String(p.website ?? ''),
    });
    const res = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function EnquiryForm({ initialService = '' }: { initialService?: string }) {
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState('');
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? '').trim();
    const payload = {
      fullName: v('fullName'),
      company: v('company'),
      email: v('email'),
      phone: v('phone'),
      country: v('country'),
      projectLocation: v('projectLocation'),
      serviceCategory: v('serviceCategory'),
      projectCapacity: v('projectCapacity'),
      buildingType: v('buildingType'),
      description: v('description'),
      timeline: v('timeline'),
      consent: fd.get('consent') === 'on',
      website: v('website'),
      startedAt: startedAt.current,
    };

    const errs: Errors = {};
    if (payload.fullName.length < 2) errs.fullName = 'Please enter your full name';
    if (!emailRe.test(payload.email)) errs.email = 'Please enter a valid email address';
    if (payload.phone && !/^[+()\d\s-]{6,}$/.test(payload.phone)) errs.phone = 'Please enter a valid contact number';
    if (payload.country.length < 2) errs.country = 'Please enter your country';
    if (!payload.serviceCategory) errs.serviceCategory = 'Please choose a service category';
    if (payload.description.length < 10) errs.description = 'Please describe your project in a sentence or two';
    if (!payload.consent) errs.consent = 'Please confirm consent so we can respond to you';
    setErrors(errs);
    if (Object.keys(errs).length) {
      setState('error');
      setMessage('Please check the highlighted fields.');
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }

    setState('sending');
    setMessage('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState('sent');
      } else if (res.status === 503 && (await submitToNetlifyForms(payload))) {
        // Database/email backend not configured: the enquiry was stored by Netlify Forms instead.
        setState('sent');
      } else {
        setErrors(data.errors ?? {});
        setMessage(data.message ?? 'Something went wrong. Please try again.');
        setState('error');
      }
    } catch {
      setMessage('We could not reach the server. Please check your connection and try again.');
      setState('error');
    }
    statusRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  if (state === 'sent') {
    return (
      <div ref={statusRef} role="status" className="card border-emerald p-8 sm:p-10">
        <p className="eyebrow">Enquiry received</p>
        <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Thank you. Your enquiry is with our team.</h2>
        <p className="mt-4 text-charcoal/80">
          We will review the details you shared and reply to the email address you provided. If you have drawings or
          specifications to share, you can send them when we respond.
        </p>
        <Link href="/" className="btn-ghost mt-8">
          Back to home
        </Link>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ 'aria-invalid': Boolean(errors[k]), 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="fullName">Full name *</label>
          <input className="field" id="fullName" name="fullName" autoComplete="name" required {...a11y('fullName')} />
          {err('fullName')}
        </div>
        <div>
          <label className="field-label" htmlFor="company">Company name</label>
          <input className="field" id="company" name="company" autoComplete="organization" />
        </div>
        <div>
          <label className="field-label" htmlFor="email">Email *</label>
          <input className="field" id="email" name="email" type="email" autoComplete="email" required {...a11y('email')} />
          {err('email')}
        </div>
        <div>
          <label className="field-label" htmlFor="phone">Contact number</label>
          <input className="field" id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Include country code" {...a11y('phone')} />
          {err('phone')}
        </div>
        <div>
          <label className="field-label" htmlFor="country">Country *</label>
          <input className="field" id="country" name="country" autoComplete="country-name" required {...a11y('country')} />
          {err('country')}
        </div>
        <div>
          <label className="field-label" htmlFor="projectLocation">Project location</label>
          <input className="field" id="projectLocation" name="projectLocation" placeholder="City, state or region" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="serviceCategory">Service category *</label>
          <select className="field" id="serviceCategory" name="serviceCategory" defaultValue={initialService} required {...a11y('serviceCategory')}>
            <option value="">Select a service</option>
            {initialService && !(serviceCategories as readonly string[]).includes(initialService) ? (
              <option value={initialService}>{initialService}</option>
            ) : null}
            {serviceCategories.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {err('serviceCategory')}
        </div>
        <div>
          <label className="field-label" htmlFor="projectCapacity">Solar project capacity <span className="font-normal text-charcoal/60">(if applicable)</span></label>
          <input className="field" id="projectCapacity" name="projectCapacity" placeholder="e.g. 50 MWac / 500 kWp" />
        </div>
        <div>
          <label className="field-label" htmlFor="buildingType">Building type <span className="font-normal text-charcoal/60">(if applicable)</span></label>
          <input className="field" id="buildingType" name="buildingType" placeholder="e.g. office, hospital, factory" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="description">Project description *</label>
          <textarea className="field min-h-[9rem]" id="description" name="description" required placeholder="Scope required, current project stage, available inputs" {...a11y('description')} />
          {err('description')}
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="timeline">Expected project timeline</label>
          <select className="field" id="timeline" name="timeline" defaultValue="">
            <option value="">Select a timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Honeypot: hidden from people, attractive to bots */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal/85">
            <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#14532D]" {...a11y('consent')} />
            <span>
              I agree that NOORLUME may store the details in this form and use them to respond to my enquiry, as described in the{' '}
              <Link href="/privacy" className="font-medium text-forest underline underline-offset-2">privacy policy</Link>. *
            </span>
          </label>
          {err('consent')}
        </div>
      </div>

      <div ref={statusRef} aria-live="polite" className="mt-6">
        {state === 'error' && message ? (
          <p role="alert" className="border-l-4 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800">{message}</p>
        ) : null}
      </div>

      <button type="submit" className="btn-navy mt-6 w-full sm:w-auto" disabled={state === 'sending'} aria-busy={state === 'sending'}>
        {state === 'sending' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Sending…
          </>
        ) : (
          'Submit enquiry'
        )}
      </button>
    </form>
  );
}
