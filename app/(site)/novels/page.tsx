import type { Metadata } from 'next';
import { listArticles } from '@/lib/data';
import ArticleGrid from '@/components/ArticleGrid';
import PageHeading from '@/components/PageHeading';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Novels',
  description: 'Novels by Aniruddha Niloy, published chapter by chapter.',
  alternates: { canonical: '/novels' },
};

export default async function NovelsPage() {
  const novels = await listArticles({ types: ['novel'] });
  return (
    <div className="container-page pb-4">
      <PageHeading
        title="Novels"
        subtitle="উপন্যাস"
        intro="Longer worlds, released one chapter at a time. Open a novel to see its chapters."
      />
      <ArticleGrid articles={novels} empty="No novels have been published yet." />
    </div>
  );
}
