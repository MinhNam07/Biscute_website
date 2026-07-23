"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import type { BiscuteProduct } from "@/lib/types";

interface ProductSectionProps {
  titleKey: "bestSellers" | "newArrivals";
  products: BiscuteProduct[];
  viewAllHref: string;
  priorityCount?: number;
}

export function ProductSection({
  titleKey,
  products,
  viewAllHref,
  priorityCount = 4,
}: ProductSectionProps) {
  const t = useTranslations("sections");
  const bg = titleKey === "newArrivals" ? "pale-pink" : "cream";

  return (
    <SectionWrapper bg={bg}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-black uppercase tracking-tighter sm:text-3xl lg:text-4xl">
          {t(titleKey)}
        </h2>
        <Link
          href={viewAllHref}
          className="text-xs font-bold uppercase tracking-widest text-biscute-chocolate/70 transition-colors hover:text-biscute-deep-pink"
        >
          {t("viewAll")} →
        </Link>
      </div>
      <ProductGrid products={products} priorityCount={priorityCount} />
    </SectionWrapper>
  );
}
