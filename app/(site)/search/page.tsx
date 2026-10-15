import type { Metadata } from 'next';
import Link from 'next/link';
import { listArticles, listCategories, listTags } from '@/lib/data';
import type { ArticleType } from '@/lib/types';
import ArticleGrid from '@/components/ArticleGrid';
import FilterForm from '@/components/FilterForm';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Search and Categories',
  description: 'Search every story, poem, myth and novel, or browse by category and tag.',
  alternates: { canonical: '/search' },
};

const TYPES: ArticleType[] = ['story', 'poem', 'mythology', 'novel'];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string; lang?: string; category?: string; sort?: string };
}) {
  const q = (searchParams.q ?? '').trim().slice(0, 80);
  const type = TYPES.find((t) => t === searchParams.type);
  const lang = searchParams.lang === 'bn' || searchParams.lang === 'en' ? searchParams.lang : undefined;
  const sort = searchParams.sort === 'oldest' ? 'oldest' : 'newest';

  const [categories, tags] = await Promise.all([listCategories(), listTags()]);
  const category = categories.find((c) => c.slug === searchParams.category);

  const hasQuery = Boolean(q || type || lang || category || sort === 'oldest');
  const results = hasQuery
    ? await listArticles({
        q: q || undefined,
        types: type ? [type] : undefined,
        language: lang,
        categoryId: category?.id,
        sort,
      })
    : [];

  return (
    <div className="container-page pb-4">
      <PageHeading title="Search" subtitle="খুঁজুন" intro="Search by title or by any word in the writing, in Bengali or English. Narrow it down by type, language or category." />

      <FilterForm
        action="/search"
        showQuery
        showType
        values={{ q, type, lang, category: category?.slug, sort }}
        categories={categories}
      />

      {hasQuery && (
        <section className="mt-12" aria-live="polite" aria-labelledby="results-heading">
          <h2 id="results-heading" className="font-display text-3xl text-ivory">
            {results.length} {results.length === 1 ? 'result' : 'results'}
            {q ? <> for &ldquo;{q}&rdquo;</> : null}
          </h2>
          <div className="mt-6">
            <ArticleGrid articles={results} empty="Nothing matched. Try a shorter word, a different spelling, or reset the filters." />
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className="font-display text-3xl text-ivory">Categories</h2>
        {categories.length === 0 ? (
          <p className="mt-3 text-ivory-faint">No categories yet.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="chip">{c.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl text-ivory">Tags</h2>
        {tags.length === 0 ? (
          <p className="mt-3 text-ivory-faint">No tags yet.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t.id}>
                <Link href={`/tag/${t.slug}`} className="chip">{t.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
