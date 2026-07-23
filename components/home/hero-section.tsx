"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GeometricDecoration } from "@/components/brand/geometric-decoration";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="section-divider overflow-hidden bg-biscute-cream">
      <div className="grid min-h-[400px] lg:grid-cols-2 lg:min-h-[520px]">
        <div className="container-biscute flex flex-col justify-center py-12 lg:py-24">
          <h1 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter text-biscute-chocolate sm:text-6xl lg:text-8xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-biscute-chocolate/80 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/collections/souvenirs">{t("ctaShop")}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/visit">{t("ctaVisit")}</Link>
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-biscute-pink p-8 lg:p-12">
          <GeometricDecoration
            shape="circle"
            color="pale"
            size="lg"
            className="!relative !h-24 !w-24 sm:!h-32 sm:!w-32"
          />
          <GeometricDecoration
            shape="square"
            color="deep"
            size="lg"
            rotate
            className="!relative !-ml-8 !mt-12 !h-20 !w-20 sm:!h-28 sm:!w-28"
          />
          <GeometricDecoration
            shape="triangle"
            color="pale"
            size="lg"
            className="!relative !-ml-4 !mt-4 !h-16 !w-16 sm:!h-24 sm:!w-24"
          />
          <div className="absolute bottom-8 right-8 hidden h-16 w-16 rotate-45 rounded-none border-4 border-biscute-chocolate bg-biscute-white lg:block" />
        </div>
      </div>
    </section>
  );
}
