import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/EnquiryForm';
import { PageHero } from '@/components/ui';
import { site, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact and Project Enquiry',
  description: 'Discuss your solar PV or MEP engineering project with NOORLUME. Send a project enquiry and our engineers will respond with a scope and approach.',
  alternates: { canonical: '/contact' },
};

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="border border-dashed border-navy/30 px-2 py-0.5 text-sm text-charcoal/60">{children}</span>;
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service = '' } = await searchParams;
  const wa = whatsappLink();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss your project with our engineers."
        lead="Tell us what you are planning. The more detail you share, the more precise our first response will be."
        crumbs={[{ href: '/contact', label: 'Contact' }]}
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="h-section">Project enquiry</h2>
            <p className="mt-4 text-charcoal/75">Fields marked * are required.</p>
            <div className="mt-8">
              <EnquiryForm initialService={service.slice(0, 120)} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-7">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-forest">Contact details</h2>
              <dl className="mt-6 space-y-5 text-[0.95rem]">
                <div>
                  <dt className="text-sm text-charcoal/60">Email</dt>
                  <dd className="mt-1 font-medium text-navy">
                    {site.email ? <a className="hover:text-forest" href={`mailto:${site.email}`}>{site.email}</a> : <Placeholder>Business email to be added</Placeholder>}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-charcoal/60">WhatsApp</dt>
                  <dd className="mt-1">
                    {wa ? (
                      <a href={wa} target="_blank" rel="noopener noreferrer" className="btn inline-flex bg-[#128C7E] !px-4 !py-2.5 text-white hover:bg-forest">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
                        </svg>
                        Chat on WhatsApp
                      </a>
                    ) : (
                      <Placeholder>WhatsApp number to be added</Placeholder>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-charcoal/60">Office</dt>
                  <dd className="mt-1 whitespace-pre-line font-medium text-navy">
                    {site.address || <Placeholder>Office address to be added</Placeholder>}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-charcoal/60">Follow</dt>
                  <dd className="mt-1 flex gap-5 font-medium text-navy">
                    {site.instagram ? <a className="hover:text-forest" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> : <Placeholder>Instagram link to be added</Placeholder>}
                    {site.linkedin ? <a className="hover:text-forest" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> : <Placeholder>LinkedIn link to be added</Placeholder>}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card overflow-hidden">
              {site.mapsEmbedUrl ? (
                <iframe
                  src={site.mapsEmbedUrl}
                  title="NOORLUME office location on Google Maps"
                  className="block aspect-[4/3] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="blueprint-light flex aspect-[4/3] items-center justify-center bg-mist p-6 text-center">
                  <Placeholder>Google Maps location to be added</Placeholder>
                </div>
              )}
            </div>

            <p className="text-sm leading-relaxed text-charcoal/65">
              Serving clients in {site.regions.slice(0, 3).join(', ')} and international markets.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
