/**
 * The editor uses GitHub storage on the deployed site, and during one-time setup when
 * NEXT_PUBLIC_KEYSTATIC_STORAGE=github is set locally. Everywhere else it edits files on disk.
 */
export const useGithubStorage =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

/**
 * Server-only check: GitHub mode needs the GitHub App secrets (created once via the setup wizard).
 * Local file mode needs nothing. During setup the wizard itself runs without secrets, so it counts as ready.
 */
export const keystaticReady =
  !useGithubStorage ||
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" ||
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET);
