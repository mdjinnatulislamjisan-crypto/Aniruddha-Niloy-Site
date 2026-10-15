import type { ArticleType, Language } from './types';

/**
 * Local bookmarks. Stored only in the visitor's own browser (localStorage).
 * A small snapshot is saved so the "Saved" page works without any login or database call.
 */
export interface BookmarkItem {
  href: string; // unique key, e.g. /poetry/nilorattri
  title: string;
  type: ArticleType;
  language: Language;
  excerpt?: string | null;
  savedAt: number;
}

const KEY = 'an:bookmarks:v1';
export const BOOKMARKS_EVENT = 'an:bookmarks-changed';

function isValid(x: unknown): x is BookmarkItem {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.href === 'string' && typeof o.title === 'string' && typeof o.type === 'string';
}

export function readBookmarks(): BookmarkItem[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter(isValid) : [];
  } catch {
    return [];
  }
}

function write(items: BookmarkItem[]): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(BOOKMARKS_EVENT));
    return true;
  } catch {
    return false;
  }
}

export function isBookmarked(href: string): boolean {
  return readBookmarks().some((b) => b.href === href);
}

/** Adds or removes. Returns true when the item is now bookmarked. */
export function toggleBookmark(item: Omit<BookmarkItem, 'savedAt'>): boolean {
  const items = readBookmarks();
  const exists = items.some((b) => b.href === item.href);
  if (exists) {
    write(items.filter((b) => b.href !== item.href));
    return false;
  }
  write([{ ...item, savedAt: Date.now() }, ...items]);
  return true;
}

export function removeBookmark(href: string): void {
  write(readBookmarks().filter((b) => b.href !== href));
}

export function clearBookmarks(): void {
  write([]);
}

export function subscribeBookmarks(callback: () => void): () => void {
  window.addEventListener('storage', callback);
  window.addEventListener(BOOKMARKS_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(BOOKMARKS_EVENT, callback);
  };
}
