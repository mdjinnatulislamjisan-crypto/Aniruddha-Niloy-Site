import { createPublicClient } from '@/lib/supabase/public';
import { TYPE_PATH } from '@/lib/site';
import type { Article, ArticleType, Category, Tag } from '@/lib/types';

const SELECT = '*, category:categories(*), article_tags(tag:tags(*))';
const LISTABLE: ArticleType[] = ['story', 'poem', 'mythology', 'novel'];

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error('[data]', e instanceof Error ? e.message : e);
    return fallback;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(row: any): Article {
  const { article_tags, ...rest } = row;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tags = (article_tags ?? []).map((t: any) => t.tag).filter(Boolean) as Tag[];
  return { ...rest, tags } as Article;
}

export interface ListOptions {
  types?: ArticleType[];
  language?: string;
  categoryId?: string;
  tagId?: string;
  q?: string;
  limit?: number;
  excludeId?: string;
}

export function listArticles(opts: ListOptions = {}): Promise<Article[]> {
  return safe(async () => {
    const supabase = createPublicClient();
    let ids: string[] | null = null;

    if (opts.tagId) {
      const { data } = await supabase.from('article_tags').select('article_id').eq('tag_id', opts.tagId);
      ids = (data ?? []).map((r) => r.article_id as string);
      if (ids.length === 0) return [];
    }

    let query = supabase
      .from('articles')
      .select(SELECT)
      .eq('status', 'published')
      .in('type', opts.types ?? LISTABLE)
      .is('parent_id', null)
      .order('published_at', { ascending: false })
      .limit(opts.limit ?? 60);

    if (ids) query = query.in('id', ids);
    if (opts.language) query = query.eq('language', opts.language);
    if (opts.categoryId) query = query.eq('category_id', opts.categoryId);
    if (opts.excludeId) query = query.neq('id', opts.excludeId);
    if (opts.q) {
      const s = opts.q.replace(/[%,()*\\_]/g, ' ').trim();
      if (s) query = query.or(`title.ilike.%${s}%,excerpt.ilike.%${s}%,content.ilike.%${s}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map(normalize);
  }, []);
}

export function getArticle(type: ArticleType, slug: string): Promise<Article | null> {
  return safe(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select(SELECT)
      .eq('type', type)
      .eq('slug', slug)
      .eq('status', 'published')
      .is('parent_id', null)
      .maybeSingle();
    if (error) throw error;
    return data ? normalize(data) : null;
  }, null);
}

export function getChapters(novelId: string): Promise<Article[]> {
  return safe(async () => {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('type', 'chapter')
      .eq('parent_id', novelId)
      .eq('status', 'published')
      .order('chapter_number', { ascending: true });
    if (error) throw error;
    return (data ?? []) as Article[];
  }, []);
}

export interface ChapterView {
  novel: Article;
  chapter: Article;
  chapters: Article[];
  prev: Article | null;
  next: Article | null;
}

export function getChapterView(novelSlug: string, chapterSlug: string): Promise<ChapterView | null> {
  return safe(async () => {
    const novel = await getArticle('novel', novelSlug);
    if (!novel) return null;
    const chapters = await getChapters(novel.id);
    const index = chapters.findIndex((c) => c.slug === chapterSlug);
    if (index === -1) return null;
    return {
      novel,
      chapter: chapters[index],
      chapters,
      prev: index > 0 ? chapters[index - 1] : null,
      next: index < chapters.length - 1 ? chapters[index + 1] : null,
    };
  }, null);
}

export function listCategories(): Promise<Category[]> {
  return safe(async () => {
    const { data, error } = await createPublicClient().from('categories').select('*').order('name');
    if (error) throw error;
    return (data ?? []) as Category[];
  }, []);
}

export function listTags(): Promise<Tag[]> {
  return safe(async () => {
    const { data, error } = await createPublicClient().from('tags').select('*').order('name');
    if (error) throw error;
    return (data ?? []) as Tag[];
  }, []);
}

export function getCategoryBySlug(slug: string): Promise<Category | null> {
  return safe(async () => {
    const { data } = await createPublicClient().from('categories').select('*').eq('slug', slug).maybeSingle();
    return (data as Category) ?? null;
  }, null);
}

export function getTagBySlug(slug: string): Promise<Tag | null> {
  return safe(async () => {
    const { data } = await createPublicClient().from('tags').select('*').eq('slug', slug).maybeSingle();
    return (data as Tag) ?? null;
  }, null);
}

/** Everything published, for the sitemap. */
export function listForSitemap(): Promise<Array<{ path: string; updated: string }>> {
  return safe(async () => {
    const { data, error } = await createPublicClient()
      .from('articles')
      .select('id, slug, type, parent_id, updated_at')
      .eq('status', 'published');
    if (error) throw error;
    const rows = data ?? [];
    const novelSlugById = new Map<string, string>();
    for (const r of rows) if (r.type === 'novel') novelSlugById.set(r.id as string, r.slug as string);

    const out: Array<{ path: string; updated: string }> = [];
    for (const r of rows) {
      const slug = encodeURIComponent(r.slug as string);
      if (r.type === 'chapter') {
        const novelSlug = novelSlugById.get(r.parent_id as string);
        if (novelSlug) out.push({ path: `/novels/${encodeURIComponent(novelSlug)}/${slug}`, updated: r.updated_at as string });
      } else {
        out.push({ path: `${TYPE_PATH[r.type as ArticleType]}/${slug}`, updated: r.updated_at as string });
      }
    }
    return out;
  }, []);
}
