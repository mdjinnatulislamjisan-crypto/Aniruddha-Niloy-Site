import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTagBySlug, listArticles } from '@/lib/data';
import { safeDecode } from '@/lib/utils';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTagBySlug(safeDecode(params.slug));
  if (!t) return { title: 'Not found', robots: { index: false } };
  return { title: `Tagged: ${t.name}`, description: `Writing tagged ${t.name}.` };
}

export default async function TagPage({ params }: Props) {
  const tag = await getTagBySlug(safeDecode(params.slug));
  if (!tag) notFound();
  const articles = await listArticles({ tagId: tag.id });
  return (
    <div className="container-page pb-4">
      <PageHeading title={`Tagged: ${tag.name}`} />
      <ArticleGrid articles={articles} empty="Nothing carries this tag yet." />
    </div>
  );
}
