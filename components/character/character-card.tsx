"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IdTag } from "@/components/brand/id-tag";
import type { BiscuteCharacter } from "@/lib/types";
import "./character-card.css";

interface CharacterCardProps {
  character: BiscuteCharacter;
  index?: number;
  priority?: boolean;
}

const tilts = [-2.5, 1.5, -1.5, 2.5];

export function CharacterCard({
  character,
  index = 0,
  priority = false,
}: CharacterCardProps) {
  const locale = useLocale() as "vi" | "en";
  const t = useTranslations("crew");

  const thumbs = [character.images.front, character.images.back].filter(
    (src): src is string => Boolean(src)
  );

  return (
    <Link
      href={`/characters/${character.slug}`}
      className="character-card"
      style={
        {
          "--tilt": `${tilts[index % tilts.length]}deg`,
          "--char-primary": character.colors.primary,
          "--char-secondary": character.colors.secondary,
        } as CSSProperties
      }
    >
      <article className="character-card__inner">
        <header className="character-card__header">
          <div>
            <h3 className="type-card-title">{character.name[locale]}</h3>
            <p className="type-meta text-biscute-chocolate/60">
              {character.species[locale]}
            </p>
          </div>
          <IdTag className="character-card__level">
            {t("level", { level: character.level })}
          </IdTag>
        </header>

        <div className="character-card__window">
          <Image
            src={character.images.portrait}
            alt={character.name[locale]}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            priority={priority}
          />
          <div className="character-card__reveal">
            <p className="type-meta">
              <span className="type-label block opacity-70">{t("mood")}</span>
              {character.mood[locale]}
            </p>
            <p className="type-meta mt-2">
              <span className="type-label block opacity-70">{t("likes")}</span>
              {character.likes[locale]}
            </p>
          </div>
        </div>

        {thumbs.length > 0 && (
          <div className="character-card__thumbs" aria-hidden>
            {thumbs.map((src) => (
              <span key={src} className="character-card__thumb">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
