import { NextResponse, type NextRequest } from "next/server";

/** The site's official address. Keep in sync with SITE_URL in lib/data.ts. */
const CANONICAL_HOST = "harshshukla-dev.vercel.app";

/**
 * On the live site, send visitors on any other address (e.g. the old test-portfolio-… URL) to the official one
 * with a permanent redirect, so Google indexes a single address. Preview deployments and local dev are untouched.
 */
export function proxy(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();
  const host = request.headers.get("host");
  if (!host || host === CANONICAL_HOST) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.protocol = "https";
  url.host = CANONICAL_HOST;
  url.port = "";
  return NextResponse.redirect(url, 308);
}
