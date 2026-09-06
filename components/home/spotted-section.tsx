import { getTranslations } from "next-intl/server";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { STORE_INSTAGRAM_URL } from "@/lib/constants/store";
import { collectionPlaceholder } from "@/lib/assets/resolve";

export async function SpottedSection() {
  const t = await getTranslations("ugc");
  const tiles = [
    { label: "CUSTOMER", bg: "3EA9F5" },
    { label: "STORE", bg: "FFD940" },
    { label: "KEYCHAIN", bg: "EF4136" },
    { label: "FRIENDS", bg: "FF8FB3" },
    { label: "TOURIST", bg: "72C85B" },
    { label: "CREW", bg: "2B8FD9" },
  ];

  return (
    <SectionWrapper bg="pale-pink" spacing="standard" id="spotted">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="type-section-title">{t("title")}</h2>
        <a
          href={STORE_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="type-label underline underline-offset-4 hover:no-underline"
        >
          {t("cta")}
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
        {tiles.map((tile, i) => (
          <div
            key={tile.label}
            className={`relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border-2 border-biscute-chocolate shadow-biscute-sm ${
              i === 0
                ? "md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-full"
                : ""
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={collectionPlaceholder(tile.label, tile.bg)}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
