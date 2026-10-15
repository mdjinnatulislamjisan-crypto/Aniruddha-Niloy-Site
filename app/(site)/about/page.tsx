import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import PageHeading from '@/components/PageHeading';

export const metadata: Metadata = {
  title: 'About the Author',
  description: `About ${SITE.name}, author of Bengali and English poems, stories, novels and original mythological fiction.`,
  alternates: { canonical: '/about' },
};

/* EDIT THIS PAGE: replace the placeholder biography below with your own words. */
export default function AboutPage() {
  return (
    <div className="container-page pb-4">
      <PageHeading title="About the Author" subtitle="লেখক পরিচিতি" />
      <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="reading max-w-reading">
          <p>
            <strong>{SITE.name}</strong> ({SITE.nameBn}) writes poems, short stories, novels and original mythological
            fiction in Bengali and English.
          </p>
          <p>
            This is placeholder text. Open <code>app/(site)/about/page.tsx</code> in VS Code and replace these
            paragraphs with your own biography: where you write from, what you read, and what draws you to
            the dark, the quiet and the very old stories.
          </p>
          <p>
            New work appears here as it is finished. If a piece stays with you, a kind word or a share is the best
            thing a reader can give.
          </p>
          <p>
            <Link href="/stories">Read the stories</Link>, <Link href="/poetry">wander through the poetry</Link>, or{' '}
            <Link href="/search">search the whole archive</Link>.
          </p>
        </div>

        <aside className="h-fit border border-charcoal-line bg-charcoal p-6">
          <h2 className="font-display text-2xl text-ivory">Find me elsewhere</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a className="text-gold-bright hover:underline" href={SITE.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a className="text-gold-bright hover:underline" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
