/**
 * The site's one official address, used for canonical URLs, the sitemap, RSS and link previews.
 * Other addresses redirect here (see proxy.ts). NEXT_PUBLIC_SITE_URL can override it, e.g. for a future custom domain.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshshukla-dev.vercel.app";

export const profile = {
  name: "Harsh Shukla",
  role: "Software Engineer",
  focus: "React Native · React · TypeScript",
  pitch: "I work on mobile products at Appeneure Technologies, from architecture to the App Store.",
  headline: "I build AI-powered mobile apps that ship.",
  location: "Noida, India",
  timeZone: "Asia/Kolkata",
  email: "shuklaharsh42809@gmail.com",
  status: "Open to new roles",
} as const;

export const links = {
  email: `mailto:${profile.email}`,
  linkedin: "https://www.linkedin.com/in/harsh-shukla-52495b219",
  github: "https://github.com/shuklaharsh2809",
  resume: "/resume.pdf",
} as const;

export const navItems = [
  { id: "work", label: "Work" },
  { id: "builds", label: "Builds" },
  { id: "engineering", label: "Engineering" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const about = [
  "I'm a software engineer at **Appeneure Technologies** in Noida, building production mobile and web apps for clients in the **US and Australia**. Most of my work is in React Native, React, and TypeScript.",
  "At Appeneure I've worked on **OneKey Notes** from architecture through its App Store and Google Play release, and I deliver features and fixes on **GoodHuman**, an NDIS platform used by thousands, on a twice-weekly release cycle.",
] as const;

export const stats = [
  { value: "2+", unit: "yrs", label: "Shipping production apps" },
  { value: "1,500+", unit: "", label: "Users on OneKey Notes" },
  { value: "3", unit: "", label: "Apps live on iOS & Android" },
  { value: "2×", unit: "/wk", label: "Production release cadence" },
] as const;

export const experience = {
  role: "Software Engineer",
  company: "Appeneure Technologies Pvt. Ltd.",
  location: "Noida, India",
  period: "Jun 2024 — Present",
  context: "Production web & mobile development for US and Australian clients",
  highlights: [
    "Worked on **OneKey Notes**, an AI-powered React Native note-taking app with **1,500+ users**, from architecture through App Store and Google Play release.",
    "Worked on re-engineering the audio pipeline for 30-minute to 2-hour recordings, splitting audio into chunks and **processing them concurrently** to substantially cut transcription and AI-enhancement time.",
    "Delivered production features on **GoodHuman**, an NDIS workforce-management SaaS used by thousands: geolocation restrictions, push-notification improvements, and loading and data-rendering optimizations.",
    "Resolved performance issues and defects in a **twice-weekly (Tue/Thu) release cycle**, across complex existing modules and business logic.",
    "Integrated OpenAI and Grok, REST APIs, and Firebase (Auth, Realtime Database, FCM) for AI features, auth, notifications, and real-time data.",
    "Implemented **RevenueCat** subscriptions and webhook integrations with Slack, WhatsApp, Jira, and Motion.",
    "Worked directly with Australian clients on calls, requirement discussions, and ongoing production support.",
  ],
  stack: ["React Native", "TypeScript", "React", "Firebase", "OpenAI", "RevenueCat"],
} as const;

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  icon: string;
  shots: readonly string[];
  shotBg: string;
  brand: string;
  facts: readonly string[];
  description: string;
  points: readonly string[];
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "onekey",
    name: "OneKey Notes",
    tagline: "AI voice notes",
    role: "Built with the Appeneure team · architecture to release",
    icon: "/work/onekey-icon.png",
    shots: ["/work/onekey-shot0.jpg", "/work/onekey-shot2.jpg", "/work/onekey-shot4.jpg"],
    shotBg: "#ece9f7",
    brand: "#8b5cf6",
    facts: ["1,500+ users", "5.0★ on the App Store", "iOS · Android · Web extension"],
    description:
      "Speak, and AI writes your notes. A record → transcribe → AI-enhance → save workflow powered by OpenAI and Grok.",
    points: [
      "Worked across the app and a companion browser extension that captures notes from the web.",
      "Helped make long recordings fast by chunking audio and processing the chunks concurrently.",
      "Shipped RevenueCat subscriptions and webhook integrations with Slack, WhatsApp, Jira, and Motion.",
    ],
    stack: ["React Native", "TypeScript", "OpenAI", "Grok", "Firebase", "RevenueCat"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/in/app/onekey-notes-ai-voice-notes/id6752220994" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.appeneure.onekeynotes" },
    ],
  },
  {
    slug: "goodhuman",
    name: "GoodHuman",
    tagline: "NDIS workforce-management SaaS",
    role: "Feature & performance work · production",
    icon: "/work/goodhuman-icon.png",
    shots: ["/work/goodhuman-shot1.jpg", "/work/goodhuman-shot2.jpg", "/work/goodhuman-shot3.jpg"],
    shotBg: "#ffd21f",
    brand: "#facc15",
    facts: ["Used by thousands", "Australian NDIS", "Twice-weekly releases"],
    description:
      "A production platform that support workers and providers across Australia use to manage shifts, schedules, and services.",
    points: [
      "Delivered geolocation restrictions and push-notification improvements.",
      "Optimized loading and data rendering across complex, existing product modules.",
    ],
    stack: ["React Native", "Web", "REST APIs", "Geolocation", "FCM"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/goodhuman/id1491399841" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=me.goodhuman.android" },
    ],
  },
  {
    slug: "trippr",
    name: "Trippr",
    tagline: "AI travel assistant",
    role: "Mobile engineer · iOS & Android",
    icon: "/work/trippr-icon.png",
    shots: ["/work/trippr-shot3.jpg", "/work/trippr-shot4.jpg", "/work/trippr-shot2.jpg"],
    shotBg: "#dfe8f5",
    brand: "#3b82f6",
    facts: ["iOS · Android", "Location-aware AI picks", "In-app subscriptions"],
    description:
      "An AI travel companion that recommends places around you, built on Google Places, Maps, and geolocation.",
    points: [
      "Integrated Google Places, Maps, and geolocation for location-based recommendations.",
      "Implemented in-app subscriptions for the production release.",
    ],
    stack: ["React Native", "Firebase", "Google Places", "Google Maps"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/in/app/trippr-travel-assistant/id6504839672" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=ai.mayalabs.trippr" },
    ],
  },
];

export type Build = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  brand: string;
  url?: string;
  repo: string;
  /** Short muted loop shown as the card's first "Demo" tab. */
  video?: { src: string; poster: string };
  shots: readonly { src: string; label: string }[];
  description: string;
  points: readonly string[];
  stack: readonly string[];
};

