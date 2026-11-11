import { ChatWidget } from '@/components/ChatWidget';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/ui';
import { site, whatsappLink } from '@/lib/site';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const sameAs = [site.instagram, site.linkedin].filter(Boolean);
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${site.url}/#organization`,
          name: 'NOORLUME Energy & Engineering',
          alternateName: 'NOORLUME',
          url: site.url,
          logo: `${site.url}/brand/png/noorlume-logo-horizontal.png`,
          image: `${site.url}/og-image.png`,
          slogan: site.tagline,
          description: site.description,
          areaServed: ['India', 'Middle East', 'Gulf Cooperation Council', 'International'],
          knowsAbout: ['Solar PV engineering', 'Renewable energy engineering', 'MEP design', 'Electrical engineering', 'HVAC design'],
          ...(site.email ? { email: site.email } : {}),
          ...(site.address ? { address: site.address } : {}),
          ...(sameAs.length ? { sameAs } : {}),
        }}
      />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ChatWidget whatsapp={whatsappLink()} />
    </>
  );
}
