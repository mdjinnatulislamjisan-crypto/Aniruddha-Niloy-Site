'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { revalidateSite } from '@/lib/revalidate';
import { TYPE_LABEL, TYPE_PATH } from '@/lib/site';
import { slugify } from '@/lib/utils';
import type { Article, ArticleType, Language, Status } from '@/lib/types';
import ArticleBody from '@/components/ArticleBody';
import ConfirmDialog from './ConfirmDialog';

interface Option { id: string; name: string; slug: string }
interface NovelOption { id: string; title: string }

export default function ArticleEditor({
  article,
  categories,
  allTags,
  novels,
  tagIds,
}: {
  article: Article | null;
  categories: Option[];
  allTags: Option[];
  novels: NovelOption[];
  tagIds: string[];
}) {
  const router = useRouter();
  const isNew = !article;

  const [id, setId] = useState<string | null>(article?.id ?? null);
  const [title, setTitle] = useState(article?.title ?? '');
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(article));
  const [type, setType] = useState<ArticleType>(article?.type ?? 'story');
  const [language, setLanguage] = useState<Language>(article?.language ?? 'en');
  const [status, setStatus] = useState<Status>(article?.status ?? 'draft');
  const [publishedAt, setPublishedAt] = useState<string | null>(article?.published_at ?? null);
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [cover, setCover] = useState(article?.cover_image_url ?? '');
  const [seoTitle, setSeoTitle] = useState(article?.seo_title ?? '');
  const [seoDesc, setSeoDesc] = useState(article?.seo_description ?? '');
  const [categoryId, setCategoryId] = useState(article?.category_id ?? '');
  const [parentId, setParentId] = useState(article?.parent_id ?? '');
  const [chapterNo, setChapterNo] = useState<string>(article?.chapter_number?.toString() ?? '');
  const [selectedTags, setSelectedTags] = useState<string[]>(tagIds);
  const [newTags, setNewTags] = useState('');

  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const isChapter = type === 'chapter';

  function onTitle(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  function toggleTag(tagId: string) {
    setSelectedTags((cur) => (cur.includes(tagId) ? cur.filter((t) => t !== tagId) : [...cur, tagId]));
  }

  async function uploadCover(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage({ kind: 'error', text: 'Please choose an image file (JPG, PNG, WebP).' });
    if (file.size > 5 * 1024 * 1024) return setMessage({ kind: 'error', text: 'The image is larger than 5 MB. Please choose a smaller one.' });

    setUploading(true);
    setMessage(null);
    const supabase = createClient();
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('covers').upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      setUploading(false);
      return setMessage({ kind: 'error', text: `Upload failed: ${error.message}` });
    }
    const { data } = supabase.storage.from('covers').getPublicUrl(path);
    setCover(data.publicUrl);
    setUploading(false);
    setMessage({ kind: 'ok', text: 'Cover image uploaded. Remember to save the article.' });
  }

  async function save(nextStatus: Status) {
    setMessage(null);
    const cleanTitle = title.trim();
    if (!cleanTitle) return setMessage({ kind: 'error', text: 'Please add a title.' });
    if (nextStatus === 'published' && !content.trim()) return setMessage({ kind: 'error', text: 'Add some content before publishing.' });
    if (isChapter && !parentId) return setMessage({ kind: 'error', text: 'Choose the novel this chapter belongs to.' });

    const finalSlug = slugify(slug) || slugify(cleanTitle) || `post-${Date.now().toString(36)}`;
    const now = new Date().toISOString();
    const nextPublishedAt = nextStatus === 'published' ? publishedAt ?? now : publishedAt;

    setBusy(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('You are signed out. Please sign in again.');

      const payload = {
        title: cleanTitle,
        slug: finalSlug,
        type,
        language,
        status: nextStatus,
        excerpt: excerpt.trim() || null,
        content,
        cover_image_url: cover || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDesc.trim() || null,
        category_id: categoryId || null,
        parent_id: isChapter ? parentId : null,
        chapter_number: isChapter && chapterNo ? Math.max(1, parseInt(chapterNo, 10) || 1) : null,
        published_at: nextPublishedAt,
      };

      let articleId = id;
      if (articleId) {
        const { error } = await supabase.from('articles').update(payload).eq('id', articleId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('articles')
          .insert({ ...payload, author_id: user.id })
          .select('id')
          .single();
        if (error) throw error;
        articleId = data.id as string;
      }

      // Tags: create any new ones, then replace the article's tag links.
      const ids = [...selectedTags];
      const names = newTags.split(',').map((n) => n.trim()).filter(Boolean);
      for (const name of names) {
        const tSlug = slugify(name);
        if (!tSlug) continue;
        const { data, error } = await supabase
          .from('tags')
          .upsert({ name, slug: tSlug }, { onConflict: 'slug' })
          .select('id')
          .single();
        if (error) throw error;
        if (!ids.includes(data.id as string)) ids.push(data.id as string);
      }

      const { error: delErr } = await supabase.from('article_tags').delete().eq('article_id', articleId);
      if (delErr) throw delErr;
      if (ids.length) {
        const { error: insErr } = await supabase
          .from('article_tags')
          .insert(ids.map((tag_id) => ({ article_id: articleId as string, tag_id })));
        if (insErr) throw insErr;
      }

      setId(articleId);
      setSlug(finalSlug);
      setSlugTouched(true);
      setStatus(nextStatus);
      setPublishedAt(nextPublishedAt);
      setSelectedTags(ids);
      setNewTags('');
      setMessage({
        kind: 'ok',
        text: nextStatus === 'published' ? 'Published. Your article is live.' : status === 'published' ? 'Unpublished. The article is now a draft.' : 'Draft saved.',
      });
      await revalidateSite();

      if (isNew) router.replace(`/admin/articles/${articleId}`);
      router.refresh();
    } catch (e) {
      const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? 'Something went wrong.';
      const friendly = /duplicate key|unique/i.test(msg)
        ? 'Another article of this type already uses that URL slug. Change the slug and save again.'
        : msg;
      setMessage({ kind: 'error', text: `Could not save: ${friendly}` });
    } finally {
      setBusy(false);
    }
  }

  async function doDelete() {
    if (!id) return;
    setBusy(true);
    const { error } = await createClient().from('articles').delete().eq('id', id);
    setBusy(false);
    setConfirmDelete(false);
    if (error) return setMessage({ kind: 'error', text: `Could not delete: ${error.message}` });
    await revalidateSite();
    router.push('/admin');
    router.refresh();
  }

  const liveHref = (() => {
    if (!id || status !== 'published' || !slug) return null;
    if (isChapter) {
      return null; // chapter URLs depend on the parent novel slug; open from the novel page
    }
    return `${TYPE_PATH[type]}/${encodeURIComponent(slug)}`;
  })();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
      <div className="min-w-0 space-y-6">
        <div>
          <label htmlFor="title" className="field-label">Title</label>
          <input id="title" className="field font-display text-2xl" lang={language} value={title} onChange={(e) => onTitle(e.target.value)} placeholder="Title" />
        </div>

        <div>
          <label htmlFor="slug" className="field-label">URL slug</label>
          <input
            id="slug"
            className="field"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            placeholder="my-article-url"
          />
          <p className="hint">Tip: for Bengali titles, type a short English slug here for cleaner links.</p>
        </div>

        <div>
          <label htmlFor="excerpt" className="field-label">Excerpt (shown on cards and the home page)</label>
          <textarea id="excerpt" rows={2} className="field" lang={language} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div>
          <div className="mb-2 flex items-end justify-between">
            <span className="field-label !mb-0">Content (Markdown)</span>
            <div className="flex gap-1" role="tablist" aria-label="Editor mode">
              <button type="button" role="tab" aria-selected={tab === 'write'} className={`btn btn-sm ${tab === 'write' ? 'btn-gold' : 'btn-ghost'}`} onClick={() => setTab('write')}>Write</button>
              <button type="button" role="tab" aria-selected={tab === 'preview'} className={`btn btn-sm ${tab === 'preview' ? 'btn-gold' : 'btn-ghost'}`} onClick={() => setTab('preview')}>Preview</button>
            </div>
          </div>

          {tab === 'write' ? (
            <>
              <textarea
                aria-label="Article content"
                rows={22}
                lang={language}
                className="field font-serif text-lg leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write here. Blank line = new paragraph. For poems, each new line stays a new line."
              />
              <p className="hint">
                Markdown: <code>**bold**</code>, <code>*italic*</code>, <code>## Heading</code>, <code>&gt; quote</code>, <code>---</code> divider.
              </p>
            </>
          ) : (
            <div className="border border-charcoal-line bg-ink p-6">
              {cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" className="mb-6 max-h-72 w-full object-cover" />
              )}
              <h2 className="mb-6 font-display text-4xl text-ivory" lang={language}>{title || 'Untitled'}</h2>
              {content.trim() ? (
                <ArticleBody content={content} type={type} language={language} />
              ) : (
                <p className="text-ivory-faint">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        <fieldset className="space-y-4 border border-charcoal-line p-5">
          <legend className="px-2 font-display text-xl text-ivory">Search engine and social sharing</legend>
          <div>
            <label htmlFor="seo-title" className="field-label">SEO title</label>
            <input id="seo-title" className="field" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title || 'Defaults to the article title'} />
            <p className={`hint ${seoTitle.length > 60 ? '!text-[#e08a8a]' : ''}`}>{seoTitle.length}/60 characters recommended</p>
          </div>
          <div>
            <label htmlFor="seo-desc" className="field-label">SEO description</label>
            <textarea id="seo-desc" rows={3} className="field" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} placeholder="Defaults to the excerpt" />
            <p className={`hint ${seoDesc.length > 160 ? '!text-[#e08a8a]' : ''}`}>{seoDesc.length}/160 characters recommended</p>
          </div>
        </fieldset>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <div className="border border-charcoal-line bg-charcoal p-5">
          <p className="mb-3 text-ivory-dim">
            Status: <strong className={status === 'published' ? 'text-gold-bright' : 'text-ivory'}>{status === 'published' ? 'Published' : 'Draft'}</strong>
          </p>
          <div className="flex flex-col gap-2">
            {status === 'published' ? (
              <>
                <button type="button" className="btn btn-gold" disabled={busy} onClick={() => save('published')}>{busy ? 'Saving...' : 'Update'}</button>
                <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => save('draft')}>Unpublish (back to draft)</button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-ghost" disabled={busy} onClick={() => save('draft')}>{busy ? 'Saving...' : 'Save draft'}</button>
                <button type="button" className="btn btn-gold" disabled={busy} onClick={() => save('published')}>Publish</button>
              </>
            )}
            {liveHref && (
              <Link href={liveHref} target="_blank" className="btn btn-ghost">View live page</Link>
            )}
            {id && (
              <button type="button" className="btn btn-danger" disabled={busy} onClick={() => setConfirmDelete(true)}>Delete article</button>
            )}
          </div>
          {message && (
            <p role="status" className={`mt-4 border px-3 py-2 text-sm ${message.kind === 'ok' ? 'border-gold-dim text-gold-bright' : 'border-blood text-[#e08a8a]'}`}>
              {message.text}
            </p>
          )}
        </div>

        <div className="space-y-4 border border-charcoal-line bg-charcoal p-5">
          <div>
            <label htmlFor="type" className="field-label">Type</label>
            <select id="type" className="field" value={type} onChange={(e) => setType(e.target.value as ArticleType)}>
              {(Object.keys(TYPE_LABEL) as ArticleType[]).map((t) => (
                <option key={t} value={t}>{TYPE_LABEL[t]}</option>
              ))}
            </select>
          </div>

          {isChapter && (
            <>
              <div>
                <label htmlFor="parent" className="field-label">Belongs to novel</label>
                <select id="parent" className="field" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                  <option value="">Choose a novel</option>
                  {novels.map((n) => <option key={n.id} value={n.id}>{n.title}</option>)}
                </select>
                {novels.length === 0 && <p className="hint">Create an article of type Novel first.</p>}
              </div>
              <div>
                <label htmlFor="chapter-no" className="field-label">Chapter number</label>
                <input id="chapter-no" type="number" min={1} className="field" value={chapterNo} onChange={(e) => setChapterNo(e.target.value)} />
              </div>
            </>
          )}

          <div>
            <label htmlFor="language" className="field-label">Language</label>
            <select id="language" className="field" value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
              <option value="en">English</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="field-label">Category</label>
            <select id="category" className="field" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <p className="hint"><Link className="underline hover:text-gold-bright" href="/admin/taxonomy">Manage categories</Link></p>
          </div>
        </div>

        <div className="border border-charcoal-line bg-charcoal p-5">
          <p className="field-label">Tags</p>
          {allTags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {allTags.map((t) => {
                const on = selectedTags.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTag(t.id)}
                    className={`border px-2.5 py-0.5 text-sm ${on ? 'border-gold bg-gold text-ink' : 'border-charcoal-line text-ivory-dim hover:border-gold'}`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          )}
          <label htmlFor="new-tags" className="sr-only">New tags</label>
          <input id="new-tags" className="field" value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="New tags, separated by commas" />
        </div>

        <div className="border border-charcoal-line bg-charcoal p-5">
          <p className="field-label">Cover image</p>
          {cover ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt="Cover preview" className="mb-3 aspect-[16/10] w-full object-cover" />
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCover('')}>Remove image</button>
            </div>
          ) : (
            <p className="hint !mt-0 mb-3">No cover image. JPG, PNG or WebP, up to 5 MB.</p>
          )}
          <label className="btn btn-ghost mt-3 w-full cursor-pointer">
            {uploading ? 'Uploading...' : cover ? 'Replace image' : 'Upload image'}
            <input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(e) => { uploadCover(e.target.files?.[0]); e.target.value = ''; }} />
          </label>
        </div>
      </aside>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this article?"
        message={`"${title || 'Untitled'}" will be permanently deleted${type === 'novel' ? ', together with all of its chapters' : ''}. This cannot be undone.`}
        busy={busy}
        onConfirm={doDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
