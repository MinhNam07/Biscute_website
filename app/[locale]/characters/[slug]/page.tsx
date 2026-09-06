import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ToyPanel } from "@/components/brand/toy-panel";
import { IdTag } from "@/components/brand/id-tag";
import { PassportStamp } from "@/components/brand/passport-stamp";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  characters,
  getCharacterBySlug,
  getProductsByCharacter,
} from "@/lib/data";

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) return {};
  return { title: `${character.name[locale as "vi" | "en"]} · BISCUTE` };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) notFound();

  const lang = locale as "vi" | "en";
  const t = await getTranslations({ locale, namespace: "crew" });
  const tc = await getTranslations({ locale, namespace: "collections" });
  const products = getProductsByCharacter(slug);

  const dossier = [
    { label: t("mood"), value: character.mood[lang] },
    { label: t("likes"), value: character.likes[lang] },
    { label: t("dislikes"), value: character.dislikes[lang] },
  ];

  return (
    <div className="bg-biscute-cream">
      <div className="container-biscute section-spacing-default">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-12">
          <ToyPanel
            tint="white"
            className="relative"
            padded={false}
          >
            <div
              className="relative aspect-[4/5] w-full"
              style={{ backgroundColor: character.colors.secondary }}
            >
              <Image
                src={character.images.portrait}
                alt={character.name[lang]}
                fill
                className="animate-character-idle object-contain"
                sizes="(max-width: 1024px) 90vw, 40vw"
                priority
              />
            </div>
            <div className="flex items-center justify-between gap-3 border-t-2 border-dashed border-biscute-chocolate/30 px-4 py-3">
              <IdTag>{character.id.toUpperCase()}</IdTag>
              <IdTag>{t("level", { level: character.level })}</IdTag>
            </div>
          </ToyPanel>

          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="type-page-title">{character.name[lang]}</h1>
                <p className="type-body-lg mt-2 text-biscute-chocolate/70">
                  {character.species[lang]}
                </p>
              </div>
              <PassportStamp
                label={character.name[lang].toUpperCase()}
                className="hidden shrink-0 sm:inline-flex"
              />
            </div>

            <dl className="flex flex-col gap-3">
              {dossier.map((row) => (
                <div
                  key={row.label}
                  className="rounded-[var(--radius-md)] border-2 border-biscute-chocolate bg-biscute-white px-4 py-3 shadow-biscute-soft"
                >
                  <dt className="type-label text-biscute-chocolate/60">
                    {row.label}
                  </dt>
                  <dd className="type-body mt-1">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              {character.collectionHandles.map((handle) => (
                <Button key={handle} variant="pale" size="sm" asChild>
                  <Link href={`/collections/${handle}`}>
                    {tc.has(handle as "hanoi") ? tc(handle as "hanoi") : handle}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <section className="mt-16">
            <h2 className="type-section-title mb-6">
              {t("shopPicks", { name: character.name[lang] })}
            </h2>
            <ProductGrid products={products} priorityCount={0} />
          </section>
        )}
      </div>
    </div>
  );
}
