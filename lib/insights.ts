import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Knowledge Centre articles are Markdown files in content/insights.
 * To publish a new article, add a .md file with the front matter shown in
 * any existing article and redeploy. The file name becomes the URL.
 */
const DIR = path.join(process.cwd(), 'content', 'insights');

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  content: string;
};

export function getInsights(): Insight[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
      const words = content.split(/\s+/).length;
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title ?? file),
        description: String(data.description ?? ''),
        category: String(data.category ?? 'Engineering'),
        date: String(data.date ?? ''),
        readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsight(slug: string) {
  return getInsights().find((i) => i.slug === slug);
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
