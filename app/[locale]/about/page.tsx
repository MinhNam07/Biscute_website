import { getTranslations } from "next-intl/server";
import { ToyPanel } from "@/components/brand/toy-panel";
import { PassportStamp } from "@/components/brand/passport-stamp";
import { Sticker } from "@/components/brand/sticker";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} · BISCUTE` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tVisit = await getTranslations({ locale, namespace: "visit" });

  return (
    <div className="bg-biscute-cream">
      <div className="container-biscute section-spacing-default">
        <div className="mx-auto max-w-2xl">
          <ToyPanel tint="white" className="relative">
            <Sticker rotate={-3}>{tVisit("year")}</Sticker>
            <h1 className="type-page-title mt-4">{t("title")}</h1>
            <p className="type-body-lg mt-4 text-biscute-chocolate/80">
              {t("p1")}
            </p>
            <p className="type-body mt-3 text-biscute-chocolate/80">{t("p2")}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href="/visit">{tNav("visit")}</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/characters">{tNav("characters")}</Link>
              </Button>
              <PassportStamp className="ml-auto hidden sm:inline-flex" />
            </div>
          </ToyPanel>
        </div>
      </div>
    </div>
  );
}
