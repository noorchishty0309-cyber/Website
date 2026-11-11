import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/sora';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'NOORLUME | Renewable Energy and MEP Engineering Consultancy',
    template: '%s | NOORLUME Energy & Engineering',
  },
  description:
    'NOORLUME is a renewable energy engineering and MEP design consultancy: solar PV design, utility-scale and rooftop solar engineering, electrical and mechanical engineering for clients in India, the GCC and international markets.',
  keywords: [
    'Renewable Energy Engineering Consultancy',
    'Solar PV Design Consultancy',
    'Solar Engineering Consultant India',
    'Utility Scale Solar Engineering',
    'Rooftop Solar Engineering',
    'MEP Design Consultancy',
    'Electrical Engineering Consultancy',
    'Mechanical Engineering Design',
    'Renewable Energy Consultants',
    'Solar Engineering GCC',
  ],
  applicationName: 'NOORLUME',
  openGraph: {
    type: 'website',
    siteName: 'NOORLUME Energy & Engineering',
    locale: 'en_GB',
    url: site.url,
    title: 'NOORLUME | Renewable Energy and MEP Engineering Consultancy',
    description: site.positioning,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NOORLUME Energy & Engineering' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#102A43',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
