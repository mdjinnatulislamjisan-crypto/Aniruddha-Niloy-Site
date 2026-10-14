'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { revalidateSite } from '@/lib/revalidate';
import { TYPE_LABEL } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import type { ArticleType, Status } from '@/lib/types';
import ConfirmDialog from './ConfirmDialog';

export interface AdminRow {
  id: string;
  title: string;
  slug: string;
  type: ArticleType;
  language: 'en' | 'bn';
  status: Status;
  updated_at: string;
  published_at: string | null;
  category_name: string | null;
  tag_names: string[];
}

export default function ArticleTable({ rows: initial }: { rows: AdminRow[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | Status>('all');
  const [type, setType] = useState<'all' | ArticleType>('all');
  const [toDelete, setToDelete] = useState<AdminRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (status === 'all' || r.status === status) &&
        (type === 'all' || r.type === type) &&
        (!s || r.title.toLowerCase().includes(s) || r.tag_names.some((t) => t.toLowerCase().includes(s)))
    );
  }, [rows, q, status, type]);

  async function togglePublish(row: AdminRow) {
    const next: Status = row.status === 'published' ? 'draft' : 'published';
    const patch: { status: Status; published_at?: string } = { status: next };
    if (next === 'published' && !row.published_at) patch.published_at = new Date().toISOString();
    const { error } = await createClient().from('articles').update(patch).eq('id', row.id);
    if (error) return setMessage({ kind: 'error', text: `Could not update: ${error.message}` });
    setRows((rs) =>
      rs.map((r) => (r.id === row.id ? { ...r, status: next, published_at: patch.published_at ?? r.published_at } : r))
    );
    setMessage({ kind: 'ok', text: next === 'published' ? `Published "${row.title}".` : `Unpublished "${row.title}". It is now a draft.` });
    await revalidateSite();
    router.refresh();
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setBusy(true);
    const { error } = await createClient().from('articles').delete().eq('id', toDelete.id);
    setBusy(false);
    if (error) {
      setMessage({ kind: 'error', text: `Could not delete: ${error.message}` });
      setToDelete(null);
      return;
    }
    setRows((rs) => rs.filter((r) => r.id !== toDelete.id));
    setMessage({ kind: 'ok', text: `Deleted "${toDelete.title}".` });
    setToDelete(null);
    await revalidateSite();
    router.refresh();
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <label htmlFor="filter-q" className="sr-only">Filter by title or tag</label>
          <input id="filter-q" className="field" placeholder="Filter by title or tag" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div>
          <label htmlFor="filter-status" className="sr-only">Status</label>
          <select id="filter-status" className="field" value={status} onChange={(e) => setStatus(e.target.value as 'all' | Status)}>
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-type" className="sr-only">Type</label>
          <select id="filter-type" className="field" value={type} onChange={(e) => setType(e.target.value as 'all' | ArticleType)}>
            <option value="all">All types</option>
            {(Object.keys(TYPE_LABEL) as ArticleType[]).map((t) => (
              <option key={t} value={t}>{TYPE_LABEL[t]}</option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <p role="status" className={`mt-4 border px-3 py-2 ${message.kind === 'ok' ? 'border-gold-dim text-gold-bright' : 'border-blood text-[#e08a8a]'}`}>
          {message.text}
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="mt-8 border border-dashed border-charcoal-line p-8 text-center text-ivory-faint">
          {rows.length === 0 ? 'No articles yet. Create your first one.' : 'No articles match these filters.'}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-charcoal-line border-y border-charcoal-line">
          {filtered.map((r) => (
            <li key={r.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <Link href={`/admin/articles/${r.id}`} className="font-display text-2xl text-ivory hover:text-gold-bright" lang={r.language}>
                  {r.title}
                </Link>
                <p className="mt-0.5 text-sm text-ivory-faint">
                  <span className={r.status === 'published' ? 'text-gold-bright' : 'text-ivory-dim'}>
                    {r.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  {' - '}
                  {TYPE_LABEL[r.type]}
                  {r.language === 'bn' ? ' (Bengali)' : ' (English)'}
                  {r.category_name ? ` - ${r.category_name}` : ''}
                  {' - '}Updated {formatDate(r.updated_at)}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link href={`/admin/articles/${r.id}`} className="btn btn-ghost btn-sm">Edit</Link>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => togglePublish(r)}>
                  {r.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => setToDelete(r)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this article?"
        message={`"${toDelete?.title ?? ''}" will be permanently deleted${toDelete?.type === 'novel' ? ', together with all of its chapters' : ''}. This cannot be undone.`}
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
