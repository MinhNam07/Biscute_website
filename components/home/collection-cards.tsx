"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { CardCornerDecorations } from "@/components/brand/geometric-decoration";

const collectionKeys = [
  "hanoi",
  "food-icons",
  "cute-animals",
  "vietnam-culture",
] as const;

export function CollectionCards() {
  const t = useTranslations("sections");
  const tc = useTranslations("collections");

  return (
    <SectionWrapper bg="pink">
      <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tighter sm:text-3xl lg:text-4xl">
        {t("shopByCollection")}
      </h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {collectionKeys.map((key, i) => (
          <Link
            key={key}
            href={`/collections/${key}`}
            className="group relative flex aspect-[4/3] items-end border-2 border-biscute-chocolate bg-biscute-white p-4 shadow-biscute-lg transition-transform duration-200 hover:-translate-y-1 lg:border-4"
          >
            <CardCornerDecorations index={i} />
            <span className="font-display text-base font-black uppercase tracking-tighter text-biscute-chocolate sm:text-lg">
              {tc(key)}
            </span>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
