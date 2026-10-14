import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ArticleTable, { type AdminRow } from '@/components/admin/ArticleTable';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, type, language, status, updated_at, published_at, category:categories(name), article_tags(tag:tags(name))')
    .order('updated_at', { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: AdminRow[] = (data ?? []).map((r: any) => ({
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
  }));

  const published = rows.filter((r) => r.status === 'published').length;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ivory">Your writing</h1>
          <p className="mt-1 text-ivory-dim">
            {rows.length} total - {published} published - {rows.length - published} drafts
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn btn-gold">New article</Link>
      </div>

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
