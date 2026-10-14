import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticle, listArticles } from '@/lib/data';
import { SECTIONS } from '@/lib/site';
import { articleMetadata } from '@/lib/seo';
import { articlePath, safeDecode } from '@/lib/utils';
import ArticleView from '@/components/ArticleView';
import ArticleGrid from '@/components/ArticleGrid';

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

  const more = await listArticles({ types: [section.type], limit: 3, excludeId: article.id });

  return (
    <>
      <ArticleView article={article} backHref={`/${params.section}`} backLabel={`All ${section.title.toLowerCase()}`} />
      {more.length > 0 && (
        <section className="container-page mt-20">
          <h2 className="font-display text-3xl text-ivory">More {section.title.toLowerCase()}</h2>
          <div className="mt-6">
            <ArticleGrid articles={more} />
          </div>
        </section>
      )}
    </>
  );
}
