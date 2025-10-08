export type Project = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  featured?: boolean;
  tags: string[];
  links?: { demo?: string; repo?: string };
  tech?: string[];
  timeline?: string;
  location?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: '1–2 sentence elevator pitch.',
    cover: '/images/project-one.svg',
    featured: true,
    tags: ['Next.js', 'TypeScript', 'Design'],
    links: { demo: 'https://example.com', repo: 'https://github.com/example' },
    tech: ['Next.js', 'Tailwind', 'Vercel'],
    timeline: '2024',
    location: '[City, Country]',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    summary: 'Another project summary that highlights measurable impact.',
    cover: '/images/project-two.svg',
    tags: ['Automation', 'APIs'],
    links: { repo: 'https://github.com/example/project-two' },
    tech: ['Node.js', 'PostgreSQL'],
    timeline: '2023',
    location: '[City, Country]',
  },
];
