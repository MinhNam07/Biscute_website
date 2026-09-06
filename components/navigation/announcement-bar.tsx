"use client";

import { useTranslations } from "next-intl";
import { STORE_MAPS_URL } from "@/lib/constants/store";

export function AnnouncementBar() {
  const t = useTranslations("announcement");
  const ticker = t("ticker");
  const link = t("link");

  return (
    <a
      href={STORE_MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ticker} — ${link}`}
      className="announcement-ticker block overflow-hidden border-b-2 border-biscute-chocolate bg-biscute-mustard py-2 text-biscute-chocolate lg:border-b-4"
    >
      <div className="flex w-max animate-ticker" aria-hidden>
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="type-label flex shrink-0 items-center gap-4 whitespace-nowrap px-4"
          >
            {ticker}
            <span className="underline underline-offset-2">{link} ↗</span>
          </span>
        ))}
      </div>
    </a>
  );
}
