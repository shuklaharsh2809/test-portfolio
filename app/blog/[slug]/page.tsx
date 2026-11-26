import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostBody from "@/components/PostBody";
import PostCard from "@/components/PostCard";
import PostCta from "@/components/PostCta";
import TableOfContents from "@/components/TableOfContents";
import { formatPostDate, getHeadings, getPost, getPosts, getRelatedPosts } from "@/lib/blog";
import { profile, SITE_URL } from "@/lib/data";
import { guidePath, guidesForPost } from "@/lib/guides";

// Posts only change through a deploy (a commit from the editor), so every page is built ahead of time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${profile.name}`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.publishedAt,
      authors: [profile.name],
      ...(post.cover ? { images: [post.cover] } : {}),
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const headings = getHeadings(post.node);
  const showToc = headings.length >= 4;
  const related = await getRelatedPosts(post.slug, post.tags);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <div className="post-layout" data-toc={showToc}>
    <article className="post-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/blog" className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All posts
      </Link>

      <header className="mt-8">
        {post.tags.length ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{post.summary}</p>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted">
          <span className="relative size-8 overflow-hidden rounded-full ring-1 ring-border">
            <Image src="/profile-photo.png" alt="" fill sizes="32px" className="object-cover" />
          </span>
          <span>
            <span className="font-medium text-foreground">{profile.name}</span> ·{" "}
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time> · {post.readingMinutes} min read
            {post.draft ? <span className="draft-badge">Draft</span> : null}
          </span>
        </div>
      </header>

      {post.cover ? (
        <div className="post-cover">
          <Image src={post.cover} alt="" fill preload sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>
      ) : null}

      {showToc ? (
        <div className="mt-8 xl:hidden">
          <TableOfContents headings={headings} variant="inline" />
        </div>
      ) : null}

      <div className="mt-10">
        <PostBody node={post.node} />
      </div>

      {guidesForPost(post.slug).map((guide, index) => (
        <Link key={guide.slug} href={guidePath(guide)} className={index ? "guide-link mt-3" : "guide-link"}>
          <BookOpen className="size-5 shrink-0 text-accent" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm text-muted">Part of the guide</span>
            <span className="block font-medium text-foreground">{guide.title}: a practical guide</span>
          </span>
          <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
        </Link>
      ))}

      <PostCta />

      {related.length ? (
        <section aria-labelledby="keep-reading" className="mt-16 border-t border-border pt-10">
          <h2 id="keep-reading" className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-4">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>

    {showToc ? (
      <aside className="hidden xl:block">
        <div className="sticky top-28">
          <TableOfContents headings={headings} variant="sidebar" />
        </div>
      </aside>
    ) : null}
    </div>
  );
}
