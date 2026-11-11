import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { Arrow, Art, CtaBand, PageHero } from '@/components/ui';
import { mepCategories } from '@/lib/content';

export const metadata: Metadata = {
  title: 'MEP Design Consultancy: Mechanical, Electrical and Plumbing Engineering',
  description:
    'MEP engineering design services: HVAC and heat load calculations, LV and MV electrical distribution, lighting, plumbing and drainage, firefighting, fire alarm and ELV systems.',
  alternates: { canonical: '/mep' },
};

const icons: Record<string, React.ReactNode> = {
  mechanical: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 5v22M5 16h22M8.2 8.2l15.6 15.6M23.8 8.2 8.2 23.8" />
    </>
  ),
  electrical: <path d="M18 3 7 18h8l-2 11 12-16h-8l1-10Z" />,
  plumbing: <path d="M6 6h8v8h12v6M6 6v20M22 20v6M18 26h8" />,
  'fire-elv': (
    <>
      <circle cx="16" cy="16" r="4" />
      <path d="M8 8a11.3 11.3 0 0 0 0 16M24 8a11.3 11.3 0 0 1 0 16" />
    </>
  ),
};

export default function MepPage() {
  return (
    <>
      <PageHero
        eyebrow="MEP engineering services"
        title="Building services design, coordinated from the start."
        lead="Mechanical, electrical, plumbing, fire protection and ELV engineering for commercial, industrial, institutional and residential buildings."
        art="mep"
        crumbs={[{ href: '/mep', label: 'MEP engineering' }]}
      />

      <div className="sticky top-[4.5rem] z-30 border-b border-navy/10 bg-offwhite/95 backdrop-blur">
        <nav aria-label="MEP disciplines" className="wrap flex gap-6 overflow-x-auto py-4 text-sm font-medium">
          {mepCategories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="shrink-0 text-navy/70 hover:text-forest">
              {c.title}
            </a>
          ))}
        </nav>
      </div>

      {mepCategories.map((c, ci) => (
        <section key={c.id} id={c.id} className={`section scroll-mt-32 ${ci % 2 ? 'bg-mist' : ''}`}>
          <div className="wrap">
            <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${ci % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center bg-navy text-lime">
                    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                      {icons[c.id]}
                    </svg>
                  </span>
                  <p className="eyebrow">{String(ci + 1).padStart(2, '0')} / MEP</p>
                </div>
                <h2 className="h-section mt-6">{c.title}</h2>
                <p className="lead mt-5">{c.intro}</p>
                <Link href={`/contact?service=${encodeURIComponent(`MEP - ${c.title}`)}`} className="btn-ghost mt-8">
                  Enquire about {c.title.toLowerCase()} <Arrow />
                </Link>
              </Reveal>
              <Reveal delay={100} className="aspect-[800/520] overflow-hidden border border-navy/10">
                <Art name={c.art} tone={ci % 2 ? 'dark' : 'light'} />
              </Reveal>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.services.map((s, i) => (
                <li key={s.name} className="card p-6">
                  <span className="font-mono text-xs text-emerald">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaBand title="Planning a building project?" text="Share the building type, area and stage. We will propose the MEP scope and deliverables that fit." service="MEP - Electrical" />
    </>
  );
}
