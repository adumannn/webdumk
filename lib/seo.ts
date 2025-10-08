import type { Metadata } from 'next';
import { SITE } from '@/data/site';
import { buildCanonicalUrl, getSiteUrl } from '@/lib/utils';

type OgImageProps = {
  title: string;
  description?: string;
  pathname?: string;
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'Personal portfolio showcasing projects, writing, and experience in modern web engineering.',
  keywords: ['portfolio', 'Next.js', 'TypeScript', SITE.name],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
  },
  alternates: {
    canonical: buildCanonicalUrl('/'),
  },
};

export const buildOgImage = ({ title, description, pathname }: OgImageProps) => {
  const params = new URLSearchParams({
    title,
    description: description || '',
    path: pathname || '',
  });
  return `${getSiteUrl()}/api/og?${params.toString()}`;
};

export const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  address: SITE.location,
  email: `mailto:${SITE.email}`,
  url: getSiteUrl(),
  sameAs: Object.values(SITE.socials).filter(Boolean),
});

export const blogPostJsonLd = ({
  title,
  summary,
  date,
  slug,
}: {
  title: string;
  summary: string;
  date: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description: summary,
  datePublished: date,
  dateModified: date,
  url: buildCanonicalUrl(`/blog/${slug}`),
  author: {
    '@type': 'Person',
    name: SITE.name,
  },
});

export const projectJsonLd = ({
  title,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: title,
  description: summary,
  url: buildCanonicalUrl(`/projects/${slug}`),
  creator: {
    '@type': 'Person',
    name: SITE.name,
  },
});
