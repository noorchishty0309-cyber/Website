import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Arrow, CtaBand, PageHero, SectionHead } from '@/components/ui';
import { serviceGroups, services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Renewable Energy Engineering and Solar PV Design Consultancy',
  description:
    'Solar PV engineering services: utility-scale, ground-mounted, rooftop and carport design, cable sizing, SLDs, PVsyst energy yield, earthing, grid integration and owner’s engineering.',
  alternates: { canonical: '/renewable-energy' },
};

const anchor = (g: string) => g.toLowerCase().replace(/[^a-z]+/g, '-');

export default function RenewableEnergyPage() {
  return (
    <>
      <PageHero
        eyebrow="Renewable energy engineering"
        title="Solar PV engineering for plants that perform as designed."
        lead="Twenty engineering services covering the full project cycle: feasibility, detailed design, studies, specifications and independent review."
        art="field"
        crumbs={[{ href: '/renewable-energy', label: 'Renewable energy' }]}
      />

      <div className="sticky top-[4.5rem] z-30 border-b border-navy/10 bg-offwhite/95 backdrop-blur">
        <nav aria-label="Service groups" className="wrap flex gap-6 overflow-x-auto py-4 text-sm font-medium">
          {serviceGroups.map((g) => (
            <a key={g} href={`#${anchor(g)}`} className="shrink-0 text-navy/70 hover:text-forest">
              {g}
            </a>
          ))}
        </nav>
      </div>

      {serviceGroups.map((group, gi) => {
        const list = services.filter((s) => s.group === group);
        return (
          <section key={group} id={anchor(group)} className={`section scroll-mt-32 ${gi % 2 ? 'bg-mist' : ''}`}>
            <div className="wrap">
              <SectionHead eyebrow={`${String(gi + 1).padStart(2, '0')} / ${group}`} title={group} />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 60}>
                    <Link href={`/renewable-energy/${s.slug}`} className="card-link group flex h-full flex-col p-7">
                      <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{s.summary}</p>
                      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-charcoal/50">Key deliverables</p>
                      <ul className="tick mt-3 space-y-1.5 text-sm text-charcoal/75">
                        {s.deliverables.slice(0, 2).map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-navy">
                        Scope and deliverables <Arrow />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand title="Tell us about your solar project." service="Utility-scale / ground-mounted solar PV" />
    </>
  );
}
