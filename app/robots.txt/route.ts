import { NextResponse } from 'next/server';
import { buildCanonicalUrl } from '@/lib/utils';

export const dynamic = 'force-static';

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${buildCanonicalUrl('/sitemap.xml')}`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
