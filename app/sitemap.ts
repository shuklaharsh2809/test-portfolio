import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/data";
import { caseStudies } from "@/lib/case-studies";
import { guidePath, guides } from "@/lib/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((post) => !post.draft);
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...guides.map((guide) => ({ url: `${SITE_URL}${guidePath(guide)}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...caseStudies.map((study) => ({ url: `${SITE_URL}/work/${study.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