/** Personal projects from github.com/shuklaharsh2809, newest first. */
export const builds: readonly Build[] = [
  {
    slug: "hostelcare",
    name: "HostelCare",
    tagline: "Multi-tenant hostel management",
    year: "2026",
    brand: "#0f8a6a",
    repo: "https://github.com/shuklaharsh2809/hostel-care",
    video: { src: "/work/hostelcare-demo.mp4", poster: "/work/hostelcare-poster.jpg" },
    shots: [
      { src: "/work/hostelcare-shot1.jpg", label: "Dashboard" },
      { src: "/work/hostelcare-shot2.jpg", label: "Students" },
      { src: "/work/hostelcare-shot3.jpg", label: "Mess" },
    ],
    description:
      "For owners running several hostels across a city: branches, rooms, students, a mess per branch, and invoices and payments in one place.",
    points: [
      "Each business is an isolated organization; one tenant can never read another's data.",
      "API-first: the web app only talks to a NestJS REST API, so a future student app can reuse it.",
    ],
    stack: ["Next.js", "NestJS", "Drizzle ORM", "PostgreSQL", "TypeScript"],
  },
  {
    slug: "fitgrid",
    name: "FitGrid",
    tagline: "Gym & fitness-chain SaaS",
    year: "2026",
    brand: "#10b981",
    url: "https://fitgrid-kappa.vercel.app",
    repo: "https://github.com/shuklaharsh2809/gym-management",
    video: { src: "/work/fitgrid-demo.mp4", poster: "/work/fitgrid-poster.jpg" },
    shots: [
      { src: "/work/fitgrid-shot1.jpg", label: "Dashboard" },
      { src: "/work/fitgrid-shot2.jpg", label: "Members" },
      { src: "/work/fitgrid-shot3.jpg", label: "Landing" },
    ],
    description:
      "Members, memberships, billing, front-desk check-in, classes, staff, inventory and reports for single gyms and multi-branch chains.",
    points: [
      "Role-scoped access: owners, branch managers, front desk, accountants and trainers each see only their slice.",
      "One set of metric definitions feeds the dashboard, reports and CSV exports.",
    ],
    stack: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "Better Auth", "Playwright"],
  },
  {
    slug: "lucknow",
    name: "Shaam-e-Awadh",
    tagline: "Walkable 3D old Lucknow",
    year: "2026",
    brand: "#d97706",
    url: "https://lucknow-gamma.vercel.app",
    repo: "https://github.com/shuklaharsh2809/lucknow",
    video: { src: "/work/lucknow-demo.mp4", poster: "/work/lucknow-poster.jpg" },
    shots: [
      { src: "/work/lucknow-shot1.jpg", label: "Bara Imambara" },
      { src: "/work/lucknow-shot2.jpg", label: "Night" },
      { src: "/work/lucknow-shot3.jpg", label: "Intro" },
    ],
    description:
      "Walk the real streets of old Lucknow in the browser, from Rumi Darwaza to the Clock Tower, from morning to the lit-up night.",
    points: [
      "Streets and buildings generated from OpenStreetMap data; monuments placed at true positions and footprints.",
      "First-person walk, fly and touch controls, a minimap, and four times of day.",
    ],
    stack: ["Three.js", "JavaScript", "Vite", "OpenStreetMap"],
  },
  {
    slug: "glowcheck",
    name: "GlowCheck",
    tagline: "On-device face analysis",
    year: "2026",
    brand: "#7a4e6a",
    url: "https://glow-check-mu.vercel.app",
    repo: "https://github.com/shuklaharsh2809/glow-check",
    video: { src: "/work/glowcheck-demo.mp4", poster: "/work/glowcheck-poster.jpg" },
    shots: [
      { src: "/work/glowcheck-shot1.jpg", label: "Landing" },
      { src: "/work/glowcheck-shot2.jpg", label: "Profile" },
      { src: "/work/glowcheck-shot3.jpg", label: "How it works" },
    ],
    description:
      "Measures facial proportions, symmetry and skin signals from one selfie and builds a ranked glow-up plan. The photo never leaves the browser.",
    points: [
      "MediaPipe Face Landmarker runs locally, with pose correction so measurements hold under head tilt.",
      "Deterministic, tested scoring; consent-gated analytics and full session reset.",
    ],
    stack: ["React", "TypeScript", "MediaPipe", "Vite", "Tailwind CSS"],
  },
  {
    slug: "naksh",
    name: "Naksh AI",
    tagline: "AI Vedic astrology readings",
    year: "2026",
    brand: "#6d28d9",
    url: "https://naksh-ai.vercel.app",
    repo: "https://github.com/shuklaharsh2809/Naksh-AI",
    video: { src: "/work/naksh-demo.mp4", poster: "/work/naksh-poster.jpg" },
    shots: [
      { src: "/work/naksh-shot1.jpg", label: "Landing" },
      { src: "/work/naksh-shot2.jpg", label: "Birth details" },
    ],
    description:
      "Turns birth details into an astrological chart, then uses Gemini to write personalized insights on career, relationships and health.",
    points: ["A guided three-step intake flow with light and dark themes."],
    stack: ["Next.js", "Gemini", "Framer Motion", "Tailwind CSS"],
  },
];

