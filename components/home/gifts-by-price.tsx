"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";

export function GiftsByPrice() {
  const t = useTranslations("sections");
  const tg = useTranslations("gifts");

  const tiers = [
    { href: "/collections/gifts-under-200k", label: tg("under200k") },
    { href: "/collections/gifts-under-500k", label: tg("under500k") },
  ];

  return (
    <SectionWrapper bg="deep-pink">
      <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tighter text-biscute-white sm:text-3xl lg:text-4xl">
        {t("giftsByPrice")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tiers.map((tier, i) => (
          <Link
            key={tier.href}
            href={tier.href}
            className={`flex aspect-[3/2] items-center justify-center border-2 border-biscute-chocolate bg-biscute-white p-6 text-center shadow-biscute-lg transition-transform duration-200 hover:-translate-y-1 lg:border-4 ${i === 1 ? "sm:-mt-4 lg:mt-0" : ""}`}
          >
            <span className="font-display text-xl font-black uppercase tracking-tighter text-biscute-chocolate md:text-2xl">
              {tier.label}
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
