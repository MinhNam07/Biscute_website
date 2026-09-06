"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import type { BiscuteProduct } from "@/lib/types";
import "./homepage-colors.css";

interface ProductSectionProps {
  titleKey?: "bestSellers" | "newArrivals" | "exploreProducts" | "featuredPicks";
  title?: string;
  products: BiscuteProduct[];
  viewAllHref: string;
  priorityCount?: number;
}

export function ProductSection({
  titleKey = "featuredPicks",
  title,
  products,
  viewAllHref,
  priorityCount = 4,
}: ProductSectionProps) {
  const t = useTranslations("sections");
  const heading = title ?? (titleKey ? t(titleKey) : "");

  return (
    <SectionWrapper bg="pale-pink" spacing="featured" className="home-section-products">
      <div className="section-header-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="section-title-accent section-title-accent--deep type-section-title max-w-[20ch] sm:max-w-none">
          {heading}
        </h2>
        <Link
          href={viewAllHref}
          className="type-label shrink-0 text-biscute-deep-pink transition-colors hover:text-biscute-pink"
        >
          {t("exploreAll")} →
        </Link>
      </div>
      <ProductGrid
        products={products}
        priorityCount={priorityCount}
        presentation="catalogue"
        layout="homepage"
      />
    </SectionWrapper>
  );
}
