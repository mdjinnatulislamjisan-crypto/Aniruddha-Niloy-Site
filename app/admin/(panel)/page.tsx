import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TYPE_LABEL, TYPE_PATH } from '@/lib/site';
import type { ArticleType } from '@/lib/types';
import ArticleTable, { type AdminRow } from '@/components/admin/ArticleTable';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, title, slug, type, language, status, parent_id, updated_at, published_at, category:categories(name), article_tags(tag:tags(name))'
    )
    .order('updated_at', { ascending: false });

  const raw = data ?? [];
  const novelSlugById = new Map<string, string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const r of raw as any[]) if (r.type === 'novel') novelSlugById.set(r.id, r.slug);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: AdminRow[] = (raw as any[]).map((r) => {
    let live: string | null = null;
    if (r.type === 'chapter') {
      const novelSlug = novelSlugById.get(r.parent_id);
      if (novelSlug) live = `/novels/${encodeURIComponent(novelSlug)}/${encodeURIComponent(r.slug)}`;
    } else {
      live = `${TYPE_PATH[r.type as ArticleType]}/${encodeURIComponent(r.slug)}`;
    }
    return {
      id: r.id,
      title: r.title,
      slug: r.slug,
      type: r.type,
      language: r.language,
      status: r.status,
      updated_at: r.updated_at,
      published_at: r.published_at,
      category_name: r.category?.name ?? null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tag_names: (r.article_tags ?? []).map((t: any) => t.tag?.name).filter(Boolean),
      live_path: live,
    };
  });

  const published = rows.filter((r) => r.status === 'published').length;
  const drafts = rows.length - published;
  const byType = (Object.keys(TYPE_LABEL) as ArticleType[]).map((t) => ({
    type: t,
    count: rows.filter((r) => r.type === t).length,
  }));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ivory">Your writing</h1>
          <p className="mt-1 text-ivory-dim">Everything you publish here appears on the website straight away.</p>
        </div>
        <Link href="/admin/articles/new" className="btn btn-gold">New article</Link>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <div className="border border-gold-dim bg-charcoal p-4">
          <dt className="text-sm text-ivory-faint">Published</dt>
          <dd className="font-display text-4xl text-gold-bright">{published}</dd>
        </div>
        <div className="border border-charcoal-line bg-charcoal p-4">
          <dt className="text-sm text-ivory-faint">Drafts</dt>
          <dd className="font-display text-4xl text-ivory">{drafts}</dd>
        </div>
        {byType.map((b) => (
          <div key={b.type} className="border border-charcoal-line bg-charcoal p-4">
            <dt className="text-sm text-ivory-faint">{TYPE_LABEL[b.type]}s</dt>
            <dd className="font-display text-4xl text-ivory">{b.count}</dd>
          </div>
        ))}
      </dl>

      {error && (
        <p role="alert" className="mt-6 border border-blood px-3 py-2 text-[#e08a8a]">
          Could not load articles: {error.message}. Did you run supabase/migrations/001_schema.sql?
        </p>
      )}

      <div className="mt-8">
        <ArticleTable rows={rows} />
      </div>
    </>
  );
}
