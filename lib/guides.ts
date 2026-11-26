/**
 * Topic hub pages that group related posts into a guide. A hub is a strong page for search
 * (one page covering the whole topic) and links readers between posts.
 */
export type GuideSection = { title: string; intro: string; slugs: readonly string[] };

export const reactNativeGuide = {
  path: "/guides/react-native-in-production",
  title: "React Native in Production",
  description:
    "A practical guide to building and shipping React Native apps in production: security, push notifications, location, subscriptions, performance and releases.",
  sections: [
    {
      title: "Architecture and security",
      intro:
        "Decide early what lives on the phone and what lives on the server. Anything in the app can be read or changed by its user, so secrets and important decisions belong on the server.",
      slugs: ["react-native-ai-api-key-security", "multi-tenant-saas-data-isolation"],
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
      intro: "Most slow React Native screens are slow lists. Measure on a real, mid-range phone first, then fix what you find.",
      slugs: ["react-native-slow-list-flatlist-flashlist"],
    },
    {
      title: "Shipping safely",
      intro:
        "Small, frequent releases with a clear rollback plan, and careful review of every change, including the ones written by AI.",
      slugs: ["ship-react-native-app-twice-a-week", "expo-sdk-58-upgrade-guide", "how-to-review-ai-generated-code"],
    },
  ] satisfies GuideSection[],
} as const;

export const reactNativeGuideSlugs = new Set<string>(reactNativeGuide.sections.flatMap((section) => section.slugs));
