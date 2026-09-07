/** Vietnam Bag — temporary Pack Your Suitcase selection (session only, no cart). */

const KEY = "biscute-vietnam-bag";
export const SUITCASE_CAPACITY = 3;

export type SuitcaseState = {
  packedItemIds: string[];
};

export type PackResult =
  | { ok: true; state: SuitcaseState }
  | { ok: false; reason: "full" | "already"; state: SuitcaseState };

function emptyState(): SuitcaseState {
  return { packedItemIds: [] };
}

function normalizeIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return [];
  const unique: string[] = [];
  for (const id of ids) {
    if (typeof id !== "string" || unique.includes(id)) continue;
    unique.push(id);
    if (unique.length >= SUITCASE_CAPACITY) break;
  }
  return unique;
}

function readStorage(): SuitcaseState {
  if (typeof window === "undefined") return emptyState();
  try {
    // Suitcase is session-scoped; drop any legacy indefinite localStorage copy.
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }

    const raw = sessionStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return { packedItemIds: normalizeIds(parsed) };
    }
    if (
      parsed &&
      typeof parsed === "object" &&
      "packedItemIds" in parsed
    ) {
      return {
        packedItemIds: normalizeIds(
          (parsed as { packedItemIds: unknown }).packedItemIds
        ),
      };
    }
    return emptyState();
  } catch {
    return emptyState();
  }
}

function writeStorage(state: SuitcaseState): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    KEY,
    JSON.stringify({
      packedItemIds: state.packedItemIds.slice(0, SUITCASE_CAPACITY),
    })
  );
}

export function getSuitcaseState(): SuitcaseState {
  return readStorage();
}

/** @deprecated Prefer getSuitcaseState().packedItemIds */
export function getVietnamBag(): string[] {
  return getSuitcaseState().packedItemIds;
}

export function setSuitcaseState(state: SuitcaseState): SuitcaseState {
  const next: SuitcaseState = {
    packedItemIds: normalizeIds(state.packedItemIds),
  };
  writeStorage(next);
  return next;
}

export function setVietnamBag(handles: string[]): SuitcaseState {
  return setSuitcaseState({ packedItemIds: handles });
}

export function clearVietnamBag(): SuitcaseState {
  const next = emptyState();
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(KEY);
  }
  return next;
}

export function packItem(id: string): PackResult {
  const current = getSuitcaseState();
  if (current.packedItemIds.includes(id)) {
    return { ok: false, reason: "already", state: current };
  }
  if (current.packedItemIds.length >= SUITCASE_CAPACITY) {
    return { ok: false, reason: "full", state: current };
  }
  const state = setSuitcaseState({
    packedItemIds: [...current.packedItemIds, id],
  });
  return { ok: true, state };
}

export function unpackItem(id: string): SuitcaseState {
  return setSuitcaseState({
    packedItemIds: getSuitcaseState().packedItemIds.filter((h) => h !== id),
  });
}

/** @deprecated Prefer packItem */
export function addToVietnamBag(handle: string): string[] {
  const result = packItem(handle);
  return result.state.packedItemIds;
}

/** @deprecated Prefer unpackItem */
export function removeFromVietnamBag(handle: string): string[] {
  return unpackItem(handle).packedItemIds;
}
