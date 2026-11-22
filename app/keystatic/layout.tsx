import type { Metadata } from "next";
import { keystaticReady } from "@/lib/keystatic-env";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Blog editor",
  robots: { index: false, follow: false },
};

/** The Keystatic admin UI renders the whole /keystatic subtree itself. */
export default function KeystaticLayout() {
  if (!keystaticReady) {
    return (
      <main className="shell flex min-h-screen items-center justify-center py-20">
        <div className="tile max-w-lg">
          <p className="tile-label">Blog editor</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Not connected to GitHub yet</h1>
          <p className="mt-3 leading-7 text-muted">
            The online editor saves posts as commits to the repo, so it needs a one-time GitHub connection. Follow the
            setup steps in <code>docs/BLOG.md</code>, then redeploy.
          </p>
        </div>
      </main>
    );
  }
  return <KeystaticApp />;
}
