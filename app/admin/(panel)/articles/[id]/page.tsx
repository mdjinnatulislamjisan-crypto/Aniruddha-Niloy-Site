import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ArticleEditor from '@/components/admin/ArticleEditor';
import type { Article } from '@/lib/types';

export const metadata = { title: 'Edit article' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  if (!UUID.test(params.id)) notFound();
  const supabase = createClient();

  const { data: article } = await supabase.from('articles').select('*').eq('id', params.id).maybeSingle();
  if (!article) notFound();

  const [cats, tags, novels, links] = await Promise.all([
    supabase.from('categories').select('id, name, slug').order('name'),
    supabase.from('tags').select('id, name, slug').order('name'),
    supabase.from('articles').select('id, title').eq('type', 'novel').order('title'),
    supabase.from('article_tags').select('tag_id').eq('article_id', params.id),
  ]);

  return (
    <>
      <h1 className="mb-8 font-display text-4xl text-ivory">Edit article</h1>
      <ArticleEditor
        article={article as Article}
        categories={cats.data ?? []}
        allTags={tags.data ?? []}
        novels={novels.data ?? []}
        tagIds={(links.data ?? []).map((l) => l.tag_id as string)}
      />
    </>
  );
}
