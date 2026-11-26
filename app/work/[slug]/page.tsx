import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCta from "@/components/PostCta";
import { getCaseStudy, caseStudies } from "@/lib/case-studies";
import { profile, projects, SITE_URL } from "@/lib/data";

// Case studies only change through a deploy, so every page is built ahead of time.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

function load(slug: string) {
  const study = getCaseStudy(slug);
  const project = projects.find((item) => item.slug === slug);
  return study && project ? { study, project } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = load((await params).slug);
  if (!found) return {};
  const { study, project } = found;
  return {
    title: `${project.name} case study — ${profile.name}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const found = load((await params).slug);
  if (!found) notFound();
  const { study, project } = found;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    url: `${SITE_URL}/work/${study.slug}`,
    about: { "@type": "MobileApplication", name: project.name, operatingSystem: "iOS, Android" },
  };

  return (
    <article
      className="mx-auto max-w-3xl"
      style={{ "--brand": project.brand, "--shot-bg": project.shotBg } as React.CSSProperties}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href="/#work" className="-ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All work
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-4">
          <Image src={project.icon} alt={`${project.name} app icon`} width={64} height={64} className="app-icon" />
          <div>
            <p className="eyebrow">Case study · {project.tagline}</p>
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted">{study.summary}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground/80">
          <Briefcase className="size-3.5 text-muted" aria-hidden="true" />
          {project.role}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} highlights`}>
          {project.facts.map((fact) => (
            <li key={fact} className="fact">
              {fact}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="btn btn-secondary">
              {link.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </header>

      <div className="cs-shots">
        {project.shots.map((shot, index) => (
          <div key={shot} className="cs-shot">
            <Image
              src={shot}
              alt={`${project.name} screen ${index + 1}`}
              fill
              sizes="(max-width: 640px) 45vw, 240px"
              preload={index === 0}
              className="object-cover object-top"
            />
          </div>
        ))}
      </div>

      <section aria-labelledby="context" className="mt-14">
        <h2 id="context" className="cs-h2">The product</h2>
        {study.context.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-[17px] leading-8 text-foreground/90">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="my-part" className="mt-14">
        <h2 id="my-part" className="cs-h2">What I worked on</h2>
        <ul className="mt-5 space-y-2.5">
          {study.myPart.map((item) => (
            <li key={item} className="check">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="challenges" className="mt-14">
        <h2 id="challenges" className="cs-h2">Challenges</h2>
        <div className="mt-6 grid gap-4">
          {study.challenges.map((challenge, index) => (
            <div key={challenge.title} className="tile">
              <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">{challenge.title}</h3>
              <p className="mt-3 leading-7 text-muted">{challenge.problem}</p>
              <p className="mt-3 leading-7 text-foreground/90">{challenge.approach}</p>
              {challenge.post ? (
                <Link href={`/blog/${challenge.post.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                  {challenge.post.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="results" className="mt-14">
        <h2 id="results" className="cs-h2">Results</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {study.results.map((result) => (
            <div key={result.label} className="tile">
              <p className="text-3xl font-semibold tracking-[-0.03em] text-foreground">{result.value}</p>
              <p className="mt-1 text-sm text-muted">{result.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="lessons" className="mt-14">
        <h2 id="lessons" className="cs-h2">What I learned</h2>
        <ul className="mt-5 space-y-2.5">
          {study.lessons.map((lesson) => (
            <li key={lesson} className="check">
              {lesson}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack" className="mt-14">
        <h2 id="stack" className="cs-h2">Stack</h2>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <PostCta topic="the ones in this case study" />
    </article>
  );
}
