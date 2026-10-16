-- =====================================================================
-- Adds the category used by the "মনস্তাত্ত্বিক ও দার্শনিক সাহিত্য" section.
-- Run once in: Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to run more than once.
-- =====================================================================

insert into public.categories (name, slug, description)
values (
  'মনস্তাত্ত্বিক ও দার্শনিক সাহিত্য',
  'psychological-philosophical',
  'Psychological and philosophical literature'
)
on conflict (slug) do nothing;

-- Check (you should see one row):
select id, name, slug from public.categories where slug = 'psychological-philosophical';
