import { SITE, TYPE_PATH } from './site';
import type { Article } from './types';

/** URL-friendly slug. Keeps Latin letters, digits and Bengali (any Unicode letters). */
export function slugify(input: string): string {
  return input
    .normalize('NFC')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(iso: string | null | undefined, language: 'en' | 'bn' = 'en'): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export function readingTime(text: string, language: 'en' | 'bn' = 'en'): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / (language === 'bn' ? 160 : 210)));
}

export function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Public path for a (non-chapter) article. */
export function articlePath(article: Pick<Article, 'type' | 'slug'>): string {
  return `${TYPE_PATH[article.type]}/${encodeURIComponent(article.slug)}`;
}

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
