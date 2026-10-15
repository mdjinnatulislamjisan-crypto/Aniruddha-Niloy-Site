# Aniruddha Niloy - Literary Website

A dark, gothic literary website for publishing Bengali and English poems, stories, novels (with chapters) and original mythological fiction.

**Built with:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (Auth, Database, Storage), deployable on Vercel.

---

## What you get

**Public website**
Home, Stories, Poetry, Mythology, Novels with chapters, About the Author, Search, categories and tags, individual article pages, SEO metadata (titles, descriptions, Open Graph, sitemap, robots.txt), and share buttons (Facebook, X, WhatsApp, copy link). Bengali text is fully supported.

**Admin dashboard** at `/admin`
Secure login and logout, create / edit / preview / publish / unpublish articles, drafts, delete with confirmation, categories and tags, cover image upload, SEO title and description. Everything is saved in Supabase, so it persists after deployment.

**Security**
Real Supabase Authentication. Row Level Security (RLS) is enabled on every table. Only users listed in the `admins` table can create, edit or delete anything. Visitors can only read **published** articles. Only the public "anon" key is used in the code. There is no service-role key anywhere in the project.

---

## Part 1 - Install the tools (Windows 11)

1. **Node.js (LTS version).** Download from <https://nodejs.org> and run the installer, accepting the defaults.
2. **Visual Studio Code.** Download from <https://code.visualstudio.com> and install it.
3. **Check Node works.** Press the Windows key, type `cmd`, press Enter, then run:
   ```
   node -v
   npm -v
   ```
   Both should print version numbers (Node 18.17 or newer is required).

## Part 2 - Open the project in VS Code

1. Right-click `Aniruddha_Niloy_Website.zip` and choose **Extract All...**. Pick a simple location such as `C:\Projects`.
2. Open VS Code. Choose **File -> Open Folder...** and select the extracted `Aniruddha_Niloy_Website` folder (the one that contains `package.json`).
3. Open the built-in terminal: **Terminal -> New Terminal**.
4. Install the dependencies (this takes a minute or two):
   ```
   npm install
   ```

> If PowerShell says "running scripts is disabled", switch the terminal to Command Prompt (the `+` dropdown in the terminal panel -> *Command Prompt*) and try again.

## Part 3 - Create your Supabase project

1. Create a free account at <https://supabase.com> and click **New project**. Choose a name, a strong database password (save it somewhere safe), and the region closest to your readers.
2. Wait until the project finishes setting up.

### 3a. Create the database tables and security rules

1. In Supabase, open **SQL Editor -> New query**.
2. In VS Code, open `supabase/migrations/001_schema.sql`, select all (Ctrl+A), copy (Ctrl+C).
3. Paste into the Supabase SQL Editor and click **Run**. It should say "Success". This creates:
   - the tables (articles, categories, tags, article_tags, admins)
   - Row Level Security policies
   - the public `covers` storage bucket for cover images, with admin-only upload rules

### 3b. Create the first administrator

1. In Supabase, open **Authentication -> Users -> Add user -> Create new user**.
2. Enter **your email** and a **strong password**. Tick **Auto Confirm User**. Click **Create user**.
3. Open `supabase/create_admin.sql` in VS Code. Replace `REPLACE_WITH_YOUR_EMAIL@example.com` with the same email.
4. Copy the whole file into a new SQL Editor query and click **Run**. You should see one row with your email at the bottom. That means your account is now an administrator.

### 3c. Turn off public sign-ups (recommended)

Go to **Authentication -> Sign In / Providers** (or **Settings**) and turn **off** "Allow new users to sign up". Even if left on, strangers cannot manage content (RLS blocks them), but there is no reason to allow it.

### 3d. (Optional) Add the placeholder articles

To see the site with demo content, run `supabase/seed.sql` in the SQL Editor the same way. All demo pieces are fictional and tagged **placeholder**. You can delete them later from the dashboard (filter by "placeholder").

## Part 4 - Configure environment variables

1. In VS Code, in the Explorer panel, right-click `.env.example` -> **Copy**, then right-click empty space -> **Paste**, and rename the copy to **`.env.local`**.
   (Or in the terminal: `copy .env.example .env.local`)
2. In Supabase open **Project Settings -> API**. Copy:
   - **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`
   - the **anon / publishable** key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Leave `NEXT_PUBLIC_SITE_URL=http://localhost:3000` for now.
4. Replace the two social links with your real Facebook and Instagram URLs when you have them.

> **Never** copy the `service_role` / `secret` key into this project. It is not needed and would give anyone who sees it full access to your database.

`.env.local` is ignored by Git, so your keys will not be uploaded by accident.

## Part 5 - Run the website locally

```
npm run dev
```

Open <http://localhost:3000> for the public site and <http://localhost:3000/admin> for the dashboard. Sign in with the email and password from step 3b.

