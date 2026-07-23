"use client";

import { useState, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/product/product-grid";
import { FilterDrawer } from "@/components/collection/filter-drawer";
import { Button } from "@/components/ui/button";
import { filterProducts } from "@/lib/data";
import type { BiscuteProduct, SortOption } from "@/lib/types";

interface CollectionContentProps {
  products: BiscuteProduct[];
  title: string;
  description: string;
}

function CollectionContent({ products, title, description }: CollectionContentProps) {
  const t = useTranslations("common");
  const searchParams = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const sortParam = searchParams.get("sort") ?? "featured";
  const sortOptions: SortOption[] = [
    "featured",
    "price-asc",
    "price-desc",
    "newest",
    "best-selling",
  ];

  const filtered = filterProducts(products, {
    category: searchParams.get("category") ?? undefined,
    color: searchParams.get("color") ?? undefined,
    size: searchParams.get("size") ?? undefined,
    sort: sortOptions.includes(sortParam as SortOption)
      ? (sortParam as SortOption)
      : "featured",
  });

  return (
    <div className="bg-biscute-cream">
      <div className="section-divider container-biscute py-12 md:py-16 lg:py-24">
        <div className="mb-8 border-2 border-biscute-chocolate bg-biscute-pink p-6 text-biscute-white shadow-biscute-lg lg:border-4 lg:p-8">
          <h1 className="font-display text-3xl font-black uppercase tracking-tighter sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-medium text-biscute-white/80">{description}</p>
          <p className="mt-2 text-sm font-bold uppercase tracking-wider text-biscute-white/60">
            {t("products", { count: filtered.length })}
          </p>
        </div>

        <div className="mb-6 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <ProductGrid products={filtered} />
        <FilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
      </div>
    </div>
  );
}

export function CollectionPageClient(props: CollectionContentProps) {
  return (
    <Suspense fallback={<div className="container-biscute py-12 font-bold uppercase">Loading...</div>}>
      <CollectionContent {...props} />
    </Suspense>
  );
}
