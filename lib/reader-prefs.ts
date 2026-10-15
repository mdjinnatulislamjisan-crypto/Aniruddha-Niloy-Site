/**
 * Reading preferences (text size + page theme), remembered in the reader's own browser.
 * Nothing is sent to a server and there are no reader accounts.
 */
export type ReaderTheme = 'paper' | 'night';

export interface ReaderPrefs {
  theme: ReaderTheme;
  size: number; // 0..4
}

export const PREFS_KEY = 'an:reader:v1';
export const DEFAULT_PREFS: ReaderPrefs = { theme: 'paper', size: 2 };
export const MIN_SIZE = 0;
export const MAX_SIZE = 4;

export function readPrefs(): ReaderPrefs {
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const p = JSON.parse(raw);
    const theme: ReaderTheme = p?.theme === 'night' ? 'night' : 'paper';
    const size = Number.isInteger(p?.size) && p.size >= MIN_SIZE && p.size <= MAX_SIZE ? p.size : DEFAULT_PREFS.size;
    return { theme, size };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function applyPrefs(prefs: ReaderPrefs): void {
  const el = document.documentElement;
  el.dataset.readerTheme = prefs.theme;
  el.dataset.readerSize = String(prefs.size);
}

export function savePrefs(prefs: ReaderPrefs): void {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Private mode or storage disabled: the choice simply will not be remembered.
  }
}

/**
 * Tiny script placed in <head> so the saved theme/size are applied BEFORE the page paints
 * (prevents a flash of the wrong theme). It is a fixed string, not user input.
 */
export const READER_BOOT_SCRIPT = `(function(){try{var p=JSON.parse(localStorage.getItem('${PREFS_KEY}')||'{}');var d=document.documentElement;if(p.theme==='night'||p.theme==='paper'){d.dataset.readerTheme=p.theme;}var s=parseInt(p.size,10);if(s>=${MIN_SIZE}&&s<=${MAX_SIZE}){d.dataset.readerSize=String(s);}}catch(e){}})();`;
