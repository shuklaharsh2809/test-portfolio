// Exports blog posts as Markdown for Dev.to and Hashnode, with a canonical link back to this site
// so search engines credit the original. Output goes to crosspost/ (git-ignored).
//
//   pnpm crosspost              all published posts
//   pnpm crosspost <slug> ...   only these posts
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://harshshukla-dev.vercel.app";
const POSTS_DIR = "content/posts";
const OUT_DIR = "crosspost";

/** Reads the small YAML subset Keystatic writes: scalars, `>-` folded text, and `- item` lists. */
function parseFrontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("missing front matter");
  const data = {};
  let key = null;
  let mode = null;
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z]\w*):\s*(.*)$/);
    if (field) {
      [, key] = field;
      const value = field[2].trim();
      if (value === ">-" || value === ">" || value === "|") {
        mode = "folded";
        data[key] = "";
      } else if (value === "") {
        mode = "list";
        data[key] = [];
      } else {
        mode = null;
        data[key] = unquote(value);
      }
    } else if (mode === "list" && /^\s+-\s+/.test(line)) {
      data[key].push(unquote(line.replace(/^\s+-\s+/, "").trim()));
    } else if (mode === "folded" && line.trim()) {
      data[key] = data[key] ? `${data[key]} ${line.trim()}` : line.trim();
    }
  }
  return { data, body: match[2] };
}

function unquote(value) {
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replaceAll("''", "'");
  if (value.startsWith('"') && value.endsWith('"')) return JSON.parse(value);
  if (value === "true" || value === "false") return value === "true";
  return value;
}

/** Site-relative links and images (`](/blog/...)`) become absolute, so they work on other sites. */
const absolutize = (markdown) => markdown.replace(/\]\(\//g, `](${SITE_URL}/`);

/** Dev.to allows up to 4 tags, lowercase letters and numbers only. */
const devtoTags = (tags) => [...new Set(tags.map((tag) => tag.toLowerCase().replace(/[^a-z0-9]/g, "")))].filter(Boolean).slice(0, 4);

const wanted = new Set(process.argv.slice(2));
const files = readdirSync(POSTS_DIR).filter((file) => file.endsWith(".mdoc"));
mkdirSync(join(OUT_DIR, "devto"), { recursive: true });
mkdirSync(join(OUT_DIR, "hashnode"), { recursive: true });

let count = 0;
for (const file of files) {
  const slug = file.replace(/\.mdoc$/, "");
  if (wanted.size && !wanted.has(slug)) continue;
  const { data, body } = parseFrontMatter(readFileSync(join(POSTS_DIR, file), "utf8"));
  if (data.draft === true) continue;

  const canonical = `${SITE_URL}/blog/${slug}`;
  const footer = `\n---\n\n*Originally published on [my blog](${canonical}). I write about building and shipping React Native and AI-powered apps in production.*\n`;
  const content = absolutize(body).trimEnd() + "\n" + footer;

  const devto = [
    "---",
    `title: ${JSON.stringify(data.title)}`,
    "published: false",
    `description: ${JSON.stringify(data.summary ?? "")}`,
    `tags: ${devtoTags(data.tags ?? []).join(", ")}`,
    `canonical_url: ${canonical}`,
    ...(data.cover ? [`cover_image: ${SITE_URL}${data.cover}`] : []),
    "---",
    "",
  ].join("\n");
  writeFileSync(join(OUT_DIR, "devto", `${slug}.md`), devto + content);

  // Hashnode: paste the body into the editor; set the title, cover, tags and the
  // "originally published at" URL in the article settings (listed at the top).
  const hashnode = [
    `<!--`,
    `Title: ${data.title}`,
    `Subtitle: ${data.summary ?? ""}`,
    `Tags: ${(data.tags ?? []).join(", ")}`,
    `Cover: ${data.cover ? SITE_URL + data.cover : "(none)"}`,
    `Originally published at (canonical URL): ${canonical}`,
    `Delete this comment before publishing.`,
    `-->`,
    "",
  ].join("\n");
  writeFileSync(join(OUT_DIR, "hashnode", `${slug}.md`), hashnode + content);
  count++;
}
console.log(`Exported ${count} post(s) to ${OUT_DIR}/devto and ${OUT_DIR}/hashnode`);
