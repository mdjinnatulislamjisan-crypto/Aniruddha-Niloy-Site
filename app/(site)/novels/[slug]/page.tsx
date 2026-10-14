import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getChapters } from '@/lib/data';
import { articleMetadata } from '@/lib/seo';
import { articlePath, formatDate, safeDecode } from '@/lib/utils';
import ArticleView from '@/components/ArticleView';

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const novel = await getArticle('novel', safeDecode(params.slug));
  if (!novel) return { title: 'Not found', robots: { index: false } };
  return articleMetadata(novel, articlePath(novel));
}

export default async function NovelPage({ params }: Props) {
  const novel = await getArticle('novel', safeDecode(params.slug));
  if (!novel) notFound();
  const chapters = await getChapters(novel.id);
  const base = `/novels/${encodeURIComponent(novel.slug)}`;

  return (
    <ArticleView article={novel} backHref="/novels" backLabel="All novels">
      <section className="mt-10" aria-labelledby="chapters-heading">
        <h2 id="chapters-heading" className="font-display text-3xl text-ivory">
          Chapters
        </h2>
        {chapters.length === 0 ? (
          <p className="mt-4 text-ivory-faint">Chapters will appear here as they are published.</p>
        ) : (
          <>
            <ol className="mt-4 divide-y divide-charcoal-line border-y border-charcoal-line">
              {chapters.map((c, i) => (
                <li key={c.id}>
                  <Link
                    href={`${base}/${encodeURIComponent(c.slug)}`}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="w-8 shrink-0 font-display text-2xl text-gold-dim group-hover:text-gold">
                      {c.chapter_number ?? i + 1}
                    </span>
                    <span className="flex-1" lang={c.language}>
                      <span className="block font-display text-2xl text-ivory group-hover:text-gold-bright">{c.title}</span>
                      {c.excerpt && <span className="block text-base text-ivory-faint">{c.excerpt}</span>}
                    </span>
                    <span className="hidden text-sm text-ivory-faint sm:block">{formatDate(c.published_at, c.language)}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link href={`${base}/${encodeURIComponent(chapters[0].slug)}`} className="btn btn-gold mt-6">
              Begin with chapter {chapters[0].chapter_number ?? 1}
            </Link>
          </>
        )}
      </section>
    </ArticleView>
  );
}
