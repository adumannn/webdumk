import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import Tag from '@/components/tag';
import type { MdxFrontmatter } from '@/lib/mdx';

const PostListItem = ({
  slug,
  frontmatter,
}: {
  slug: string;
  frontmatter: MdxFrontmatter;
}) => {
  return (
    <article className="group relative rounded-3xl border border-transparent p-6 transition hover:border-accent/30 hover:bg-accent/5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
          <span>{formatDate(frontmatter.date)}</span>
          {frontmatter.tags?.[0] ? <span>{frontmatter.tags[0]}</span> : null}
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
            {frontmatter.title}
          </Link>
        </h3>
        <p className="text-sm text-muted">{frontmatter.summary}</p>
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags?.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <span className="text-sm font-semibold text-accent opacity-0 transition group-hover:opacity-100">
          Read post →
        </span>
      </div>
    </article>
  );
};

export default PostListItem;
