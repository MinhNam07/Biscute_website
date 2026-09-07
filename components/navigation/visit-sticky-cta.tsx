"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { STORE_MAPS_URL } from "@/lib/constants/store";

function isInStickyConflict(el: Element | null): boolean {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const stickyZoneTop = window.innerHeight - 96;
  return rect.top < window.innerHeight - 8 && rect.bottom > stickyZoneTop;
}

/**
 * Mobile sticky Visit CTA. Hides when the real Visit section OR the Post Office
 * reward parcel would sit under the bar.
 */
export function VisitStickyCta() {
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => {
      const visitSection = document.getElementById("visit-biscute");
      const passportReward = document.getElementById("passport-reward");

      let visitCovered = false;
      if (visitSection) {
        const rect = visitSection.getBoundingClientRect();
        visitCovered =
          rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      }

      const rewardCovered = isInStickyConflict(passportReward);
      setVisible(!(visitCovered || rewardCovered));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    // Passport mounts as a sibling — re-check after layout settles.
    const raf = window.requestAnimationFrame(sync);
    const timer = window.setTimeout(sync, 120);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="visit-sticky-cta fixed inset-x-0 bottom-0 z-30 border-t-2 border-biscute-chocolate bg-biscute-mustard px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-biscute-lg lg:hidden">
      <a
        href={STORE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-press type-cta flex min-h-11 w-full items-center justify-center gap-2 text-biscute-chocolate"
      >
        {t("ctaVisit")}
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
