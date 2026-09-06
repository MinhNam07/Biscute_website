"use client";

import { useTranslations } from "next-intl";
import { STORE_MAPS_URL } from "@/lib/constants/store";

export function AnnouncementBar() {
  const t = useTranslations("announcement");

  return (
    <div className="border-b-2 border-biscute-chocolate bg-biscute-mustard py-2 lg:border-b-4">
      <div className="container-biscute type-label text-center text-biscute-chocolate">
        <span>{t("text")}</span>
        <span className="mx-2">·</span>
        <a
          href={STORE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:no-underline"
        >
          {t("link")}
        </a>
      </div>
    </div>
  );
}
