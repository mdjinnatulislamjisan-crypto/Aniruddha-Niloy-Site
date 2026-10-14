import type { Metadata } from 'next';
import type { Article } from './types';
import { SITE } from './site';
import { absoluteUrl } from './utils';

export function articleMetadata(article: Article, path: string): Metadata {
  const title = article.seo_title?.trim() || article.title;
  const description =
    article.seo_description?.trim() ||
    article.excerpt?.trim() ||
    article.content.replace(/[#*_>`\[\]]/g, '').slice(0, 155).trim();
  const images = article.cover_image_url ? [{ url: article.cover_image_url, alt: article.title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE.name,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      authors: [SITE.name],
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}
