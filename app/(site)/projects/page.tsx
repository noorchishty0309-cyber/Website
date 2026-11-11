import type { Metadata } from 'next';
import { ProjectsGrid } from '@/components/Filters';
import { CtaBand, PageHero } from '@/components/ui';
import { projectCategories, projects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Project Portfolio',
  description: 'NOORLUME project portfolio: ground-mounted solar, rooftop solar, solar carports, commercial buildings, industrial facilities and MEP engineering.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  const allDemo = projects.every((p) => p.demo);
  return (
    <>
      <PageHero
        eyebrow="Project portfolio"
        title="Engineering assignments across energy and buildings."
        lead="Browse by category to see the scope and technical highlights of each assignment."
        art="carport"
        crumbs={[{ href: '/projects', label: 'Projects' }]}
      />
      <section className="section">
        <div className="wrap">
          {allDemo ? (
            <p role="note" className="mb-10 border-l-4 border-emerald bg-mist px-5 py-4 text-[0.95rem] text-charcoal/85">
              <strong className="text-navy">Demonstration content.</strong> The entries on this page are sample layouts, not
              completed projects. They will be replaced with verified project information.
            </p>
          ) : null}
          <ProjectsGrid projects={projects} categories={projectCategories} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
