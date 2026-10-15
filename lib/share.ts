/** Native share sheet when the device supports it, otherwise copy the link. */
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';

export async function shareLink(url: string, title: string): Promise<ShareResult> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ url, title });
      return 'shared';
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      // fall through to copy
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    try {
      window.prompt('Copy this link:', url);
      return 'copied';
    } catch {
      return 'failed';
    }
  }
}
