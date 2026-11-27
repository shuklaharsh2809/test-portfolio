/**
 * Topic hub pages that group related posts into a guide. A hub is a strong page for search
 * (one page covering the whole topic) and links readers between posts.
 * Each guide is served at /guides/<slug>; to add a post to a guide, add its slug to a section.
 */
export type GuideSection = { title: string; intro: string; slugs: readonly string[] };

export type Guide = {
  slug: string;
  title: string;
  /** Meta description and search snippet. */
  description: string;
  /** Opening paragraph on the guide page. */
  intro: string;
  sections: readonly GuideSection[];
};

export const guides: readonly Guide[] = [
  {
    slug: "react-native-in-production",
    title: "React Native in Production",
    description:
      "A practical guide to building and shipping React Native apps in production: security, push notifications, location, subscriptions, performance and releases.",
    intro:
      "What it takes to build React Native apps that hold up with real users, from my work with the Appeneure team on production apps like GoodHuman, an NDIS workforce platform used by thousands of people, and OneKey Notes. Each article is a complete guide to one problem; read them in order or jump to what you need.",
    sections: [
      {
        title: "Architecture and security",
        intro:
          "Decide early what lives on the phone and what lives on the server. Anything in the app can be read or changed by its user, so secrets and important decisions belong on the server.",
        slugs: [
          "react-native-ai-api-key-security",
          "expo-router-data-loaders-tutorial",
          "multi-tenant-saas-data-isolation",
        ],
      },
      {
        title: "Features users rely on",
        intro:
          "AI responses, notifications, location and payments look simple in a demo and turn fragile in production. These guides cover the details that decide whether they work for every user.",
        slugs: [
          "react-native-stream-ai-responses",
          "react-native-on-device-llm-executorch",
          "react-native-push-notifications-fcm-2026",
          "react-native-location-restriction-geofence",
          "react-native-in-app-subscriptions-revenuecat",
        ],
      },
      {
        title: "Performance",
        intro:
          "Most slow React Native screens are slow lists. Measure on a real, mid-range phone first, then fix what you find.",
        slugs: ["react-native-slow-list-flatlist-flashlist"],
      },
      {
        title: "Shipping safely",
        intro:
          "Small, frequent releases with a clear rollback plan, and careful review of every change, including the ones written by AI.",
        slugs: ["ship-react-native-app-twice-a-week", "expo-sdk-58-upgrade-guide", "how-to-review-ai-generated-code"],
      },
    ],
  },
  {
    slug: "ai-engineering",
    title: "AI Engineering",
    description:
      "A practical guide to building with AI in 2026: working with coding agents, adding AI features to apps, on-device models, and keeping AI products safe.",
    intro:
      "How to build real products with AI, and how to build software with AI agents without losing control of quality. These articles come from shipping AI features with the Appeneure team, including OneKey Notes, an AI voice-notes app, and from my own projects. Each one is a complete guide to one problem.",
    sections: [
      {
        title: "Working with AI coding agents",
        intro:
          "Agents now write a large share of code. The job shifts to giving them the right context, reviewing what they produce, and owning the result.",
        slugs: [
          "will-ai-replace-software-developers",
          "ai-agents-who-makes-sure-its-right",
          "agents-md-guide",
          "how-to-review-ai-generated-code",
        ],
      },
      {
        title: "Building AI features",
        intro:
          "Streaming answers, long audio, and connecting models to your own tools: the patterns that make AI features feel fast and work reliably.",
        slugs: [
          "react-native-stream-ai-responses",
          "transcribe-long-audio-faster-openai-api",
          "mcp-server-typescript-tutorial",
        ],
      },
      {
        title: "Private and on-device AI",
        intro:
          "Some data shouldn't leave the device. Small models and on-device vision make private, offline features possible in apps and the browser.",
        slugs: ["react-native-on-device-llm-executorch", "mediapipe-face-landmarker-browser-tutorial"],
      },
      {
        title: "Keeping AI products safe",
        intro:
          "API keys, validation and tools that are safe to retry: the basics every AI feature needs before it reaches users.",
        slugs: ["react-native-ai-api-key-security", "ai-agent-tool-call-retries-idempotency"],
      },
    ],
  },
];

export const guidePath = (guide: Guide) => `/guides/${guide.slug}`;

export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);

/** The guides that include a post, in the order guides are listed. */
export const guidesForPost = (postSlug: string) =>
  guides.filter((guide) => guide.sections.some((section) => section.slugs.includes(postSlug)));
