/**
 * Biscute Travel Passport — collectible stamp progress for the Post Office hunt.
 *
 * Progress is in-memory for this page lifetime only. Soft client navigations keep
 * stamps; a full refresh clears the sheet so the hunt starts blank again.
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

/** Cleared on boot so older builds that wrote localStorage do not leak stamps back. */
const LEGACY_STORAGE_KEYS = [
  "biscute.travel-passport.v1",
  "biscute-passport-stamps",
  "biscute.passport.v2",
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

function canUseDom(): boolean {
  return typeof window !== "undefined";
}

function clearPersistedStamps(): void {
  if (!canUseDom() || typeof window.localStorage === "undefined") return;
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // ignore
  }
}

/** Session animation flags + live progress — on globalThis so Turbopack chunk duplicates share one store. */
type PassportRuntime = {
  snapshot: PassportProgress;
  ready: boolean;
  sessionNewlyStamped: PassportId[];
  sessionJustUnlocked: boolean;
  sessionEpoch: number;
};

const RUNTIME_KEY = "__biscutePassportRuntime";

function getRuntime(): PassportRuntime {
  const scope = globalThis as typeof globalThis & {
    [RUNTIME_KEY]?: PassportRuntime;
  };
  if (!scope[RUNTIME_KEY]) {
    scope[RUNTIME_KEY] = {
      snapshot: createEmptyProgress(),
      ready: false,
      sessionNewlyStamped: [],
      sessionJustUnlocked: false,
      sessionEpoch: 0,
    };
  }
  return scope[RUNTIME_KEY];
}

function notify() {
  if (!canUseDom()) return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function ensureReady(): PassportProgress {
  if (!canUseDom()) return createEmptyProgress();
  const runtime = getRuntime();
  if (!runtime.ready) {
    clearPersistedStamps();
    runtime.snapshot = createEmptyProgress();
    runtime.ready = true;
  }
  return runtime.snapshot;
}

function commit(next: PassportProgress) {
  const runtime = getRuntime();
  runtime.snapshot = next;
  runtime.ready = true;
  notify();
  return runtime.snapshot;
}

/**
 * Client boot: wipe any leftover persisted stamps and ensure the in-memory
 * store is ready. Soft navigations keep the current snapshot.
 */
export function rehydrateFromStorage(): PassportProgress {
  if (!canUseDom()) return createEmptyProgress();
  clearPersistedStamps();
  const runtime = getRuntime();
  if (!runtime.ready) {
    runtime.snapshot = createEmptyProgress();
    runtime.ready = true;
    notify();
  }
  return runtime.snapshot;
}

export function getProgressServerSnapshot(): PassportProgress {
  return EMPTY_PROGRESS;
}

export function getProgress(): PassportProgress {
  return ensureReady();
}

/** @deprecated Prefer getProgress — kept for transitional call sites. */
export function getStamps(): PassportId[] {
  const progress = getProgress();
  return PASSPORT_IDS.filter((id) => progress.stamps[id]);
}

export function getStampsServerSnapshot(): PassportId[] {
  return [];
}

/**
 * Idempotent: marks a collection as viewed/stamped.
 * Never toggles a stamp back to false.
 */
export function markCollectionViewed(collectionId: string): PassportProgress {
  if (!isPassportId(collectionId)) {
    return getProgress();
  }

  const current = ensureReady();
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

  const runtime = getRuntime();
  runtime.sessionNewlyStamped = runtime.sessionNewlyStamped.includes(collectionId)
    ? runtime.sessionNewlyStamped
    : [...runtime.sessionNewlyStamped, collectionId];
  runtime.sessionEpoch += 1;

  if (!next.rewardUnlockedAt && isPassportComplete(next)) {
    next.rewardUnlockedAt = now;
    runtime.sessionJustUnlocked = true;
  }

  return commit(next);
}

export function consumeNewlyStamped(): PassportId[] {
  const runtime = getRuntime();
  const ids = runtime.sessionNewlyStamped;
  if (ids.length > 0) {
    runtime.sessionNewlyStamped = [];
    runtime.sessionEpoch += 1;
    notify();
  }
  return ids;
}

export function peekNewlyStamped(): readonly PassportId[] {
  return getRuntime().sessionNewlyStamped;
}

export function consumeJustUnlocked(): boolean {
  const runtime = getRuntime();
  const value = runtime.sessionJustUnlocked;
  if (value) {
    runtime.sessionJustUnlocked = false;
    runtime.sessionEpoch += 1;
    notify();
  }
  return value;
}

export function peekJustUnlocked(): boolean {
  return getRuntime().sessionJustUnlocked;
}

export function getSessionEpoch(): number {
  return getRuntime().sessionEpoch;
}

export function subscribeProgress(onChange: () => void): () => void {
  if (!canUseDom()) return () => {};

  const onLocal = () => onChange();
  window.addEventListener(CHANGE_EVENT, onLocal);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onLocal);
  };
}

/** Alias matching prior subscribe API. */
export const subscribeStamps = subscribeProgress;
