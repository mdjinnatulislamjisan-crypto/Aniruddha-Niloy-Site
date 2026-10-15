'use client';

import { useEffect, useState } from 'react';
import {
  DEFAULT_PREFS,
  MAX_SIZE,
  MIN_SIZE,
  applyPrefs,
  readPrefs,
  savePrefs,
  type ReaderPrefs,
} from '@/lib/reader-prefs';
import { isBookmarked, subscribeBookmarks, toggleBookmark } from '@/lib/bookmarks';
import { shareLink } from '@/lib/share';
import type { ArticleType, Language } from '@/lib/types';

const btn =
  'inline-flex items-center gap-1.5 border border-charcoal-line px-3 py-1.5 text-sm text-ivory-dim transition-colors hover:border-gold hover:text-gold-bright disabled:cursor-not-allowed disabled:opacity-40';

export default function ReaderToolbar({
  href,
  url,
  title,
  type,
  language,
  excerpt,
}: {
  href: string; // site-relative path, used as the bookmark key
  url: string; // absolute URL for sharing
  title: string;
  type: ArticleType;
  language: Language;
  excerpt: string | null;
}) {
  const [prefs, setPrefs] = useState<ReaderPrefs>(DEFAULT_PREFS);
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState('');

  // Load remembered preferences and bookmark state in the browser
  useEffect(() => {
    setPrefs(readPrefs());
    const sync = () => setSaved(isBookmarked(href));
    sync();
    return subscribeBookmarks(sync);
  }, [href]);

  function update(next: ReaderPrefs) {
    setPrefs(next);
    applyPrefs(next);
    savePrefs(next);
  }

  function flash(text: string) {
    setNote(text);
    window.setTimeout(() => setNote(''), 2200);
  }

  function onBookmark() {
    const now = toggleBookmark({ href, title, type, language, excerpt });
    setSaved(now);
    flash(now ? 'Saved on this device' : 'Removed from saved');
  }

  async function onShare() {
    const result = await shareLink(url, title);
    if (result === 'copied') flash('Link copied');
    if (result === 'failed') flash('Could not share');
  }

  return (
    <div
      className="sticky top-16 z-30 -mx-5 border-y border-charcoal-line bg-ink/90 px-5 py-2.5 backdrop-blur sm:mx-0 sm:border"
      role="toolbar"
      aria-label="Reading options"
    >
      <div className="mx-auto flex max-w-[46rem] flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex" role="group" aria-label="Text size">
            <button
              type="button"
              className={`${btn} text-xs`}
              onClick={() => update({ ...prefs, size: Math.max(MIN_SIZE, prefs.size - 1) })}
              disabled={prefs.size <= MIN_SIZE}
              aria-label="Smaller text"
            >
              A-
            </button>
            <button
              type="button"
              className={`${btn} -ml-px text-base`}
              onClick={() => update({ ...prefs, size: Math.min(MAX_SIZE, prefs.size + 1) })}
              disabled={prefs.size >= MAX_SIZE}
              aria-label="Larger text"
            >
              A+
            </button>
          </div>
          <button
            type="button"
            className={btn}
            onClick={() => update({ ...prefs, theme: prefs.theme === 'paper' ? 'night' : 'paper' })}
            aria-pressed={prefs.theme === 'night'}
            aria-label="Switch reading theme"
          >
            {prefs.theme === 'paper' ? 'Night page' : 'Paper page'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={onBookmark} aria-pressed={saved}>
            {saved ? 'Saved' : 'Save'}
          </button>
          <button type="button" className={btn} onClick={onShare}>
            Share
          </button>
        </div>
      </div>
      <p className="mx-auto mt-1 max-w-[46rem] text-right text-xs text-gold-bright" role="status" aria-live="polite">
        {note || '\u00A0'}
      </p>
    </div>
  );
}
