import Link from 'next/link';
import { InsightCard, ProjectCard } from '@/components/Filters';
import { Reveal } from '@/components/Reveal';
import { Arrow, Art, CtaBand, SectionHead } from '@/components/ui';
import { industries, mepCategories, projects } from '@/lib/content';
import { formatDate, getInsights } from '@/lib/insights';
import { services } from '@/lib/services';
import { site, testimonials } from '@/lib/site';

const expertise = [
  { n: '01', title: 'Solar PV plant engineering', text: 'Utility-scale, rooftop and carport plants engineered from concept layout to construction-issue design.', href: '/renewable-energy' },
  { n: '02', title: 'Electrical system design', text: 'DC, LV and MV systems, cable sizing, earthing, protection and single-line diagrams backed by calculations.', href: '/renewable-energy#electrical-design' },
  { n: '03', title: 'MEP building services', text: 'Mechanical, electrical, plumbing, fire protection and ELV design, coordinated as one package.', href: '/mep' },
  { n: '04', title: 'Studies and owner’s engineering', text: 'Feasibility, energy yield, grid integration and independent design review for project owners.', href: '/renewable-energy#advisory-and-review' },
];

const reasons = [
  { title: 'Calculation-backed decisions', text: 'Every rating and size in our drawings traces back to a documented calculation and a stated assumption.' },
  { title: 'Energy and buildings under one roof', text: 'Solar PV and building services are engineered together, so interfaces between them are resolved on paper.' },
  { title: 'Standards-led documentation', text: 'Deliverables are prepared to the IEC, IEEE, IS or local standards and client specifications that apply to your project.' },
  { title: 'Clear deliverables', text: 'You receive an agreed deliverables list, tracked revisions and comment resolution sheets, not a loose set of files.' },
  { title: 'Designed to be built', text: 'We consider procurement, installation sequence and maintenance access while the design can still change.' },
  { title: 'Direct access to engineers', text: 'You speak with the engineers doing the work, which keeps technical queries short and answers precise.' },
];

const approach = [
  { title: 'Understand', text: 'Review site, grid, building and contractual inputs. Confirm scope and what success looks like.' },
  { title: 'Define the basis', text: 'Record design criteria, standards and assumptions in a design basis agreed with you.' },
  { title: 'Engineer', text: 'Develop calculations, layouts, diagrams and specifications as a coordinated set.' },
  { title: 'Verify', text: 'Check each deliverable against the design basis and across disciplines before issue.' },
  { title: 'Deliver and support', text: 'Issue with a tracked revision history and support queries through procurement and construction.' },
];

