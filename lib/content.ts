/**
 * Editable content for MEP services, industries and the project portfolio.
 */

export const mepCategories = [
  {
    id: 'mechanical',
    title: 'Mechanical engineering',
    art: 'hvac',
    intro:
      'HVAC design that starts with an accurate load calculation and ends with equipment that fits the plant room and the budget.',
    services: [
      { name: 'HVAC system design', text: 'System selection and design for comfort and process cooling, coordinated with the building.' },
      { name: 'Heating and cooling load calculations', text: 'Zone-by-zone load calculations based on envelope, occupancy, lighting and equipment data.' },
      { name: 'Ventilation design', text: 'Fresh air, exhaust and pressurisation design for occupied and service spaces.' },
      { name: 'Equipment selection', text: 'Technical selection and scheduling of chillers, AHUs, fans and pumps.' },
      { name: 'Mechanical services coordination', text: 'Duct and pipe routing coordinated with structure, architecture and other services.' },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical engineering',
    art: 'sld',
    intro: 'Building electrical systems designed for safety, capacity and maintainability, with every rating backed by a calculation.',
    services: [
      { name: 'Electrical load calculations', text: 'Connected and maximum demand assessment with diversity for transformer and generator sizing.' },
      { name: 'LV and MV distribution', text: 'Distribution architecture from the utility intake to final distribution boards.' },
      { name: 'Lighting design', text: 'Lighting layouts and illuminance calculations for interior and exterior areas.' },
      { name: 'Power distribution', text: 'Small power, equipment supplies and containment layouts.' },
      { name: 'Cable sizing', text: 'Cable selection for current rating, derating and short-circuit withstand.' },
      { name: 'Voltage drop calculations', text: 'Feeder and circuit voltage drop verified against project limits.' },
      { name: 'Earthing and lightning protection', text: 'Earthing systems and lightning protection coordinated with the structure.' },
      { name: 'Electrical single-line diagrams', text: 'SLDs showing ratings, protection and metering for the complete installation.' },
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing engineering',
    art: 'plumbing',
    intro: 'Water supply and drainage systems sized from demand and laid out for reliable operation and access.',
    services: [
      { name: 'Water supply design', text: 'Cold and hot water distribution, storage and pumping arrangements.' },
      { name: 'Drainage design', text: 'Soil, waste, vent and storm water drainage systems.' },
      { name: 'Water demand calculations', text: 'Daily demand and storage capacity assessment by occupancy and use.' },
      { name: 'Plumbing layouts', text: 'Coordinated floor layouts, risers and schematic diagrams.' },
      { name: 'Sanitary system design', text: 'Sanitary fixture connections, stacks and external connections.' },
    ],
  },
  {
    id: 'fire-elv',
    title: 'Fire protection and ELV',
    art: 'elv',
    intro: 'Life-safety and low-voltage systems designed and coordinated as part of the overall building services package.',
    services: [
      { name: 'Firefighting system design', text: 'Hydrant, sprinkler and pumping system design to the applicable code.' },
      { name: 'Fire alarm system coordination', text: 'Detection and alarm layouts coordinated with architecture and other services.' },
      { name: 'CCTV', text: 'Camera coverage layouts and system architecture.' },
      { name: 'Access control', text: 'Door schedules, controller locations and system schematics.' },
      { name: 'Data and communication systems', text: 'Structured cabling, rack locations and containment.' },
      { name: 'Building management system coordination', text: 'Points lists and integration requirements for monitored plant.' },
    ],
  },
] as const;

export const industries = [
  { name: 'Renewable energy developers', text: 'Feasibility, yield assessment and owner’s engineering from site selection to commissioning.', art: 'field' },
  { name: 'Solar EPC contractors', text: 'Detailed engineering packages, calculations and drawings that support procurement and construction.', art: 'sld' },
  { name: 'Commercial buildings', text: 'Coordinated MEP design and rooftop PV integration for offices, retail and mixed-use developments.', art: 'mep' },
  { name: 'Industrial facilities', text: 'Power distribution, utilities and captive solar engineering for manufacturing and logistics sites.', art: 'rooftop' },
  { name: 'Educational institutions', text: 'Building services and campus solar designed for long service life and simple operation.', art: 'carport' },
  { name: 'Healthcare facilities', text: 'Building services design with attention to resilience, ventilation and electrical safety.', art: 'hvac' },
  { name: 'Residential developments', text: 'Efficient MEP layouts for apartment buildings and housing developments.', art: 'plumbing' },
  { name: 'Infrastructure projects', text: 'Electrical and utility engineering for public and private infrastructure.', art: 'sld' },
  { name: 'Government and institutional projects', text: 'Engineering documentation prepared to the standards and formats public clients require.', art: 'elv' },
] as const;

export const projectCategories = [
  'Ground-mounted solar',
  'Rooftop solar',
  'Solar carports',
  'Commercial buildings',
  'Industrial facilities',
  'MEP engineering',
] as const;

export type Project = {
  slug: string;
  /** Set to false only for real, verified projects you are authorised to publish. */
  demo: boolean;
  name: string;
  category: (typeof projectCategories)[number];
  location: string;
  capacity?: string;
  client?: string;
  status: string;
  art: string;
  scope: string[];
  highlights: string[];
  summary: string;
};

/**
 * DEMONSTRATION CONTENT.
 * These entries show how the portfolio will look. They are not real projects.
 * Replace each one with verified project information and set demo: false.
 */
export const projects: Project[] = [
  {
    slug: 'sample-ground-mounted-solar',
    demo: true,
    name: 'Sample entry: ground-mounted solar plant',
    category: 'Ground-mounted solar',
    location: 'Location to be added',
    capacity: 'Capacity to be added',
    status: 'Demonstration entry',
    art: 'field',
    summary: 'Layout showing how a utility-scale engineering assignment will be presented.',
    scope: ['Example: plant layout and DC/AC electrical design', 'Example: cable sizing and loss calculations', 'Example: energy yield assessment'],
    highlights: ['Add the technical highlights of the real project here', 'For example: configuration, constraints solved, standards applied'],
  },
  {
    slug: 'sample-rooftop-solar',
    demo: true,
    name: 'Sample entry: industrial rooftop solar',
    category: 'Rooftop solar',
    location: 'Location to be added',
    capacity: 'Capacity to be added',
    status: 'Demonstration entry',
    art: 'rooftop',
    summary: 'Layout showing how a rooftop PV engineering assignment will be presented.',
    scope: ['Example: roof layout and shading assessment', 'Example: LV integration and protection design'],
    highlights: ['Add the technical highlights of the real project here'],
  },
  {
    slug: 'sample-solar-carport',
    demo: true,
    name: 'Sample entry: solar carport',
    category: 'Solar carports',
    location: 'Location to be added',
    capacity: 'Capacity to be added',
    status: 'Demonstration entry',
    art: 'carport',
    summary: 'Layout showing how a carport PV engineering assignment will be presented.',
    scope: ['Example: carport array arrangement', 'Example: cable routing and earthing design'],
    highlights: ['Add the technical highlights of the real project here'],
  },
  {
    slug: 'sample-commercial-building',
    demo: true,
    name: 'Sample entry: commercial building services',
    category: 'Commercial buildings',
    location: 'Location to be added',
    status: 'Demonstration entry',
    art: 'mep',
    summary: 'Layout showing how a commercial MEP design assignment will be presented.',
    scope: ['Example: HVAC, electrical and plumbing design', 'Example: services coordination'],
    highlights: ['Add the technical highlights of the real project here'],
  },
  {
    slug: 'sample-industrial-facility',
    demo: true,
    name: 'Sample entry: industrial facility power distribution',
    category: 'Industrial facilities',
    location: 'Location to be added',
    status: 'Demonstration entry',
    art: 'sld',
    summary: 'Layout showing how an industrial electrical engineering assignment will be presented.',
    scope: ['Example: load assessment and distribution design', 'Example: cable sizing and earthing'],
    highlights: ['Add the technical highlights of the real project here'],
  },
  {
    slug: 'sample-mep-engineering',
    demo: true,
    name: 'Sample entry: MEP design package',
    category: 'MEP engineering',
    location: 'Location to be added',
    status: 'Demonstration entry',
    art: 'hvac',
    summary: 'Layout showing how an MEP engineering assignment will be presented.',
    scope: ['Example: heat load calculations and equipment selection', 'Example: coordinated services drawings'],
    highlights: ['Add the technical highlights of the real project here'],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
