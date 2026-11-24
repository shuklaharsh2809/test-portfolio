import "server-only";
import { createReader } from "@keystatic/core/reader";
import type { Node } from "@markdoc/markdoc";
import { slugify } from "./slugify";
import keystaticConfig from "../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

/** Drafts are visible while running `next dev` (marked as drafts) so you can preview them, never in production. */
const showDrafts = process.env.NODE_ENV !== "production";

export type PostSummary = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  draft: boolean;
  tags: readonly string[];
  cover: string | null;
  readingMinutes: number;
};

/** Reading time from the post's text and code (~220 words per minute). */
async function readingMinutes(content: () => Promise<{ node: Node }>) {
  const { node } = await content();
  let words = 0;
  for (const child of node.walk()) {
    const text = child.attributes.content;
    if ((child.type === "text" || child.type === "fence") && typeof text === "string") {
      words += text.split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.round(words / 220));
}

export async function getPosts(): Promise<PostSummary[]> {
  const entries = await reader.collections.posts.all();
  const posts = await Promise.all(
    entries
      .filter(({ entry }) => showDrafts || !entry.draft)
      .map(async ({ slug, entry }) => ({
        slug,
        title: entry.title,
        summary: entry.summary,
        publishedAt: entry.publishedAt ?? "",
        draft: entry.draft,
        tags: entry.tags,
        cover: entry.cover,
        readingMinutes: await readingMinutes(entry.content),
      })),
  );
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || (entry.draft && !showDrafts)) return null;
  const { node } = await entry.content();
  return {
    slug,
    title: entry.title,
    summary: entry.summary,
    publishedAt: entry.publishedAt ?? "",
    draft: entry.draft,
    tags: entry.tags,
    cover: entry.cover,
    node,
    readingMinutes: await readingMinutes(entry.content),
  };
}

export function formatPostDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export type PostHeading = { id: string; text: string };

/**
 * The post's h2 headings, with the same ids the renderer gives them (see PostBody),
 * for the table of contents.
 */
export function getHeadings(node: Node): PostHeading[] {
  const headings: PostHeading[] = [];
  for (const child of node.walk()) {
    if (child.type !== "heading" || child.attributes.level !== 2) continue;
    let text = "";
    for (const part of child.walk()) {
      if ((part.type === "text" || part.type === "code") && typeof part.attributes.content === "string") {
        text += part.attributes.content;
      }
    }
    headings.push({ id: slugify(text), text });
  }
  return headings;
}

/**
 * Up to `limit` other published posts, ranked by how many tags they share with this one,
 * newest first on ties, so there are always suggestions even with no tag overlap.
 */
export async function getRelatedPosts(slug: string, tags: readonly string[], limit = 2): Promise<PostSummary[]> {
  const wanted = new Set(tags.map((tag) => tag.toLowerCase()));
  const candidates = (await getPosts()).filter((post) => post.slug !== slug && !post.draft);
  return candidates
    .map((post) => ({ post, shared: post.tags.filter((tag) => wanted.has(tag.toLowerCase())).length }))
    .sort((a, b) => b.shared - a.shared || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map(({ post }) => post);
}
