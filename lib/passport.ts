/**
 * Biscute Travel Passport — client progress store.
 *
 * Progress is intentionally device/browser-local (localStorage).
 * There is no cross-device sync. A future account/backend can replace
 * `passportStorage` without rewriting Passport UI consumers.
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
  { id: "food", routeHandle: "food-icons", label: "FOOD", rotate: 3 },
  { id: "animals", routeHandle: "cute-animals", label: "ANIMALS", rotate: -2 },
  { id: "tet", routeHandle: "vietnam-culture", label: "TET", rotate: 4 },
] as const;

const ROUTE_TO_ID: Record<string, PassportId> = Object.fromEntries(
  PASSPORT_COLLECTIONS.map((c) => [c.routeHandle, c.id])
) as Record<string, PassportId>;

/** Legacy handles from `biscute-passport-stamps` array schema. */
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

const STORAGE_KEY = "biscute.travel-passport.v1";
const LEGACY_KEY = "biscute-passport-stamps";
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
  return ROUTE_TO_ID[handle] ?? null;
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

function normalizeProgress(raw: unknown): PassportProgress | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  if (obj.version !== 1) return null;
  if (!obj.stamps || typeof obj.stamps !== "object") return null;

  const stamps = emptyStamps();
  const stampedAt: Partial<Record<PassportId, string>> = {};
  const rawStamps = obj.stamps as Record<string, unknown>;
  const rawAt =
    obj.stampedAt && typeof obj.stampedAt === "object"
      ? (obj.stampedAt as Record<string, unknown>)
      : {};

  for (const id of PASSPORT_IDS) {
    stamps[id] = rawStamps[id] === true;
    const at = rawAt[id];
    if (typeof at === "string" && at.length > 0) stampedAt[id] = at;
  }

  const progress: PassportProgress = {
    version: 1,
    stamps,
    stampedAt,
  };

  if (typeof obj.rewardUnlockedAt === "string" && obj.rewardUnlockedAt) {
    progress.rewardUnlockedAt = obj.rewardUnlockedAt;
  } else if (isPassportComplete(progress)) {
    // Recover unlock timestamp if stamps are complete but field missing.
    progress.rewardUnlockedAt =
      stampedAt.tet ??
      stampedAt.animals ??
      stampedAt.food ??
      stampedAt.hanoi ??
      new Date().toISOString();
  }

  return progress;
}

function migrateLegacyArray(raw: string | null): PassportProgress | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const progress = createEmptyProgress();
    let any = false;
    for (const item of parsed) {
      if (typeof item !== "string") continue;
      const id = LEGACY_HANDLE_TO_ID[item];
      if (!id) continue;
      progress.stamps[id] = true;
      if (!progress.stampedAt[id]) {
        progress.stampedAt[id] = new Date().toISOString();
      }
      any = true;
    }
    if (!any) return null;
    if (isPassportComplete(progress)) {
      progress.rewardUnlockedAt = new Date().toISOString();
    }
    return progress;
  } catch {
    return null;
  }
}

function readRaw(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeRaw(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/**
 * Storage adapter — swap later for an account/backend without rewriting UI.
 * Limitation: localStorage is per-device / per-browser only.
 */
export const passportStorage = {
  load(): PassportProgress {
    const current = readRaw(STORAGE_KEY);
    if (current) {
      try {
        const normalized = normalizeProgress(JSON.parse(current) as unknown);
        if (normalized) return normalized;
      } catch {
        // fall through to clean passport
      }
      return createEmptyProgress();
    }

    const migrated = migrateLegacyArray(readRaw(LEGACY_KEY));
    if (migrated) {
      passportStorage.save(migrated);
      removeRaw(LEGACY_KEY);
      return migrated;
    }

    return createEmptyProgress();
  },

  save(progress: PassportProgress): boolean {
    return writeRaw(STORAGE_KEY, JSON.stringify(progress));
  },

  reset(): void {
    removeRaw(STORAGE_KEY);
    removeRaw(LEGACY_KEY);
  },
};

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
    snapshot = passportStorage.load();
    hydrated = true;
  }
  return snapshot;
}

function commit(next: PassportProgress, options?: { persist?: boolean }) {
  snapshot = next;
  hydrated = true;
  const persist = options?.persist !== false;
  if (persist) {
    passportStorage.save(next);
  }
  // Always notify — even if storage write fails — so UI updates this session.
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

export function resetPassport(): PassportProgress {
  sessionNewlyStamped = EMPTY_NEWLY;
  sessionJustUnlocked = false;
  sessionEpoch += 1;
  passportStorage.reset();
  return commit(createEmptyProgress(), { persist: true });
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

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === LEGACY_KEY || event.key === null) {
      hydrated = false;
      onChange();
    }
  };
  const onLocal = () => onChange();
  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      hydrated = false;
      onChange();
    }
  };

  window.addEventListener(CHANGE_EVENT, onLocal);
  window.addEventListener("storage", onStorage);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onLocal);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("pageshow", onPageShow);
  };
}

/** Alias matching prior subscribe API. */
export const subscribeStamps = subscribeProgress;
