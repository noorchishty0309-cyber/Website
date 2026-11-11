import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { InsightCard } from '@/components/Filters';
import { CtaBand, JsonLd } from '@/components/ui';
import { formatDate, getInsight, getInsights } from '@/lib/insights';
import { site } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getInsights().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getInsight((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: 'article', title: a.title, description: a.description, url: `/insights/${a.slug}`, publishedTime: a.date },
  };
}

export default async function InsightPage({ params }: Props) {
  const a = getInsight((await params).slug);
  if (!a) notFound();
  const more = getInsights()
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: a.title,
          description: a.description,
          datePublished: a.date,
          articleSection: a.category,
          author: { '@type': 'Organization', name: 'NOORLUME Energy & Engineering', url: site.url },
          publisher: { '@id': `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/insights/${a.slug}`,
        }}
      />
      <section className="on-dark blueprint bg-navy text-white">
        <div className="wrap max-w-4xl py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-white/60">
            <Link href="/" className="hover:text-lime">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-lime">Insights</Link>
          </nav>
          <p className="eyebrow rise">{a.category}</p>
          <h1 className="rise mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl" style={{ ['--d' as string]: '80ms' }}>
            {a.title}
          </h1>
          <p className="mt-6 text-sm text-white/65">
            {formatDate(a.date)} · {a.readingTime}
          </p>
        </div>
      </section>

      <article className="section">
        <div className="wrap max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-forest prose-strong:text-navy prose-code:rounded-sm prose-code:bg-mist prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-medium prose-code:text-navy prose-code:before:content-none prose-code:after:content-none prose-pre:bg-navy prose-th:text-navy">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.content}</ReactMarkdown>
          </div>
          <p className="mt-12 border-l-4 border-emerald bg-mist px-5 py-4 text-sm leading-relaxed text-charcoal/80">
            This article is general technical information. It is not project-specific engineering advice. Designs must be
            prepared and checked by a qualified engineer against the standards and site conditions that apply to your project.
          </p>
        </div>
      </article>

      {more.length ? (
        <section className="section bg-mist">
          <div className="wrap">
            <h2 className="h-section">More from the knowledge centre</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((m) => (
                <InsightCard key={m.slug} a={{ ...m, date: formatDate(m.date) }} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
