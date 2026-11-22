import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/blog";

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

      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="tile text-muted">No posts yet. The first one is on its way.</div>
      )}
    </>
  );
}
