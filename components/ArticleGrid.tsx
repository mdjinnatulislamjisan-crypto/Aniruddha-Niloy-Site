import type { Article } from '@/lib/types';
import ArticleCard from './ArticleCard';

export default function ArticleGrid({
  articles,
  empty = 'Nothing has been published here yet.',
}: {
  articles: Article[];
  empty?: string;
}) {
  if (articles.length === 0) {
    return <p className="border border-dashed border-charcoal-line p-8 text-center text-ivory-faint">{empty}</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}
