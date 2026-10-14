import Link from 'next/link';
import type { Article } from '@/lib/types';
import { TYPE_LABEL } from '@/lib/site';
import { articlePath, formatDate } from '@/lib/utils';

export default function ArticleCard({ article }: { article: Article }) {
  const href = articlePath(article);
  return (
    <article className="group flex flex-col border border-charcoal-line bg-charcoal transition-colors hover:border-gold-dim">
      {article.cover_image_url && (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden border-b border-charcoal-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_image_url}
            alt=""
            loading="lazy"
            className="aspect-[16/10] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
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
        <h3 className="mt-1.5 font-display text-2xl font-medium leading-snug text-ivory" lang={article.language}>
          <Link href={href} className="hover:text-gold-bright">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="mt-2 line-clamp-3 text-base text-ivory-dim" lang={article.language}>
            {article.excerpt}
          </p>
        )}
        <p className="mt-auto pt-4 text-sm text-ivory-faint">{formatDate(article.published_at, article.language)}</p>
      </div>
    </article>
  );
}
