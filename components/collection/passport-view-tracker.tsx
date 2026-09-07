"use client";

import { useEffect, useRef } from "react";
import {
  markCollectionViewed,
  routeHandleToPassportId,
} from "@/lib/passport";

/**
 * Inks a passport stamp when the matching collection page opens.
 * Matches on-sheet copy: open each collection to ink its stamp.
 */
export function PassportViewTracker({
  routeHandle,
}: {
  routeHandle: string;
}) {
  const awardedRef = useRef(false);
  const passportId = routeHandleToPassportId(routeHandle);

  useEffect(() => {
    if (!passportId || awardedRef.current) return;
    awardedRef.current = true;
    markCollectionViewed(passportId);
  }, [passportId]);

  return null;
}
