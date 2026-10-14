import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function AdminNav({ email }: { email: string }) {
  return (
    <header className="border-b border-charcoal-line bg-charcoal">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/admin" className="font-display text-2xl text-ivory hover:text-gold-bright">Dashboard</Link>
          <Link href="/admin/articles/new" className="text-ivory-dim hover:text-gold-bright">New article</Link>
          <Link href="/admin/taxonomy" className="text-ivory-dim hover:text-gold-bright">Categories and tags</Link>
          <Link href="/" target="_blank" className="text-ivory-dim hover:text-gold-bright">View website</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-ivory-faint sm:inline">{email}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
