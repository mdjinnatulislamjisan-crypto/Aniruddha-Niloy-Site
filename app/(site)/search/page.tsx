import type { Metadata } from 'next';
import Link from 'next/link';
import { listArticles, listCategories, listTags } from '@/lib/data';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'Search and Categories',
  description: 'Search every story, poem, myth and novel, or browse by category and tag.',
  alternates: { canonical: '/search' },
};

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').trim().slice(0, 80);
  const [results, categories, tags] = await Promise.all([
    q ? listArticles({ q }) : Promise.resolve([]),
    listCategories(),
    listTags(),
  ]);

  return (
    <div className="container-page pb-4">
      <PageHeading title="Search" subtitle="খুঁজুন" intro="Search by title or by any word in the writing, in Bengali or English." />

      <form action="/search" method="get" role="search" className="flex max-w-xl gap-2">
        <label htmlFor="q" className="sr-only">Search the archive</label>
        <input id="q" name="q" type="search" defaultValue={q} placeholder="A word, a title, a name" className="field" />
        <button type="submit" className="btn btn-gold">Search</button>
      </form>

      {q && (
        <section className="mt-12" aria-live="polite">
          <h2 className="font-display text-3xl text-ivory">
            {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{q}&rdquo;
          </h2>
          <div className="mt-6">
            <ArticleGrid articles={results} empty="Nothing matched. Try a shorter word or a different spelling." />
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
