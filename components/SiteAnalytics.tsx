"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics (cookie-free page views). Visits to the blog editor are left out,
 * so the numbers only reflect real readers.
 */
export default function SiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const path = new URL(event.url).pathname;
        return path.startsWith("/keystatic") || path.startsWith("/api/") ? null : event;
      }}
    />
  );
}
