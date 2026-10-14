export type ArticleType = 'story' | 'poem' | 'mythology' | 'novel' | 'chapter';
export type Language = 'en' | 'bn';
export type Status = 'draft' | 'published';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: ArticleType;
  language: Language;
  status: Status;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  category_id: string | null;
  parent_id: string | null;
  chapter_number: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: Category | null;
  tags?: Tag[];
}
