import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, listRelated } from '@/lib/data';
import { SECTIONS } from '@/lib/site';
import { articleMetadata } from '@/lib/seo';
import { articlePath, safeDecode } from '@/lib/utils';
import ArticleView from '@/components/ArticleView';

export const revalidate = 60;

type Props = { params: { section: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = SECTIONS[params.section];
  if (!section) return {};
  const article = await getArticle(section.type, safeDecode(params.slug));
  if (!article) return { title: 'Not found', robots: { index: false } };
  return articleMetadata(article, articlePath(article));
}

export default async function ArticlePage({ params }: Props) {
  const section = SECTIONS[params.section];
  if (!section) notFound();

  const article = await getArticle(section.type, safeDecode(params.slug));
  if (!article) notFound();

  const related = await listRelated(article, 3);

  return (
    <ArticleView
      article={article}
      backHref={`/${params.section}`}
      backLabel={`All ${section.title.toLowerCase()}`}
      related={related}
      relatedTitle="Continue reading"
    />
  );
}
