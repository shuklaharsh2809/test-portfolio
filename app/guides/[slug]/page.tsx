import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import PostCta from "@/components/PostCta";
import { getPosts } from "@/lib/blog";
import { profile, SITE_URL } from "@/lib/data";
import { getGuide, guidePath, guides } from "@/lib/guides";

// Guides only change through a deploy, so every page is built ahead of time.
export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return {
    title: `${guide.title}: A Practical Guide — ${profile.name}`,
    description: guide.description,
    alternates: { canonical: guidePath(guide) },
    openGraph: { type: "website", title: `${guide.title}: A Practical Guide`, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const posts = await getPosts();
  const bySlug = new Map(posts.filter((post) => !post.draft).map((post) => [post.slug, post]));
  const sections = guide.sections
    .map((section) => ({ ...section, posts: section.slugs.flatMap((slug) => bySlug.get(slug) ?? []) }))
    .filter((section) => section.posts.length);
  const allPosts = sections.flatMap((section) => section.posts);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${guide.title}: A Practical Guide`,
    description: guide.description,
    url: `${SITE_URL}${guidePath(guide)}`,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/blog" className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All posts
      </Link>

      <header className="mt-8">
        <p className="eyebrow">Guide · {allPosts.length} articles</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
          {guide.title}: <span className="gradient-text">a practical guide</span>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{guide.intro}</p>
      </header>

      <nav aria-label="Guide sections" className="mt-8 tile">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">In this guide</p>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2">
          {sections.map((section, index) => (
            <li key={section.title}>
              <a href={`#section-${index + 1}`} className="text-foreground hover:text-accent">
                <span className="font-mono text-muted">{String(index + 1).padStart(2, "0")}</span> {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((section, index) => (
        <section key={section.title} id={`section-${index + 1}`} aria-labelledby={`section-${index + 1}-title`} className="mt-14 scroll-mt-28">
          <h2 id={`section-${index + 1}-title`} className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
            <span className="font-mono text-base text-muted">{String(index + 1).padStart(2, "0")}</span> {section.title}
          </h2>
          <p className="mt-3 leading-7 text-muted">{section.intro}</p>
          <div className="mt-6 grid gap-4">
            {section.posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}

      <PostCta topic="the ones in this guide" />
    </div>
  );
}
