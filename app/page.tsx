import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";

const introLinks = [
  {
    label: "Email",
    href: "mailto:shuklaharsh42809@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harsh-shukla-52495b219/",
  },
  {
    label: "GitHub",
    href: "https://github.com/shuklaharsh2809",
  },
  {
    label: "Resume",
    href: "/resume.pdf",
  },
] as const;

const experience = [
  {
    role: "React Native Developer",
    company: "Appeneure Technologies Pvt. Ltd.",
    location: "Noida, India",
    period: "June 2024 - Present",
    highlights: [
      "Delivered 5+ production applications across iOS and Android, reaching 10K+ active users and maintaining 4+ star ratings with React Native.",
      "Reduced API latency by 25% and supported 10,000+ concurrent users by building Firebase-backed realtime data, authentication, and push notification systems.",
      "Supported $50K+ in monthly revenue with a 99.9% transaction success rate by implementing in-app purchases and Razorpay payment flows.",
      "Expanded product capability across startup and client-facing work by integrating OpenAI, Grok, Google Places, Maps, and geolocation services.",
    ],
  },
  {
    role: "Android Developer Intern",
    company: "Sypsys Technologies Pvt. Ltd.",
    location: "Hybrid",
    period: "July 2023 - August 2023",
    highlights: [
      "Standardized the React Native development environment across Android Studio, Xcode, and the Node.js toolchain to improve delivery readiness.",
      "Improved UI consistency across 50+ device configurations by implementing responsive patterns and reusable styling.",
      "Reduced app crashes by 40% and improved navigation reliability through debugging, real-device validation, and multi-level navigation flows.",
    ],
  },
] as const;

const projects = [
  {
    name: "Tripper",
    context: "AI-powered trip planner",
    stack: "React Native, Firebase, Google Places, Maps, Geolocation",
    links: [
      {
        label: "iOS App Store",
        href: "https://apps.apple.com/in/app/trippr-travel-assistant/id6504839672",
      },
      {
        label: "Android Play Store",
        href: "https://play.google.com/store/apps/details?id=ai.mayalabs.trippr",
      },
    ],
    highlights: [
      "Helped ship a React Native travel product to 50K+ downloads, 10K+ monthly active users, and 4+ star ratings across both stores.",
      "Increased engagement by 45% by implementing location-aware recommendations powered by Google Places, Maps, and geolocation services.",
      "Strengthened monetization and discovery flows through subscription journeys and real-time location-based experiences.",
    ],
  },
  {
    name: "OneKey Notes",
    context: "Voice-to-text transcription and AI workflow application",
    stack: "React Native, OpenAI, Grok, RAG Chat, Workflow Automation",
    links: [
      {
        label: "iOS App Store",
        href: "https://apps.apple.com/in/app/onekey-notes/id6752220994",
      },
      {
        label: "Android Play Store",
        href: "https://play.google.com/store/apps/details?id=com.appeneure.onekeynotes",
      },
    ],
    highlights: [
      "Turned raw voice transcripts into actionable outputs by building enhancement, editing, task creation, and task update workflows.",
      "Improved note reuse by generating LinkedIn-ready content, summaries, and custom templates directly from transcription content.",
      "Made transcription content easier to query and refine by implementing a RAG-based chat system around user notes.",
      "Shipped these AI-assisted productivity workflows to both the App Store and Google Play as part of the core product experience.",
    ],
  },
  {
    name: "Soljoy",
    context: "AI tarot reading platform",
    stack: "Next.js, AI Models, Web Application",
    links: [
      {
        label: "Visit Live Application",
        href: "https://app.soljoyco.com/",
      },
    ],
    highlights: [
      "Helped grow the platform to 5K+ monthly active users by contributing to a Next.js AI tarot reading experience.",
      "Improved personalization quality, contributing to a 92% user satisfaction rating through contextual AI interpretation flows.",
      "Built web product experiences that turned AI-generated readings into a usable consumer-facing application.",
    ],
  },
] as const;

const skillGroups = [
  {
    label: "Mobile",
    value: "React Native, iOS & Android, Xcode, Android Studio, in-app purchases",
  },
  {
    label: "Languages & Frameworks",
    value: "TypeScript, JavaScript, React, Next.js, Remix, Java",
  },
  {
    label: "Backend & APIs",
    value: "Firebase (Realtime DB, Auth, Cloud Messaging), REST APIs",
  },
  {
    label: "AI & Integrations",
    value: "OpenAI, Grok, Google Places & Maps, geolocation, Slack, WhatsApp, Jira, Notion",
  },
  {
    label: "Productivity",
    value: "AI workflow automation, PR-review automation, Git, performance & SEO",
  },
] as const;

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Shukla",
  jobTitle: "Software Developer",
  email: "mailto:shuklaharsh42809@gmail.com",
  telephone: "+91-7234-885-924",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India",
  },
  url: "https://www.linkedin.com/in/harsh-shukla-52495b219/",
  sameAs: [
    "https://www.linkedin.com/in/harsh-shukla-52495b219/",
    "https://github.com/shuklaharsh2809",
  ],
  knowsAbout: [
    "React Native",
    "Next.js",
    "React",
    "TypeScript",
    "Firebase",
    "AI integrations",
    "Workflow automation",
    "Web application development",
    "Mobile application development",
  ],
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
      {children}
    </h2>
  );
}

