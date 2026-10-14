import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  const { data } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (!data) return NextResponse.json({ ok: false }, { status: 403 });

  revalidatePath('/', 'layout');
  return NextResponse.json({ ok: true });
}
