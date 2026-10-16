import Link from 'next/link';
import { SITE } from '@/lib/site';
import Ornament from './Ornament';

const linkCls = 'text-ivory-dim transition-colors hover:text-gold-bright';

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-charcoal-line bg-charcoal/40">
      <div className="container-page py-14">
        <Ornament className="mb-12" />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-ivory">{SITE.name}</p>
            <p className="font-display text-xl text-gold" lang="bn">{SITE.nameBn}</p>
            <p className="mt-3 max-w-xs text-base text-ivory-faint">{SITE.tagline}</p>
          </div>

          <nav aria-label="Read">
            <p className="font-display text-xl text-ivory">Read</p>
            <ul className="mt-3 space-y-1.5 text-base">
              <li><Link className={linkCls} href="/stories">Stories</Link></li>
              <li><Link className={linkCls} href="/poetry">Poetry</Link></li>
              <li><Link className={linkCls} href="/mythology">Mythology</Link></li>
              <li><Link className={linkCls} href="/novels">Novels</Link></li>
              <li><Link className={linkCls} href="/philosophy" lang="bn">মনস্তাত্ত্বিক ও দার্শনিক সাহিত্য</Link></li>
            </ul>
          </nav>

          <nav aria-label="Explore">
            <p className="font-display text-xl text-ivory">Explore</p>
            <ul className="mt-3 space-y-1.5 text-base">
              <li><Link className={linkCls} href="/search">Search and categories</Link></li>
              <li><Link className={linkCls} href="/bookmarks">Saved writings</Link></li>
              <li><Link className={linkCls} href="/about">About the author</Link></li>
            </ul>
          </nav>

          <div>
            <p className="font-display text-xl text-ivory">Follow</p>
            <ul className="mt-3 space-y-1.5 text-base">
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
        <p className="mt-12 border-t border-charcoal-line pt-6 text-sm text-ivory-faint">
          &copy; {new Date().getFullYear()} {SITE.name}. All writing on this site is protected by copyright.
        </p>
      </div>
    </footer>
  );
}
