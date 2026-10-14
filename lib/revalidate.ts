/** Tells the server to refresh cached public pages after an admin change. */
export async function revalidateSite() {
  try {
    await fetch('/api/revalidate', { method: 'POST' });
  } catch {
    // Not critical: public pages also refresh automatically every minute.
  }
}
