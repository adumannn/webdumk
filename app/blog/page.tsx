import type { Metadata } from 'next';
import Link from 'next/link';
import PostListItem from '@/components/post-list-item';
import SectionHeading from '@/components/section-heading';
import { getBlogPosts } from '@/lib/mdx';
import { buildCanonicalUrl } from '@/lib/utils';

const PAGE_SIZE = 5;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Writing on engineering craft, accessibility, and product strategy.',
  alternates: {
    canonical: buildCanonicalUrl('/blog'),
  },
};

type BlogPageProps = {
  searchParams: {
    page?: string;
  };
};

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const page = Number(searchParams.page || '1');
  const posts = await getBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-10">
      <SectionHeading eyebrow="Writing" title="Blog" description="Thoughts/Ойлар" />
      <div className="space-y-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <PostListItem
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
            />
          ))
        ) : (
          <p className="rounded-3xl border border-muted/30 bg-background/80 p-6 text-sm text-muted">
            No posts yet. Subscribe to the{' '}
            <Link href="/rss.xml" className="text-accent underline-offset-4">
              RSS feed
            </Link>{' '}
            for updates.
          </p>
        )}
      </div>
      {totalPages > 1 ? (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between text-sm text-muted"
        >
          <Link
            href={`/blog?page=${Math.max(1, currentPage - 1)}`}
            className={`rounded-full px-4 py-2 transition ${
              currentPage === 1
                ? 'pointer-events-none opacity-40'
                : 'bg-accent/10 text-accent hover:bg-accent/20'
            }`}
            aria-disabled={currentPage === 1}
          >
            ← Newer
          </Link>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
            className={`rounded-full px-4 py-2 transition ${
              currentPage === totalPages
                ? 'pointer-events-none opacity-40'
                : 'bg-accent/10 text-accent hover:bg-accent/20'
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Older →
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default BlogPage;
