import type { ReactNode } from 'react';

/**
 * Shared layout for the privacy policy and terms pages.
 * IMPORTANT: the legal text supplied with this project is a starting
 * template. Have it reviewed by a qualified legal adviser for the
 * jurisdictions you operate in before launch.
 */
export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="on-dark blueprint bg-navy text-white">
        <div className="wrap max-w-4xl py-16 sm:py-20">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 text-sm text-white/65">Last updated: {updated}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap max-w-3xl">
          <div className="prose max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-forest">{children}</div>
        </div>
      </section>
    </>
  );
}
