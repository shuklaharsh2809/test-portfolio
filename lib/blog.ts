import "server-only";
import { createReader } from "@keystatic/core/reader";
import type { Node } from "@markdoc/markdoc";
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
