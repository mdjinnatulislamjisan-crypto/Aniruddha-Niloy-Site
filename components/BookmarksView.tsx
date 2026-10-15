'use client';

import Link from 'next/link';
import { useState } from 'react';
import { clearBookmarks, removeBookmark } from '@/lib/bookmarks';
import { useBookmarks } from '@/lib/useBookmarks';
import { TYPE_LABEL } from '@/lib/site';
import EmptyState from './EmptyState';

export default function BookmarksView() {
  const { items, ready } = useBookmarks();
  const [confirmClear, setConfirmClear] = useState(false);

  if (!ready) {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Loading saved writings">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-20" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Nothing saved yet"
        text='Open any story, poem or chapter and press "Save" to keep it here. Saved writings stay on this device only; no account is needed.'
        href="/stories"
        linkLabel="Start reading"
      />
    );
  }

  const sorted = [...items].sort((a, b) => b.savedAt - a.savedAt);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-ivory-dim">
          {sorted.length} saved {sorted.length === 1 ? 'writing' : 'writings'}, kept on this device only.
        </p>
        {confirmClear ? (
          <span className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                clearBookmarks();
                setConfirmClear(false);
              }}
            >
              Yes, remove all
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(false)}>
              Cancel
            </button>
          </span>
        ) : (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmClear(true)}>
            Clear all
          </button>
        )}
      </div>

      <ul className="divide-y divide-charcoal-line border-y border-charcoal-line">
        {sorted.map((b) => (
          <li key={b.href} className="flex items-start justify-between gap-4 py-5">
            <div className="min-w-0">
              <p className="text-sm text-gold">
                {TYPE_LABEL[b.type] ?? 'Writing'}
                {b.language === 'bn' ? ' (বাংলা)' : ''}
              </p>
              <Link
                href={b.href}
                lang={b.language}
                className="font-display text-3xl text-ivory transition-colors hover:text-gold-bright"
              >
                {b.title}
              </Link>
              {b.excerpt && (
                <p className="mt-1 line-clamp-2 text-ivory-faint" lang={b.language}>
                  {b.excerpt}
                </p>
              )}
            </div>
            <button type="button" className="btn btn-ghost btn-sm shrink-0" onClick={() => removeBookmark(b.href)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
