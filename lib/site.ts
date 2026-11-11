/**
 * Central site configuration. Edit company details here or through the
 * NEXT_PUBLIC_* environment variables. Anything left empty is rendered on the
 * site as a clearly labelled placeholder rather than an invented value.
 */
export const site = {
  name: 'NOORLUME',
  descriptor: 'Energy & Engineering',
  tagline: 'Illuminating Innovation. Engineering Tomorrow.',
  description:
    'NOORLUME is a renewable energy and MEP design consultancy providing engineering solutions for solar PV plants, electrical systems, mechanical systems and building services.',
  positioning:
    'NOORLUME delivers integrated renewable energy and MEP engineering solutions through technical excellence, intelligent design and sustainable innovation.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || '',
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
  regions: ['India', 'Middle East', 'GCC', 'International'],
};

export const nav = [
  { href: '/renewable-energy', label: 'Renewable Energy' },
  { href: '/mep', label: 'MEP Engineering' },
  { href: '/project-lifecycle', label: 'Project Lifecycle' },
  { href: '/projects', label: 'Projects' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
];

export function whatsappLink(message = 'Hello NOORLUME, I would like to discuss a project.') {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}` : '';
}

/**
 * Client testimonials. Leave this array empty until you have genuine,
 * approved testimonials: the home page section only renders when it has
 * at least one entry.
 */
export const testimonials: { quote: string; name: string; role: string; company: string }[] = [];

/**
 * Editable company facts for the About page. Leave a value empty to show a
 * labelled placeholder. Do not enter anything that cannot be evidenced.
 */
export const company = {
  history: '',
  team: [] as { name: string; role: string; bio: string }[],
  credentials: [] as string[],
};

export const serviceCategories = [
  'Utility-scale / ground-mounted solar PV',
  'Rooftop solar PV',
  'Carport solar PV',
  'Feasibility study / energy yield assessment',
  "Owner's engineering / design review",
  'Grid integration / SCADA',
  'MEP - Mechanical (HVAC)',
  'MEP - Electrical',
  'MEP - Plumbing',
  'MEP - Fire protection and ELV',
  'Other / not sure yet',
] as const;

export const timelines = [
  'Immediately',
  'Within 1 month',
  'Within 1 to 3 months',
  'Within 3 to 6 months',
  'More than 6 months',
  'Not decided',
] as const;

export const leadStatuses = [
  'New',
  'Contacted',
  'Discussion in Progress',
  'Proposal Submitted',
  'Won',
  'Lost',
] as const;
export type LeadStatus = (typeof leadStatuses)[number];
