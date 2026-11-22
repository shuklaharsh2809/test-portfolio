import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { links } from "@/lib/data";

const USER = "shuklaharsh2809";
/** Repos that aren't worth showing off (this site, scratch repos). */
const HIDDEN = new Set(["test-portfolio", "gitdemo", "localrepo"]);

type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#663399",
  HTML: "#e34c26",
  Java: "#b07219",
  Liquid: "#67b8de",
};

async function getRecentRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) return null;
    const repos = (await res.json()) as Repo[];
    return repos.filter((repo) => !repo.fork && !HIDDEN.has(repo.name)).slice(0, 3);
  } catch {
    return null;
  }
}

function timeAgo(iso: string) {
  const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.round(days / 7)} wks ago`;
  return `${Math.round(days / 30)} mo ago`;
}

/** Bento tile listing the most recently pushed personal repos, refreshed every 6 hours. */
export default async function GithubTile() {
  const repos = await getRecentRepos();

  // GitHub unreachable or rate-limited: keep the grid intact with a plain link card.
  if (!repos?.length) {
    return (
      <a href={links.github} target="_blank" rel="noreferrer" className="tile glow-card stat-tile">
        <p className="tile-label">On GitHub</p>
        <GithubIcon className="mt-3 size-8 text-foreground" />
        <p className="text-sm text-muted">Side projects and experiments, all open source.</p>
      </a>
    );
  }

  return (
    <div className="tile glow-card">
      <div className="flex items-center justify-between gap-3">
        <p className="tile-label">
          <span className="live-dot" aria-hidden="true" />
          Latest on GitHub
        </p>
        <a href={links.github} target="_blank" rel="noreferrer" className="gh-profile" aria-label="GitHub profile">
          <GithubIcon className="size-4" />
        </a>
      </div>

      <ul className="mt-4 grid gap-1">
        {repos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="gh-repo">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{repo.name}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  {repo.language ? (
                    <>
                      <span
                        className="size-2 rounded-full"
                        style={{ background: LANGUAGE_COLORS[repo.language] ?? "var(--muted)" }}
                        aria-hidden="true"
                      />
                      {repo.language}
                      <span aria-hidden="true">·</span>
                    </>
                  ) : null}
                  <span className="whitespace-nowrap">{timeAgo(repo.pushed_at)}</span>
                </span>
              </span>
              <ArrowUpRight className="gh-arrow size-4 shrink-0" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