To check the production build (optional, recommended before deploying):

```
npm run build
```

## Part 6 - Using the dashboard

- **New article:** pick the type (Story, Poem, Mythology, Novel, Chapter), language, category and tags, write in Markdown, then **Save draft** or **Publish**.
- **Preview:** use the **Preview** tab above the editor to see the real reading layout.
- **Unpublish:** open a published article and click **Unpublish**. It becomes a draft and disappears from the public site immediately.
- **Poems:** every line break is kept exactly as you type it. Leave a blank line between stanzas.
- **Novels and chapters:** first create an article of type **Novel** (its text is the synopsis). Then create articles of type **Chapter**, choose the novel they belong to, and give each a chapter number.
- **Cover images:** upload JPG, PNG or WebP up to 5 MB. They are stored in Supabase Storage.
- **SEO:** the SEO title and description override what search engines and social networks show. If left empty, the title and excerpt are used.
- **Slugs:** the slug becomes the web address. Bengali titles work, but a short English slug (for example `nilorattri`) gives cleaner links.

### Editing your biography and social links
- About page text: `app/(site)/about/page.tsx`
- Facebook / Instagram: `.env.local` (and the same variables in Vercel)
- Colors: `tailwind.config.ts`

## Part 7 - Deploy to Vercel

1. Create a free account at <https://github.com> and a **new private repository**.
2. Upload the project (do **not** upload `node_modules` or `.env.local`; `.gitignore` already excludes them). Easiest way: install **GitHub Desktop**, choose **Add local repository**, then **Publish repository**.
3. Create a free account at <https://vercel.com> (sign in with GitHub) and click **Add New -> Project**. Import your repository. Vercel detects Next.js automatically.
4. Before clicking **Deploy**, open **Environment Variables** and add (same names as `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your final address, e.g. `https://your-project.vercel.app` or your own domain)
   - `NEXT_PUBLIC_FACEBOOK_URL`
   - `NEXT_PUBLIC_INSTAGRAM_URL`
5. Click **Deploy**.
6. In Supabase open **Authentication -> URL Configuration** and set **Site URL** to your Vercel address.
7. If you later add a custom domain in Vercel, update `NEXT_PUBLIC_SITE_URL` and the Supabase Site URL, then redeploy.

Your content lives in Supabase, so publishing new articles never requires redeploying.

## Troubleshooting

| Problem | Fix |
|---|---|
| Login page says "Supabase is not configured" | `.env.local` is missing or has empty values. Fill it in and restart `npm run dev`. |
| "Sign-in failed" | Check email and password. Make sure the user was created with **Auto Confirm User**. |
| "Access denied" after signing in | You skipped step 3b. Run `supabase/create_admin.sql` with your exact email. |
| "Could not load articles ... relation does not exist" | Run `supabase/migrations/001_schema.sql` (step 3a). |
| Image upload fails | The `covers` bucket is created by the migration. Re-run it, and confirm the file is under 5 MB. |
| Public pages are empty | Articles must be **Published**. Drafts are hidden from visitors by design. |
| Changes take a moment to show | Public pages are cached for up to 60 seconds. Saving in the dashboard refreshes the cache immediately. |
| `npm run build` fails on fonts | The build downloads Google Fonts, so it needs an internet connection. |

## Project structure

```
app/
  (site)/            public pages (home, sections, novels, about, search, category, tag)
  admin/             login + protected dashboard, editor, categories and tags
  api/revalidate/    admin-only cache refresh
  sitemap.ts, robots.ts
components/          public components; components/admin = dashboard components
lib/                 data access, Supabase clients, helpers, site settings
supabase/            SQL: migrations/001_schema.sql, create_admin.sql, seed.sql
middleware.ts        refreshes the session and protects /admin
```

## How security works (short version)

1. `middleware.ts` redirects signed-out visitors away from `/admin`.
2. Every admin page also checks, on the server, that the user exists in the `admins` table.
3. The real protection is in the database: RLS policies allow writes only when `is_admin()` is true and allow public reads only for `status = 'published'`. Even someone calling your Supabase API directly cannot bypass this.
4. Markdown is rendered without raw HTML, so article text cannot inject scripts.

---

## Deploying on Render (current production setup)

Live site: <https://aniruddha-niloy-site.onrender.com>

In your Render **Web Service**:

| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Environment | Node (set `NODE_VERSION` to `20` if a build complains about the Node version) |

Environment variables (same names as `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`.

> `NEXT_PUBLIC_*` values are baked in while the site builds. After changing any of them, run **Manual Deploy -> Clear build cache & deploy** on Render.

Updating the live site after you change code: commit and push to GitHub. Render redeploys automatically when Auto-Deploy is on. Articles you write in the admin dashboard never need a redeploy.

See `UPGRADE_NOTES.md` for what changed in the design upgrade.
