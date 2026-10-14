import type { MetadataRoute } from 'next';
import { listForSitemap } from '@/lib/data';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed = ['', '/stories', '/poetry', '/mythology', '/novels', '/about', '/search'].map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));
  const articles = (await listForSitemap()).map((a) => ({
    url: `${SITE.url}${a.path}`,
    lastModified: new Date(a.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...fixed, ...articles];
}
