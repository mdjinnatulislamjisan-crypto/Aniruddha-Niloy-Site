'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV } from '@/lib/site';

export default function MobileNav() {
  const [open, setOpen] = useState(false);
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
          className="absolute left-0 right-0 top-full border-b border-charcoal-line bg-ink px-5 py-4"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-display text-2xl text-ivory hover:text-gold-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
