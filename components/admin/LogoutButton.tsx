'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LogoutButton({ className = 'btn btn-ghost btn-sm' }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await createClient().auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button type="button" onClick={logout} disabled={busy} className={className}>
      {busy ? 'Signing out...' : 'Log out'}
    </button>
  );
}