export const principles = [
  {
    title: "Work across the whole product",
    body: "From architecture and API integration to store listings and release. I've helped take an app from idea to 1,500+ users.",
  },
  {
    title: "Ship on a rhythm",
    body: "Tuesday and Thursday releases on a production SaaS taught me to keep changes small, tested, and safe to deploy.",
  },
  {
    title: "Work with the client",
    body: "Regular calls with Australian clients: turning requirements into shipped features, then supporting them in production.",
  },
] as const;

export const skills = [
  {
    label: "Languages & Frontend",
    items: ["TypeScript", "JavaScript", "React.js", "Next.js", "Redux", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo", "React Navigation", "iOS", "Android", "In-App Purchases", "RevenueCat"],
  },
  {
    label: "Backend, APIs & AI",
    items: ["Firebase Auth", "Realtime Database", "FCM", "REST APIs", "OpenAI API", "Grok API", "Google Maps / Places", "Geolocation", "Webhooks"],
  },
  {
    label: "Tools & Engineering",
    items: ["Git", "CI/CD", "Performance Optimization", "App Store & Play Store Deployment"],
  },
] as const;

export const education = {
  degree: "B.Tech, Information Technology",
  school: "Axis Institute of Technology and Management (AKTU)",
  period: "Aug 2020 — Jul 2024",
} as const;
