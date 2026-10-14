-- =====================================================================
-- OPTIONAL: fictional placeholder content so the site looks alive.
-- Run AFTER 001_schema.sql. Everything here carries the tag
-- "placeholder" so you can find and delete it from the admin dashboard.
-- All names, places and stories below are invented.
-- =====================================================================

insert into public.categories (name, slug, description) values
  ('Gothic Tales', 'gothic-tales', 'Stories of fog, candlelight and things that wait.'),
  ('Night Verse', 'night-verse', 'Poems written after midnight.'),
  ('Myths Retold', 'myths-retold', 'Original mythological fiction.'),
  ('Serials', 'serials', 'Novels released chapter by chapter.')
on conflict (slug) do nothing;

insert into public.tags (name, slug) values
  ('placeholder', 'placeholder'),
  ('night', 'night'),
  ('memory', 'memory'),
  ('river', 'river'),
  ('ghosts', 'ghosts')
on conflict (slug) do nothing;

-- ---------- Story ----------
insert into public.articles (title, slug, type, language, status, excerpt, content, category_id, published_at, seo_title, seo_description)
select
  'The Lamplighter of Marrowgate', 'the-lamplighter-of-marrowgate', 'story', 'en', 'published',
  'Every dusk a lamplighter climbs the same hill. Tonight, one lamp refuses to burn.',
  E'On the hill above Marrowgate there were forty lamps, and Edric Vane lit them all.\n\nHe had done it for thirty winters. The village below believed he did it for the wage, which was small, and for the quiet, which was large. Nobody asked him anything else.\n\nOn the last night of October the fortieth lamp would not catch. He trimmed the wick. He cupped the match against the wind. The flame leaned toward the churchyard as if it were listening.\n\n"Not tonight," Edric said, to no one.\n\nBehind him, very gently, someone said, "Please."\n\nHe did not turn around. Thirty winters had taught him that some requests are answered by lighting the lamp, and some by leaving it dark. He stood a long while with the match burning down to his fingers.\n\n*This is a fictional placeholder story. Delete it from the admin dashboard whenever you like.*',
  (select id from public.categories where slug = 'gothic-tales'),
  now() - interval '3 days',
  'The Lamplighter of Marrowgate - A Gothic Short Story',
  'A short gothic story about a lamplighter, a lamp that will not burn, and a voice in the dark.'
where not exists (select 1 from public.articles where type = 'story' and slug = 'the-lamplighter-of-marrowgate');

-- ---------- English poem ----------
insert into public.articles (title, slug, type, language, status, excerpt, content, category_id, published_at)
select
  'What the River Keeps', 'what-the-river-keeps', 'poem', 'en', 'published',
  'A short poem about the things water refuses to forget.',
  E'The river does not hurry.\nIt has learned that everything arrives.\n\nIt keeps the lantern someone dropped,\nthe name a child once carved,\nthe quiet of a thousand evenings\nfolded small beneath its stones.\n\nAsk it nothing.\nStand a while.\nThe dark will tell you\nwhat the dark remembers.\n\n*(Fictional placeholder poem.)*',
  (select id from public.categories where slug = 'night-verse'),
  now() - interval '5 days'
where not exists (select 1 from public.articles where type = 'poem' and slug = 'what-the-river-keeps');

-- ---------- Bengali poem ----------
insert into public.articles (title, slug, type, language, status, excerpt, content, category_id, published_at)
select
  'নীলরাত্রি', 'nilorattri', 'poem', 'bn', 'published',
  'রাত আর স্মৃতির একটি ছোট কবিতা।',
  E'আঁধার নামে নদীর বুকে,\nচাঁদ ভাসে এক মৌন সুখে।\nআমি শুধু জেগে থাকি,\nস্মৃতির প্রদীপ বুকে রাখি।\n\nপুরোনো দিনের গল্পগুলো\nফিরে আসে হাওয়ায় দুলে,\nনিঃশব্দ এই রাতের কাছে\nসব কথা যায় খুলে।\n\n*(কাল্পনিক নমুনা কবিতা। চাইলে মুছে ফেলুন।)*',
  (select id from public.categories where slug = 'night-verse'),
  now() - interval '7 days'
where not exists (select 1 from public.articles where type = 'poem' and slug = 'nilorattri');

-- ---------- Mythology ----------
insert into public.articles (title, slug, type, language, status, excerpt, content, category_id, published_at)
select
  'The Moon-Weaver of Kalpantar', 'the-moon-weaver-of-kalpantar', 'mythology', 'en', 'published',
  'In a world older than names, one weaver spins the phases of the moon from river-silk.',
  E'Before the first dawn had learned its own colour, there lived a weaver named Sarvani in the valley of Kalpantar.\n\nShe spun no cloth for kings. She spun the moon.\n\nEach night she drew a single thread of river-silk across the loom of the sky, thin as a held breath, and the moon grew by one thread. Each night after the full, she unpicked a thread, and the moon grew small again. The gods called this a duty. Sarvani called it a conversation.\n\n"The sky must be answered," she told her apprentice, a young crow with one white feather. "Whoever stops answering, loses the sky."\n\nThe war of the seven thrones was fought beneath her loom, and the thrones fell, and the weaver never once looked down.\n\n*This is an original fictional placeholder myth, invented for this template.*',
  (select id from public.categories where slug = 'myths-retold'),
  now() - interval '10 days'
