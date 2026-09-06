"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { IdTag } from "@/components/brand/id-tag";
import type { BiscuteCharacter, Collection } from "@/lib/types";
import "./home-sections.css";
import "./homepage-colors.css";
import "./adventure-cards.css";

interface CollectionCardsProps {
  collections: Collection[];
  characters?: BiscuteCharacter[];
}

const tilts = [-2, 1.5, -1.5, 2];

export function CollectionCards({
  collections,
  characters = [],
}: CollectionCardsProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("adventures");
  const ts = useTranslations("sections");
  const tc = useTranslations("collections");

  if (collections.length === 0) {
    return null;
  }

  const charactersById = new Map(characters.map((c) => [c.id, c]));

  return (
    <SectionWrapper
      id="adventures"
      bg="cream"
      spacing="standard"
      className="home-section-collections"
    >
      <h2 className="section-header-gap section-title-accent section-title-accent--red type-section-title">
        {t("title")}
      </h2>

      <div className="adventures-rail">
        {collections.map((collection, i) => {
          const label = tc.has(collection.handle as "hanoi")
            ? tc(collection.handle as "hanoi")
            : collection.title[locale];
          const adventure = collection.adventureTitle?.[locale] ?? label;
          const peek = collection.characterId
            ? charactersById.get(collection.characterId)
            : undefined;

          return (
            <Link
              key={collection.handle}
              href={`/collections/${collection.handle}`}
              className="adventure-card group"
              style={
                {
                  "--tilt": `${tilts[i % tilts.length]}deg`,
                  "--adventure-accent":
                    collection.accentColor ?? "var(--color-primary-blue)",
                } as CSSProperties
              }
            >
              <span className="adventure-card__index">
                <IdTag>{String(i + 1).padStart(2, "0")}</IdTag>
              </span>

              <h3 className="adventure-card__title type-subsection-title whitespace-pre-line">
                {adventure}
              </h3>

              <p className="adventure-card__meta type-meta">
                {label} · {ts("exploreCollection")} →
              </p>

              {peek && (
                <span className="adventure-card__peek" aria-hidden>
                  <Image
                    src={peek.images.sticker ?? peek.images.portrait}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
