# Blog: writing and publishing

Posts are written in a visual editor at **`/keystatic`** and stored as files in this repo
(`content/posts/<slug>.mdoc`, images in `public/blog/`). The site builds them into `/blog`,
the homepage "Writing" section, the RSS feed (`/blog/rss.xml`) and the sitemap.

## Write and publish online (after the one-time setup below)

1. Open `https://<your-domain>/keystatic` and click **Log in with GitHub**.
2. **Blog posts → Add**. Fill in Title, Summary, and optional Tags and Cover image.
3. Write in the editor. Use the **Paragraph** dropdown or type `/` for headings, code blocks, images, tables, quotes.
4. **Draft** is ticked by default: saving keeps the post hidden on the site.
5. To publish, untick **Draft** and click **Save**. Keystatic commits the post to `main`, Vercel redeploys,
   and the post is live in about a minute.

To edit or unpublish later, open the post, change it (or tick **Draft** again) and **Save**.

## Write locally

```bash
npx next dev        # or `pnpm dev`
```

Open http://localhost:3000/keystatic. Saving writes files straight to `content/posts/`. Locally, drafts are
visible on `/blog` (with a "Draft" badge) so you can preview them. Commit and push to publish.

## One-time setup: connect the online editor to GitHub

The online editor saves each post as a commit, so it needs a GitHub App. You only do this once.

1. Run the dev server in GitHub mode:
   ```bash
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github npx next dev
   ```
2. Open http://127.0.0.1:3000/keystatic and click **Log in with GitHub**. You'll land on **Keystatic Setup**.
3. **Deployed App URL**: your live site, e.g. `https://your-domain.vercel.app`. Leave the organization blank.
   Click **Create GitHub App**, confirm on GitHub, and you'll be sent back. Keystatic writes four secrets to a
   local `.env` file (it's git-ignored; never commit it).
4. On GitHub, install the new app on the **test-portfolio** repo only
   (GitHub → Settings → Applications → your Keystatic app → Configure).
5. In Vercel → the project → Settings → Environment Variables, add the four values from `.env`
   for Production and Preview:
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
6. Redeploy. `https://<your-domain>/keystatic` now shows the GitHub login.

Until this is done, the live `/keystatic` page shows a "not connected yet" notice; the blog itself works either way.

If your domain changes, update the callback URL in the GitHub App's settings to
`https://<new-domain>/api/keystatic/github/oauth/callback`.

**Who can publish:** only GitHub accounts with write access to the repo can log in and save.
