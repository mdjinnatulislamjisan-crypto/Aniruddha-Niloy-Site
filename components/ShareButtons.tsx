'use client';

import { useEffect, useState } from 'react';
import { shareLink } from '@/lib/share';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [status, setStatus] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copied');
    } catch {
      window.prompt('Copy this link:', url);
    }
    window.setTimeout(() => setStatus(''), 2000);
  }

  async function native() {
    const r = await shareLink(url, title);
    if (r === 'copied') {
      setStatus('Link copied');
      window.setTimeout(() => setStatus(''), 2000);
    }
  }

  const linkCls = 'btn btn-ghost btn-sm';
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share this piece">
      <span className="mr-1 text-ivory-faint">Share</span>
      {canNativeShare && (
        <button type="button" className={linkCls} onClick={native}>
          Share...
        </button>
      )}
      <a className={linkCls} target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}>
        Facebook
      </a>
      <a className={linkCls} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`}>
        X
      </a>
      <a className={linkCls} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${t}%20${u}`}>
        WhatsApp
      </a>
      <button type="button" className={linkCls} onClick={copy}>
        Copy link
      </button>
      <span className="text-sm text-gold-bright" role="status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
