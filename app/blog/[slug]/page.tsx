import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/mdx';
import { buildCanonicalUrl, formatDate } from '@/lib/utils';
import { blogPostJsonLd } from '@/lib/seo';

const blurSvg = Buffer.from(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'><rect width='32' height='20' rx='6' fill='%23c7d2fe' /><rect x='4' y='4' width='24' height='12' rx='3' fill='%2394a3b8' /></svg>`
).toString('base64');

const shimmer = `data:image/svg+xml;base64,${blurSvg}`;

type Params = { params: { slug: string } };

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const posts = await getBlogPosts();
  const match = posts.find((post) => post.slug === params.slug);
  if (!match) {
    return {};
  }

  return {
    title: match.frontmatter.title,
    description: match.frontmatter.summary,
    alternates: {
      canonical: buildCanonicalUrl(`/blog/${match.slug}`),
    },
    openGraph: {
      type: 'article',
      title: match.frontmatter.title,
      description: match.frontmatter.summary,
      publishedTime: match.frontmatter.date,
      url: buildCanonicalUrl(`/blog/${match.slug}`),
      images: match.frontmatter.cover
        ? [
            {
              url: buildCanonicalUrl(match.frontmatter.cover),
              width: 1200,
              height: 630,
              alt: match.frontmatter.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: match.frontmatter.title,
      description: match.frontmatter.summary,
    },
  };
};

const BlogPostPage = async ({ params }: Params) => {
  const result = await getBlogPostBySlug(params.slug).catch(() => null);

  if (!result) {
    notFound();
  }

  const { frontmatter, content, toc } = result;

  return (
    <article className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-8">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {formatDate(frontmatter.date)}
          </p>
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="text-lg text-muted">{frontmatter.summary}</p>
          {frontmatter.cover ? (
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={frontmatter.cover}
                alt={frontmatter.title}
                width={1280}
                height={720}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                placeholder="blur"
                blurDataURL={shimmer}
              />
            </div>
          ) : null}
        </header>
        <div className="prose prose-lg max-w-none dark:prose-invert">{content}</div>
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-4 rounded-3xl border border-muted/20 bg-background/80 p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            On this page
          </h2>
          <nav aria-label="Table of contents" className="space-y-2 text-sm">
            {toc.length ? (
              toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block rounded-lg px-3 py-2 text-muted transition hover:bg-accent/10 hover:text-accent ${
                    item.depth === 3 ? 'ml-4 text-xs' : ''
                  }`}
                >
                  {item.title}
                </a>
              ))
            ) : (
              <p className="text-xs text-muted">
                Sections will appear here once headings are added.
              </p>
            )}
          </nav>
        </div>
      </aside>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostJsonLd({
              title: frontmatter.title,
              summary: frontmatter.summary,
              date: frontmatter.date,
              slug: params.slug,
            })
          ),
        }}
      />
    </article>
  );
};

export default BlogPostPage;
