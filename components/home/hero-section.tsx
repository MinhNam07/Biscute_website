"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sticker } from "@/components/brand/sticker";
import { PassportStamp } from "@/components/brand/passport-stamp";
import type { BiscuteCharacter, BiscuteProduct } from "@/lib/types";
import "./hero-section.css";
import "./homepage-colors.css";

interface HeroSectionProps {
  products: BiscuteProduct[];
  character?: BiscuteCharacter;
}

const floatRotation = [-8, 6, -4];

export function HeroSection({ products, character }: HeroSectionProps) {
  const t = useTranslations("hero");
  const locale = useLocale() as "vi" | "en";
  const floaters = products.slice(0, 3);

  return (
    <section className="hero-root section-divider relative overflow-hidden bg-biscute-cream">
      <div className="container-biscute py-8 sm:py-12 lg:py-16">
        <div className="hero-stage hero-stamp-panel">
          <div className="hero-stage__text">
            <Sticker rotate={-4} className="hero-stage__location">
              {t("location")}
            </Sticker>

            <h1 className="hero-stamp-headline type-display mt-4 text-biscute-white">
              {t.rich("title", {
                accent: (chunks) => (
                  <span className="hero-stage__accent">{chunks}</span>
                ),
              })}
            </h1>

            <p className="hero-stamp-subtitle type-body-lg mt-4 max-w-sm text-biscute-white/90">
              {t("subtitle")}
            </p>

            <div className="hero-stamp-ctas mt-7 flex flex-wrap gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/shop">{t("ctaShop")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/characters">{t("ctaCrew")}</Link>
              </Button>
            </div>
          </div>

          <div className="hero-stage__cast">
            <PassportStamp className="hero-stage__stamp" />

            {character && (
              <div
                className="hero-character animate-character-idle"
                style={{ backgroundColor: character.colors.secondary }}
              >
                <Image
                  src={character.images.portrait}
                  alt={character.name[locale]}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 70vw, 34vw"
                  priority
                />
              </div>
            )}

            {floaters.map((product, i) => {
              const image = product.images[0];
              if (!image) return null;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  className={`hero-float hero-float--${i + 1}`}
                  style={
                    {
                      "--float-rotate": `${floatRotation[i]}deg`,
                    } as CSSProperties
                  }
                  aria-label={product.title[locale]}
                >
                  <Image
                    src={image.url}
                    alt={image.alt[locale]}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
