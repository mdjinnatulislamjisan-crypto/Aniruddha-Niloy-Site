import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/** Server client that acts as the signed-in user (reads the auth cookie). */

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: {
              domain?: string;
              path?: string;
              expires?: Date;
              httpOnly?: boolean;
              maxAge?: number;
              sameSite?: boolean | 'lax' | 'strict' | 'none';
              secure?: boolean;
            };
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component: safe to ignore.
            // Middleware refreshes the session.
          }
        },
      },
    }
  );
}