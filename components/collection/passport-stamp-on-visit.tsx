"use client";

import { useEffect } from "react";
import { stampCollection } from "@/lib/passport";

/** Client helper: stamp passport when visiting a thematic collection. */
export function PassportStampOnVisit({ handle }: { handle: string }) {
  useEffect(() => {
    stampCollection(handle);
  }, [handle]);

  return null;
}
