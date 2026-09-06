/** Vietnam Bag — local wishlist for Pack Your Suitcase (no cart). */

const KEY = "biscute-vietnam-bag";

export function getVietnamBag(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

export function setVietnamBag(handles: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(handles.slice(0, 3)));
}

export function clearVietnamBag(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function addToVietnamBag(handle: string): string[] {
  const current = getVietnamBag();
  if (current.includes(handle) || current.length >= 3) return current;
  const next = [...current, handle];
  setVietnamBag(next);
  return next;
}

export function removeFromVietnamBag(handle: string): string[] {
  const next = getVietnamBag().filter((h) => h !== handle);
  setVietnamBag(next);
  return next;
}
