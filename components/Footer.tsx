import Link from 'next/link';
import { SITE } from '@/lib/site';
import Ornament from './Ornament';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-charcoal-line bg-charcoal/40">
      <div className="container-page py-12">
        <Ornament className="mb-10" />
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-ivory">{SITE.name}</p>
            <p className="font-display text-lg text-gold">{SITE.nameBn}</p>
            <p className="mt-3 max-w-xs text-base text-ivory-faint">{SITE.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="space-y-1.5 text-base">
              <li><Link className="text-ivory-dim hover:text-gold-bright" href="/stories">Stories</Link></li>
              <li><Link className="text-ivory-dim hover:text-gold-bright" href="/poetry">Poetry</Link></li>
              <li><Link className="text-ivory-dim hover:text-gold-bright" href="/mythology">Mythology</Link></li>
              <li><Link className="text-ivory-dim hover:text-gold-bright" href="/novels">Novels</Link></li>
              <li><Link className="text-ivory-dim hover:text-gold-bright" href="/search">Search and categories</Link></li>
            </ul>
          </nav>
          <div>
            <p className="text-ivory-dim">Follow</p>
            <ul className="mt-2 space-y-1.5 text-base">
              <li>
                <a className="text-ivory hover:text-gold-bright" href={SITE.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a className="text-ivory hover:text-gold-bright" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-sm text-ivory-faint">
          &copy; {new Date().getFullYear()} {SITE.name}. All writing on this site is protected by copyright.
        </p>
      </div>
    </footer>
  );
}
