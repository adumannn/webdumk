import dynamic from 'next/dynamic';
import Link from 'next/link';
import Avatar from '@/components/avatar';
import { ButtonLink } from '@/components/button';
import SectionHeading from '@/components/section-heading';
import { featuredProjects } from '@/components/project-card';
import Tag from '@/components/tag';
import { SITE } from '@/data/site';
import { getBlogPosts } from '@/lib/mdx';
import { buildCanonicalUrl } from '@/lib/utils';

const ProjectCard = dynamic(() => import('@/components/project-card'));
const PostListItem = dynamic(() => import('@/components/post-list-item'));

const experiences = [
  {
    role: 'ERROR 404',
    company: '',
    timeline: '',
    location: '',
    bullets: [''],
  },
];

const education = {
  degree: 'Computer Science B.S.',
  school: 'New York University Shanghai',
  timeline: 'expected 2029',
  coursework: ['Introduction to Computer Science'],
};

const HomePage = async () => {
  const posts = await getBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="grid gap-10 md:grid-cols-[auto,1fr] md:items-center">
        <Avatar />
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">{SITE.location}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {SITE.name}
          </h1>
          <p className="text-lg text-muted">Undergraduate student @ NYU Shanghai.</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">View Projects</ButtonLink>
            <ButtonLink href={SITE.resumeUrl} variant="ghost">
              Download Résumé
            </ButtonLink>
            <ButtonLink href={`mailto:${SITE.email}`} variant="link">
              Email
            </ButtonLink>
            <ButtonLink href={SITE.socials.github} variant="link">
              GitHub
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Core Skills"
          title="A snapshot of the tools and technologies"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-muted/30 bg-background/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Languages
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SITE.coreSkills.languages.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-muted/30 bg-background/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Frameworks
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SITE.coreSkills.frameworks.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-muted/30 bg-background/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Tools
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SITE.coreSkills.tools.map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow="Experience" title="Professional Experience" />
        <div className="space-y-6">
          {experiences.map((item) => (
            <article
              key={item.company}
              className="rounded-3xl border border-muted/30 bg-background/80 p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{item.role}</h3>
                  <p className="text-sm text-muted">{item.company}</p>
                </div>
                <div className="text-sm text-muted">
                  <p>{item.timeline}</p>
                  <p>{item.location}</p>
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow=" " title="Education" />
        <article className="rounded-3xl border border-muted/30 bg-background/80 p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {education.degree}
              </h3>
              <p className="text-sm text-muted">{education.school}</p>
            </div>
            <div className="text-sm text-muted">
              <p>{education.timeline}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <Tag key={course} label={course} />
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          description="Here's a collection of projects I've worked on"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="flex justify-end">
          <ButtonLink href="/projects" variant="ghost">
            Browse all projects →
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading eyebrow="Latest writing" title="Ideas, notes, and learnings" />
        <div className="space-y-6">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <PostListItem
                key={post.slug}
                slug={post.slug}
                frontmatter={post.frontmatter}
              />
            ))
          ) : (
            <p className="rounded-3xl border border-muted/30 bg-background/80 p-6 text-sm text-muted">
              New essays are coming soon. In the meantime, explore the{' '}
              <Link href="/projects" className="text-accent underline-offset-4">
                projects
              </Link>{' '}
              archive.
            </p>
          )}
        </div>
      </section>

      {/* <section className="rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center shadow-lg">
        <h2 className="text-2xl font-semibold text-foreground">
          Ready to collaborate on something meaningful?
        </h2>
        <p className="mt-3 text-sm text-muted">
          Let’s build products that respect users and deliver measurable value.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`mailto:${SITE.email}`}>Start a conversation</ButtonLink>
          <ButtonLink href={buildCanonicalUrl('/projects')} variant="ghost">
            See my process
          </ButtonLink>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
