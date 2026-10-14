import Link from 'next/link';
import type { Article } from '@/lib/types';
import { TYPE_LABEL } from '@/lib/site';
import { absoluteUrl, articlePath, formatDate, readingTime } from '@/lib/utils';
import ArticleBody from './ArticleBody';
import ShareButtons from './ShareButtons';
import Ornament from './Ornament';

/** Shared reading layout for stories, poems, mythology, novel intros and chapters. */
export default function ArticleView({
  article,
  backHref,
  backLabel,
  shareUrl,
  parentTitle,
  children,
  footer,
}: {
  article: Article;
  backHref: string;
  backLabel: string;
  shareUrl?: string;
  parentTitle?: string;
  children?: React.ReactNode; // extra content between body and share (e.g. chapter list)
  footer?: React.ReactNode; // after share (e.g. prev/next)
}) {
  const url = shareUrl ?? absoluteUrl(articlePath(article));
  const isPoem = article.type === 'poem';

  return (
    <article className="container-page pb-4 pt-10 sm:pt-14">
      <Link href={backHref} className="text-ivory-faint hover:text-gold-bright">
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
          className="mt-2 font-display text-4xl font-medium leading-tight text-ivory sm:text-6xl"
        >
          {article.title}
        </h1>
        <p className="mt-4 text-ivory-faint">
          {article.category && (
            <>
              <Link href={`/category/${article.category.slug}`} className="text-ivory-dim hover:text-gold-bright">
                {article.category.name}
              </Link>
              {' - '}
            </>
          )}
          {formatDate(article.published_at, article.language)} - {readingTime(article.content, article.language)} min read
        </p>
      </header>

      {article.cover_image_url && (
        <div className="mx-auto mt-10 max-w-4xl border border-charcoal-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.cover_image_url} alt={`Cover image for ${article.title}`} className="max-h-[32rem] w-full object-cover" />
        </div>
      )}

      <div className={`mx-auto mt-12 max-w-reading ${isPoem ? 'text-center' : ''}`}>
        <ArticleBody content={article.content} type={article.type} language={article.language} />
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
  );
}
