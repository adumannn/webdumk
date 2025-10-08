import fs from 'node:fs/promises';
import path from 'node:path';
import type { HTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export type TocEntry = {
  id: string;
  title: string;
  depth: number;
};

export type MdxFrontmatter = {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
};

type CompileResult = {
  content: ReactNode;
  frontmatter: MdxFrontmatter;
  toc: TocEntry[];
};

const root = process.cwd();

const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 scroll-mt-24 text-3xl font-semibold" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-10 scroll-mt-24 text-2xl font-semibold" {...props} />
  ),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-accent underline-offset-4" {...props} />
  ),
};

const rehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const extractToc = (source: string): TocEntry[] => {
  const lines = source.split('\n');
  const toc: TocEntry[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.*)/.exec(line.trim());
    if (match) {
      const depth = match[1].length;
      const title = match[2].replace(/[#`*]/g, '').trim();
      toc.push({ id: slugify(title), title, depth });
    }
  }
  return toc;
};

export const compileMdx = async (filePath: string): Promise<CompileResult> => {
  const source = await fs.readFile(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    content,
    frontmatter,
    toc: extractToc(source),
  };
};

export const getBlogDir = () => path.join(root, 'content', 'blog');
export const getProjectDir = () => path.join(root, 'content', 'projects');

export const getMdxSlugs = async (directory: string) => {
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => entry.name.replace(/\.mdx$/, ''));
};

export const getBlogPosts = async () => {
  const slugs = await getMdxSlugs(getBlogDir());
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(getBlogDir(), `${slug}.mdx`);
      const { frontmatter } = await compileMdx(filePath);
      return {
        slug,
        frontmatter,
      };
    })
  );

  return posts
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
};

export const getBlogPostBySlug = async (slug: string) => {
  const filePath = path.join(getBlogDir(), `${slug}.mdx`);
  return compileMdx(filePath);
};

export const getProjectContent = async (slug: string) => {
  const filePath = path.join(getProjectDir(), `${slug}.mdx`);
  try {
    await fs.access(filePath);
  } catch (error) {
    return null;
  }
  return compileMdx(filePath);
};
