"use client";

import { useTranslations } from "next-intl";
import { CategoryCountLink } from "@/components/collection/category-count-link";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import "./category-shortcuts.css";

interface CategoryShortcutsProps {
  counts: { souvenirs: number; apparel: number; gifts: number };
}

export function CategoryShortcuts({ counts }: CategoryShortcutsProps) {
  const t = useTranslations("categories");

  const categories = [
    { href: "/collections/souvenirs", label: t("souvenirs"), count: counts.souvenirs, index: 0 },
    { href: "/collections/apparel", label: t("apparel"), count: counts.apparel, index: 1 },
    { href: "/collections/gifts", label: t("gifts"), count: counts.gifts, index: 2 },
  ];

  return (
    <SectionWrapper bg="mustard">
      <h2 className="category-shortcuts__title type-section-title mb-6">
        {t("title")}
      </h2>
      <div className="category-shortcuts__panel grid grid-cols-1 divide-y-2 divide-biscute-chocolate border-2 border-biscute-chocolate sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0 lg:border-4">
        {categories.map((cat) => (
          <CategoryCountLink
            key={cat.href}
            href={cat.href}
            label={cat.label}
            count={cat.count}
            index={cat.index}
            animated
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
