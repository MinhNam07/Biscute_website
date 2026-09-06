/** Biscute Passport — localStorage stamps for thematic collections. */

const KEY = "biscute-passport-stamps";

export const PASSPORT_COLLECTIONS = [
  "hanoi",
  "food-icons",
  "cute-animals",
  "vietnam-culture",
] as const;

export type PassportHandle = (typeof PASSPORT_COLLECTIONS)[number];

export function getStamps(): PassportHandle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((h): h is PassportHandle =>
      (PASSPORT_COLLECTIONS as readonly string[]).includes(h)
    );
  } catch {
    return [];
  }
}

export function stampCollection(handle: string): PassportHandle[] {
  if (!(PASSPORT_COLLECTIONS as readonly string[]).includes(handle)) {
    return getStamps();
  }
  const current = getStamps();
  if (current.includes(handle as PassportHandle)) return current;
  const next = [...current, handle as PassportHandle];
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  return next;
}

export function isPassportComplete(stamps = getStamps()): boolean {
  return PASSPORT_COLLECTIONS.every((h) => stamps.includes(h));
}
