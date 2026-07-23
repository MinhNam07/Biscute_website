"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { Package, Feather, Gift, Flag, MapPin } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { VariantSelector } from "@/components/commerce/variant-selector";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccordionGroup } from "@/components/ui/accordion";
import { PriceDisplay } from "@/components/commerce/price-display";
import { Link } from "@/i18n/navigation";
import type { BiscuteProduct } from "@/lib/types";

interface ProductPageClientProps {
  product: BiscuteProduct;
  related: BiscuteProduct[];
}

export function ProductPageClient({ product, related }: ProductPageClientProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("product");
  const ts = useTranslations("sections");

  const defaultVariant = product.variants.find((v) => v.available) ?? product.variants[0];
  const [selectedColor, setSelectedColor] = useState(defaultVariant.color);
  const [selectedSize, setSelectedSize] = useState(defaultVariant.size);

  const selectedVariant =
    product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    ) ?? defaultVariant;

  if (!selectedVariant) notFound();

  const badgeLabels: Record<string, string> = {
    new: t("new"),
    "best-seller": t("bestSeller"),
    limited: t("limited"),
  };

  const touristAttrs = [
    { key: "easyToPack", icon: Package, label: t("easyToPack"), show: product.metafields.easyToPack },
    { key: "lightweight", icon: Feather, label: t("lightweight"), show: product.metafields.lightweight },
    { key: "giftReady", icon: Gift, label: t("giftReady"), show: product.metafields.giftReady },
    { key: "vietnamMade", icon: Flag, label: t("vietnamMade"), show: true },
  ].filter((a) => a.show);

  const accordionItems = [
    {
      title: `${t("material")} · ${t("dimensions")}`,
      content: (
        <div className="space-y-1 text-sm font-medium">
          <p>{product.metafields.material[locale]}</p>
          <p>{product.metafields.dimensions}</p>
        </div>
      ),
    },
    {
      title: `${t("origin")} · ${t("care")}`,
      content: (
        <div className="space-y-1 text-sm font-medium">
          <p>{product.metafields.origin[locale]}</p>
          <p>{product.metafields.careInstructions[locale]}</p>
        </div>
      ),
    },
    {
      title: t("storeAvailability"),
      content: (
        <ul className="space-y-1 text-sm font-medium">
          {product.metafields.storeAvailability.map((store, i) => (
            <li key={i} className="flex justify-between">
              <span>{store.name[locale]}</span>
              <span className={store.inStock ? "font-bold text-biscute-deep-pink" : "text-biscute-chocolate/50"}>
                {store.inStock ? t("inStock") : t("outOfStock")}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: t("artworkStory"),
      content: <p className="text-sm font-medium">{product.metafields.artworkStory[locale]}</p>,
    },
  ];

  return (
    <>
      <div className="container-biscute py-12 md:py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} locale={locale} />

          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <Badge key={badge} variant={badge} label={badgeLabels[badge]} />
                ))}
              </div>
              <h1 className="font-display text-2xl font-black uppercase tracking-tighter md:text-3xl lg:text-4xl">
                {product.title[locale]}
              </h1>
              <p className="mt-3 font-medium leading-relaxed text-biscute-chocolate/80">
                {product.description[locale]}
              </p>
              <div className="mt-3">
                <PriceDisplay
                  amount={selectedVariant.price}
                  compareAt={product.compareAtPrice}
                  className="text-xl"
                />
              </div>
            </div>

            <VariantSelector
              variants={product.variants}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={(color) => {
                setSelectedColor(color);
                const sizes = product.variants.filter((v) => v.color === color);
                if (!sizes.find((v) => v.size === selectedSize)) {
                  setSelectedSize(sizes[0]?.size ?? selectedSize);
                }
              }}
              onSizeChange={setSelectedSize}
              colorLabel={t("color")}
              sizeLabel={t("size")}
            />

            <Button size="lg" className="hidden w-full lg:flex" asChild>
              <Link href="/visit">
                <MapPin className="mr-2 h-4 w-4" />
                {t("visitStore")}
              </Link>
            </Button>

            {touristAttrs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {touristAttrs.map(({ key, icon: Icon, label }) => (
                  <span
                    key={key}
                    className="flex items-center gap-1.5 border-2 border-biscute-chocolate bg-biscute-pale-pink px-3 py-1.5 text-xs font-bold uppercase tracking-wider shadow-biscute-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-biscute-deep-pink" />
                    {label}
                  </span>
                ))}
              </div>
            )}

            <AccordionGroup items={accordionItems} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section-divider bg-biscute-pale-pink py-12 md:py-16 lg:py-24">
          <div className="container-biscute">
            <h2 className="mb-6 font-display text-2xl font-black uppercase tracking-tighter sm:text-3xl">
              {ts("related")}
            </h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-biscute-chocolate bg-biscute-cream p-4 shadow-biscute-lg lg:hidden">
        <Button className="w-full" size="lg" asChild>
          <Link href="/visit">
            <MapPin className="mr-2 h-4 w-4" />
            {t("visitStore")}
          </Link>
        </Button>
      </div>
      <div className="h-20 lg:hidden" />
    </>
  );
}
