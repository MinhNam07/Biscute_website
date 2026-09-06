"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import "./home-sections.css";

export function GiftsByPrice() {
  const t = useTranslations("sections");
  const tg = useTranslations("gifts");

  const tiers = [
    { href: "/collections/gifts-under-200k", label: tg("under200k") },
    { href: "/collections/gifts-under-500k", label: tg("under500k") },
  ];

  return (
    <SectionWrapper bg="mustard">
      <h2 className="scroll-section__title type-section-title mb-6 text-biscute-chocolate">
        {t("giftsByPrice")}
      </h2>
      <div className="scroll-section__body grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tiers.map((tier, i) => (
          <Link
            key={tier.href}
            href={tier.href}
            className={`gifts-tier-card flex aspect-[3/2] items-center justify-center border-2 border-biscute-chocolate bg-biscute-white p-6 text-center shadow-biscute-lg transition-transform duration-200 hover:-translate-y-1 lg:border-4 ${i === 1 ? "sm:-mt-4 lg:mt-0" : ""}`}
          >
            <span className="type-subsection-title text-biscute-chocolate">
              {tier.label}
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
