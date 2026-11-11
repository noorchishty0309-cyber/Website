import Link from 'next/link';
import { Arrow } from '@/components/ui';

export default function NotFound() {
  return (
    <section className="on-dark blueprint bg-navy text-white">
      <div className="wrap py-28 sm:py-36">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-5 text-4xl font-semibold text-white sm:text-6xl">This page is off the drawing.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/75">The page you are looking for does not exist or has been moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-lime">Back to home <Arrow /></Link>
          <Link href="/contact" className="btn-ghost-dark">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
