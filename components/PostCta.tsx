import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { LinkedinIcon } from "@/components/BrandIcons";
import { links, profile } from "@/lib/data";

/** "Work with me" box at the end of every post: turns readers who arrive from search into conversations. */
export default function PostCta({ topic = "the one in this post" }: { topic?: string }) {
  return (
    <aside aria-labelledby="post-cta-title" className="post-cta gradient-border">
      <div className="contact-glow" aria-hidden="true" />
      <p className="eyebrow">Work with me</p>
      <h2 id="post-cta-title" className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
        Building a React Native or AI-powered app?
      </h2>
      <p className="mt-3 max-w-xl leading-7 text-muted">
        I&apos;m {profile.name}, a software engineer shipping production mobile and web apps with teams in Australia and
        the US. I&apos;m open to new roles, and happy to talk through a problem like {topic}.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={links.email} className="btn btn-primary">
          <Mail className="size-4" aria-hidden="true" />
          Email me
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
          <LinkedinIcon className="size-4" />
          LinkedIn
        </a>
        <Link href="/#work" className="btn btn-secondary">
          See my work
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
