'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };
type Stored = { sessionId: string; leadId: string | null; messages: Msg[] };

const KEY = 'noorlume-chat-v1';
const GREETING =
  'Welcome to NOORLUME! I’m your Engineering Assistant. I can help you explore our Renewable Energy and MEP engineering services, understand our capabilities and connect you with our team. How can I assist you today?';
const SUGGESTIONS = ['Solar PV engineering services', 'MEP design services', 'I have a project to discuss'];

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function ChatWidget({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [leadId, setLeadId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [unavailable, setUnavailable] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Session-based history: kept for this browser tab only.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as Stored;
        setSessionId(s.sessionId);
        setLeadId(s.leadId ?? null);
        setMessages(Array.isArray(s.messages) ? s.messages : []);
        return;
      }
    } catch {
      /* storage unavailable: keep state in memory */
    }
    setSessionId(newId());
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ sessionId, leadId, messages } satisfies Stored));
    } catch {
      /* ignore */
    }
  }, [sessionId, leadId, messages]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim().slice(0, 2000);
    if (!content || busy) return;
    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setNotice('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, leadId, messages: next.slice(-24) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) {
        setMessages([...next, { role: 'assistant', content: data.reply }]);
        if (data.leadId) setLeadId(data.leadId);
      } else {
        if (res.status === 503) setUnavailable(true);
        setNotice(data.message ?? 'The assistant could not reply. Please try again.');
      }
    } catch {
      setNotice('Connection problem. Please check your network and try again.');
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function reset() {
    setMessages([]);
    setLeadId(null);
    setSessionId(newId());
    setNotice('');
  }

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the NOORLUME Engineering Assistant"
          className="group fixed bottom-5 right-5 z-50 flex h-14 items-center gap-3 rounded-full bg-navy px-3 sm:pl-4 sm:pr-5 text-white shadow-[0_14px_34px_-10px_rgba(16,42,67,0.7)] ring-1 ring-white/15 transition hover:bg-forest sm:bottom-6 sm:right-6"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-lime text-navy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 5h16v11H9l-5 4V5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald" style={{ animation: 'pulse-dot 2.4s infinite' }} />
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Ask our assistant</span>
        </button>
      ) : null}

      {open ? (
        <section
          role="dialog"
          aria-label="NOORLUME Engineering Assistant"
          className="rise fixed inset-x-0 bottom-0 z-50 flex h-[88dvh] flex-col overflow-hidden bg-white shadow-[0_24px_70px_-18px_rgba(16,42,67,0.65)] ring-1 ring-navy/10 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(40rem,82dvh)] sm:w-[25rem] sm:rounded-md"
          style={{ animationDuration: '0.35s' }}
        >
          <header className="blueprint flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/noorlume-icon-white.svg" alt="" width={34} height={34} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[0.86rem] font-semibold">NOORLUME Engineering Assistant</p>
              <p className="text-xs text-white/65">AI assistant · general information only</p>
            </div>
            <button type="button" onClick={reset} className="px-2 py-1 text-xs text-white/70 hover:text-lime" aria-label="Start a new conversation">
              New
            </button>
            <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center hover:text-lime" aria-label="Close assistant">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-offwhite px-4 py-4" aria-live="polite">
            <Bubble role="assistant" text={GREETING} />
            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="border border-navy/20 bg-white px-3 py-2 text-left text-sm text-navy transition hover:border-emerald hover:bg-mist"
                    style={{ borderRadius: 2 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.content} />
            ))}
            {busy ? (
              <div className="flex w-16 items-center justify-center gap-1.5 bg-white px-3 py-3.5 ring-1 ring-navy/10" style={{ borderRadius: 3 }} aria-label="Assistant is typing">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald" style={{ animationDelay: `${i * 120}ms` }} />
                ))}
              </div>
            ) : null}
            {notice ? (
              <p role="alert" className="border-l-4 border-amber-500 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                {notice}{' '}
                <Link href="/contact" className="font-semibold underline underline-offset-2" onClick={() => setOpen(false)}>
                  Go to contact page
                </Link>
              </p>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="border-t border-navy/10 bg-white p-3">
            <div className="flex items-end gap-2">
              <label htmlFor="chat-input" className="sr-only">Your message</label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={2000}
                disabled={unavailable}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                placeholder={unavailable ? 'Assistant unavailable' : 'Type your question…'}
                className="field max-h-28 min-h-[2.9rem] flex-1 resize-none !py-2.5"
              />
              <button type="submit" disabled={busy || unavailable || !input.trim()} className="btn-navy h-[2.9rem] !px-4 disabled:opacity-40" aria-label="Send message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-charcoal/60">
              Replies are AI-generated general information, not project-specific engineering advice. Contact details are stored only
              with your agreement. <Link href="/privacy" className="underline">Privacy policy</Link>
              {whatsapp ? (
                <>
                  {' · '}
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp us</a>
                </>
              ) : null}
            </p>
          </form>
        </section>
      ) : null}
    </>
  );
}

function Bubble({ role, text }: { role: 'user' | 'assistant'; text: string }) {
  const mine = role === 'user';
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[86%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-[0.92rem] leading-relaxed ${
          mine ? 'bg-navy text-white' : 'bg-white text-charcoal ring-1 ring-navy/10'
        }`}
        style={{ borderRadius: 3 }}
      >
        {text}
      </p>
    </div>
  );
}
