'use client';

import { useState } from 'react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  }

  const linkCls = 'btn btn-ghost btn-sm';
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this piece">
      <span className="mr-1 text-ivory-faint">Share</span>
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
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}
