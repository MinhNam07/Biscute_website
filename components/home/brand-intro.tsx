"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/brand/section-wrapper";

export function BrandIntro() {
  const t = useTranslations("home.brandIntro");

  return (
    <SectionWrapper bg="white">
      <h2 className="scroll-section__title type-section-title mb-4">
        {t("title")}
      </h2>
      <div className="scroll-section__body max-w-3xl space-y-4">
        <p className="type-body-lg text-biscute-chocolate/80">
          {t("paragraph1")}
        </p>
        <p className="type-body-lg text-biscute-chocolate/80">
          {t("paragraph2")}
        </p>
      </div>
    </SectionWrapper>
  );
}
