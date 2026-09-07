"use client";

import { useSyncExternalStore } from "react";
import {
  consumeJustUnlocked,
  consumeNewlyStamped,
  countStamped,
  EMPTY_PROGRESS,
  getProgress,
  getSessionEpoch,
  isPassportComplete,
  PASSPORT_IDS,
  peekJustUnlocked,
  peekNewlyStamped,
  remainingToUnlock,
  subscribeProgress,
  type PassportId,
  type PassportProgress,
} from "@/lib/passport";

export type PassportProgressView = {
  progress: PassportProgress;
  stampedCount: number;
  total: number;
  complete: boolean;
  remaining: number;
  rewardUnlocked: boolean;
  /** Stamps earned this session (for press animation). Stable until acknowledged. */
  newlyStamped: readonly PassportId[];
  /** True once when crossing into 4/4 this session. */
  justUnlocked: boolean;
  sessionEpoch: number;
};

type StoreSnapshot = {
  progress: PassportProgress;
  newlyStamped: readonly PassportId[];
  justUnlocked: boolean;
  sessionEpoch: number;
};

const SERVER_SNAPSHOT: StoreSnapshot = {
  progress: EMPTY_PROGRESS,
  newlyStamped: [],
  justUnlocked: false,
  sessionEpoch: 0,
};

let cachedView: StoreSnapshot | null = null;
let cachedProgressView: PassportProgressView | null = null;

function readStoreSnapshot(): StoreSnapshot {
  const progress = getProgress();
  const newlyStamped = peekNewlyStamped();
  const justUnlocked = peekJustUnlocked();
  const sessionEpoch = getSessionEpoch();

  if (
    cachedView &&
    cachedView.progress === progress &&
    cachedView.newlyStamped === newlyStamped &&
    cachedView.justUnlocked === justUnlocked &&
    cachedView.sessionEpoch === sessionEpoch
  ) {
    return cachedView;
  }

  cachedView = { progress, newlyStamped, justUnlocked, sessionEpoch };
  cachedProgressView = null;
  return cachedView;
}

function readServerSnapshot(): StoreSnapshot {
  return SERVER_SNAPSHOT;
}

function toView(snap: StoreSnapshot): PassportProgressView {
  if (cachedProgressView && cachedView === snap) {
    return cachedProgressView;
  }

  const view: PassportProgressView = {
    progress: snap.progress,
    stampedCount: countStamped(snap.progress),
    total: PASSPORT_IDS.length,
    complete: isPassportComplete(snap.progress),
    remaining: remainingToUnlock(snap.progress),
    rewardUnlocked:
      Boolean(snap.progress.rewardUnlockedAt) ||
      isPassportComplete(snap.progress),
    newlyStamped: snap.newlyStamped,
    justUnlocked: snap.justUnlocked,
    sessionEpoch: snap.sessionEpoch,
  };

  if (snap !== SERVER_SNAPSHOT) {
    cachedProgressView = view;
  }

  return view;
}

/** Live passport progress for the current page visit (resets on refresh). */
export function usePassportProgress(): PassportProgressView {
  const snap = useSyncExternalStore(
    subscribeProgress,
    readStoreSnapshot,
    readServerSnapshot
  );

  return toView(snap);
}

/**
 * After the Passport UI has applied first-earn / unlock animations,
 * clear session flags so reloads do not replay them.
 */
export function acknowledgePassportAnimations(): void {
  consumeNewlyStamped();
  consumeJustUnlocked();
}

/** @deprecated Prefer usePassportProgress */
export function usePassportStamps(): PassportId[] {
  const { progress } = usePassportProgress();
  return PASSPORT_IDS.filter((id) => progress.stamps[id]);
}
