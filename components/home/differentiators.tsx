"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import type { BiscuteProduct } from "@/lib/types";
import "./differentiators.css";
import "./homepage-colors.css";

interface DifferentiatorsProps {
  products: BiscuteProduct[];
}

const rows = [
  { key: "cultureReimagined" as const, index: 0, layout: "text-left" as const },
  { key: "visualLanguage" as const, index: 1, layout: "image-dominant" as const },
  { key: "travelFriendly" as const, index: 2, layout: "text-wide" as const },
];

export function Differentiators({ products }: DifferentiatorsProps) {
  const t = useTranslations("home.differentiators");
  const locale = useLocale() as "vi" | "en";

  return (
    <SectionWrapper bg="mustard" spacing="editorial" scrollMotion>
      <h2 className="scroll-section__title section-header-gap-lg section-title-accent section-title-accent--yellow type-section-title">
        {t("title")}
      </h2>

      <div className="scroll-section__body biscute-way">
        {rows.map(({ key, index, layout }) => {
          const product = products[index];
          const image = product?.images[0];
          return (
            <article
              key={key}
              className={`biscute-way__row biscute-way__row--${layout}`}
            >
              {layout === "text-left" && (
                <>
                  <div className="biscute-way__text biscute-way__text-panel">
                    <h3 className="biscute-way__heading type-subsection-title">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="type-body max-w-prose text-biscute-chocolate/80">
                      {t(`${key}.body`)}
                    </p>
                  </div>
                  {image && (
                    <div className="biscute-way__image biscute-way__image--crop overflow-hidden border-2 border-biscute-chocolate lg:border-4">
                      <Image
                        src={image.url}
                        alt={image.alt[locale]}
                        width={600}
                        height={480}
                        className="h-full w-full object-cover hover-grayscale"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  )}
                </>
              )}

              {layout === "image-dominant" && (
                <>
                  {image && (
                    <div className="biscute-way__image biscute-way__image--wide overflow-hidden border-2 border-biscute-chocolate lg:border-4">
                      <Image
                        src={image.url}
                        alt={image.alt[locale]}
                        width={800}
                        height={500}
                        className="h-full w-full object-cover hover-grayscale"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </div>
                  )}
                  <div className="biscute-way__text biscute-way__text--offset">
                    <h3 className="biscute-way__heading type-subsection-title">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="type-body max-w-prose text-biscute-chocolate/80">
                      {t(`${key}.body`)}
                    </p>
                  </div>
                </>
              )}

              {layout === "text-wide" && (
                <>
                  <div className="biscute-way__text biscute-way__text--wide">
                    <h3 className="biscute-way__heading type-subsection-title">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="type-body max-w-prose text-biscute-chocolate/80">
                      {t(`${key}.body`)}
                    </p>
                  </div>
                  {image && (
                    <div className="biscute-way__image biscute-way__image--small overflow-hidden border-2 border-biscute-chocolate lg:border-4">
                      <Image
                        src={image.url}
                        alt={image.alt[locale]}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover hover-grayscale"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                </>
              )}
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
