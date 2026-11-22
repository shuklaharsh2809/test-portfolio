import { ArrowRight, ArrowUpRight, Briefcase, GraduationCap, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import {
  siAndroid,
  siApple,
  siAppstore,
  siCss,
  siExpo,
  siFirebase,
  siGit,
  siGithubactions,
  siGoogleplay,
  siGooglemaps,
  siHtml5,
  siJavascript,
  siJira,
  siNextdotjs,
  siReact,
  siRedux,
  siRevenuecat,
  siTailwindcss,
  siTypescript,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";
import AppCycler from "@/components/AppCycler";
import BuildDetails from "@/components/BuildDetails";
import BuildShots from "@/components/BuildShots";
import GithubTile from "@/components/GithubTile";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import CardGlow from "@/components/CardGlow";
import CopyEmail from "@/components/CopyEmail";
import IndiaTime from "@/components/IndiaTime";
import Nav from "@/components/Nav";
import PipelineDemo from "@/components/PipelineDemo";
import Reveal from "@/components/Reveal";
import TechIcon from "@/components/TechIcon";
import { builds, education, experience, links, principles, profile, projects, SITE_URL, skills } from "@/lib/data";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: links.email,
  url: SITE_URL,
  image: `${SITE_URL}/profile-photo.png`,
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "India" },
  worksFor: { "@type": "Organization", name: "Appeneure Technologies" },
  alumniOf: education.school,
  sameAs: [links.linkedin, links.github],
  knowsAbout: ["React Native", "React", "TypeScript", "Next.js", "Firebase", "iOS", "Android", "AI integrations"],
};

const skillIcons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  Redux: siRedux,
  "Tailwind CSS": siTailwindcss,
  HTML: siHtml5,
  CSS: siCss,
  "React Native": siReact,
  Expo: siExpo,
  iOS: siApple,
  Android: siAndroid,
  RevenueCat: siRevenuecat,
  "Firebase Auth": siFirebase,
  "Realtime Database": siFirebase,
  FCM: siFirebase,
  "Google Maps / Places": siGooglemaps,
  Git: siGit,
  "CI/CD": siGithubactions,
  "App Store & Play Store Deployment": siAppstore,
};

const marqueeTop: { label: string; icon?: SimpleIcon }[] = [
  { label: "React Native", icon: siReact },
  { label: "TypeScript", icon: siTypescript },
  { label: "Expo", icon: siExpo },
  { label: "Firebase", icon: siFirebase },
  { label: "Next.js", icon: siNextdotjs },
  { label: "RevenueCat", icon: siRevenuecat },
  { label: "Redux", icon: siRedux },
];
const marqueeBottom: { label: string; icon?: SimpleIcon }[] = [
  { label: "OpenAI" },
  { label: "Grok" },
  { label: "Google Maps", icon: siGooglemaps },
  { label: "iOS", icon: siApple },
  { label: "Android", icon: siAndroid },
  { label: "Jira", icon: siJira },
  { label: "WhatsApp", icon: siWhatsapp },
  { label: "Tailwind", icon: siTailwindcss },
];

