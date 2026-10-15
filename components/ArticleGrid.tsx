import type { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';
import EmptyState from './EmptyState';

export default function ArticleGrid({
  articles,
  empty = 'Nothing has been published here yet.',
}: {
  articles: Article[];
  empty?: string;
}) {
  if (articles.length === 0) {
    return <EmptyState title={empty} />;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}
