'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/lib/site';
import { Logo } from './ui';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-navy text-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]' : ''
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="NOORLUME home" className="shrink-0">
          <Logo className="h-9 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative py-2 text-[0.92rem] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-lime after:transition-all after:duration-300 hover:text-lime ${
                  active ? 'text-lime after:w-full' : 'text-white/85 after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn-lime hidden !px-5 !py-2.5 sm:inline-flex">
            Discuss Your Project
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-white/25 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-white transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-white transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="blueprint fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-navy lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap flex flex-col py-6">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="rise flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl text-white"
              style={{ ['--d' as string]: `${i * 40}ms` }}
            >
              {item.label}
              <span className="font-mono text-xs text-lime">0{i + 1}</span>
            </Link>
          ))}
          <Link href="/contact" className="btn-lime mt-8">
            Discuss Your Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
