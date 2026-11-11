import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Arrow, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { phaseHref, phases } from '@/lib/lifecycle';

export const metadata: Metadata = {
  title: 'Project Lifecycle: Engineering Services by Project Stage',
  description:
    'How NOORLUME supports a solar PV or building project at each stage: feasibility and concept, detailed engineering and procurement, construction support and operation.',
  alternates: { canonical: '/project-lifecycle' },
};

export default function LifecyclePage() {
  return (
    <>
      <PageHero
        eyebrow="Project lifecycle"
        title="The right engineering at each stage of your project."
        lead="Develop, design, deliver. Find the services that match where your project is today."
        art="field"
        crumbs={[{ href: '/project-lifecycle', label: 'Project lifecycle' }]}
      />

      <div className="sticky top-[4.5rem] z-30 border-b border-navy/10 bg-offwhite/95 backdrop-blur">
        <nav aria-label="Project stages" className="wrap flex gap-6 overflow-x-auto py-4 text-sm font-medium">
          {phases.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="shrink-0 text-navy/70 hover:text-forest">
              {p.step} {p.name}
            </a>
          ))}
        </nav>
      </div>

      {phases.map((p, i) => (
        <section key={p.id} id={p.id} className={`section scroll-mt-32 ${i % 2 ? 'bg-mist' : ''}`}>
          <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHead eyebrow={`${p.step} / ${p.stage}`} title={p.name}>
                {p.summary}
              </SectionHead>
              <Reveal delay={100}>
                <p className="mt-8 border-l-4 border-emerald bg-white px-5 py-4 text-charcoal/85">
                  <span className="font-semibold text-navy">Outcome: </span>
                  {p.outcome}
                </p>
              </Reveal>
            </div>
            <ul className="border-t border-navy/15">
              {p.items.map((it, k) => (
                <Reveal key={it.label} delay={k * 40}>
                  <li className="border-b border-navy/15">
                    <Link href={phaseHref(it)} className="group flex items-center justify-between gap-6 py-5 transition hover:pl-2">
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-emerald">{String(k + 1).padStart(2, '0')}</span>
                        <span className="font-display text-lg font-medium text-navy group-hover:text-forest">{it.label}</span>
                      </span>
                      <span className="shrink-0 text-navy">
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand title="Tell us where your project stands." text="Share the stage, location and size. We will suggest the scope that fits." />
    </>
  );
}
