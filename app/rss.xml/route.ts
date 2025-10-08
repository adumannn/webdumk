import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import { SITE } from '@/data/site';
import { getBlogPosts } from '@/lib/mdx';
import { buildCanonicalUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export async function GET() {
  const feed = new Feed({
    id: buildCanonicalUrl('/'),
    title: `${SITE.name}`,
    description:
      'Latest articles on product engineering, accessibility, and design systems.',
    link: buildCanonicalUrl('/'),
    language: 'en',
    copyright: `${new Date().getFullYear()} ${SITE.name}`,
    feedLinks: {
      rss: buildCanonicalUrl('/rss.xml'),
    },
    author: {
      name: SITE.name,
      email: SITE.email,
      link: buildCanonicalUrl('/'),
    },
  });

  const posts = await getBlogPosts();

  posts.forEach((post) => {
    feed.addItem({
      id: buildCanonicalUrl(`/blog/${post.slug}`),
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      link: buildCanonicalUrl(`/blog/${post.slug}`),
      date: new Date(post.frontmatter.date),
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
