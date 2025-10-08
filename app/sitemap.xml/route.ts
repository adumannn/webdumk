import { NextResponse } from 'next/server';
import { PROJECTS } from '@/data/projects';
import { getBlogPosts } from '@/lib/mdx';
import { buildCanonicalUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export async function GET() {
  const urls = ['/', '/projects', '/blog'];

  const posts = await getBlogPosts();
  const postUrls = posts.map((post) => `/blog/${post.slug}`);
  const projectUrls = PROJECTS.map((project) => `/projects/${project.slug}`);

  const sitemapEntries = [...urls, ...postUrls, ...projectUrls]
    .map((path) => `<url><loc>${buildCanonicalUrl(path)}</loc></url>`)
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
