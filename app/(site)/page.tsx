import Link from 'next/link';
import { listArticles, listCategories } from '@/lib/data';
import { SITE, TYPE_LABEL } from '@/lib/site';
import { articlePath, formatDate } from '@/lib/utils';
import type { Article } from '@/lib/types';
import ArticleGrid from '@/components/ArticleGrid';
import EmptyState from '@/components/EmptyState';
import Ornament from '@/components/Ornament';

export const revalidate = 60;

const DOORS = [
  { href: '/stories', title: 'Stories', bn: 'গল্প', text: 'Short fiction from the edge of the lamplight.' },
  { href: '/poetry', title: 'Poetry', bn: 'কবিতা', text: 'Verses for late hours, in Bengali and English.' },
  { href: '/mythology', title: 'Mythology', bn: 'পুরাণ', text: 'Invented gods, old rivers, unfinished wars.' },
  { href: '/novels', title: 'Novels', bn: 'উপন্যাস', text: 'Longer worlds, released one chapter at a time.' },
];

function SectionHead({ title, bn, href }: { title: string; bn: string; href: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h2 className="section-title">
        {title}
        <span className="ml-4 text-2xl text-gold-dim sm:text-3xl" lang="bn">{bn}</span>
      </h2>
      <Link href={href} className="text-ivory-dim transition-colors hover:text-gold-bright">
        View all &rarr;
      </Link>
    </div>
  );
}

