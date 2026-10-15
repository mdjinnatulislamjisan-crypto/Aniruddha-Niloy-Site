import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getChapterView } from '@/lib/data';
import { articleMetadata } from '@/lib/seo';
import { absoluteUrl, safeDecode } from '@/lib/utils';
import ArticleView from '@/components/ArticleView';

export const revalidate = 60;

type Props = { params: { slug: string; chapter: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const view = await getChapterView(safeDecode(params.slug), safeDecode(params.chapter));
  if (!view) return { title: 'Not found', robots: { index: false } };
  const path = `/novels/${encodeURIComponent(view.novel.slug)}/${encodeURIComponent(view.chapter.slug)}`;
  const meta = articleMetadata(view.chapter, path);
  return { ...meta, title: `${view.chapter.seo_title || view.chapter.title} - ${view.novel.title}` };
}

export default async function ChapterPage({ params }: Props) {
  const view = await getChapterView(safeDecode(params.slug), safeDecode(params.chapter));
  if (!view) notFound();

  const { novel, chapter, chapters, prev, next } = view;
  const position = chapters.findIndex((c) => c.id === chapter.id) + 1;
  const base = `/novels/${encodeURIComponent(novel.slug)}`;
  const path = (slug: string) => `${base}/${encodeURIComponent(slug)}`;

  return (
    <ArticleView
      article={chapter}
      backHref={base}
      backLabel={novel.title}
      parentTitle={novel.title}
      shareUrl={absoluteUrl(path(chapter.slug))}
      footer={
        <nav aria-label="Chapter navigation" className="mt-10 border-t border-charcoal-line pt-6">
          <p className="mb-4 text-center text-sm text-ivory-faint">
            Chapter {position} of {chapters.length} -{' '}
            <Link href={base} className="underline hover:text-gold-bright">all chapters</Link>
          </p>
          <div className="grid grid-cols-2 gap-4">
          <div>
            {prev && (
              <Link href={path(prev.slug)} className="group block">
                <span className="text-sm text-ivory-faint">Previous</span>
                <span className="block font-display text-xl text-ivory group-hover:text-gold-bright" lang={prev.language}>
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next ? (
              <Link href={path(next.slug)} className="group block">
                <span className="text-sm text-ivory-faint">Next</span>
                <span className="block font-display text-xl text-ivory group-hover:text-gold-bright" lang={next.language}>
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link href={base} className="group block">
                <span className="text-sm text-ivory-faint">End of published chapters</span>
                <span className="block font-display text-xl text-ivory group-hover:text-gold-bright">Back to {novel.title}</span>
              </Link>
            )}
          </div>
          </div>
        </nav>
      }
    />
  );
}
