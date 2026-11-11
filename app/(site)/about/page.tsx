import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { CtaBand, PageHero, SectionHead } from '@/components/ui';
import { company, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About NOORLUME',
  description:
    'NOORLUME is a renewable energy and MEP engineering consultancy. Read about our philosophy, vision, mission, engineering approach and values.',
  alternates: { canonical: '/about' },
};

const values = [
  { title: 'Precision', text: 'We check our numbers, state our assumptions and show our working.' },
  { title: 'Integrity', text: 'We give clients a straight technical answer, including when it is not the convenient one.' },
  { title: 'Innovation', text: 'We adopt better tools and methods when they improve the design, not for their own sake.' },
  { title: 'Sustainability', text: 'We treat energy efficiency and resource use as design criteria on every project.' },
  { title: 'Collaboration', text: 'We work openly with clients, contractors, architects and vendors to resolve interfaces early.' },
  { title: 'Accountability', text: 'We own our deliverables through review, construction queries and close-out.' },
];

const pillars = [
  {
    id: 'approach',
    title: 'Our engineering approach',
    text: 'Each assignment begins with a written design basis: the criteria, standards and assumptions the design will follow. Calculations, drawings and specifications are then developed as one coordinated set and checked against that basis before issue.',
  },
  {
    id: 'quality',
    title: 'Quality commitment',
    text: 'Deliverables are prepared against an agreed deliverables list, checked before issue and controlled by revision. Client and third-party comments are tracked to closure in comment resolution sheets.',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    text: 'We keep our methods and software under review and adopt new tools when they make the design more accurate or the work more consistent, and only once we are confident in their results.',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    text: 'Our core work, renewable energy and efficient building services, contributes directly to lower-carbon infrastructure. Within each design we look to reduce losses, avoid over-sizing and extend asset life.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Engineering that brings light to complex problems."
        lead={site.positioning}
        art="mep"
        crumbs={[{ href: '/about', label: 'About' }]}
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHead eyebrow="Who we are" title="A consultancy focused on renewable energy and building services." />
          <Reveal delay={100}>
            <p className="lead">{site.description}</p>
            <p className="mt-5 text-charcoal/80">
              We serve clients in India, the Middle East, GCC countries and international markets. Our role is that of an
              engineering consultant: we design, calculate, specify and review. We do not sell equipment, so our
              recommendations are driven only by what is right for the project.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHead eyebrow="Brand philosophy" title="Noor and Lume: two words for light.">
            Noor means light and illumination. Lume speaks of modern illumination and innovation. Together they describe what
            good engineering does: it makes a complex problem clear, and it powers what comes next.
          </SectionHead>
          <Reveal delay={100} className="grid gap-5">
            <div className="card p-8">
              <p className="eyebrow">Vision</p>
              <p className="mt-5 font-display text-xl leading-snug text-navy sm:text-2xl">
                To become a trusted engineering consultancy delivering innovative and sustainable solutions for the energy and
                built environment sectors.
              </p>
            </div>
            <div className="card p-8">
              <p className="eyebrow">Mission</p>
              <p className="mt-5 font-display text-xl leading-snug text-navy sm:text-2xl">
                To deliver technically sound, efficient and sustainable engineering solutions through innovation, precision
                and professional excellence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="Principles behind every deliverable." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 80}>
                <article id={p.id} className="card h-full scroll-mt-24 p-8">
                  <span className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-charcoal/80">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark section blueprint bg-navy text-white">
        <div className="wrap">
          <SectionHead dark eyebrow="Our values" title="What we hold ourselves to." />
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 70} className="bg-navy p-8">
                <span className="block h-[3px] w-8 bg-lime" />
                <h3 className="mt-6 text-xl font-semibold text-white">{v.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The sections below appear automatically once filled in lib/site.ts (company). */}
      {company.history ? (
        <section className="section">
          <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHead eyebrow="Company history" title="Our story." />
            <p className="lead whitespace-pre-line">{company.history}</p>
          </div>
        </section>
      ) : null}

      {company.team.length ? (
        <section className="section bg-mist">
          <div className="wrap">
            <SectionHead eyebrow="Our team" title="The engineers behind the work." />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {company.team.map((m) => (
                <article key={m.name} className="card p-8">
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-forest">{m.role}</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal/80">{m.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {company.credentials.length ? (
        <section className="section">
          <div className="wrap">
            <SectionHead eyebrow="Credentials" title="Registrations and memberships." />
            <ul className="tick mt-10 grid gap-3 text-charcoal/85 sm:grid-cols-2">
              {company.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
