-- =====================================================================
-- Aniruddha Niloy - database schema, Row Level Security and storage
-- Run this ONCE in: Supabase Dashboard -> SQL Editor -> New query
-- =====================================================================

-- ---------- Administrators ----------
-- Only users listed in this table can manage content.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- A signed-in user may only see their OWN row (used by the app to check
-- "am I an admin?"). Nobody can insert/update/delete through the API.
drop policy if exists "admins_read_own" on public.admins;
create policy "admins_read_own" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- ---------- Categories & tags ----------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- ---------- Articles ----------
-- type: story | poem | mythology | novel | chapter
-- A "chapter" belongs to a "novel" through parent_id.
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  type text not null check (type in ('story', 'poem', 'mythology', 'novel', 'chapter')),
  language text not null default 'en' check (language in ('en', 'bn')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  excerpt text,
  content text not null default '',
  cover_image_url text,
  seo_title text,
  seo_description text,
  category_id uuid references public.categories (id) on delete set null,
  parent_id uuid references public.articles (id) on delete cascade,
  chapter_number integer,
  author_id uuid references auth.users (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists articles_slug_unique
  on public.articles (type, coalesce(parent_id, '00000000-0000-0000-0000-000000000000'::uuid), slug);
create index if not exists articles_status_type_idx on public.articles (status, type, published_at desc);
create index if not exists articles_parent_idx on public.articles (parent_id, chapter_number);
create index if not exists articles_category_idx on public.articles (category_id);

create table if not exists public.article_tags (
  article_id uuid not null references public.articles (id) on delete cascade,
  tag_id uuid not null references public.tags (id) on delete cascade,
  primary key (article_id, tag_id)
);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.articles enable row level security;
alter table public.article_tags enable row level security;

-- Categories: anyone can read, only admins can change
drop policy if exists "categories_read" on public.categories;
create policy "categories_read" on public.categories
  for select to anon, authenticated using (true);
drop policy if exists "categories_admin_write" on public.categories;
create policy "categories_admin_write" on public.categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Tags: anyone can read, only admins can change
drop policy if exists "tags_read" on public.tags;
create policy "tags_read" on public.tags
  for select to anon, authenticated using (true);
drop policy if exists "tags_admin_write" on public.tags;
create policy "tags_admin_write" on public.tags
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Articles: public sees PUBLISHED only. Admins see everything and manage everything.
drop policy if exists "articles_read_published" on public.articles;
create policy "articles_read_published" on public.articles
  for select to anon, authenticated
  using (status = 'published' or public.is_admin());
drop policy if exists "articles_admin_insert" on public.articles;
create policy "articles_admin_insert" on public.articles
  for insert to authenticated with check (public.is_admin());
drop policy if exists "articles_admin_update" on public.articles;
create policy "articles_admin_update" on public.articles
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "articles_admin_delete" on public.articles;
create policy "articles_admin_delete" on public.articles
  for delete to authenticated using (public.is_admin());

-- Article/tag links follow the visibility of the article
drop policy if exists "article_tags_read" on public.article_tags;
create policy "article_tags_read" on public.article_tags
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.articles a
      where a.id = article_id and (a.status = 'published' or public.is_admin())
    )
  );
drop policy if exists "article_tags_admin_write" on public.article_tags;
create policy "article_tags_admin_write" on public.article_tags
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Storage: cover images ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'covers', 'covers', true, 5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "covers_public_read" on storage.objects;
create policy "covers_public_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'covers');

drop policy if exists "covers_admin_insert" on storage.objects;
create policy "covers_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'covers' and public.is_admin());

drop policy if exists "covers_admin_update" on storage.objects;
create policy "covers_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'covers' and public.is_admin())
  with check (bucket_id = 'covers' and public.is_admin());

drop policy if exists "covers_admin_delete" on storage.objects;
create policy "covers_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'covers' and public.is_admin());
