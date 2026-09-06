"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";
import type { Collection } from "@/lib/types";
import "./home-sections.css";
import "./homepage-colors.css";

interface CollectionCardsProps {
  collections: Collection[];
}

const cardVariants = ["blue", "mustard", "red", "deep"] as const;
const stampColors = ["pink", "mustard", "red", "deep"] as const;
const stampShapes = ["circle", "square", "triangle", "circle"] as const;

export function CollectionCards({ collections }: CollectionCardsProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("sections");
  const tc = useTranslations("collections");

  if (collections.length === 0) {
    return null;
  }

  return (
    <SectionWrapper bg="cream" spacing="standard" className="home-section-collections">
      <h2 className="section-header-gap section-title-accent section-title-accent--red type-section-title">
        {t("collections")}
      </h2>
      <div className="collections-grid">
        {collections.map((collection, i) => {
          const variant = cardVariants[i % cardVariants.length];
          const stampColor = stampColors[i % stampColors.length];
          const stampShape = stampShapes[i % stampShapes.length];
          const label = tc.has(collection.handle as "hanoi")
            ? tc(collection.handle as "hanoi")
            : collection.title[locale];
          const description = collection.description[locale];

          return (
            <Link
              key={collection.handle}
              href={`/collections/${collection.handle}`}
              className={`collection-card collection-card--${variant} group hover-lift relative flex aspect-[3/4] flex-col justify-end overflow-hidden border-2 border-biscute-chocolate shadow-biscute-lg lg:border-4`}
            >
              <GeometricDecoration
                shape={stampShape as "circle" | "square" | "triangle"}
                color={stampColor as "pink" | "pale" | "deep" | "red" | "mustard"}
                size="lg"
                rotate={stampShape === "square"}
                className="collection-card__stamp"
              />
              {collection.image ? (
                <Image
                  src={collection.image}
                  alt={label}
                  fill
                  className="object-cover hover-grayscale"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0 bg-biscute-pale-pink" aria-hidden />
              )}
              <div className="collection-card__scrim relative z-10 p-4 pt-16">
                <h3 className="type-card-title text-biscute-white">
                  {label}
                </h3>
                <p className="type-meta mt-1 line-clamp-2 text-biscute-cream/90">
                  {description}
                </p>
                <span className="type-label mt-2 inline-block text-biscute-soft-yellow transition-colors group-hover:text-biscute-white">
                  {t("exploreCollection")} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
