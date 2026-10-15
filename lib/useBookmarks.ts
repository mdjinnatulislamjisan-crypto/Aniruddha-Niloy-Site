'use client';

import { useEffect, useState } from 'react';
import { readBookmarks, subscribeBookmarks, type BookmarkItem } from './bookmarks';

/** Reads bookmarks after mount (so server and browser HTML always match). */
export function useBookmarks(): { items: BookmarkItem[]; ready: boolean } {
  const [items, setItems] = useState<BookmarkItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setItems(readBookmarks());
    sync();
    setReady(true);
    return subscribeBookmarks(sync);
  }, []);

  return { items, ready };
}
