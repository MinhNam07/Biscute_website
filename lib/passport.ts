/**
 * Biscute Travel Passport — in-memory progress for the current page visit.
 *
 * Progress resets on full page refresh / new visit. Soft client navigations
 * within the same visit keep stamps. No localStorage persistence.
 */

export const PASSPORT_IDS = ["hanoi", "food", "animals", "tet"] as const;
export type PassportId = (typeof PASSPORT_IDS)[number];

export type PassportCollectionMeta = {
  id: PassportId;
  /** Existing collection route handle — do not rename product URLs. */
  routeHandle: string;
  label: string;
  rotate: number;
};

export const PASSPORT_COLLECTIONS: readonly PassportCollectionMeta[] = [
  { id: "hanoi", routeHandle: "hanoi", label: "HANOI", rotate: -3 },
  { id: "food", routeHandle: "food-icons", label: "FOOD", rotate: 2 },
  { id: "animals", routeHandle: "cute-animals", label: "ANIMALS", rotate: -1 },
  { id: "tet", routeHandle: "vietnam-culture", label: "TET", rotate: 3 },
] as const;

const ROUTE_TO_ID: Record<string, PassportId> = Object.fromEntries(
  PASSPORT_COLLECTIONS.map((c) => [c.routeHandle, c.id])
) as Record<string, PassportId>;

/** Legacy handles from older stamp schemas. */
const LEGACY_HANDLE_TO_ID: Record<string, PassportId> = {
  hanoi: "hanoi",
  "food-icons": "food",
  "cute-animals": "animals",
  "vietnam-culture": "tet",
  food: "food",
  animals: "animals",
  tet: "tet",
};

export interface PassportProgress {
  version: 1;
  stamps: Record<PassportId, boolean>;
  stampedAt: Partial<Record<PassportId, string>>;
  rewardUnlockedAt?: string;
}

const LEGACY_STORAGE_KEYS = [
  "biscute.travel-passport.v1",
  "biscute-passport-stamps",
] as const;
const CHANGE_EVENT = "biscute-passport-change";

function emptyStamps(): Record<PassportId, boolean> {
  return { hanoi: false, food: false, animals: false, tet: false };
}

export function createEmptyProgress(): PassportProgress {
  return {
    version: 1,
    stamps: emptyStamps(),
    stampedAt: {},
  };
}

/** Stable empty progress for SSR / useSyncExternalStore server snapshot. */
export const EMPTY_PROGRESS: PassportProgress = {
  version: 1,
  stamps: { hanoi: false, food: false, animals: false, tet: false },
  stampedAt: {},
};

function isPassportId(value: unknown): value is PassportId {
  return (
    typeof value === "string" &&
    (PASSPORT_IDS as readonly string[]).includes(value)
  );
}

export function routeHandleToPassportId(
  handle: string | undefined | null
): PassportId | null {
  if (!handle) return null;
  return ROUTE_TO_ID[handle] ?? LEGACY_HANDLE_TO_ID[handle] ?? null;
}

export function passportIdToRouteHandle(id: PassportId): string {
  const meta = PASSPORT_COLLECTIONS.find((c) => c.id === id);
  return meta?.routeHandle ?? id;
}

export function countStamped(progress: PassportProgress): number {
  return PASSPORT_IDS.reduce(
    (n, id) => n + (progress.stamps[id] ? 1 : 0),
    0
  );
}

export function isPassportComplete(progress: PassportProgress): boolean {
  return countStamped(progress) === PASSPORT_IDS.length;
}

export function remainingToUnlock(progress: PassportProgress): number {
  return Math.max(0, PASSPORT_IDS.length - countStamped(progress));
}

/** One-time cleanup of older persistent passport keys. */
function clearLegacyStorage(): void {
  if (typeof window === "undefined") return;
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}

/** Session-only: stamps earned this page lifetime (for press animation). */
const EMPTY_NEWLY: PassportId[] = [];
let sessionNewlyStamped: PassportId[] = EMPTY_NEWLY;
/** Session-only: reward unlock animation should play once. */
let sessionJustUnlocked = false;
/** Bumps when session animation flags change so subscribers can re-read. */
let sessionEpoch = 0;

let snapshot: PassportProgress = createEmptyProgress();
let hydrated = false;

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function ensureHydrated(): PassportProgress {
  if (typeof window === "undefined") return createEmptyProgress();
  if (!hydrated) {
    clearLegacyStorage();
    snapshot = createEmptyProgress();
    hydrated = true;
  }
  return snapshot;
}

function commit(next: PassportProgress) {
  snapshot = next;
  hydrated = true;
  notify();
  return snapshot;
}

export function getProgressServerSnapshot(): PassportProgress {
  return EMPTY_PROGRESS;
}

export function getProgress(): PassportProgress {
  return ensureHydrated();
}

/** @deprecated Prefer getProgress — kept for transitional call sites. */
export function getStamps(): PassportId[] {
  const progress = getProgress();
  return PASSPORT_IDS.filter((id) => progress.stamps[id]);
}

export function getStampsServerSnapshot(): PassportId[] {
  return EMPTY_NEWLY;
}

/**
 * Idempotent: marks a collection as viewed/stamped.
 * Never toggles a stamp back to false.
 */
export function markCollectionViewed(collectionId: string): PassportProgress {
  if (!isPassportId(collectionId)) {
    return getProgress();
  }

  const current = ensureHydrated();
  if (current.stamps[collectionId]) {
    return current;
  }

  const now = new Date().toISOString();
  const next: PassportProgress = {
    version: 1,
    stamps: { ...current.stamps, [collectionId]: true },
    stampedAt: { ...current.stampedAt, [collectionId]: now },
    rewardUnlockedAt: current.rewardUnlockedAt,
  };

  sessionNewlyStamped = sessionNewlyStamped.includes(collectionId)
    ? sessionNewlyStamped
    : [...sessionNewlyStamped, collectionId];
  sessionEpoch += 1;

  if (!next.rewardUnlockedAt && isPassportComplete(next)) {
    next.rewardUnlockedAt = now;
    sessionJustUnlocked = true;
  }

  return commit(next);
}

export function consumeNewlyStamped(): PassportId[] {
  const ids = sessionNewlyStamped;
  if (ids.length > 0) {
    sessionNewlyStamped = EMPTY_NEWLY;
    sessionEpoch += 1;
    notify();
  }
  return ids;
}

export function peekNewlyStamped(): readonly PassportId[] {
  return sessionNewlyStamped;
}

export function consumeJustUnlocked(): boolean {
  const value = sessionJustUnlocked;
  if (value) {
    sessionJustUnlocked = false;
    sessionEpoch += 1;
    notify();
  }
  return value;
}

export function peekJustUnlocked(): boolean {
  return sessionJustUnlocked;
}

export function getSessionEpoch(): number {
  return sessionEpoch;
}

export function subscribeProgress(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const onLocal = () => onChange();

  window.addEventListener(CHANGE_EVENT, onLocal);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onLocal);
  };
}

/** Alias matching prior subscribe API. */
export const subscribeStamps = subscribeProgress;
