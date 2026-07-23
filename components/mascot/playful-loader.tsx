"use client";

import { useTranslations } from "next-intl";
import { MascotState } from "./mascot-state";

export function PlayfulLoader() {
  const t = useTranslations("loader");

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <MascotState variant="loader" />
      <p className="font-display text-sm font-semibold text-biscute-chocolate/70">
        {t("text")}
      </p>
    </div>
  );
}
