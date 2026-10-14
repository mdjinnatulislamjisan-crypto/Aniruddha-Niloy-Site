import { createClient } from '@/lib/supabase/server';
import ArticleEditor from '@/components/admin/ArticleEditor';

export const metadata = { title: 'New article' };

export default async function NewArticlePage() {
  const supabase = createClient();
  const [cats, tags, novels] = await Promise.all([
    supabase.from('categories').select('id, name, slug').order('name'),
    supabase.from('tags').select('id, name, slug').order('name'),
    supabase.from('articles').select('id, title').eq('type', 'novel').order('title'),
  ]);

  return (
    <>
      <h1 className="mb-8 font-display text-4xl text-ivory">New article</h1>
      <ArticleEditor
        article={null}
        categories={cats.data ?? []}
        allTags={tags.data ?? []}
        novels={novels.data ?? []}
        tagIds={[]}
      />
    </>
  );
}
