import Link from 'next/link';
import { listArticles } from '@/lib/data';
import { SITE } from '@/lib/site';
import { articlePath } from '@/lib/utils';
import ArticleGrid from '@/components/ArticleGrid';
import Ornament from '@/components/Ornament';

export const revalidate = 60;

const DOORS = [
  { href: '/stories', title: 'Stories', bn: 'গল্প', text: 'Short fiction from the edge of the lamplight.' },
  { href: '/poetry', title: 'Poetry', bn: 'কবিতা', text: 'Verses for late hours, in Bengali and English.' },
  { href: '/mythology', title: 'Mythology', bn: 'পুরাণ', text: 'Invented gods, old rivers, unfinished wars.' },
  { href: '/novels', title: 'Novels', bn: 'উপন্যাস', text: 'Longer worlds, released one chapter at a time.' },
];

export default async function HomePage() {
  const latest = await listArticles({ limit: 7 });
  const feature = latest.find((a) => a.type === 'poem') ?? latest[0];
  const recent = latest.filter((a) => a.id !== feature?.id).slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-charcoal-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(184,151,90,0.35) 0%, rgba(5,5,5,0) 68%)' }}
        />
        <div className="container-page relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="hero-rise">
            <h1 className="font-display text-6xl font-medium leading-[0.95] text-ivory sm:text-8xl">
              Aniruddha
              <br />
              Niloy
            </h1>
            <p className="mt-5 font-display text-3xl text-gold sm:text-4xl">{SITE.nameBn}</p>
            <p className="mt-8 max-w-md text-xl text-ivory-dim">{SITE.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/stories" className="btn btn-gold">Start reading</Link>
              <Link href="/about" className="btn btn-ghost">About the author</Link>
            </div>
          </div>

          {feature && (
            <aside className="hero-rise-late border-l border-gold-dim pl-6 sm:pl-8">
              <p className="text-gold-bright">Latest {feature.type === 'poem' ? 'verse' : 'writing'}</p>
              <Link href={articlePath(feature)} className="group mt-2 block" lang={feature.language}>
                <h2 className="font-display text-3xl text-ivory group-hover:text-gold-bright">{feature.title}</h2>
                {feature.excerpt && (
                  <p className="mt-3 font-display text-xl italic leading-relaxed text-ivory-dim">{feature.excerpt}</p>
                )}
                <span className="mt-4 inline-block text-ivory-faint group-hover:text-gold-bright">Read it</span>
              </Link>
            </aside>
          )}
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="font-display text-4xl text-ivory sm:text-5xl">Recent writing</h2>
        <Ornament className="my-8" />
        <ArticleGrid articles={recent} empty="No articles yet. Publish your first piece from the admin dashboard." />
      </section>

      <section className="container-page pb-8">
        <h2 className="font-display text-4xl text-ivory sm:text-5xl">Where to wander</h2>
        <ul className="mt-8 divide-y divide-charcoal-line border-y border-charcoal-line">
          {DOORS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-4xl text-ivory transition-colors group-hover:text-gold-bright sm:text-5xl">
                  {d.title}
                  <span className="ml-4 text-2xl text-gold-dim group-hover:text-gold">{d.bn}</span>
                </span>
                <span className="text-ivory-faint sm:max-w-xs sm:text-right">{d.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