function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const opensNewTab = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      {...(opensNewTab ? { target: "_blank", rel: "noreferrer" } : {})}
      className="underline decoration-border underline-offset-4 hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

function ProjectLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm text-muted underline decoration-border underline-offset-4 hover:decoration-foreground"
    >
      <span>{children}</span>
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Script
        id="person-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <div className="mx-auto max-w-5xl px-6 py-8 sm:px-8 md:py-12">
        <header className="border-b border-border pb-14">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          <div className="mt-8 flex flex-col items-center text-center">
            <div className="relative size-28 overflow-hidden rounded-full border border-border bg-surface p-2 sm:size-32">
              <Image
                src="/profile-photo.png"
                alt="Portrait of Harsh Shukla"
                fill
                priority
                sizes="128px"
                className="object-contain"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted">
              <span
                className="size-2.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span>Available for work</span>
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-muted">
              Software Developer
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-foreground [font-family:var(--font-family-serif)] sm:text-5xl [text-wrap:balance]">
              Harsh Shukla
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted [text-wrap:pretty]">
              I&apos;m a software developer with nearly two years shipping
              production apps across iOS, Android, and the web. I build React
              Native products, Next.js applications, Firebase-backed systems,
              and AI-powered workflows that help teams ship faster.
            </p>

            <p className="mt-4 text-sm text-muted">
              Lucknow, Uttar Pradesh, India
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-muted">
              {introLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  <TextLink href={link.href}>{link.label}</TextLink>
                  {index < introLinks.length - 1 ? (
                    <span className="text-border" aria-hidden="true">
                      •
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="border-b border-border py-14">
          <SectionTitle>Experience</SectionTitle>
          <div className="mt-8 space-y-12">
            {experience.map((item) => (
              <article
                key={`${item.company}-${item.role}`}
                className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.period}</p>
                  <p className="mt-1 text-sm text-muted">{item.location}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground [font-family:var(--font-family-serif)]">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-base text-muted">{item.company}</p>
                  <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-muted marker:text-muted list-disc">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-14">
          <SectionTitle>Featured Work</SectionTitle>
          <div className="mt-8 space-y-10">
            {projects.map((project) => (
              <article
                key={project.name}
                className="border-t border-border pt-10 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground [font-family:var(--font-family-serif)]">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-base text-muted">
                      {project.context} · {project.stack}
                    </p>
                  </div>

                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {project.links.map((link) => (
                        <ProjectLink key={link.href} href={link.href}>
                          {link.label}
                        </ProjectLink>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">Private product</p>
                  )}
                </div>

                <ul className="mt-5 space-y-3 pl-5 text-base leading-7 text-muted marker:text-muted list-disc">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-14">
          <SectionTitle>Technical Skills</SectionTitle>
          <dl className="mt-8 space-y-6">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8"
              >
                <dt className="text-sm font-medium uppercase tracking-[0.08em] text-muted">
                  {group.label}
                </dt>
                <dd className="text-base leading-7 text-muted">{group.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid gap-14 py-14 md:grid-cols-2 md:gap-12">
          <div>
            <SectionTitle>Education</SectionTitle>
            <div className="mt-8 space-y-2">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground [font-family:var(--font-family-serif)]">
                B.Tech in Information Technology
              </h3>
              <p className="text-base text-muted">
                Axis Institute of Technology and Management (AKTU), Kanpur
              </p>
              <p className="text-sm text-muted">August 2020 - July 2024</p>
            </div>
          </div>

          <div>
            <SectionTitle>Contact</SectionTitle>
            <p className="mt-8 max-w-md text-base leading-7 text-muted">
              Available for full-time opportunities and select freelance
              projects involving product engineering, mobile apps, web
              applications, and AI-powered workflows.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-base text-muted">
              <TextLink href="mailto:shuklaharsh42809@gmail.com">
                shuklaharsh42809@gmail.com
              </TextLink>
              <TextLink href="tel:+917234885924">
                +91-7234-885-924
              </TextLink>
              <TextLink href="https://www.linkedin.com/in/harsh-shukla-52495b219/">
                LinkedIn
              </TextLink>
              <TextLink href="https://github.com/shuklaharsh2809">
                GitHub
              </TextLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
