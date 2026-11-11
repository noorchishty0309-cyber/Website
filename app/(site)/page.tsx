import Link from 'next/link';
import { InsightCard, ProjectCard } from '@/components/Filters';
import { PhaseTabs } from '@/components/PhaseTabs';
import { Reveal } from '@/components/Reveal';
import { Arrow, Art, JsonLd, SectionHead } from '@/components/ui';
import { industries, mepCategories, projects } from '@/lib/content';
import { formatDate, getInsights } from '@/lib/insights';
import { faqs } from '@/lib/lifecycle';
import { services } from '@/lib/services';
import { site, testimonials } from '@/lib/site';

const chips = [
  { label: 'Utility-scale solar', href: '/renewable-energy/utility-scale-solar-pv-engineering' },
  { label: 'Rooftop solar', href: '/renewable-energy/rooftop-solar-pv-engineering' },
  { label: 'Solar carports', href: '/renewable-energy/carport-solar-pv-engineering' },
  { label: 'Energy yield', href: '/renewable-energy/pvsyst-energy-yield-assessment' },
  { label: 'Cable sizing', href: '/renewable-energy/dc-and-ac-cable-sizing' },
  { label: 'Earthing', href: '/renewable-energy/electrical-earthing-design' },
  { label: 'Owner’s engineering', href: '/renewable-energy/owners-engineering-and-design-reviews' },
  { label: 'MEP design', href: '/mep' },
];

const pillars = [
  { title: 'Independent advice', text: 'We do not sell equipment or build plants, so nothing but the project shapes our recommendations.', outcome: 'Decisions you can defend to partners and lenders’ engineers.' },
  { title: 'Calculation-backed design', text: 'Every rating and size in our drawings traces to a documented calculation and a stated assumption.', outcome: 'Fewer disputes over why something was sized the way it was.' },
  { title: 'Energy and buildings together', text: 'Solar PV and building services are engineered by one team, so the interfaces are settled on paper.', outcome: 'No gaps between the PV package and the building package.' },
  { title: 'Standards-led documentation', text: 'Deliverables follow the IEC, IEEE, IS or local standards and client specifications that apply to your project.', outcome: 'Smoother review by utilities and third parties.' },
  { title: 'Designed to be built', text: 'Procurement, installation sequence and maintenance access are considered while the design can still change.', outcome: 'Fewer site queries and less rework.' },
  { title: 'Direct access to engineers', text: 'You speak with the engineers doing the work, not through layers of account management.', outcome: 'Short technical queries and precise answers.' },
];

const disciplines = [
  { title: 'Ground-mounted solar PV', text: 'Utility-scale layout, string design and DC to MV electrical systems.', art: 'field', href: '/renewable-energy/ground-mounted-solar-pv-design' },
  { title: 'Rooftop solar PV', text: 'Commercial and industrial rooftops integrated with existing electrical systems.', art: 'rooftop', href: '/renewable-energy/rooftop-solar-pv-engineering' },
  { title: 'Solar carports', text: 'Canopy arrays with concealed cabling and EV-ready provisions.', art: 'carport', href: '/renewable-energy/carport-solar-pv-engineering' },
  { title: 'Electrical and grid', text: 'Single-line diagrams, cable sizing, earthing, protection and grid integration.', art: 'sld', href: '/renewable-energy#electrical-design' },
  { title: 'HVAC and mechanical', text: 'Load calculations, ventilation and equipment selection for buildings.', art: 'hvac', href: '/mep#mechanical' },
  { title: 'Building services', text: 'Electrical, plumbing, fire protection and ELV design, coordinated.', art: 'mep', href: '/mep' },
];

const value = [
  { metric: 'Energy yield', risk: 'Optimistic loss assumptions and shading that was never modelled.', control: 'A yield model built from the actual design, with each loss justified.' },
  { metric: 'Electrical losses', risk: 'Cables sized on current rating alone, long routes, poor station placement.', control: 'Voltage drop and loss calculated per circuit and reduced at layout stage.' },
  { metric: 'Capital cost', risk: 'Over-specified equipment and quantities based on rules of thumb.', control: 'Sizing from calculated demand and a bill of quantities taken from the drawings.' },
  { metric: 'Schedule', risk: 'Late design changes, unclear drawings and unanswered site queries.', control: 'An agreed deliverables list, staged reviews and tracked comment closure.' },
  { metric: 'Safety and compliance', risk: 'Earthing, protection and fault levels checked late or not at all.', control: 'Safety-critical calculations prepared and verified against the applicable standards.' },
  { metric: 'Operability', risk: 'Plant that is hard to access, monitor or maintain.', control: 'Maintenance access, SCADA signals and spares considered during design.' },
];

