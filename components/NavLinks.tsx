'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';
import { useBookmarks } from '@/lib/useBookmarks';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with the current page highlighted and a small count on "Saved". */
export default function NavLinks() {
  const pathname = usePathname() || '/';
  const { items, ready } = useBookmarks();

  return (
    <ul className="flex items-center gap-5 text-base">
      {NAV.filter((n) => n.href !== '/').map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`border-b pb-0.5 transition-colors ${
                active ? 'border-gold text-gold-bright' : 'border-transparent text-ivory-dim hover:text-gold-bright'
              }`}
            >
              {item.label}
              {item.href === '/bookmarks' && ready && items.length > 0 && (
                <span className="ml-1.5 text-sm text-gold" aria-label={`${items.length} saved`}>
                  {items.length}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
