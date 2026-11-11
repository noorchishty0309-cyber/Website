/**
 * Project lifecycle: how NOORLUME's services map to the stages of a project.
 * Edit the lists to move a service between stages. `slug` values must match
 * entries in lib/services.ts; items with `href` link elsewhere.
 */
export type PhaseItem = { label: string; slug?: string; href?: string };

export const phases: {
  id: string;
  step: string;
  name: string;
  stage: string;
  summary: string;
  outcome: string;
  items: PhaseItem[];
}[] = [
  {
    id: 'develop',
    step: '01',
    name: 'Develop',
    stage: 'Feasibility and concept',
    summary:
      'Establish whether the site and concept work before significant money is committed: resource, capacity, grid connection and principal risks.',
    outcome: 'A clear technical basis for a go or no-go decision.',
    items: [
      { label: 'Solar PV feasibility studies', slug: 'solar-pv-feasibility-studies' },
      { label: 'PVsyst energy yield assessment', slug: 'pvsyst-energy-yield-assessment' },
      { label: 'Plant layout optimization', slug: 'solar-plant-layout-optimization' },
      { label: 'Grid integration engineering', slug: 'grid-integration-engineering' },
      { label: 'Preliminary engineering', slug: 'preliminary-and-detailed-engineering' },
    ],
  },
  {
    id: 'design',
    step: '02',
    name: 'Design',
    stage: 'Detailed engineering and procurement',
    summary:
      'Turn the concept into a complete, coordinated set of calculations, drawings and specifications that can be procured and built.',
    outcome: 'Construction-issue documents with every rating traceable to a calculation.',
    items: [
      { label: 'DC and AC electrical system design', slug: 'dc-and-ac-electrical-system-design' },
      { label: 'DC and AC cable sizing', slug: 'dc-and-ac-cable-sizing' },
      { label: 'Inverter and transformer selection', slug: 'inverter-and-transformer-selection' },
      { label: 'Single-line diagrams', slug: 'single-line-diagrams' },
      { label: 'Earthing design', slug: 'electrical-earthing-design' },
      { label: 'Lightning protection', slug: 'lightning-protection' },
      { label: 'SCADA and monitoring engineering', slug: 'scada-and-monitoring-system-engineering' },
      { label: 'Equipment technical specifications', slug: 'equipment-technical-specifications' },
      { label: 'Technical bid evaluation', slug: 'technical-bid-evaluation' },
      { label: 'MEP design for buildings', href: '/mep' },
    ],
  },
  {
    id: 'deliver',
    step: '03',
    name: 'Deliver',
    stage: 'Construction support and operation',
    summary:
      'Protect the design intent through construction and check that the finished asset performs as expected.',
    outcome: 'Issues resolved on paper, and performance measured against the design.',
    items: [
      { label: 'Owner’s engineering and design reviews', slug: 'owners-engineering-and-design-reviews' },
      { label: 'Vendor document review', slug: 'preliminary-and-detailed-engineering' },
      { label: 'Solar plant performance analysis', slug: 'solar-plant-performance-analysis' },
      { label: 'MEP services coordination', href: '/mep#mechanical' },
    ],
  },
];

export const phaseHref = (i: PhaseItem) => i.href ?? `/renewable-energy/${i.slug}`;

export const faqs: { q: string; a: string }[] = [
  {
    q: 'What does NOORLUME do?',
    a: 'NOORLUME is a renewable energy and MEP design consultancy. We provide engineering for solar PV plants and for building services: feasibility studies, layouts, electrical design, calculations, specifications, energy yield assessment and independent design review.',
  },
  {
    q: 'Is NOORLUME an EPC contractor or a solar installer?',
    a: 'No. We are an engineering consultancy. We do not supply equipment or carry out installation, so our recommendations are not tied to any product or contractor.',
  },
  {
    q: 'Which regions do you work in?',
    a: 'We serve clients in India, the Middle East, GCC countries and international markets. Designs are prepared to the standards and utility requirements that apply at the project location.',
  },
  {
    q: 'Can I engage NOORLUME for a single calculation or review?',
    a: 'Yes. Each service can be scoped on its own, from one cable sizing calculation or a design review to a complete detailed engineering package.',
  },
  {
    q: 'What information do you need to prepare a proposal?',
    a: 'For a solar project: location, capacity, mounting type, grid connection voltage and current stage. For a building: type, approximate area, number of floors, disciplines required and any available drawings.',
  },
  {
    q: 'How are fees and timelines decided?',
    a: 'They depend on scope and are confirmed in a written proposal after we have reviewed your requirement. The website assistant does not quote prices or delivery dates.',
  },
];
