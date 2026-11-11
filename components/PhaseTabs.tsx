'use client';

import Link from 'next/link';
import { useState } from 'react';
import { phaseHref, phases } from '@/lib/lifecycle';

/** Lifecycle selector: choose a project stage to see the services that apply. */
export function PhaseTabs({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [active, setActive] = useState(0);
  const p = phases[active];
  const dark = tone === 'dark';

  return (
    <div
      className={`border ${dark ? 'border-white/15 bg-navy-deep/80 text-white backdrop-blur' : 'border-navy/10 bg-white text-charcoal'}`}
      style={{ borderRadius: 3 }}
    >
      <div role="tablist" aria-label="Project stage" className={`grid grid-cols-3 border-b ${dark ? 'border-white/15' : 'border-navy/10'}`}>
        {phases.map((ph, i) => {
          const on = i === active;
          return (
            <button
              key={ph.id}
              role="tab"
              type="button"
              id={`phase-tab-${ph.id}`}
              aria-selected={on}
              aria-controls={`phase-panel-${ph.id}`}
              onClick={() => setActive(i)}
              className={`relative px-3 py-4 text-left transition sm:px-5 ${
                on
                  ? dark
                    ? 'bg-white/5 text-lime'
                    : 'bg-mist text-forest'
                  : dark
                    ? 'text-white/70 hover:text-white'
                    : 'text-navy/70 hover:text-navy'
              }`}
            >
              <span className="block font-mono text-[0.65rem] tracking-[0.18em]">{ph.step}</span>
              <span className="mt-1 block font-display text-base font-semibold sm:text-lg">{ph.name}</span>
              {on ? <span className={`absolute inset-x-0 bottom-0 h-[3px] ${dark ? 'bg-lime' : 'bg-emerald'}`} /> : null}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`phase-panel-${p.id}`} aria-labelledby={`phase-tab-${p.id}`} className="p-5 sm:p-7">
        <p className={`font-mono text-xs uppercase tracking-[0.18em] ${dark ? 'text-lime' : 'text-forest'}`}>{p.stage}</p>
        <p className={`mt-3 text-[0.95rem] leading-relaxed ${dark ? 'text-white/75' : 'text-charcoal/80'}`}>{p.summary}</p>
        <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
          {p.items.map((it) => (
            <li key={it.label} className={`border-t ${dark ? 'border-white/10' : 'border-navy/10'}`}>
              <Link
                href={phaseHref(it)}
                className={`flex items-center justify-between gap-3 py-2.5 text-sm font-medium transition ${
                  dark ? 'text-white hover:text-lime' : 'text-navy hover:text-forest'
                }`}
              >
                {it.label}
                <span aria-hidden="true" className={dark ? 'text-lime' : 'text-emerald'}>→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className={`mt-5 border-l-2 pl-3 text-sm ${dark ? 'border-lime text-white/70' : 'border-emerald text-charcoal/75'}`}>
          <span className="font-semibold">Outcome: </span>
          {p.outcome}
        </p>
      </div>
    </div>
  );
}
