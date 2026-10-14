import { createClient } from '@/lib/supabase/server';
import TaxonomyManager from '@/components/admin/TaxonomyManager';

export const metadata = { title: 'Categories and tags' };

export default async function TaxonomyPage() {
  const supabase = createClient();
  const [cats, tags] = await Promise.all([
    supabase.from('categories').select('id, name, slug, description').order('name'),
    supabase.from('tags').select('id, name, slug').order('name'),
  ]);
  return (
    <>
      <h1 className="mb-8 font-display text-4xl text-ivory">Categories and tags</h1>
      <TaxonomyManager categories={cats.data ?? []} tags={tags.data ?? []} />
    </>
  );
}
