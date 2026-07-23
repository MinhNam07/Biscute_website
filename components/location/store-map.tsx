"use client";

import { useTranslations } from "next-intl";
import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";

export function StoreMap() {
  const t = useTranslations("visit");
  const mapsEmbedUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7447.952779452669!2d105.84951207603397!3d21.03363068760978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab004a99a7e7%3A0x7f7bf97e803d0f97!2sBISCUTE%20VIETNAM!5e0!3m2!1sen!2s!4v1784800083077!5m2!1sen!2s";

  return (
    <SectionWrapper bg="pale-pink" divider={false}>
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-black uppercase tracking-tighter md:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-3 font-medium text-biscute-chocolate/80">{t("subtitle")}</p>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-2">
        <GeometricDecoration shape="circle" color="pink" size="lg" className="right-0 top-0 opacity-20" />
        <GeometricDecoration shape="square" color="deep" size="lg" rotate className="bottom-0 left-0 opacity-20" />

        <div className="overflow-hidden border-2 border-biscute-chocolate shadow-biscute-lg lg:border-4">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="BISCUTE store location"
            className="w-full"
          />
        </div>

        <div className="relative flex flex-col justify-center gap-6 border-2 border-biscute-chocolate bg-biscute-white p-6 shadow-biscute-lg lg:border-4">
          <GeometricDecoration shape="triangle" color="pale" size="md" className="right-3 top-3" />
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-biscute-chocolate bg-biscute-pale-pink shadow-biscute-sm">
              <MapPin className="h-5 w-5 text-biscute-chocolate" />
            </div>
            <p className="text-base font-medium">{t("address")}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-biscute-chocolate bg-biscute-pale-pink shadow-biscute-sm">
              <Clock className="h-5 w-5 text-biscute-chocolate" />
            </div>
            <p className="text-base font-medium">{t("hours")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <a
                href="https://maps.google.com/?q=12+Hang+Gai+Hanoi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-4 w-4" />
                {t("directions")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:+842438251234">
                <Phone className="mr-2 h-4 w-4" />
                {t("call")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
