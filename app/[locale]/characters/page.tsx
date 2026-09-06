import { getTranslations, setRequestLocale } from "next-intl/server";
import { CharacterCard } from "@/components/character/character-card";
import { getCharacters } from "@/lib/data";

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("crew");
  const characters = getCharacters();

  return (
    <div className="container-biscute py-12 md:py-16">
      <p className="type-label text-biscute-chocolate/70">{t("subtitle")}</p>
      <h1 className="type-page-title mt-2">{t("title")}</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {characters.map((character, i) => (
          <CharacterCard key={character.id} character={character} index={i} />
        ))}
      </div>
    </div>
  );
}
