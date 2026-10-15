import Link from 'next/link';
import type { Article } from '@/lib/types';
import { SITE, TYPE_LABEL } from '@/lib/site';
import { absoluteUrl, articlePath, formatDate, readingTime } from '@/lib/utils';
import ArticleBody from './ArticleBody';
import ShareButtons from './ShareButtons';
import Ornament from './Ornament';
import ReadingProgress from './ReadingProgress';
import ReaderToolbar from './ReaderToolbar';
import ArticleGrid from './ArticleGrid';
import JsonLd from './JsonLd';

/** Shared reading layout for stories, poems, mythology, novel intros and chapters. */
export default function ArticleView({
  article,
  backHref,
  backLabel,
  shareUrl,
  parentTitle,
  related,
  relatedTitle = 'Continue reading',
  children,
  footer,
}: {
  article: Article;
  backHref: string;
  backLabel: string;
  shareUrl?: string;
  parentTitle?: string;
  related?: Article[];
  relatedTitle?: string;
  children?: React.ReactNode; // extra content after the text (e.g. chapter list)
  footer?: React.ReactNode; // after share (e.g. previous / next chapter)
}) {
  const url = shareUrl ?? absoluteUrl(articlePath(article));
  const path = url.startsWith(SITE.url) ? url.slice(SITE.url.length) || '/' : articlePath(article);
  const isPoem = article.type === 'poem';
  const minutes = readingTime(article.content, article.language);
  const description = article.seo_description?.trim() || article.excerpt?.trim() || undefined;

  const schemaType = article.type === 'poem' ? 'Poem' : article.type === 'novel' ? 'Book' : 'Article';
  const structured: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: article.title,
    headline: article.title,
    url,
    inLanguage: article.language,
    author: { '@type': 'Person', name: SITE.name, url: SITE.url },
    ...(description ? { description } : {}),
    ...(article.published_at ? { datePublished: article.published_at } : {}),
    ...(article.updated_at ? { dateModified: article.updated_at } : {}),
    ...(article.cover_image_url ? { image: article.cover_image_url } : {}),
    ...(parentTitle ? { isPartOf: { '@type': 'Book', name: parentTitle } } : {}),
  };

  return (
    <>
      <ReadingProgress targetId="reader-body" />

      <article className="container-page pb-4 pt-10 sm:pt-14">
        <Link href={backHref} className="text-ivory-faint transition-colors hover:text-gold-bright">
          &larr; {backLabel}
        </Link>

        <header className={`mx-auto mt-8 max-w-3xl ${isPoem ? 'text-center' : ''}`}>
          <p className="text-gold">
            {parentTitle ? `${parentTitle} - ` : ''}
            {article.type === 'chapter' && article.chapter_number
              ? `Chapter ${article.chapter_number}`
              : TYPE_LABEL[article.type]}
            {article.language === 'bn' ? ' (বাংলা)' : ''}
          </p>
          <h1
            lang={article.language}
            className="mt-3 font-display text-4xl font-medium leading-[1.1] text-ivory sm:text-6xl"
          >
            {article.title}
          </h1>
          <p className="mt-5 text-ivory-faint">
            {article.category && (
              <>
                <Link href={`/category/${article.category.slug}`} className="text-ivory-dim transition-colors hover:text-gold-bright">
                  {article.category.name}
                </Link>
                {' - '}
              </>
            )}
            <time dateTime={article.published_at ?? undefined}>{formatDate(article.published_at, article.language)}</time>
            {' - '}
            {minutes} min read
          </p>
        </header>

        {article.cover_image_url && (
          <div className="mx-auto mt-10 max-w-4xl border border-charcoal-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={article.cover_image_url} alt={`Cover image for ${article.title}`} className="max-h-[32rem] w-full object-cover" />
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <ReaderToolbar
            href={path}
            url={url}
            title={article.title}
            type={article.type}
            language={article.language}
            excerpt={article.excerpt}
          />

          <div
            id="reader-body"
            className={`reader-surface mt-6 px-6 py-10 sm:px-14 sm:py-16 ${isPoem ? 'text-center' : ''}`}
          >
            <div className="mx-auto max-w-reading">
              <ArticleBody content={article.content} type={article.type} language={article.language} />
            </div>
            <p aria-hidden="true" className="mt-10 text-center text-xs" style={{ color: 'var(--reader-accent)' }}>
              &#9670;
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-reading">
          <Ornament />
          {children}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((t) => (
                <Link key={t.id} href={`/tag/${t.slug}`} className="chip">
                  {t.name}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8">
            <ShareButtons url={url} title={article.title} />
          </div>
          {footer}
        </div>
      </article>

      {related && related.length > 0 && (
        <section className="container-page mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-3xl text-ivory">
            {relatedTitle}
          </h2>
          <div className="mt-6">
            <ArticleGrid articles={related} />
          </div>
        </section>
      )}

      <JsonLd data={structured} />
    </>
  );
}
