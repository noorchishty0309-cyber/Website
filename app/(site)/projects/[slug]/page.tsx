import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow, Art, CtaBand, DemoBadge, PageHero } from '@/components/ui';
import { getProject, projects } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    // Demonstration entries are kept out of search results.
    robots: p.demo ? { index: false, follow: true } : undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const facts: [string, string | undefined][] = [
    ['Category', p.category],
    ['Location', p.location],
    ['Capacity', p.capacity],
    ['Client', p.client],
    ['Status', p.status],
  ];
  return (
    <>
      <PageHero
        eyebrow={p.category}
        title={p.name}
        lead={p.summary}
        crumbs={[
          { href: '/projects', label: 'Projects' },
          { href: `/projects/${p.slug}`, label: p.name },
        ]}
      />
      <section className="section">
        <div className="wrap">
          {p.demo ? (
            <p role="note" className="mb-10 border-l-4 border-emerald bg-mist px-5 py-4 text-[0.95rem] text-charcoal/85">
              <DemoBadge /> <span className="ml-2">This page is a sample layout. It does not describe a real project.</span>
            </p>
          ) : null}
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <div className="aspect-[800/520] overflow-hidden border border-navy/10 bg-navy">
                <Art name={p.art} />
              </div>
              <h2 className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest">Engineering scope</h2>
              <ul className="tick mt-5 space-y-3 text-charcoal/85">
                {p.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <h2 className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest">Technical highlights</h2>
              <ul className="tick mt-5 space-y-3 text-charcoal/85">
                {p.highlights.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="card divide-y divide-navy/10">
                {facts
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 px-6 py-4">
                      <dt className="text-sm text-charcoal/60">{k}</dt>
                      <dd className="text-right font-medium text-navy">{v}</dd>
                    </div>
                  ))}
              </dl>
              <Link href="/projects" className="btn-ghost mt-6 w-full">
                All projects <Arrow />
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
