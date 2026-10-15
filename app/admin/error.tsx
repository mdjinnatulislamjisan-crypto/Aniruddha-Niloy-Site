'use client';

import Link from 'next/link';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-4xl text-ivory">The dashboard hit a problem</h1>
      <p className="mt-3 text-ivory-dim">{error.message || 'Please try again.'}</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-gold">Try again</button>
        <Link href="/admin" className="btn btn-ghost">Back to dashboard</Link>
      </div>
    </main>
  );
}
