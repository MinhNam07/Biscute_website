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
import { ProductTicket } from "@/components/brand/product-ticket";
import { IdTag } from "@/components/brand/id-tag";
import { ToyPanel } from "@/components/brand/toy-panel";
import { Link } from "@/i18n/navigation";
import type { BiscuteProduct, ProductBadge } from "@/lib/types";

interface ProductPageClientProps {
  product: BiscuteProduct;
  related: BiscuteProduct[];
}

function itemNumber(id: string) {
  return id.replace(/\D/g, "") || id;
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between type-label">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-full border border-biscute-chocolate ${
              i < value ? "bg-biscute-pink" : "bg-biscute-cream"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductPageClient({ product, related }: ProductPageClientProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("product");
  const ts = useTranslations("sections");

  const defaultVariant =
    product.variants.find((v) => v.available) ?? product.variants[0];
  const [selectedColor, setSelectedColor] = useState(defaultVariant.color);
  const [selectedSize, setSelectedSize] = useState(defaultVariant.size);

  const selectedVariant =
    product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    ) ?? defaultVariant;

  if (!selectedVariant) notFound();

  const personalityLabels: Record<ProductBadge, string> = {
    new: t("freshOuttaOven"),
    "best-seller": t("crowdFav"),
    limited: t("catchIt"),
  };

  const touristAttrs = [
    {
      key: "easyToPack",
      icon: Package,
      label: t("easyToPack"),
      show: product.metafields.easyToPack,
    },
    {
      key: "lightweight",
      icon: Feather,
      label: t("lightweight"),
      show: product.metafields.lightweight,
    },
    {
      key: "giftReady",
      icon: Gift,
      label: t("giftReady"),
      show: product.metafields.giftReady,
    },
    { key: "vietnamMade", icon: Flag, label: t("vietnamMade"), show: true },
  ].filter((a) => a.show);

  const accordionItems = [
    {
      title: `${t("material")} · ${t("dimensions")}`,
      content: (
        <div className="type-body space-y-1">
          <p>{product.metafields.material[locale]}</p>
          <p>{product.metafields.dimensions}</p>
        </div>
      ),
    },
    {
      title: `${t("origin")} · ${t("care")}`,
      content: (
        <div className="type-body space-y-1">
          <p>{product.metafields.origin[locale]}</p>
          <p>{product.metafields.careInstructions[locale]}</p>
        </div>
      ),
    },
  ];

  const stats = product.metafields.stats;

  return (
    <>
      <div className="container-biscute py-12 md:py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery images={product.images} locale={locale} />

          <ProductTicket
            header={
              <>
                <IdTag>
                  {t("itemFile", { id: itemNumber(product.id) })}
                </IdTag>
                <div className="flex flex-wrap gap-1">
                  {product.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant={badge}
                      label={personalityLabels[badge]}
                    />
                  ))}
                </div>
              </>
            }
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="type-page-title">{product.title[locale]}</h1>
                <p className="type-body mt-3 text-biscute-chocolate/80">
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

              {touristAttrs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {touristAttrs.map(({ key, icon: Icon, label }) => (
                    <span
                      key={key}
                      className="type-label flex items-center gap-1.5 rounded-[var(--radius-sm)] border-2 border-biscute-chocolate bg-biscute-pale-pink px-3 py-1.5 shadow-biscute-sm"
                    >
                      <Icon className="h-3.5 w-3.5 text-biscute-pink" />
                      {label}
                    </span>
                  ))}
                </div>
              ) : null}

              {stats ? (
                <ToyPanel tint="cream" hardShadow={false} className="shadow-biscute-soft">
                  <p className="type-label mb-4">{t("statsTitle")}</p>
                  <div className="space-y-3">
                    <StatBar
                      label={t("statLightweight")}
                      value={stats.lightweight}
                    />
                    <StatBar label={t("statCuteness")} value={stats.cuteness} />
                    <StatBar
                      label={t("statVietnam")}
                      value={stats.vietnamLevel}
                    />
                  </div>
                </ToyPanel>
              ) : null}

              <AccordionGroup items={accordionItems} />
            </div>
          </ProductTicket>
        </div>

        <section className="mt-16">
          <h2 className="type-section-title mb-4">{t("howHappened")}</h2>
          <ToyPanel tint="yellow">
            <p className="type-body-lg max-w-3xl">
              {product.metafields.artworkStory[locale]}
            </p>
          </ToyPanel>
        </section>
      </div>

      {related.length > 0 ? (
        <section className="section-divider bg-biscute-pale-pink py-12 md:py-16 lg:py-24">
          <div className="container-biscute">
            <h2 className="type-section-title mb-6">{ts("related")}</h2>
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}

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
