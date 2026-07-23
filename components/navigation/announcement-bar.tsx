"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function AnnouncementBar() {
  const t = useTranslations("announcement");

  return (
    <div className="border-b-2 border-biscute-chocolate bg-biscute-deep-pink py-2 text-center text-sm font-bold uppercase tracking-wider text-biscute-white lg:border-b-4">
      <span>{t("text")}</span>
      <span className="mx-2">·</span>
      <Link href="/visit" className="underline underline-offset-2 hover:no-underline">
        {t("link")}
      </Link>
    </div>
  );
}
