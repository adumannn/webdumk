import { headers } from 'next/headers';

const FALLBACK_SITE_URL = 'https://your-domain.com';

export const getSiteUrl = () => {
  if (typeof process !== 'undefined') {
    return process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
  }
  return FALLBACK_SITE_URL;
};

export const buildCanonicalUrl = (path: string) => {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
};

export const getAbsoluteUrlFromHeaders = (path = '/') => {
  const host = headers().get('x-forwarded-host') || headers().get('host');
  const protocol = headers().get('x-forwarded-proto') || 'https';
  if (!host) {
    return buildCanonicalUrl(path);
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${protocol}://${host}${normalized}`;
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(date));
};

export const chunkArray = <T>(input: T[], size: number) => {
  const result: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    result.push(input.slice(i, i + size));
  }
  return result;
};
