import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { Art, CtaBand, PageHero } from '@/components/ui';
import { industries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Engineering consultancy for renewable energy developers, solar EPC contractors, commercial and industrial facilities, institutions, healthcare, residential and infrastructure projects.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Engineering support shaped around your sector."
        lead="Developers, contractors and building owners need different things from an engineering consultant. We adapt scope, deliverables and communication to each."
        art="rooftop"
        crumbs={[{ href: '/industries', label: 'Industries' }]}
      />
      <section className="section">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 3) * 70}>
              <article className="card group flex h-full flex-col overflow-hidden transition hover:border-emerald">
                <div className="aspect-[800/420] overflow-hidden bg-navy">
                  <Art name={ind.art} className="transition duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-7">
                  <span className="font-mono text-xs text-emerald">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="mt-3 text-xl font-semibold leading-snug">{ind.name}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{ind.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which service fits?" text="Describe your project and we will suggest the engineering scope that suits it." />
    </>
  );
}
