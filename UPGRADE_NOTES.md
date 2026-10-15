# Design and reading upgrade

This upgrade is built on your existing project. Same Next.js 14 / TypeScript / Tailwind / Supabase stack, same routes, same database, same environment variable names, same admin login. No database change is needed.

## What changed for readers

- **Reading pages** (stories, poems, mythology, novels, chapters)
  - Ivory "paper" page on the dark site, with a night page option (button in the reading bar).
  - Text size A- / A+ (5 steps). Theme and size are remembered in the reader's own browser.
  - Reading progress line at the top, reading time, comfortable 40-character-wide column, better paragraph spacing.
  - Save (bookmark) and Share buttons. Share opens the phone's native share sheet when available, otherwise copies the link.
  - "Continue reading" related writings (same category first, then same type).
  - Chapters show "Chapter 2 of 5", a link to all chapters, and Previous / Next.
  - Your text is rendered exactly as stored. Nothing is rewritten.
- **Saved page** (`/bookmarks`): bookmarks live only in the visitor's browser (localStorage). No accounts, no sign-up, no comments.
- **Search and filters**: search by any word, filter by type, language, category, and sort newest/oldest. The section pages (Stories, Poetry, Mythology) have the same filters.
- **Homepage**: new hero with a featured ivory card (your latest piece), then Recent, Poetry, Stories, Novels and Mythology rows, categories, an author strip, and the original "Where to wander" links. Every section uses real content from your database. If a section is empty, an elegant empty state is shown. Nothing is invented.
- **Navigation**: current page highlighted, Bengali name in the header, improved mobile menu (closes on page change and with Escape), richer footer.
- **Loading and error states** for public pages and the admin area.

## What changed in the admin

- Dashboard counts (published, drafts, per type).
- "View" link on published rows (works for chapters too).
- Editor: word count, "unsaved changes" label and a browser warning before leaving with unsaved work, preview now uses the real reading page, "View live page" works for chapters.
- Login, logout, route protection, create / edit / publish / unpublish / delete are unchanged.

## SEO

- Production URL default: `https://aniruddha-niloy-site.onrender.com` (used if `NEXT_PUBLIC_SITE_URL` is empty; Render's own `RENDER_EXTERNAL_URL` is also understood).
- Structured data: Person and WebSite on every page; Poem / Article / Book (with real published and modified dates, only when they exist) on writing pages; CollectionPage on section pages. No ratings, reviews or invented credentials.
- Default social-sharing image (`/opengraph-image`) with your name; a piece with a cover image uses its cover.
- `/admin` and `/api` stay disallowed in robots.txt and the admin pages are `noindex`. `/bookmarks` is `noindex`.

## Fixes carried over from your deployed version

The build fixes you applied locally are included, so you can safely overwrite your files with these:
Google Fonts loaded through a `<link>` tag, typed `setAll(cookiesToSet)` in the two Supabase cookie files, and safe site-URL parsing in `lib/site.ts`.

## Database

No migration required. `supabase/` is unchanged.

## What was and was not verified

Checked: TypeScript syntax on every file, every internal import resolves, no secrets in the project, `.env.local` not included, `.gitignore` unchanged.
NOT checked (the build environment had no internet, so `npm install` and `npm run build` could not run): the production build, how the pages look in a browser, mobile layout on a real phone, share sheet behaviour, and the generated social image. Run `npm run build` locally before pushing, and look through the site after deploying.