export default function HomePage() {
  const insights = getInsights().slice(0, 3);
  const featured = services.filter((s) =>
    [
      'utility-scale-solar-pv-engineering',
      'rooftop-solar-pv-engineering',
      'carport-solar-pv-engineering',
      'dc-and-ac-cable-sizing',
      'pvsyst-energy-yield-assessment',
      'electrical-earthing-design',
      'grid-integration-engineering',
      'owners-engineering-and-design-reviews',
    ].includes(s.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Art name="field" className="opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </div>
        <div className="wrap pb-14 pt-20 sm:pt-28 lg:pb-20 lg:pt-36">
          <p className="eyebrow rise">Renewable energy and MEP engineering consultancy</p>
          <h1 className="h-display rise mt-6 max-w-4xl text-white" style={{ ['--d' as string]: '90ms' }}>
            Illuminating Innovation. <span className="text-lime">Engineering Tomorrow.</span>
          </h1>
          <p className="rise mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl" style={{ ['--d' as string]: '180ms' }}>
            Integrated Renewable Energy and MEP Engineering Solutions for a Smarter, More Sustainable World.
          </p>
          <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '270ms' }}>
            <Link href="/renewable-energy" className="btn-lime">
              Explore Our Services <Arrow />
            </Link>
            <Link href="/contact" className="btn-ghost-dark">
              Discuss Your Project
            </Link>
          </div>

          <dl className="rise mt-16 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4" style={{ ['--d' as string]: '360ms' }}>
            {[
              [String(services.length), 'solar PV engineering services'],
              [String(mepCategories.length), 'MEP design disciplines'],
              ['DC to MV', 'electrical design coverage'],
              ['India + GCC', 'and international markets'],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="whitespace-nowrap font-display text-2xl font-semibold text-white sm:text-[1.7rem]">{k}</dt>
                <dd className="mt-1 text-sm text-white/65">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHead eyebrow="Who we are" title="An engineering consultancy for energy and the built environment." />
          <Reveal delay={100}>
            <p className="lead">{site.description}</p>
            <p className="mt-5 text-charcoal/80">
              We are engineers, not installers. Our work is the thinking that happens before equipment is ordered and ground is
              broken: the layouts, calculations, diagrams and specifications that decide how well a plant or a building performs.
            </p>
            <Link href="/about" className="btn-ghost mt-8">
              About NOORLUME <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Expertise */}
      <section className="section blueprint-light bg-mist">
        <div className="wrap">
          <SectionHead eyebrow="Our engineering expertise" title="Four areas of practice, one coordinated team." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e, i) => (
              <Reveal key={e.n} delay={i * 70}>
                <Link href={e.href} className="card-link group flex h-full flex-col p-7">
                  <span className="font-mono text-sm text-emerald">{e.n}</span>
                  <h3 className="mt-8 text-xl font-semibold leading-snug">{e.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{e.text}</p>
                  <span className="mt-auto pt-8 text-navy"><Arrow /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Renewable energy services */}
      <section className="on-dark section blueprint bg-navy text-white">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead dark eyebrow="Renewable energy services" title="Solar PV engineering, from first layout to grid connection.">
              Feasibility, detailed design, yield assessment and design review for ground-mounted, rooftop and carport plants.
            </SectionHead>
            <Reveal delay={120} className="mt-10 hidden aspect-[800/520] overflow-hidden border border-white/10 lg:block">
              <Art name="sld" />
            </Reveal>
          </div>
          <div>
            <ul className="border-t border-white/15">
              {featured.map((s, i) => (
                <Reveal key={s.slug} delay={i * 40}>
                  <li className="border-b border-white/15">
                    <Link href={`/renewable-energy/${s.slug}`} className="group flex items-center justify-between gap-6 py-5 transition hover:pl-2">
                      <span>
                        <span className="block font-display text-lg font-medium text-white group-hover:text-lime">{s.title}</span>
                        <span className="mt-1 block text-sm text-white/60">{s.summary}</span>
                      </span>
                      <span className="shrink-0 text-lime"><Arrow /></span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Link href="/renewable-energy" className="btn-lime mt-10">
              View all {services.length} services <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* MEP */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="MEP engineering services" title="Building services designed to work together.">
              Mechanical, electrical, plumbing, fire protection and ELV design for commercial, industrial and institutional buildings.
            </SectionHead>
            <Link href="/mep" className="btn-ghost shrink-0">MEP engineering <Arrow /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mepCategories.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <Link href={`/mep#${c.id}`} className="card-link group flex h-full flex-col overflow-hidden">
                  <div className="aspect-[800/520] overflow-hidden bg-mist">
                    <Art name={c.art} tone="light" className="transition duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <ul className="tick mt-4 space-y-2 text-sm text-charcoal/75">
                      {c.services.slice(0, 4).map((s) => (
                        <li key={s.name}>{s.name}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Industries we serve" title="Engineering for developers, contractors and building owners." />
            <Reveal delay={100}>
              <Link href="/industries" className="btn-ghost mt-8">All industries <Arrow /></Link>
            </Reveal>
          </div>
          <ul className="grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.name} className="group bg-offwhite p-6 transition hover:bg-white">
                <span className="font-mono text-xs text-emerald">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 font-display font-medium leading-snug text-navy">{ind.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="Featured projects" title="Project portfolio">
              {projects.every((p) => p.demo)
                ? 'The entries below are demonstration content showing how projects will be presented. Verified project details will replace them.'
                : 'A selection of our engineering assignments.'}
            </SectionHead>
            <Link href="/projects" className="btn-ghost shrink-0">All projects <Arrow /></Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why NOORLUME */}
      <section className="on-dark section blueprint bg-navy text-white">
        <div className="wrap">
          <SectionHead dark eyebrow="Why choose NOORLUME?" title="What you can expect when you work with us." />
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 70} className="bg-navy p-7 sm:p-8">
                <span className="block h-[3px] w-8 bg-lime" />
                <h3 className="mt-6 text-xl font-semibold text-white">{r.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our engineering approach" title="A structured path from inputs to verified deliverables." />
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <li className="relative h-full border-t-2 border-navy/15 pt-6">
                  <span className="absolute -top-[2px] left-0 h-[2px] w-10 bg-emerald" />
                  <span className="font-mono text-sm text-forest">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-xl font-semibold">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{a.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Sustainability */}
      <section className="section bg-mist">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="aspect-[800/520] overflow-hidden border border-navy/10">
            <Art name="mep" tone="light" />
          </Reveal>
          <div>
            <SectionHead eyebrow="Sustainability commitment" title="Efficiency is an engineering outcome.">
              Sustainable performance is decided at the drawing board. A well-chosen cable size, a right-sized chiller or a
              better array layout saves energy every hour for the life of the asset.
            </SectionHead>
            <Reveal delay={100}>
              <ul className="tick mt-8 space-y-3 text-charcoal/85">
                <li>We quantify losses at design stage so they can be reduced, not discovered later.</li>
                <li>We size equipment to the calculated demand to avoid wasteful over-design.</li>
                <li>We look for opportunities to integrate on-site solar with building services.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insights */}
      {insights.length ? (
        <section className="section">
          <div className="wrap">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead eyebrow="Engineering insights" title="Notes from the knowledge centre." />
              <Link href="/insights" className="btn-ghost shrink-0">All articles <Arrow /></Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((a, i) => (
                <Reveal key={a.slug} delay={i * 70}>
                  <InsightCard a={{ ...a, date: formatDate(a.date) }} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Testimonials: renders only when lib/site.ts has genuine entries */}
      {testimonials.length ? (
        <section className="section bg-mist">
          <div className="wrap">
            <SectionHead eyebrow="Client testimonials" title="What our clients say." />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name + t.company} className="card p-8">
                  <blockquote className="text-lg leading-relaxed text-navy">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm text-charcoal/70">
                    <span className="block font-semibold text-navy">{t.name}</span>
                    {t.role}, {t.company}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand title="Let’s engineer your next project." />
    </>
  );
}
