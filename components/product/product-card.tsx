"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/commerce/price-display";
import { CardCornerDecorations } from "@/components/brand/geometric-decoration";
import { cn } from "@/lib/utils";
import type { BiscuteProduct } from "@/lib/types";

interface ProductCardProps {
  product: BiscuteProduct;
  priority?: boolean;
  index?: number;
}

export function ProductCard({ product, priority = false, index = 0 }: ProductCardProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("product");
  const [hovered, setHovered] = useState(false);

  const badgeLabels: Record<string, string> = {
    new: t("new"),
    "best-seller": t("bestSeller"),
    limited: t("limited"),
  };

  const primaryBadge = product.badges[0];
  const uniqueColors = [...new Set(product.variants.map((v) => v.color))];

  return (
    <article
      className="group relative flex flex-col transition-transform duration-200 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="flex flex-col gap-3">
        <div className="relative border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-lg lg:border-4">
          <CardCornerDecorations index={index} />
          <div className="relative aspect-[4/5] overflow-hidden rounded-none">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt[locale]}
              fill
              className={cn(
                "object-cover grayscale transition-all duration-200",
                hovered && product.images[1] ? "opacity-0" : "opacity-100",
                "group-hover:grayscale-0"
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
                  "object-cover grayscale transition-all duration-200 group-hover:grayscale-0",
                  hovered ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}

            <div className="absolute left-2 top-2 h-6">
              {primaryBadge && (
                <Badge variant={primaryBadge} label={badgeLabels[primaryBadge]} />
              )}
            </div>

            <div className="absolute inset-x-2 bottom-2 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
              <Button variant="primary" size="sm" shape="pill" className="w-full pointer-events-none">
                {t("viewDetails")}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-0.5">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug uppercase">
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