const approach = [
  { title: 'Understand', text: 'Review site, grid, building and contractual inputs.', output: 'Confirmed scope and input register' },
  { title: 'Define the basis', text: 'Record design criteria, standards and assumptions.', output: 'Agreed design basis' },
  { title: 'Engineer', text: 'Develop calculations, layouts, diagrams and specifications as one set.', output: 'Coordinated design package' },
  { title: 'Verify', text: 'Check each deliverable against the basis and across disciplines.', output: 'Checked, revision-controlled documents' },
  { title: 'Deliver and support', text: 'Issue for construction and answer queries through the build.', output: 'Closed comments and site support' },
];

const pathways = [
  { q: 'I have a site and need to know if it works.', a: 'Feasibility study', href: '/renewable-energy/solar-pv-feasibility-studies' },
  { q: 'I have a concept and need construction drawings.', a: 'Detailed engineering', href: '/renewable-energy/preliminary-and-detailed-engineering' },
  { q: 'I need an independent check of a contractor’s design.', a: 'Owner’s engineering', href: '/renewable-energy/owners-engineering-and-design-reviews' },
  { q: 'My plant is producing less than expected.', a: 'Performance analysis', href: '/renewable-energy/solar-plant-performance-analysis' },
  { q: 'I am designing a building and need services design.', a: 'MEP engineering', href: '/mep' },
];

