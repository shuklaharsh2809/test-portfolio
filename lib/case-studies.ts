/**
 * Long-form case studies for the apps in `projects` (lib/data.ts), served at /work/<slug>.
 * Only facts already published on the portfolio belong here: no client-confidential details or metrics.
 */
export type CaseStudyChallenge = {
  title: string;
  problem: string;
  approach: string;
  /** Optional blog post that goes deeper into the same problem. */
  post?: { slug: string; label: string };
};

export type CaseStudy = {
  /** Matches a project slug in lib/data.ts. */
  slug: string;
  title: string;
  /** Meta description and opening summary. */
  summary: string;
  context: readonly string[];
  myPart: readonly string[];
  challenges: readonly CaseStudyChallenge[];
  results: readonly { value: string; label: string }[];
  lessons: readonly string[];
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "onekey",
    title: "OneKey Notes: an AI voice-notes app, from architecture to the App Store",
    summary:
      "How the Appeneure team built OneKey Notes, an AI voice-notes app with 1,500+ users and a 5.0★ App Store rating, and the parts I worked on, from architecture to release.",
    context: [
      "OneKey Notes turns speech into notes. You record, the app transcribes the audio, AI cleans it up and structures it, and the result is saved as a note. It's built with OpenAI and Grok, and it ships on iOS, Android and as a companion browser extension that captures notes from the web.",
      "I worked on it as part of the Appeneure team, from the first architecture decisions through the App Store and Google Play releases.",
    ],
    myPart: [
      "Worked on the app's architecture and took part in the release to the App Store and Google Play.",
      "Worked on re-engineering the audio pipeline for long recordings.",
      "Implemented RevenueCat subscriptions.",
      "Built webhook integrations with Slack, WhatsApp, Jira and Motion.",
      "Worked across the app and the companion browser extension.",
    ],
    challenges: [
      {
        title: "Long recordings took too long to process",
        problem:
          "Meetings and lectures run from 30 minutes to two hours. Processing a recording that long in one go meant a long wait before the note appeared, and one failure meant starting over.",
        approach:
          "We split the audio into chunks and processed them concurrently, which substantially cut transcription and AI-enhancement time for long recordings.",
        post: { slug: "transcribe-long-audio-faster-openai-api", label: "How to transcribe long audio faster" },
      },
      {
        title: "Turning a free app into a business",
        problem:
          "AI processing costs money on every note, so the app needed subscriptions that work reliably on both stores, including restores, renewals and cancellations.",
        approach:
          "We implemented subscriptions with RevenueCat, which handles purchases and entitlements across the App Store and Google Play.",
        post: { slug: "react-native-in-app-subscriptions-revenuecat", label: "React Native subscriptions with RevenueCat" },
      },
      {
        title: "Notes that go where the work happens",
        problem: "A note is only useful if it reaches the tools people already use.",
        approach:
          "We built webhook integrations with Slack, WhatsApp, Jira and Motion, so a note can be sent on to a channel, a chat or a task without copying and pasting.",
      },
    ],
    results: [
      { value: "1,500+", label: "users" },
      { value: "5.0★", label: "on the App Store" },
      { value: "3", label: "platforms: iOS, Android, web extension" },
    ],
    lessons: [
      "Long-running AI work should be designed as a pipeline of small, retryable steps, not one big request.",
      "Subscriptions are a product feature, not a checkout screen: restores, renewals and edge cases need as much care as the paywall.",
      "Integrations multiply an app's value. Sending a note where the work happens matters as much as writing it.",
    ],
  },
  {
    slug: "goodhuman",
    title: "GoodHuman: feature and performance work on a production NDIS platform",
    summary:
      "Delivering features and performance improvements with the Appeneure team on GoodHuman, an NDIS workforce platform used by thousands in Australia, on a twice-weekly release cycle.",
    context: [
      "GoodHuman is a production platform that support workers and providers across Australia use to manage shifts, schedules and services under the NDIS (the National Disability Insurance Scheme). It's used by thousands of people, on the web and in mobile apps.",
      "Unlike a new app, this was work on a mature product with complex existing modules and real users relying on it every day. I worked on it as part of the Appeneure team, delivering features and fixes, and working directly with the client in Australia on requirements and production support.",
    ],
    myPart: [
      "Delivered geolocation restrictions for location-dependent actions.",
      "Improved push notifications.",
      "Optimized loading and data rendering across complex existing modules.",
      "Resolved performance issues and defects within a twice-weekly (Tuesday and Thursday) release cycle.",
      "Joined client calls for requirements discussions and ongoing production support.",
    ],
    challenges: [
      {
        title: "Actions that should only happen on site",
        problem:
          "Some actions should only be possible when a worker is actually at the right location. Phone GPS varies in accuracy, and anything on the device can be manipulated.",
        approach:
          "I delivered geolocation restrictions that check where the worker is before allowing these actions. The blog post below covers how I'd approach this kind of feature in general.",
        post: { slug: "react-native-location-restriction-geofence", label: "How to restrict actions by location in React Native" },
      },
      {
        title: "Notifications people can rely on",
        problem:
          "When notifications are about someone's work schedule, a missed or broken one is a real problem. Delivery and behavior differ across platforms and app states.",
        approach:
          "I worked on push-notification improvements in the app. The blog post below is my guide to building notifications that hold up in production.",
        post: { slug: "react-native-push-notifications-fcm-2026", label: "React Native push notifications with FCM" },
      },
      {
        title: "Screens that load and scroll smoothly",
        problem:
          "Lists of shifts, clients and notes are used all day, on all kinds of phones. Slow loading and janky rendering in complex existing modules hurt everyday work.",
        approach:
          "I worked on loading and data-rendering optimizations across these modules. The blog post below covers the techniques I use for slow React Native lists.",
        post: { slug: "react-native-slow-list-flatlist-flashlist", label: "Fixing slow React Native lists" },
      },
      {
        title: "Shipping twice a week without breaking production",
        problem: "Releases go out every Tuesday and Thursday to a product thousands of people depend on.",
        approach:
          "I resolved performance issues and defects within the release cycle, which rewards small, well-tested changes.",
        post: { slug: "ship-react-native-app-twice-a-week", label: "How to ship a React Native app twice a week" },
      },
    ],
    results: [
      { value: "1,000s", label: "of users across Australia" },
      { value: "2×", label: "releases a week, Tuesday and Thursday" },
      { value: "Web + mobile", label: "production platform" },
    ],
    lessons: [
      "On a mature product, understanding existing business logic comes before writing new code.",
      "Small, frequent releases make problems easier to find and fix, and easier for the client to trust.",
      "Anything that decides who can do what, like location checks, belongs on the server.",
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);
