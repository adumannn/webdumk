import Image from 'next/image';
import { PROJECTS, type Project } from '@/data/projects';
import Tag from '@/components/tag';
import Card from '@/components/card';
import { ButtonLink } from '@/components/button';

const shimmer =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMiAyMCc+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzIwJyByeD0nNicgZmlsbD0nI2M3ZDJmZScgLz48cmVjdCB4PSc0JyB5PSc0JyB3aWR0aD0nMjQnIGhlaWdodD0nMTInIHJ4PSczJyBmaWxsPScjOTRhM2I4JyAvPjwvc3ZnPg==';
const blurSvg = Buffer.from(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'><rect width='32' height='20' rx='6' fill='%23c7d2fe' /><rect x='4' y='4' width='24' height='12' rx='3' fill='%2394a3b8' /></svg>`
).toString('base64');

const shimmer = `data:image/svg+xml;base64,${blurSvg}`;

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <div className="relative mb-5 overflow-hidden rounded-2xl">
        <Image
          src={project.cover}
          alt={`${project.title} cover art`}
          width={640}
          height={400}
          className="h-48 w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={shimmer}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            <span>{project.timeline}</span>
            {project.location ? <span aria-hidden>•</span> : null}
            {project.location ? <span>{project.location}</span> : null}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 pt-2">
          <ButtonLink href={`/projects/${project.slug}`} variant="primary">
            View details
          </ButtonLink>
          {project.links?.demo ? (
            <ButtonLink
              href={project.links.demo}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export const featuredProjects = PROJECTS.filter((project) => project.featured);

export default ProjectCard;