export default function HomePage() {
  const insights = getInsights().slice(0, 3);
  const mepCount = mepCategories.reduce((n, c) => n + c.services.length, 0);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      {/* Hero with lifecycle selector */}
      <section className="on-dark relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10">
          <Art name="field" className="opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/55" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </div>
        <div className="wrap grid items-center gap-12 pb-14 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-24">
          <div>
            <p className="eyebrow rise">Independent renewable energy and MEP engineering consultancy</p>
            <h1 className="rise mt-6 text-[2.5rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[4rem]" style={{ ['--d' as string]: '90ms' }}>
              Illuminating Innovation. <span className="text-lime">Engineering Tomorrow.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl" style={{ ['--d' as string]: '180ms' }}>
              Integrated Renewable Energy and MEP Engineering Solutions for a Smarter, More Sustainable World.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ['--d' as string]: '270ms' }}>
              <Link href="/renewable-energy" className="btn-lime">
                Explore Our Services <Arrow />
              </Link>
              <Link href="/contact" className="btn-ghost-dark">
                Discuss Your Project
              </Link>
            </div>
          </div>
          <div className="rise" style={{ ['--d' as string]: '320ms' }}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/60">Where is your project today?</p>
            <PhaseTabs />
          </div>
        </div>
        <div className="border-t border-white/10">
          <ul className="wrap flex gap-2 overflow-x-auto py-4" aria-label="Popular topics">
            {chips.map((c) => (
              <li key={c.label} className="shrink-0">
                <Link href={c.href} className="block border border-white/20 px-3.5 py-1.5 text-sm text-white/85 transition hover:border-lime hover:text-lime" style={{ borderRadius: 2 }}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Introduction */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHead eyebrow="Who we are" title="Engineering judgement for energy and the built environment." />
          <Reveal delay={100}>
            <p className="lead">{site.description}</p>
            <p className="mt-5 text-charcoal/80">
              We are engineers, not installers. Our work is the thinking that happens before equipment is ordered and ground is
              broken: the layouts, calculations, diagrams and specifications that decide how a plant or a building performs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?service=Feasibility%20study%20%2F%20energy%20yield%20assessment" className="btn-navy">
                Request a technical review <Arrow />
              </Link>
              <Link href="/about" className="btn-ghost">
                About NOORLUME
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scope at a glance: counts come from the service catalogue, not from claims */}
      <section className="on-dark blueprint bg-navy text-white">
        <div className="wrap">
        <dl className="grid grid-cols-2 gap-px bg-white/10 lg:grid-cols-4">
          {[
            [String(services.length), 'solar PV engineering services'],
            [String(mepCount), 'MEP design services across four disciplines'],
            ['DC to MV', 'electrical design coverage'],
            ['India + GCC', 'and international markets served'],
          ].map(([k, v]) => (
            <div key={v} className="bg-navy px-5 py-9 sm:px-8">
              <dt className="whitespace-nowrap font-display text-2xl font-semibold text-lime sm:text-4xl">{k}</dt>
              <dd className="mt-2 text-sm leading-snug text-white/70">{v}</dd>
            </div>
          ))}
        </dl>
        </div>
      </section>

      {/* Why clients choose NOORLUME */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Why choose NOORLUME?" title="Six commitments, and what each one gives you." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70}>
                <article className="card flex h-full flex-col p-7">
                  <span className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{p.text}</p>
                  <p className="mt-auto border-t border-navy/10 pt-4 text-sm text-charcoal/85">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-forest">Outcome</span>
                    {p.outcome}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="section blueprint-light bg-mist">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="What we engineer" title="Technologies and disciplines we support." />
            <div className="flex shrink-0 gap-3">
              <Link href="/renewable-energy" className="btn-ghost">Renewable energy <Arrow /></Link>
              <Link href="/mep" className="btn-ghost">MEP <Arrow /></Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 70}>
                <Link href={d.href} className="card-link group flex h-full flex-col overflow-hidden">
                  <div className="aspect-[800/440] overflow-hidden bg-navy">
                    <Art name={d.art} className="transition duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold">{d.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/75">{d.text}</p>
                    <span className="mt-auto pt-5 text-navy"><Arrow /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where engineering protects project value */}
      <section className="on-dark section blueprint bg-navy text-white">
        <div className="wrap">
          <SectionHead dark eyebrow="Project value" title="Where engineering protects your project.">
            Most of what a project earns or loses is fixed at design stage. These are the points we watch.
          </SectionHead>
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {value.map((v, i) => (
              <Reveal key={v.metric} delay={(i % 3) * 70} className="bg-navy p-7 sm:p-8">
                <h3 className="text-xl font-semibold text-white">{v.metric}</h3>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/50">At risk from</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/70">{v.risk}</p>
                <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-lime">Our control</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-white/90">{v.control}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead eyebrow="Our engineering approach" title="How we work, and what you receive at each step." />
            <Link href="/project-lifecycle" className="btn-ghost shrink-0">Project lifecycle <Arrow /></Link>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <li className="relative flex h-full flex-col border-t-2 border-navy/15 pt-6">
                  <span className="absolute -top-[2px] left-0 h-[2px] w-10 bg-emerald" />
                  <span className="font-mono text-sm text-forest">Step {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-xl font-semibold">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{a.text}</p>
                  <p className="mt-auto pt-5 text-sm font-medium text-navy">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-forest">Output</span>
                    {a.output}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Who and where */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHead eyebrow="Industries and regions" title="Who we work with, and where.">
              Developers, EPC contractors, architects and building owners in {site.regions.slice(0, 3).join(', ')} and international markets.
            </SectionHead>
            <Reveal delay={100}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {site.regions.map((r) => (
                  <li key={r} className="bg-navy px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-lime">{r}</li>
                ))}
              </ul>
              <Link href="/industries" className="btn-ghost mt-8">All industries <Arrow /></Link>
            </Reveal>
          </div>
          <ul className="grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <li key={ind.name} className="bg-offwhite p-6 transition hover:bg-white">
                <span className="font-mono text-xs text-emerald">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 font-display font-medium leading-snug text-navy">{ind.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
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

      {/* Pathways */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead eyebrow="Not sure where to start?" title="Start from your situation.">
            Pick the statement closest to yours and we will point you to the right service.
          </SectionHead>
          <ul className="border-t border-navy/15">
            {pathways.map((p, i) => (
              <Reveal key={p.q} delay={i * 50}>
                <li className="border-b border-navy/15">
                  <Link href={p.href} className="group flex items-center justify-between gap-6 py-5 transition hover:pl-2">
                    <span>
                      <span className="block font-display text-lg font-medium text-navy group-hover:text-forest">{p.q}</span>
                      <span className="mt-1 block font-mono text-xs uppercase tracking-[0.14em] text-forest">{p.a}</span>
                    </span>
                    <span className="shrink-0 text-navy"><Arrow /></span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
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

      {/* FAQ */}
      <section className={`section ${testimonials.length ? '' : 'bg-mist'}`}>
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead eyebrow="Frequently asked questions" title="Quick answers." />
          <div className="border-t border-navy/15">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-navy/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-medium text-navy marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-emerald transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-charcoal/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="on-dark blueprint bg-forest text-white">
        <Reveal className="wrap flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Project enquiry</p>
            <h2 className="h-section mt-5 text-white">Let’s engineer your next project.</h2>
            <p className="mt-4 text-lg text-white/80">
              Share the basics of your project and our engineers will come back to you with a scope and approach.
            </p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
            <Link href="/contact" className="btn-lime">Discuss Your Project <Arrow /></Link>
            <Link href="/contact?service=Owner%27s%20engineering%20%2F%20design%20review" className="btn-ghost-dark">Request a design review</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
