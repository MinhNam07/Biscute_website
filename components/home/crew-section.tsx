"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { CharacterCard } from "@/components/character/character-card";
import type { BiscuteCharacter } from "@/lib/types";
import "./home-sections.css";
import "./homepage-colors.css";

interface CrewSectionProps {
  characters: BiscuteCharacter[];
}

export function CrewSection({ characters }: CrewSectionProps) {
  const t = useTranslations("crew");

  if (characters.length === 0) return null;

  return (
    <SectionWrapper id="crew" bg="cream" spacing="standard">
      <div className="section-header-gap flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="type-label text-biscute-chocolate/60">{t("subtitle")}</p>
          <h2 className="section-title-accent type-section-title mt-2">
            {t("title")}
          </h2>
        </div>
        <Link
          href="/characters"
          className="type-label shrink-0 text-biscute-deep-pink transition-colors hover:text-biscute-pink"
        >
          {t("viewAll")} →
        </Link>
      </div>

      <div className="crew-grid">
        {characters.map((character, i) => (
          <CharacterCard key={character.id} character={character} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
