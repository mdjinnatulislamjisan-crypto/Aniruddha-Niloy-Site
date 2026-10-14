'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { revalidateSite } from '@/lib/revalidate';
import { slugify } from '@/lib/utils';
import ConfirmDialog from './ConfirmDialog';

interface Item { id: string; name: string; slug: string; description?: string | null }
type Kind = 'categories' | 'tags';

function Panel({ kind, initial }: { kind: Kind; initial: Item[] }) {
  const router = useRouter();
  const noun = kind === 'categories' ? 'category' : 'tag';
  const [items, setItems] = useState(initial);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [toDelete, setToDelete] = useState<Item | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const clean = name.trim();
    const slug = slugify(clean);
    if (!clean || !slug) return setMessage({ kind: 'error', text: `Enter a ${noun} name.` });
    setBusy(true);
    const row: Record<string, string | null> = { name: clean, slug };
    if (kind === 'categories') row.description = description.trim() || null;
    const { data, error } = await createClient().from(kind).insert(row).select('*').single();
    setBusy(false);
    if (error) {
      return setMessage({ kind: 'error', text: /duplicate|unique/i.test(error.message) ? `A ${noun} with that name already exists.` : error.message });
    }
    setItems((l) => [...l, data as Item].sort((a, b) => a.name.localeCompare(b.name)));
    setName('');
    setDescription('');
    setMessage({ kind: 'ok', text: `Added ${noun} "${clean}".` });
    await revalidateSite();
    router.refresh();
  }

  async function rename(item: Item) {
    const clean = editName.trim();
    if (!clean) return;
    const { error } = await createClient().from(kind).update({ name: clean, slug: slugify(clean) || item.slug }).eq('id', item.id);
    if (error) return setMessage({ kind: 'error', text: error.message });
    setItems((l) => l.map((i) => (i.id === item.id ? { ...i, name: clean, slug: slugify(clean) || item.slug } : i)));
    setEditing(null);
    setMessage({ kind: 'ok', text: `Renamed to "${clean}".` });
    await revalidateSite();
    router.refresh();
  }

  async function remove() {
    if (!toDelete) return;
    setBusy(true);
    const { error } = await createClient().from(kind).delete().eq('id', toDelete.id);
    setBusy(false);
    if (error) {
      setToDelete(null);
      return setMessage({ kind: 'error', text: error.message });
    }
    setItems((l) => l.filter((i) => i.id !== toDelete.id));
    setMessage({ kind: 'ok', text: `Deleted ${noun} "${toDelete.name}".` });
    setToDelete(null);
    await revalidateSite();
    router.refresh();
  }

  return (
    <section className="border border-charcoal-line bg-charcoal p-6">
      <h2 className="font-display text-3xl text-ivory">{kind === 'categories' ? 'Categories' : 'Tags'}</h2>

      <form onSubmit={add} className="mt-4 space-y-3">
        <div>
          <label htmlFor={`${kind}-name`} className="field-label">New {noun}</label>
          <input id={`${kind}-name`} className="field" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        {kind === 'categories' && (
          <div>
            <label htmlFor="cat-desc" className="field-label">Description (optional)</label>
            <input id="cat-desc" className="field" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        )}
        <button type="submit" disabled={busy} className="btn btn-gold btn-sm">Add {noun}</button>
      </form>

      {message && (
        <p role="status" className={`mt-4 border px-3 py-2 text-sm ${message.kind === 'ok' ? 'border-gold-dim text-gold-bright' : 'border-blood text-[#e08a8a]'}`}>{message.text}</p>
      )}

      {items.length === 0 ? (
        <p className="mt-6 text-ivory-faint">None yet.</p>
      ) : (
        <ul className="mt-6 divide-y divide-charcoal-line border-y border-charcoal-line">
          {items.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
              {editing === i.id ? (
                <form className="flex flex-1 gap-2" onSubmit={(e) => { e.preventDefault(); rename(i); }}>
                  <label htmlFor={`edit-${i.id}`} className="sr-only">Rename</label>
                  <input id={`edit-${i.id}`} className="field" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
                  <button type="submit" className="btn btn-gold btn-sm">Save</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <div className="min-w-0">
                    <span className="text-ivory">{i.name}</span>
                    <span className="ml-2 text-sm text-ivory-faint">/{i.slug}</span>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setEditing(i.id); setEditName(i.name); }}>Rename</button>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => setToDelete(i)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title={`Delete this ${noun}?`}
        message={`"${toDelete?.name ?? ''}" will be removed. Articles stay published${kind === 'categories' ? ' but become uncategorised' : ' but lose this tag'}.`}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setToDelete(null)}
      />
    </section>
  );
}

export default function TaxonomyManager({ categories, tags }: { categories: Item[]; tags: Item[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Panel kind="categories" initial={categories} />
      <Panel kind="tags" initial={tags} />
    </div>
  );
}
