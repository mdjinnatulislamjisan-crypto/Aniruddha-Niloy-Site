import { redirect } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (configured) {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (user) redirect('/admin');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md border border-charcoal-line bg-charcoal p-8">
        <p className="font-display text-3xl text-ivory">Aniruddha Niloy</p>
        <h1 className="mt-1 font-display text-xl text-gold">Administrator sign-in</h1>

        {configured ? (
          <div className="mt-8">
            <LoginForm />
          </div>
        ) : (
          <p role="alert" className="mt-8 border border-blood px-3 py-3 text-[#e08a8a]">
            Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
            .env.local (or to your Vercel project settings), then restart the server.
          </p>
        )}

        <p className="mt-8 text-sm">
          <Link href="/" className="text-ivory-faint hover:text-gold-bright">&larr; Back to the website</Link>
        </p>
      </div>
    </main>
  );
}
