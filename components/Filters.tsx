'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Project } from '@/lib/content';
import { Art, Arrow, DemoBadge } from './ui';

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2 text-sm font-medium transition ${
        active ? 'border-navy bg-navy text-white' : 'border-navy/20 bg-white text-navy hover:border-navy'
      }`}
      style={{ borderRadius: 2 }}
    >
      {children}
    </button>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="card-link group flex flex-col overflow-hidden">
      <div className="relative aspect-[800/520] overflow-hidden bg-navy">
        <Art name={p.art} className="transition duration-500 group-hover:scale-[1.04]" />
        {p.demo ? (
          <span className="absolute left-3 top-3">
            <DemoBadge />
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-forest">{p.category}</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug">{p.name}</h3>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-charcoal/75">
          <div>
            <dt className="text-xs uppercase tracking-wide text-charcoal/50">Location</dt>
            <dd>{p.location}</dd>
          </div>
          {p.capacity ? (
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal/50">Capacity</dt>
              <dd>{p.capacity}</dd>
            </div>
          ) : null}
        </dl>
        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-navy">
          View project <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function ProjectsGrid({ projects, categories }: { projects: Project[]; categories: readonly string[] }) {
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {['All', ...categories].map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm text-charcoal/60" aria-live="polite">
        Showing {shown.length} of {projects.length}
      </p>
      {shown.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      ) : (
        <p className="card mt-6 p-8 text-charcoal/70">No projects in this category yet.</p>
      )}
    </div>
  );
}

type InsightLite = { slug: string; title: string; description: string; category: string; date: string; readingTime: string };

export function InsightCard({ a }: { a: InsightLite }) {
  return (
    <Link href={`/insights/${a.slug}`} className="card-link group flex flex-col p-7">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-forest">{a.category}</p>
      <h3 className="mt-4 text-xl font-semibold leading-snug">{a.title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{a.description}</p>
      <p className="mt-auto flex items-center justify-between pt-6 text-sm text-charcoal/60">
        <span>
          {a.date} · {a.readingTime}
        </span>
        <span className="text-navy">
          <Arrow />
        </span>
      </p>
    </Link>
  );
}

export function InsightsList({ articles }: { articles: InsightLite[] }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const shown = articles.filter((a) => {
    const text = `${a.title} ${a.description} ${a.category}`.toLowerCase();
    return (cat === 'All' || a.category === cat) && text.includes(q.trim().toLowerCase());
  });
  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
          {categories.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="w-full lg:w-80">
          <label htmlFor="insight-search" className="sr-only">Search articles</label>
          <input id="insight-search" type="search" className="field" placeholder="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <p className="mt-5 text-sm text-charcoal/60" aria-live="polite">
        {shown.length} article{shown.length === 1 ? '' : 's'}
      </p>
      {shown.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <InsightCard key={a.slug} a={a} />
          ))}
        </div>
      ) : (
        <p className="card mt-6 p-8 text-charcoal/70">No articles match your search.</p>
      )}
    </div>
  );
}
