"use client";

import { useEffect, useRef } from "react";
import {
  markCollectionViewed,
  routeHandleToPassportId,
  type PassportId,
} from "@/lib/passport";

const DWELL_MS = 3000;
const SCROLL_THRESHOLD = 0.25;

/**
 * Awards a passport stamp after meaningful viewing:
 * 3s dwell OR 25% page scroll — whichever comes first.
 * Mobile and desktop share this path (no hover / mouse-only events).
 */
export function PassportViewTracker({
  routeHandle,
}: {
  routeHandle: string;
}) {
  const awardedRef = useRef(false);
  const passportId = routeHandleToPassportId(routeHandle);

  useEffect(() => {
    if (!passportId) return;

    awardedRef.current = false;
    let cancelled = false;

    const award = (id: PassportId) => {
      if (cancelled || awardedRef.current) return;
      awardedRef.current = true;
      markCollectionViewed(id);
      cleanup();
    };

    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return;
      const ratio = el.scrollTop / scrollable;
      if (ratio >= SCROLL_THRESHOLD) {
        award(passportId);
      }
    };

    const timer = window.setTimeout(() => award(passportId), DWELL_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check once in case the page is short / already scrolled.
    onScroll();

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [passportId]);

  return null;
}
