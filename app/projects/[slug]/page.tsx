import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data/projects';
import { getProjectContent } from '@/lib/mdx';
import { buildCanonicalUrl } from '@/lib/utils';
import { projectJsonLd } from '@/lib/seo';

const blurSvg = Buffer.from(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'><rect width='32' height='20' rx='6' fill='%23c7d2fe' /><rect x='4' y='4' width='24' height='12' rx='3' fill='%2394a3b8' /></svg>`
).toString('base64');

const shimmer = `data:image/svg+xml;base64,${blurSvg}`;

type Params = { params: { slug: string } };

export const generateStaticParams = () => {
  return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const project = PROJECTS.find((item) => item.slug === params.slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: buildCanonicalUrl(`/projects/${project.slug}`),
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      url: buildCanonicalUrl(`/projects/${project.slug}`),
      images: project.cover
        ? [
            {
              url: buildCanonicalUrl(project.cover),
              width: 1200,
              height: 630,
              alt: `${project.title} cover art`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
    },
  };
};

const ProjectPage = async ({ params }: Params) => {
  const project = PROJECTS.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  const mdx = await getProjectContent(params.slug);

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          {project.timeline || 'Timeline TBA'}
        </p>
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {project.location ? <span>{project.location}</span> : null}
          {project.tech?.length ? <span aria-hidden>•</span> : null}
          {project.tech?.map((item) => (
            <span
              key={item}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          {project.links?.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline"
            >
              Live demo
            </a>
          ) : null}
          {project.links?.repo ? (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline"
            >
              Source code
            </a>
          ) : null}
        </div>
      </header>
      <div className="overflow-hidden rounded-3xl">
        <Image
          src={project.cover}
          alt={`${project.title} cover art`}
          width={1280}
          height={720}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
          placeholder="blur"
          blurDataURL={shimmer}
        />
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {mdx ? (
          mdx.content
        ) : (
          <p>Project deep-dive coming soon. Check back for case-study details.</p>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectJsonLd({
              title: project.title,
              summary: project.summary,
              slug: project.slug,
            })
          ),
        }}
      />
    </article>
  );
};

export default ProjectPage;
