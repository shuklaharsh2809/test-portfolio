import { makeRouteHandler } from "@keystatic/next/route-handler";
import { keystaticReady } from "@/lib/keystatic-env";
import config from "../../../../keystatic.config";

const notConnected = () =>
  new Response("The blog editor isn't connected to GitHub yet. See docs/BLOG.md for the one-time setup.", {
    status: 503,
  });

// In production the editor needs the GitHub App secrets; until they exist, answer with a clear error
// instead of failing the whole build.
export const { GET, POST } = keystaticReady
  ? makeRouteHandler({ config })
  : { GET: notConnected, POST: notConnected };
