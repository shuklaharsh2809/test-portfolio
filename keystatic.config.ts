import { collection, config, fields } from "@keystatic/core";
import { useGithubStorage } from "./lib/keystatic-env";

/**
 * Blog CMS. Open /keystatic to write. See docs/BLOG.md.
 * - Locally (`next dev`) posts are saved straight to content/posts on disk.
 * - On the deployed site you sign in with GitHub and each save is committed to the repo,
 *   which triggers a Vercel redeploy (~1 min) that publishes the change.
 */
export default config({
  storage: useGithubStorage ? { kind: "github", repo: "shuklaharsh2809/test-portfolio" } : { kind: "local" },
  ui: {
    brand: { name: "Harsh Shukla · Blog" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedAt", "draft"],
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { length: { min: 1, max: 120 } } },
          slug: { label: "URL slug", description: "The post lives at /blog/<slug>" },
        }),
        summary: fields.text({
          label: "Summary",
          description: "One or two sentences. Shown on the blog list and in link previews.",
          multiline: true,
          validation: { length: { min: 1, max: 240 } },
        }),
        publishedAt: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are saved but hidden on the site. Untick and save to publish.",
          defaultValue: true,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: "Cover image",
          description: "Optional. Wide images (1600×900) work best.",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: { directory: "public/blog", publicPath: "/blog/" },
          },
        }),
      },
    }),
  },
});
