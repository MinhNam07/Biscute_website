"use client";

import { useEffect, useState } from "react";

/**
 * Thin ink stroke on the perforated outer silhouette — sibling overlay so the
 * stroke is not clipped by the paper mask.
 *
 * Mounted after hydration only. `/postal-perf-contour.js` upgrades the host;
 * injecting SVG before React hydrates caused a full-page hydration mismatch.
 */
export function PostalPerforationContour() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <postal-perf-contour className="postal-frame__contour" aria-hidden />;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "postal-perf-contour": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
