import type { Category } from '@/lib/types';

export interface FilterValues {
  q?: string;
  type?: string;
  lang?: string;
  category?: string;
  sort?: string;
}

/**
 * Plain HTML GET form (works without JavaScript). Used on the search page and the section pages.
 */
export default function FilterForm({
  action,
  values,
  categories,
  showQuery = false,
  showType = false,
}: {
  action: string;
  values: FilterValues;
  categories: Category[];
  showQuery?: boolean;
  showType?: boolean;
}) {
  const sel = 'field';
  return (
    <form action={action} method="get" role="search" className="border border-charcoal-line bg-charcoal/60 p-4">
      {showQuery && (
        <div className="mb-4">
          <label htmlFor="q" className="field-label">Search by title or any word in the writing</label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={values.q ?? ''}
            placeholder="A word, a title, a name"
            className="field"
          />
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {showType && (
          <div>
            <label htmlFor="f-type" className="field-label">Type</label>
            <select id="f-type" name="type" defaultValue={values.type ?? ''} className={sel}>
              <option value="">All types</option>
              <option value="story">Stories</option>
              <option value="poem">Poems</option>
              <option value="mythology">Mythology</option>
              <option value="novel">Novels</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="f-lang" className="field-label">Language</label>
          <select id="f-lang" name="lang" defaultValue={values.lang ?? ''} className={sel}>
            <option value="">English and বাংলা</option>
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
        <div>
          <label htmlFor="f-cat" className="field-label">Category</label>
          <select id="f-cat" name="category" defaultValue={values.category ?? ''} className={sel}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-sort" className="field-label">Order</label>
          <select id="f-sort" name="sort" defaultValue={values.sort ?? 'newest'} className={sel}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="submit" className="btn btn-gold btn-sm">Apply</button>
        <a href={action} className="btn btn-ghost btn-sm">Reset</a>
      </div>
    </form>
  );
}
