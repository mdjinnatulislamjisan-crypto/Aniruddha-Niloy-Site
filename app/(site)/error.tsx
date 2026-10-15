'use client';

import Link from 'next/link';

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-28 text-center">
      <p className="text-gold-dim" aria-hidden="true">&#9670;</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-ivory-dim">
        The page could not be loaded just now. Please try again in a moment.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-gold">Try again</button>
        <Link href="/" className="btn btn-ghost">Go home</Link>
      </div>
    </div>
  );
}
