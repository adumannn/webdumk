import type { Metadata } from 'next';
import SectionHeading from '@/components/section-heading';
import ProjectCard from '@/components/project-card';
import { PROJECTS } from '@/data/projects';
import { buildCanonicalUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A curated selection of original ideas I have crafted',
  alternates: {
    canonical: buildCanonicalUrl('/projects'),
  },
};

const ProjectsPage = () => {
  return (
    <div className="space-y-12">
      <SectionHeading
        eyebrow="Work"
        title="Project archive"
        description="A mix of production launches and explorations that demonstrate how I approach product engineering."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
