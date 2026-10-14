import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listArticles } from '@/lib/data';
import { SECTIONS } from '@/lib/site';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

export function generateMetadata({ params }: { params: { section: string } }): Metadata {
  const s = SECTIONS[params.section];
  if (!s) return {};
  return { title: s.title, description: s.blurb, alternates: { canonical: `/${params.section}` } };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: { section: string };
  searchParams: { lang?: string };
}) {
  const section = SECTIONS[params.section];
  if (!section) notFound();

  const lang = searchParams.lang === 'bn' || searchParams.lang === 'en' ? searchParams.lang : undefined;
  const articles = await listArticles({ types: [section.type], language: lang });

  const tab = (value: string | undefined, label: string) => (
    <Link
      href={value ? `/${params.section}?lang=${value}` : `/${params.section}`}
      className={`btn btn-sm ${lang === value ? 'btn-gold' : 'btn-ghost'}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="container-page pb-4">
      <PageHeading title={section.title} subtitle={section.titleBn} intro={section.blurb} />
      <div className="mb-8 flex gap-2" role="group" aria-label="Filter by language">
        {tab(undefined, 'All')}
        {tab('en', 'English')}
        {tab('bn', 'বাংলা')}
      </div>
      <ArticleGrid articles={articles} />
    </div>
  );
}
