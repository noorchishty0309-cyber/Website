import Link from 'next/link';
import { nav, site, whatsappLink } from '@/lib/site';
import { Logo } from './ui';

export function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="on-dark bg-navy-deep text-white/75">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo className="h-11 w-auto" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">{site.description}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-lime">{site.regions.join(' · ')}</p>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white">Services</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li><Link className="hover:text-lime" href="/renewable-energy">Renewable energy engineering</Link></li>
            <li><Link className="hover:text-lime" href="/renewable-energy/utility-scale-solar-pv-engineering">Utility-scale solar PV</Link></li>
            <li><Link className="hover:text-lime" href="/renewable-energy/rooftop-solar-pv-engineering">Rooftop solar PV</Link></li>
            <li><Link className="hover:text-lime" href="/renewable-energy/owners-engineering-and-design-reviews">Owner’s engineering</Link></li>
            <li><Link className="hover:text-lime" href="/mep">MEP engineering design</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white">Company</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {nav
              .filter((n) => !['/renewable-energy', '/mep'].includes(n.href))
              .map((n) => (
                <li key={n.href}>
                  <Link className="hover:text-lime" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
            <li><Link className="hover:text-lime" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white">Get in touch</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            <li>
              {site.email ? (
                <a className="hover:text-lime" href={`mailto:${site.email}`}>{site.email}</a>
              ) : (
                <Link className="hover:text-lime" href="/contact">Send an enquiry</Link>
              )}
            </li>
            {wa ? (
              <li><a className="hover:text-lime" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            ) : null}
            {site.address ? <li className="whitespace-pre-line">{site.address}</li> : null}
            {site.instagram ? (
              <li><a className="hover:text-lime" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            ) : null}
            {site.linkedin ? (
              <li><a className="hover:text-lime" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NOORLUME Energy &amp; Engineering. All rights reserved.</p>
          <p className="flex gap-6">
            <Link className="hover:text-lime" href="/privacy">Privacy policy</Link>
            <Link className="hover:text-lime" href="/terms">Terms and conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
