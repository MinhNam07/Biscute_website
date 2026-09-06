"use client";

import { useTranslations } from "next-intl";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { STORE_MAPS_EMBED_URL, STORE_MAPS_URL } from "@/lib/constants/store";
import "./store-map.css";
import "../home/homepage-colors.css";

export function StoreMap() {
  const t = useTranslations("visit");

  return (
    <SectionWrapper bg="deep-pink" divider={false} id="visit-biscute" spacing="visit" className="visit-section">
      <div className="section-header-gap-lg">
        <h2 className="section-title-accent section-title-accent--white type-section-title text-biscute-white">
          {t("title")}
        </h2>
        <p className="type-body-lg mt-3 max-w-xl text-biscute-pale-pink">
          {t("subtitle")}
        </p>
      </div>

      <div className="visit-section__grid">
        <div className="visit-section__photo visit-photo-stamp border-2 border-biscute-chocolate lg:border-4">
          <div className="visit-photo-stamp__inner flex min-h-[280px] flex-col items-center justify-center p-8 text-center md:min-h-[360px] lg:min-h-[400px]">
            <MapPin className="mb-4 h-10 w-10 text-biscute-pink" aria-hidden />
            <p className="type-label text-biscute-chocolate/70">
              {t("storePhotoPlaceholder")}
            </p>
          </div>
        </div>

        <div className="visit-section__details">
          <div className="visit-section__map relative overflow-hidden border-2 border-biscute-chocolate shadow-biscute-lg lg:border-4">
            <GeometricDecoration
              shape="triangle"
              color="red"
              size="lg"
              className="right-3 top-3 z-10"
            />
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

          <div className="flex flex-col gap-5 border-2 border-biscute-chocolate bg-biscute-white p-6 text-biscute-chocolate shadow-biscute-lg lg:border-4 lg:p-8">
            <div className="flex items-start gap-3">
              <div className="visit-icon-badge--blue flex h-10 w-10 shrink-0 items-center justify-center border-2 border-biscute-chocolate shadow-biscute-sm">
                <MapPin className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="type-subsection-title">
                  {t("storeName")}
                </p>
                <p className="type-body mt-1 whitespace-pre-line">{t("address")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="visit-icon-badge--mustard flex h-10 w-10 shrink-0 items-center justify-center border-2 border-biscute-chocolate shadow-biscute-sm">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="type-label text-biscute-chocolate/60">
                  {t("hoursLabel")}
                </p>
                <p className="type-body mt-1">{t("hours")}</p>
              </div>
            </div>

            <Button variant="secondary" size="lg" className="w-full sm:w-auto" asChild>
              <a href={STORE_MAPS_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                {t("directions")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
