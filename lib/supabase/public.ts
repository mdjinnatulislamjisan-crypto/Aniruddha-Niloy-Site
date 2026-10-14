import { createClient } from '@supabase/supabase-js';

/**
 * Cookie-less anonymous client for public pages.
 * It can only ever see what Row Level Security allows the public to see
 * (published articles, categories, tags).
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are missing.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
