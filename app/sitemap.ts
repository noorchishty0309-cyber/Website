import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';
import { getInsights } from '@/lib/insights';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  });
  return [
    page('/', 1),
    page('/renewable-energy', 0.9),
    page('/mep', 0.9),
    page('/project-lifecycle', 0.8),
    page('/about', 0.7),
    page('/industries', 0.7),
    page('/projects', 0.6),
    page('/insights', 0.7),
    page('/contact', 0.8),
    page('/privacy', 0.2),
    page('/terms', 0.2),
    ...services.map((s) => page(`/renewable-energy/${s.slug}`, 0.8)),
    // Demonstration projects are excluded until replaced with real ones.
    ...projects.filter((p) => !p.demo).map((p) => page(`/projects/${p.slug}`, 0.5)),
    ...getInsights().map((a) => page(`/insights/${a.slug}`, 0.6, new Date(a.date))),
  ];
}
