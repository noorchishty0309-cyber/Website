import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import { Arrow, CtaBand, JsonLd, PageHero } from '@/components/ui';
import { getService, services } from '@/lib/services';
import { site } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/renewable-energy/${s.slug}` },
    openGraph: { title: `${s.title} | NOORLUME`, description: s.summary, url: `/renewable-energy/${s.slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-navy/15 py-9">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest">{title}</h2>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = services.filter((x) => x.group === s.group && x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.description,
          serviceType: 'Engineering consultancy',
          provider: { '@id': `${site.url}/#organization` },
          areaServed: ['India', 'Middle East', 'Gulf Cooperation Council'],
          url: `${site.url}/renewable-energy/${s.slug}`,
        }}
      />
      <PageHero
        eyebrow={s.group}
        title={s.title}
        lead={s.summary}
        art={s.art}
        crumbs={[
          { href: '/renewable-energy', label: 'Renewable energy' },
          { href: `/renewable-energy/${s.slug}`, label: s.title },
        ]}
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="lead pb-9">{s.description}</p>
            </Reveal>
            <Block title="Engineering scope">
              <ul className="tick space-y-3 text-charcoal/85">
                {s.scope.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Block>
            <Block title="Methodology">
              <ol className="space-y-4">
                {s.methodology.map((x, i) => (
                  <li key={x} className="flex gap-4 text-charcoal/85">
                    <span className="mt-0.5 font-mono text-sm text-emerald">{String(i + 1).padStart(2, '0')}</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ol>
            </Block>
            <Block title="Expected deliverables">
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.deliverables.map((x) => (
                  <li key={x} className="card px-5 py-4 text-[0.95rem] font-medium text-navy">
                    {x}
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Benefits to clients">
              <ul className="tick space-y-3 text-charcoal/85">
                {s.benefits.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Block>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark blueprint bg-navy p-8 text-white">
              <p className="eyebrow">Enquire</p>
              <h2 className="mt-5 text-2xl font-semibold text-white">Discuss this service</h2>
              <p className="mt-3 text-white/75">
                Send us the project location, capacity and current stage. We will respond with a scope and approach.
              </p>
              <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="btn-lime mt-7 w-full">
                Discuss Your Project <Arrow />
              </Link>
            </div>
            {related.length ? (
              <div className="mt-8">
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest">Related services</h2>
                <ul className="mt-4 border-t border-navy/15">
                  {related.map((r) => (
                    <li key={r.slug} className="border-b border-navy/15">
                      <Link href={`/renewable-energy/${r.slug}`} className="flex items-center justify-between gap-4 py-4 font-medium text-navy hover:text-forest">
                        {r.title} <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <CtaBand service={s.title} />
    </>
  );
}