/** Renders **bold** segments from résumé copy as emphasized text. */
function Rich({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith("**") ? (
      <strong key={index} className="font-medium text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-[2.75rem] sm:leading-[1.08]">
        {title}
      </h2>
      {children ? <p className="mt-4 text-lg leading-8 text-muted">{children}</p> : null}
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: { label: string; icon?: SimpleIcon }[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className={reverse ? "marquee-track is-reverse" : "marquee-track"}>
        {row.map((item, index) => (
          <span key={index} className="marquee-chip">
            {item.icon ? (
              <TechIcon icon={item.icon} className="size-4" />
            ) : (
              <Sparkles className="size-4 text-accent" aria-hidden="true" />
            )}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function StoreBadge({ label, href }: { label: string; href: string }) {
  const apple = label === "App Store";
  return (
    <a href={href} target="_blank" rel="noreferrer" className="store-badge">
      <TechIcon icon={apple ? siApple : siGoogleplay} className="size-5" mono={apple} />
      <span className="flex flex-col leading-none">
        <span className="text-[10px] opacity-70">{apple ? "Download on the" : "Get it on"}</span>
        <span className="mt-0.5 text-sm font-semibold">{label}</span>
      </span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }} />
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <div className="aurora" aria-hidden="true" />
      <Nav />

      <main id="top" className="shell">
        {/* ---------------------------------------------------------- Hero bento */}
        <section className="bento pt-28 sm:pt-32">
          <div className="tile glow-card intro-tile md:col-span-2 lg:row-span-2">
            <div className="intro relative flex h-full flex-col">
              <div className="flex items-center gap-4">
                <span className="avatar">
                  <Image
                    src="/profile-photo.png"
                    alt={`Portrait of ${profile.name}`}
                    width={152}
                    height={152}
                    priority
                    className="avatar-img"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold tracking-tight text-foreground">{profile.name}</p>
                  <p className="status-pill mt-1.5">
                    <span className="status-dot" aria-hidden="true" />
                    {profile.status}
                  </p>
                </div>
              </div>
              <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-tighter text-foreground sm:text-6xl">
                I work on AI-powered mobile apps that <span className="gradient-text">ship.</span>
              </h1>
              <p className="mt-5 max-w-lg text-[17px] leading-7 text-muted">
                I&apos;m a software engineer working in React Native, React &amp; TypeScript. 2+ years taking products from architecture to the App
                Store and Google Play.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
                <a href="#work" className="btn btn-primary">
                  See my work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a href={links.email} className="btn btn-secondary">
                  <Mail className="size-4" aria-hidden="true" />
                  Get in touch
                </a>
                <div className="flex items-center">
                  <a href={links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                    <GithubIcon className="size-4.5" />
                  </a>
                  <a href={links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                    <LinkedinIcon className="size-4.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="tile glow-card p-4 md:row-span-2">
            <p className="tile-label px-1">
              <span className="live-dot" aria-hidden="true" />
              Live on the stores
            </p>
            <AppCycler apps={projects} />
          </div>

          <div className="tile glow-card stat-tile">
            <p className="tile-label">OneKey Notes</p>
            <p className="stat-value">
              1,500<span className="text-accent">+</span>
            </p>
            <p className="text-sm text-muted">users on an AI app I work on at Appeneure.</p>
          </div>

          <div className="tile glow-card stat-tile">
            <p className="tile-label">Experience</p>
            <p className="stat-value">
              2<span className="text-accent">+</span>
              <span className="ml-1 text-2xl text-muted">yrs</span>
            </p>
            <p className="text-sm text-muted">shipping production web &amp; mobile apps.</p>
          </div>

          <div className="tile glow-card stat-tile">
            <p className="tile-label">Local time · Noida, India</p>
            <IndiaTime />
          </div>

          <GithubTile />

          <div className="tile glow-card overflow-hidden md:col-span-2">
            <p className="tile-label">Daily toolkit</p>
            <div className="-mx-5 mt-4 grid gap-2.5 sm:-mx-6">
              <MarqueeRow items={marqueeTop} />
              <MarqueeRow items={marqueeBottom} reverse />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- Work */}
        <section id="work" className="section" data-reveal>
          <SectionIntro eyebrow="Selected work" title="Apps I've shipped">
            Real products I&apos;ve worked on at Appeneure Technologies, live on the App Store and Google Play.
          </SectionIntro>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                className="project glow-card"
                style={{ "--brand": project.brand, "--shot-bg": project.shotBg } as React.CSSProperties}
              >
                <div className={index % 2 === 1 ? "project-info lg:order-2" : "project-info"}>
                  <div className="flex items-center gap-4">
                    <Image src={project.icon} alt={`${project.name} app icon`} width={60} height={60} className="app-icon" />
                    <div>
                      <p className="font-mono text-xs text-muted">0{index + 1} · {project.tagline}</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/80">
                    <Briefcase className="size-3.5 text-muted" aria-hidden="true" />
                    {project.role}
                  </p>

                  <p className="mt-5 text-[17px] leading-7 text-foreground/90">{project.description}</p>

                  <ul className="mt-4 space-y-2.5">
                    {project.points.map((point) => (
                      <li key={point} className="check">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} highlights`}>
                    {project.facts.map((fact) => (
                      <li key={fact} className="fact">
                        {fact}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {project.links.map((link) => (
                      <StoreBadge key={link.href} label={link.label} href={link.href} />
                    ))}
                  </div>
                </div>

                <div className="stage" aria-hidden="true">
                  <div className="stage-glow" />
                  {project.shots.map((shot, shotIndex) => (
                    <div key={shot} className="stage-shot" data-pos={shotIndex}>
                      <Image src={shot} alt="" fill sizes="(max-width: 1024px) 40vw, 220px" className="object-cover object-top" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- Builds */}
        <section id="builds" className="section" data-reveal>
          <SectionIntro eyebrow="Side projects" title="Things I've built on my own">
            Recent personal projects, from multi-tenant SaaS to a walkable 3D city. All open source on GitHub.
          </SectionIntro>

          <div className="builds">
            {builds.map((build) => (
              <article
                key={build.slug}
                className="build glow-card"
                style={{ "--brand": build.brand } as React.CSSProperties}
              >
                <BuildShots
                  name={build.name}
                  host={build.url ? new URL(build.url).host : `github.com/shuklaharsh2809`}
                  shots={build.shots}
                />

                <div className="flex flex-1 flex-col px-1 pt-5 sm:px-2">
                  <p className="font-mono text-xs text-muted">
                    {build.tagline} · {build.year}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">
                    {build.name}
                  </h3>
                  <p className="mt-3 leading-7 text-foreground/90">{build.description}</p>

                  <BuildDetails>
                    <ul className="mt-4 space-y-2">
                      {build.points.map((point) => (
                        <li key={point} className="check text-[15px]">
                          {point}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${build.name} tech stack`}>
                      {build.stack.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </BuildDetails>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {build.url ? (
                      <a href={build.url} target="_blank" rel="noreferrer" className="build-link build-link-primary">
                        Live demo
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    <a href={build.repo} target="_blank" rel="noreferrer" className="build-link">
                      <GithubIcon className="size-3.5" />
                      Source
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- Engineering */}
        <section id="engineering" className="section" data-reveal>
          <SectionIntro eyebrow="Engineering spotlight" title="Making 2-hour recordings feel fast">
            Work I did on the OneKey Notes audio pipeline at Appeneure.
          </SectionIntro>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <dl className="tile glow-card grid content-start gap-6">
              <div>
                <dt className="case-label">
                  <span className="case-index">1</span>Problem
                </dt>
                <dd className="mt-2 leading-7 text-muted">
                  Recordings from 30 minutes to 2 hours were transcribed and AI-enhanced one piece after another, so
                  wait times grew with every minute of audio.
                </dd>
              </div>
              <div>
                <dt className="case-label">
                  <span className="case-index">2</span>Approach
                </dt>
                <dd className="mt-2 leading-7 text-muted">
                  Split the audio into smaller chunks and processed them <span className="text-foreground">concurrently</span>{" "}
                  instead of sequentially, then stitched the results back together in order.
                </dd>
              </div>
              <div>
                <dt className="case-label">
                  <span className="case-index">3</span>Result
                </dt>
                <dd className="mt-2 leading-7 text-muted">
                  Substantially shorter transcription and AI-enhancement times for long files, exactly where users felt
                  the wait most.
                </dd>
              </div>
            </dl>

            <div className="tile glow-card gradient-border">
              <PipelineDemo />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {principles.map((item, index) => (
              <div key={item.title} className="tile glow-card">
                <span className="principle-index">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- Experience */}
        <section id="experience" className="section" data-reveal>
          <SectionIntro eyebrow="Experience" title="Where I've been building" />

          <ol className="timeline">
            <li className="timeline-item">
              <span className="timeline-node is-current" aria-hidden="true" />
              <article className="tile glow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="company-mark">A</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{experience.role}</h3>
                      <p className="text-muted">
                        {experience.company} · {experience.location}
                      </p>
                    </div>
                  </div>
                  <p className="now-pill shrink-0">
                    <span className="status-dot" aria-hidden="true" />
                    {experience.period}
                  </p>
                </div>
                <p className="mt-4 text-sm text-muted">{experience.context}</p>
                <ul className="mt-5 grid gap-3 lg:grid-cols-2 lg:gap-x-8">
                  {experience.highlights.map((point) => (
                    <li key={point} className="check">
                      <Rich text={point} />
                    </li>
                  ))}
                </ul>
              </article>
            </li>
            <li className="timeline-item">
              <span className="timeline-node" aria-hidden="true" />
              <article className="tile glow-card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="company-mark is-muted">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{education.degree}</h3>
                    <p className="text-muted">{education.school}</p>
                  </div>
                </div>
                <p className="shrink-0 font-mono text-xs text-muted">{education.period}</p>
              </article>
            </li>
          </ol>
        </section>

        {/* -------------------------------------------------------------- Skills */}
        <section id="skills" className="section" data-reveal>
          <SectionIntro eyebrow="Skills" title="The stack behind the apps" />
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((group) => (
              <div key={group.label} className="tile glow-card">
                <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const icon = skillIcons[item];
                    return (
                      <li key={item} className="skill">
                        {icon ? <TechIcon icon={icon} className="size-3.5" /> : <Sparkles className="size-3.5 text-accent" aria-hidden="true" />}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------- Contact */}
        <section id="contact" className="section" data-reveal>
          <div className="contact gradient-border">
            <div className="contact-glow" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl text-center">
              <p className="eyebrow mx-auto">Contact</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl sm:leading-[1.02]">
                Have an app in mind? <span className="gradient-text">Let&apos;s build it.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-muted">
                Open to software engineering roles in React Native, React and TypeScript, and comfortable working with
                teams in Australia and the US.
              </p>
              <a href={links.email} className="contact-email">
                {profile.email}
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </a>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <CopyEmail email={profile.email} />
                <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
                <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="shell flex flex-col gap-2 pb-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p>Designed &amp; built with Next.js and Tailwind CSS</p>
      </footer>

      <CardGlow />
      <Reveal />
    </>
  );
}
