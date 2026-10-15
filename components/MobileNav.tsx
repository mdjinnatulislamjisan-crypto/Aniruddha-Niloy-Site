'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, SITE } from '@/lib/site';
import { useBookmarks } from '@/lib/useBookmarks';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { items, ready } = useBookmarks();

  // Close the menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  // Close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="border border-charcoal-line px-3 py-1.5 text-sm text-ivory-dim hover:border-gold hover:text-gold-bright"
      >
        {open ? 'Close' : 'Menu'}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute left-0 right-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-charcoal-line bg-ink px-5 pb-6 pt-3 shadow-2xl"
        >
          <ul className="divide-y divide-charcoal-line">
            {NAV.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-baseline justify-between py-3 font-display text-3xl ${
                      active ? 'text-gold-bright' : 'text-ivory hover:text-gold-bright'
                    }`}
                  >
                    {item.label}
                    {item.href === '/bookmarks' && ready && items.length > 0 && (
                      <span className="text-lg text-gold">{items.length}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 flex gap-5 text-base">
            <a className="text-ivory-dim hover:text-gold-bright" href={SITE.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a className="text-ivory-dim hover:text-gold-bright" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </nav>
      )}
    </div>
  );
}
