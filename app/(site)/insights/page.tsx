import type { Metadata } from 'next';
import { InsightsList } from '@/components/Filters';
import { CtaBand, PageHero } from '@/components/ui';
import { formatDate, getInsights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Engineering Knowledge Centre',
  description:
    'Practical engineering articles on solar PV design, cable sizing, inverter selection, earthing, performance ratio, PVsyst and MEP design fundamentals.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const articles = getInsights().map(({ content: _content, ...a }) => ({ ...a, date: formatDate(a.date) }));
  return (
    <>
      <PageHero
        eyebrow="Engineering knowledge centre"
        title="Practical notes on PV and MEP engineering."
        lead="Short, technical articles on the calculations and design decisions behind solar plants and building services."
        art="sld"
        crumbs={[{ href: '/insights', label: 'Insights' }]}
      />
      <section className="section">
        <div className="wrap">
          <InsightsList articles={articles} />
        </div>
      </section>
      <CtaBand title="Have a technical question about your project?" />
    </>
  );
}
