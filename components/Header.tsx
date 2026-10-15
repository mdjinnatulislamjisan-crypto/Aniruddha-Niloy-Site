import Link from 'next/link';
import { SITE } from '@/lib/site';
import MobileNav from './MobileNav';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-line bg-ink/90 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-3" aria-label={`${SITE.name}, home`}>
          <span className="font-display text-2xl font-medium tracking-wide text-ivory transition-colors group-hover:text-gold-bright">
            {SITE.name}
          </span>
          <span className="hidden font-display text-lg text-gold-dim transition-colors group-hover:text-gold sm:inline" lang="bn">
            {SITE.nameBn}
          </span>
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
