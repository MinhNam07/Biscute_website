"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";
import { STORE_MAPS_URL } from "@/lib/constants/store";
import type { BiscuteProduct } from "@/lib/types";
import "./hero-section.css";
import "./homepage-colors.css";

interface HeroSectionProps {
  products: BiscuteProduct[];
}

export function HeroSection({ products }: HeroSectionProps) {
  const t = useTranslations("hero");
  const locale = useLocale() as "vi" | "en";
  const collageProducts = products.slice(0, 4);

  return (
    <section className="hero-root section-divider overflow-hidden bg-biscute-cream">
      <div className="grid min-h-[400px] lg:grid-cols-2 lg:min-h-[480px]">
        <div className="hero-stamp-text-side container-biscute relative flex flex-col justify-center py-12 sm:py-14 lg:py-16">
          <GeometricDecoration
            shape="circle"
            color="mustard"
            size="lg"
            className="hero-stamp-deco hero-stamp-deco--1"
          />
          <GeometricDecoration
            shape="square"
            color="pink"
            size="lg"
            rotate
            className="hero-stamp-deco hero-stamp-deco--2"
          />
          <GeometricDecoration
            shape="triangle"
            color="red"
            size="lg"
            className="hero-stamp-deco hero-stamp-deco--3"
          />
          <h1 className="hero-stamp-headline type-display text-biscute-chocolate">
            {t.rich("title", {
              accent: (chunks) => (
                <span className="hero-stamp-accent">{chunks}</span>
              ),
            })}
          </h1>
          <p className="hero-stamp-subtitle type-body-lg mt-4 max-w-md text-biscute-chocolate/80">
            {t("subtitle")}
          </p>
          <p className="hero-stamp-location type-meta mt-3 font-semibold">
            {t("location")}
          </p>
          <div className="hero-stamp-ctas mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/shop">{t("ctaShop")}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                {t("ctaVisit")}
              </a>
            </Button>
          </div>
        </div>

        <div className="hero-collage hero-stamp-panel hero-collage-panel-bg relative p-5 sm:p-8 lg:p-10">
          <div className="hero-collage__grid">
            {collageProducts.map((product, i) => {
              const image = product.images[0];
              const layoutClass = `hero-collage__item hero-collage__item--${i + 1}`;

              if (!image) {
                return (
                  <div
                    key={product.id}
                    className={`${layoutClass} hero-collage__placeholder flex items-end border-2 border-biscute-chocolate bg-biscute-cream p-3 lg:border-4`}
                  >
                    <span className="type-meta text-biscute-chocolate/70">
                      {product.title[locale]}
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className={`${layoutClass} group hover-lift block h-full min-h-0 overflow-hidden border-2 border-biscute-chocolate bg-biscute-white shadow-biscute-lg lg:border-4`}
                >
                  <div className="relative h-full min-h-[72px] w-full">
                    <Image
                      src={image.url}
                      alt={image.alt[locale]}
                      fill
                      className="object-cover hover-grayscale"
                      sizes="(max-width: 1024px) 45vw, 25vw"
                      priority={i < 2}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
