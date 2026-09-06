"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { STORE_MAPS_URL } from "@/lib/constants/store";

export function VisitStickyCta() {
  const t = useTranslations("hero");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const visitSection = document.getElementById("visit-biscute");
    if (!visitSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(visitSection);
    return () => observer.disconnect();
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
