import { getAdminState } from '@/lib/auth';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const state = await getAdminState();

  if (state.status === 'forbidden') {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-4xl text-ivory">Access denied</h1>
        <p className="mt-4 text-ivory-dim">
          {state.email} is signed in but is not an administrator. Follow the &ldquo;create the first
          administrator&rdquo; step in the README, then sign in again.
        </p>
        <div className="mt-8 flex justify-center">
          <LogoutButton className="btn btn-gold" />
        </div>
      </main>
    );
  }

  return (
    <>
      <AdminNav email={state.email} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</div>
    </>
  );
}
