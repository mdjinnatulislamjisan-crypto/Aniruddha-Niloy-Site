import type { ArticleType } from './types';

const PRODUCTION_URL = 'https://aniruddha-niloy-site.onrender.com';

/**
 * Builds the public site address safely.
 * Order: NEXT_PUBLIC_SITE_URL -> RENDER_EXTERNAL_URL (set automatically by Render) -> production default.
 */
function cleanUrl(value: string | undefined): string {
  const fallback = (
    process.env.RENDER_EXTERNAL_URL ||
    (process.env.NODE_ENV === 'production' ? PRODUCTION_URL : 'http://localhost:3000')
  ).replace(/\/+$/, '');
  const raw = (value || '').trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');
  if (!raw) return fallback;
  const v = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    new URL(v);
    return v;
  } catch {
    return fallback;
  }
}

export const SITE = {
  name: 'Aniruddha Niloy',
  nameBn: 'অনিরুদ্ধ নিলয়',
  tagline: 'Poems, stories, novels and myths in Bengali and English.',
  description:
    'The official literary website of Aniruddha Niloy: Bengali and English poems, short stories, novels and original mythological fiction.',
  url: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL),
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/your-page-here',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/your-profile-here',
};

/** True when a social link has been replaced with a real address. */
export function isRealLink(url: string): boolean {
  return !/your-(page|profile)-here/i.test(url);
}

/** Public URL path for each content type. */
export const TYPE_PATH: Record<ArticleType, string> = {
  story: '/stories',
  poem: '/poetry',
  mythology: '/mythology',
  novel: '/novels',
  chapter: '/novels',
};

export const TYPE_LABEL: Record<ArticleType, string> = {
  story: 'Story',
  poem: 'Poem',
  mythology: 'Mythology',
  novel: 'Novel',
  chapter: 'Chapter',
};

/** Sections that share the generic list / article templates. */
export const SECTIONS: Record<
  string,
  { type: ArticleType; title: string; titleBn: string; blurb: string }
> = {
  stories: {
    type: 'story',
    title: 'Stories',
    titleBn: 'গল্প',
    blurb: 'Short fiction from the edge of the lamplight, in Bengali and English.',
  },
  poetry: {
    type: 'poem',
    title: 'Poetry',
    titleBn: 'কবিতা',
    blurb: 'Verses written late, kept short, and meant to be read slowly.',
  },
  mythology: {
    type: 'mythology',
    title: 'Mythology',
    titleBn: 'পুরাণ',
    blurb: 'Original mythological fiction: invented gods, old rivers, and unfinished wars.',
  },
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/stories', label: 'Stories' },
  { href: '/poetry', label: 'Poetry' },
  { href: '/mythology', label: 'Mythology' },
  { href: '/novels', label: 'Novels' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
  { href: '/bookmarks', label: 'Saved' },
];
