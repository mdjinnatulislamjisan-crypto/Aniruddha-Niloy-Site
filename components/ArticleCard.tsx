import Link from 'next/link';
import type { Article } from '@/lib/types';
import { TYPE_LABEL } from '@/lib/site';
import { articlePath, formatDate, readingTime } from '@/lib/utils';

export default function ArticleCard({ article }: { article: Article }) {
  const href = articlePath(article);
  const isPoem = article.type === 'poem';
  const minutes = readingTime(article.content ?? '', article.language);

  return (
    <article className="group relative flex flex-col border border-charcoal-line bg-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-dim hover:shadow-[0_24px_40px_-28px_rgba(184,151,90,0.45)]">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
      />
      {article.cover_image_url && (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden border-b border-charcoal-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_image_url}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-gold">
          {TYPE_LABEL[article.type]}
          {article.language === 'bn' ? ' (বাংলা)' : ''}
          {article.category ? (
            <>
              {' - '}
              <span className="text-ivory-faint">{article.category.name}</span>
            </>
          ) : null}
        </p>
        <h3 className="mt-2 font-display text-[1.75rem] font-medium leading-snug text-ivory" lang={article.language}>
          <Link href={href} className="transition-colors hover:text-gold-bright">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p
            className={`mt-3 line-clamp-3 text-base text-ivory-dim ${isPoem ? 'font-display text-xl italic leading-relaxed' : ''}`}
            lang={article.language}
          >
            {article.excerpt}
          </p>
        )}
        <p className="mt-auto pt-5 text-sm text-ivory-faint">
          {formatDate(article.published_at, article.language)}
          <span aria-hidden="true"> - </span>
          {minutes} min read
        </p>
      </div>
    </article>
  );
}
