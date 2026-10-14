import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, listArticles } from '@/lib/data';
import { safeDecode } from '@/lib/utils';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = await getCategoryBySlug(safeDecode(params.slug));
  if (!c) return { title: 'Not found', robots: { index: false } };
  return { title: `Category: ${c.name}`, description: c.description ?? `Writing filed under ${c.name}.` };
}

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(safeDecode(params.slug));
  if (!category) notFound();
  const articles = await listArticles({ categoryId: category.id });
  return (
    <div className="container-page pb-4">
      <PageHeading title={category.name} intro={category.description ?? undefined} />
      <ArticleGrid articles={articles} empty="Nothing is filed under this category yet." />
    </div>
  );
}
