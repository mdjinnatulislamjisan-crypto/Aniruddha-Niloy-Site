import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AdminState =
  | { status: 'ok'; userId: string; email: string }
  | { status: 'forbidden'; email: string };

/**
 * Server-side admin check used by every admin page.
 * 1) must be signed in (otherwise redirected to the login page)
 * 2) must have a row in public.admins
 */
export async function getAdminState(): Promise<AdminState> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!data) return { status: 'forbidden', email: user.email ?? '' };
  return { status: 'ok', userId: user.id, email: user.email ?? '' };
}
