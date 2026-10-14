import Link from 'next/link';
import { NAV, SITE } from '@/lib/site';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-line bg-ink/90 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-medium tracking-wide text-ivory hover:text-gold-bright">
          {SITE.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-base">
            {NAV.filter((n) => n.href !== '/').map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ivory-dim transition-colors hover:text-gold-bright">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
