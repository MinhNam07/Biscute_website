"use client";

import { useTranslations } from "next-intl";

const MAPS_URL = "https://maps.app.goo.gl/mCmGvkCS1j6HPMBB9";

export function AnnouncementBar() {
  const t = useTranslations("announcement");

  return (
    <div className="border-b-2 border-biscute-chocolate bg-biscute-mustard py-2 lg:border-b-4">
      <div className="container-biscute text-center text-sm font-bold uppercase tracking-wider text-biscute-chocolate">
        <span>{t("text")}</span>
        <span className="mx-2">·</span>
        <a
          href={MAPS_URL}
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
