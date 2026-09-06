"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { PassportStamp } from "@/components/brand/passport-stamp";
import { ASSET_PATHS } from "@/lib/assets/resolve";
import { STORE_MAPS_EMBED_URL, STORE_MAPS_URL } from "@/lib/constants/store";
import "./store-map.css";
import "../home/homepage-colors.css";

export function StoreMap() {
  const t = useTranslations("visit");
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <SectionWrapper
      bg="deep-pink"
      divider={false}
      id="visit-biscute"
      spacing="visit"
      className="visit-section"
    >
      <div className="section-header-gap-lg">
        <h2 className="type-section-title text-biscute-white">{t("title")}</h2>
        <p className="type-body-lg mt-3 max-w-xl text-biscute-pale-pink">
          {t("subtitle")}
        </p>
      </div>

      <div className="visit-section__grid">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border-2 border-biscute-chocolate bg-biscute-cream shadow-biscute-lg">
          <div className="relative min-h-[280px] md:min-h-[360px]">
            {!imgFailed ? (
              <Image
                src={ASSET_PATHS.store.exterior}
                alt={t("storeName")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgFailed(true)}
                unoptimized
              />
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center md:min-h-[360px]">
                <MapPin className="mb-4 h-10 w-10 text-biscute-pink" aria-hidden />
                <p className="type-label text-biscute-chocolate/70">
                  {t("storePhotoPlaceholder")}
                </p>
              </div>
            )}
          </div>
          <div className="absolute left-4 top-4">
            <PassportStamp label="BISCUTE" />
          </div>
          <div className="relative space-y-2 border-t-2 border-biscute-chocolate bg-biscute-white p-5">
            <p className="type-subsection-title">{t("storeName")}</p>
            <p className="type-body whitespace-pre-line">{t("address")}</p>
            <p className="type-label opacity-60">{t("year")}</p>
            <Button variant="secondary" className="mt-2" asChild>
              <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                {t("directions")}
              </a>
            </Button>
          </div>
        </div>

        <div className="visit-section__details space-y-4">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border-2 border-biscute-chocolate shadow-biscute-md">
            <iframe
              src={STORE_MAPS_EMBED_URL}
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="BISCUTE store location"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-5 rounded-[var(--radius-lg)] border-2 border-biscute-chocolate bg-biscute-white p-6 text-biscute-chocolate shadow-biscute-md">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-2 border-biscute-chocolate bg-biscute-pink text-biscute-white shadow-biscute-sm">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="type-label opacity-60">{t("postcardStamp")}</p>
                <p className="type-body mt-1 whitespace-pre-line">{t("address")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-2 border-biscute-chocolate bg-biscute-mustard shadow-biscute-sm">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="type-label opacity-60">{t("hoursLabel")}</p>
                <p className="type-body mt-1">{t("hours")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
