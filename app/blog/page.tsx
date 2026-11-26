import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/blog";
import { guidePath, guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Blog — Harsh Shukla",
  description: "Notes on building and shipping React Native and web apps: architecture, performance, and lessons from production.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <>
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Notes on building and shipping apps: architecture, performance, and what I learn in production.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={guidePath(guide)} className="guide-link mt-0">
            <BookOpen className="size-5 shrink-0 text-accent" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm text-muted">Start here · Guide</span>
              <span className="block font-medium text-foreground">{guide.title}</span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted" aria-hidden="true" />
          </Link>
        ))}
      </div>

      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} headingLevel={2} preloadCover={index === 0} />
          ))}
        </div>
      ) : (
        <div className="tile text-muted">No posts yet. The first one is on its way.</div>
      )}
    </>
  );
}
