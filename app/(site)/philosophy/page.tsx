import type { Metadata } from 'next';
import { listArticles, listCategories } from '@/lib/data';
import { PHILOSOPHY, SITE } from '@/lib/site';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

export const metadata: Metadata = {
  title: PHILOSOPHY.titleBn,
  description: `${PHILOSOPHY.title} by ${SITE.name}.`,
  alternates: { canonical: PHILOSOPHY.path },
  openGraph: {
    title: `${PHILOSOPHY.titleBn} | ${SITE.name}`,
    description: `${PHILOSOPHY.title} by ${SITE.name}.`,
    url: `${SITE.url}${PHILOSOPHY.path}`,
  },
};

export default async function PhilosophyPage() {
  const categories = await listCategories();
  const category = categories.find((c) => c.slug === PHILOSOPHY.slug);
  const articles = category ? await listArticles({ categoryId: category.id }) : [];

  return (
    <div className="container-page pb-4">
      <PageHeading title={PHILOSOPHY.titleBn} intro={PHILOSOPHY.title} />
      <ArticleGrid
        articles={articles}
        empty={
          category
            ? 'এখানে এখনো কিছু প্রকাশিত হয়নি। Nothing has been published here yet.'
            : 'This section is not set up yet. Run supabase/add_philosophy_category.sql in Supabase.'
        }
      />
    </div>
  );
}
