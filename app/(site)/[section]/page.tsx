import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { listArticles, listCategories } from '@/lib/data';
import { SECTIONS, SITE } from '@/lib/site';
import ArticleGrid from '@/components/ArticleGrid';
import FilterForm from '@/components/FilterForm';
import JsonLd from '@/components/JsonLd';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

export function generateMetadata({ params }: { params: { section: string } }): Metadata {
  const s = SECTIONS[params.section];
  if (!s) return {};
  return {
    title: s.title,
    description: s.blurb,
    alternates: { canonical: `/${params.section}` },
    openGraph: { title: `${s.title} | ${SITE.name}`, description: s.blurb, url: `${SITE.url}/${params.section}` },
  };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: { section: string };
  searchParams: { lang?: string; category?: string; sort?: string };
}) {
  const section = SECTIONS[params.section];
  if (!section) notFound();

  const lang = searchParams.lang === 'bn' || searchParams.lang === 'en' ? searchParams.lang : undefined;
  const sort = searchParams.sort === 'oldest' ? 'oldest' : 'newest';
  const categories = await listCategories();
  const category = categories.find((c) => c.slug === searchParams.category);

  const articles = await listArticles({
    types: [section.type],
    language: lang,
    categoryId: category?.id,
    sort,
  });

  const filtered = Boolean(lang || category || sort === 'oldest');

  return (
    <div className="container-page pb-4">
      <PageHeading title={section.title} subtitle={section.titleBn} intro={section.blurb} />
      <FilterForm
        action={`/${params.section}`}
        values={{ lang, category: category?.slug, sort }}
        categories={categories}
      />
      <p className="mb-6 mt-6 text-ivory-faint" aria-live="polite">
        {articles.length} {articles.length === 1 ? 'piece' : 'pieces'}
        {filtered ? ' match your choices' : ''}
      </p>
      <ArticleGrid
        articles={articles}
        empty={filtered ? 'Nothing matches these choices. Try resetting the filters.' : 'Nothing has been published here yet.'}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${section.title} by ${SITE.name}`,
          url: `${SITE.url}/${params.section}`,
          description: section.blurb,
        }}
      />
    </div>
  );
}