function ListRows({ items, empty }: { items: Article[]; empty: string }) {
  if (items.length === 0) return <EmptyState title={empty} />;
  return (
    <ul className="divide-y divide-charcoal-line border-y border-charcoal-line">
      {items.map((a) => (
        <li key={a.id}>
          <Link href={articlePath(a)} className="group block py-5">
            <span className="block font-display text-3xl text-ivory transition-colors group-hover:text-gold-bright" lang={a.language}>
              {a.title}
            </span>
            {a.excerpt && (
              <span className="mt-1 line-clamp-2 block text-ivory-faint" lang={a.language}>{a.excerpt}</span>
            )}
            <span className="mt-1 block text-sm text-ivory-faint">{formatDate(a.published_at, a.language)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function HomePage() {
  const [latest, poems, stories, novels, myths, categories] = await Promise.all([
    listArticles({ limit: 7 }),
    listArticles({ types: ['poem'], limit: 3 }),
    listArticles({ types: ['story'], limit: 3 }),
    listArticles({ types: ['novel'], limit: 3 }),
    listArticles({ types: ['mythology'], limit: 3 }),
    listCategories(),
  ]);

  const feature = latest.find((a) => a.type === 'poem') ?? latest[0];
  const recent = latest.filter((a) => a.id !== feature?.id).slice(0, 6);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="grain relative overflow-hidden border-b border-charcoal-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 -top-48 h-[38rem] w-[38rem] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(184,151,90,0.35) 0%, rgba(5,5,5,0) 68%)' }}
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -left-24 top-10 hidden h-[26rem] w-[26rem] opacity-[0.13] md:block"
        >
          <circle cx="200" cy="200" r="150" fill="none" stroke="#b8975a" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#b8975a" strokeWidth="0.6" />
          <path d="M200 40 L360 200 L200 360 L40 200 Z" fill="none" stroke="#b8975a" strokeWidth="0.6" />
        </svg>

        <div className="container-page relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div className="hero-rise">
            <p className="font-display text-2xl text-gold-bright sm:text-3xl" lang="bn">{SITE.nameBn}</p>
            <h1 className="mt-3 font-display text-6xl font-medium leading-[0.95] text-ivory sm:text-8xl">
              Aniruddha
              <br />
              Niloy
            </h1>
            <p className="mt-8 max-w-md text-xl text-ivory-dim">{SITE.tagline}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/stories" className="btn btn-gold">Start reading</Link>
              <Link href="/poetry" className="btn btn-ghost">Read poetry</Link>
              <Link href="/about" className="btn btn-ghost">About the author</Link>
            </div>
          </div>

          <aside className="hero-rise-late" aria-label="Latest writing">
            {feature ? (
              <Link
                href={articlePath(feature)}
                lang={feature.language}
                className="paper-card group relative block p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10"
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-2 border border-[#8a6624]/30" />
                <p className="text-sm text-[#8a6624]">
                  Latest {TYPE_LABEL[feature.type].toLowerCase()}
                </p>
                <h2 className="mt-2 font-display text-4xl font-medium leading-tight sm:text-5xl">{feature.title}</h2>
                {feature.excerpt && (
                  <p className="mt-4 font-display text-xl italic leading-relaxed text-[#4a4034]">{feature.excerpt}</p>
                )}
                <span className="mt-6 inline-block border-b border-[#8a6624] pb-0.5 text-[#6d5018] group-hover:text-[#2b251e]">
                  Read it &rarr;
                </span>
              </Link>
            ) : (
              <div className="border border-dashed border-gold-dim p-10 text-center">
                <p className="font-display text-2xl text-ivory-dim">The first piece is on its way.</p>
                <p className="mt-2 text-ivory-faint">New writing will appear here once it is published.</p>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ---------- Recent ---------- */}
      <section className="container-page py-20">
        <h2 className="section-title">Recent writing</h2>
        <Ornament className="my-8" />
        <ArticleGrid articles={recent} empty="No articles yet. New writing will appear here." />
      </section>

      {/* ---------- Poetry ---------- */}
      <section className="container-page pb-20">
        <SectionHead title="Poetry" bn="কবিতা" href="/poetry" />
        <div className="mt-8">
          <ArticleGrid articles={poems} empty="No poems have been published yet." />
        </div>
      </section>

      {/* ---------- Stories ---------- */}
      <section className="container-page pb-20">
        <SectionHead title="Stories" bn="গল্প" href="/stories" />
        <div className="mt-8">
          <ArticleGrid articles={stories} empty="No stories have been published yet." />
        </div>
      </section>

      {/* ---------- Novels and mythology ---------- */}
      <section className="container-page grid gap-14 pb-20 lg:grid-cols-2">
        <div>
          <SectionHead title="Novels" bn="উপন্যাস" href="/novels" />
          <div className="mt-8">
            <ListRows items={novels} empty="No novels have been published yet." />
          </div>
        </div>
        <div>
          <SectionHead title="Mythology" bn="পুরাণ" href="/mythology" />
          <div className="mt-8">
            <ListRows items={myths} empty="No mythological fiction has been published yet." />
          </div>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      {categories.length > 0 && (
        <section className="container-page pb-20" aria-labelledby="browse-cats">
          <h2 id="browse-cats" className="font-display text-3xl text-ivory">Browse by category</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="chip">{c.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- About teaser ---------- */}
      <section className="border-y border-charcoal-line bg-charcoal/50">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-4xl text-ivory">
              About the author
              <span className="ml-3 text-2xl text-gold-dim" lang="bn">{SITE.nameBn}</span>
            </h2>
            <p className="mt-3 max-w-xl text-lg text-ivory-dim">
              {SITE.name} writes poems, short stories, novels and original mythological fiction in Bengali and English.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-gold">Read more</Link>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Facebook</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Instagram</a>
          </div>
        </div>
      </section>

      {/* ---------- Doors ---------- */}
      <section className="container-page pb-4 pt-20">
        <h2 className="section-title">Where to wander</h2>
        <ul className="mt-8 divide-y divide-charcoal-line border-y border-charcoal-line">
          {DOORS.map((d) => (
            <li key={d.href}>
              <Link href={d.href} className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-display text-4xl text-ivory transition-colors group-hover:text-gold-bright sm:text-5xl">
                  {d.title}
                  <span className="ml-4 text-2xl text-gold-dim group-hover:text-gold" lang="bn">{d.bn}</span>
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