where not exists (select 1 from public.articles where type = 'mythology' and slug = 'the-moon-weaver-of-kalpantar');

-- ---------- Novel + chapters ----------
insert into public.articles (title, slug, type, language, status, excerpt, content, category_id, published_at)
select
  'The Salt Lantern', 'the-salt-lantern', 'novel', 'en', 'published',
  'A drowned lighthouse, a missing keeper, and a daughter who can hear the sea counting.',
  E'When the keeper of Hollowmere Light vanished, he left behind a logbook with the last page torn out and a lantern that burned with a flame the colour of salt.\n\nHis daughter, Isolde, comes home to settle the estate. She intends to stay one week.\n\nThe sea has other plans.\n\n*A fictional placeholder novel with two sample chapters. Delete it freely.*',
  (select id from public.categories where slug = 'serials'),
  now() - interval '14 days'
where not exists (select 1 from public.articles where type = 'novel' and slug = 'the-salt-lantern');

insert into public.articles (title, slug, type, language, status, excerpt, content, parent_id, chapter_number, published_at)
select
  'The Road to Hollowmere', 'the-road-to-hollowmere', 'chapter', 'en', 'published',
  'Isolde returns to a house that has been waiting.',
  E'The bus left her at the crossroads, where the signpost had lost every name but one.\n\nIsolde walked the last two miles with her coat buttoned to the chin. The marsh on either side was the colour of old pewter, and somewhere beyond it the sea was breathing in long, patient counts.\n\nShe did not yet know that it was counting down.\n\nHollowmere Light rose out of the mist the way a memory rises, all at once and slightly wrong. The door was unlocked. On the table lay a single cup of tea, still warm.',
  (select id from public.articles where type = 'novel' and slug = 'the-salt-lantern'),
  1,
  now() - interval '14 days'
where not exists (select 1 from public.articles where type = 'chapter' and slug = 'the-road-to-hollowmere')
  and exists (select 1 from public.articles where type = 'novel' and slug = 'the-salt-lantern');

insert into public.articles (title, slug, type, language, status, excerpt, content, parent_id, chapter_number, published_at)
select
  'The Logbook', 'the-logbook', 'chapter', 'en', 'published',
  'Thirty years of weather, and one missing page.',
  E'Her father wrote in pencil, always pencil, because ink, he used to say, was a promise.\n\nIsolde turned the pages by lamplight. *Wind NNE. Fog by noon. A ship that did not answer.* Entry after entry, thirty years of small honest weather.\n\nThen the last page, torn so cleanly that the edge was almost a line of verse.\n\nOutside, the sea reached the number it had been counting toward, and the salt lantern flared awake.',
  (select id from public.articles where type = 'novel' and slug = 'the-salt-lantern'),
  2,
  now() - interval '13 days'
where not exists (select 1 from public.articles where type = 'chapter' and slug = 'the-logbook')
  and exists (select 1 from public.articles where type = 'novel' and slug = 'the-salt-lantern');

-- ---------- Draft (visible to admins only) ----------
insert into public.articles (title, slug, type, language, status, excerpt, content)
select
  'An Unfinished Draft', 'an-unfinished-draft', 'story', 'en', 'draft',
  'This draft is hidden from visitors.',
  'Drafts are only visible to administrators. Publish it when it is ready.'
where not exists (select 1 from public.articles where type = 'story' and slug = 'an-unfinished-draft');

-- ---------- Tag everything with "placeholder" ----------
insert into public.article_tags (article_id, tag_id)
select a.id, (select id from public.tags where slug = 'placeholder')
from public.articles a
where a.slug in (
  'the-lamplighter-of-marrowgate', 'what-the-river-keeps', 'nilorattri',
  'the-moon-weaver-of-kalpantar', 'the-salt-lantern', 'the-road-to-hollowmere',
  'the-logbook', 'an-unfinished-draft'
)
on conflict do nothing;

insert into public.article_tags (article_id, tag_id)
select a.id, t.id from public.articles a, public.tags t
where (a.slug, t.slug) in (
  ('the-lamplighter-of-marrowgate', 'night'),
  ('the-lamplighter-of-marrowgate', 'ghosts'),
  ('what-the-river-keeps', 'river'),
  ('what-the-river-keeps', 'memory'),
  ('nilorattri', 'night'),
  ('nilorattri', 'memory')
)
on conflict do nothing;
