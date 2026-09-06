"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/commerce/price-display";
import { IdTag } from "@/components/brand/id-tag";
import { cn } from "@/lib/utils";
import type { BiscuteProduct, ProductBadge } from "@/lib/types";

interface ProductCardProps {
  product: BiscuteProduct;
  priority?: boolean;
  index?: number;
  cornerClassName?: string;
  presentation?: "default" | "catalogue";
}

/** BV-001 → 001 so the ticket reads as an inventory number. */
export function itemNumber(id: string): string {
  return id.replace(/^BV-/, "");
}

export function ProductCard({
  product,
  priority = false,
  presentation = "default",
}: ProductCardProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("product");
  const tCategories = useTranslations("categories");
  const [hovered, setHovered] = useState(false);

  const personalityLabels: Record<ProductBadge, string> = {
    new: t("freshOuttaOven"),
    "best-seller": t("crowdFav"),
    limited: t("catchIt"),
  };

  const primaryBadge = product.badges[0];
  const uniqueColors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <IdTag>{t("itemNumber", { id: itemNumber(product.id) })}</IdTag>
          {presentation === "catalogue" && (
            <span className="type-label text-biscute-chocolate/50">
              {tCategories(product.category)}
            </span>
          )}
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-soft">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt[locale]}
            fill
            className={cn(
              "object-cover motion-opacity",
              hovered && product.images[1] ? "opacity-0" : "opacity-100"
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
          {product.images[1] && (
            <Image
              src={product.images[1].url}
              alt={product.images[1].alt[locale]}
              fill
              className={cn(
                "object-cover motion-opacity",
                hovered ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {presentation === "default" && (
            <div className="motion-opacity absolute inset-x-2 bottom-2 opacity-100 md:opacity-0 md:group-hover:opacity-100">
              <Button
                variant="primary"
                size="sm"
                shape="pill"
                className="pointer-events-none w-full"
              >
                {t("view")}
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 px-0.5">
          {primaryBadge && (
            <span className="type-label text-biscute-deep-pink">
              {personalityLabels[primaryBadge]}
            </span>
          )}
          <h3 className="type-card-title line-clamp-2 leading-snug">
            {product.title[locale]}
          </h3>
          <PriceDisplay amount={product.price} compareAt={product.compareAtPrice} />
          {uniqueColors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              {uniqueColors.slice(0, 4).map((color) => {
                const variant = product.variants.find((v) => v.color === color);
                return (
                  <span
                    key={color}
                    className="h-3.5 w-3.5 rounded-full border-2 border-biscute-chocolate"
                    style={{ backgroundColor: variant?.colorHex }}
                    title={color}
                  />
                );
              })}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
