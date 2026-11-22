import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type PostSummary } from "@/lib/blog";

/** One post in a list: date and reading time, title, summary, tags, optional cover thumbnail. */
export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card glow-card">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs text-muted">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingMinutes} min read
          {post.draft ? <span className="draft-badge">Draft</span> : null}
        </p>
        <h3 className="mt-2 flex items-start gap-2 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
          {post.title}
          <ArrowUpRight className="post-card-arrow mt-1 size-5 shrink-0" aria-hidden="true" />
        </h3>
        <p className="mt-2 leading-7 text-muted">{post.summary}</p>
        {post.tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {post.cover ? (
        <div className="post-card-cover">
          <Image src={post.cover} alt="" fill sizes="(max-width: 640px) 100vw, 240px" className="object-cover" />
        </div>
      ) : null}
    </Link>
  );
}
