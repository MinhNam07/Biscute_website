"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { GeometricLogo } from "@/components/brand/geometric-logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tVisit = useTranslations("visit");
  const locale = useLocale();
  const pathname = usePathname();
  const switchLocale = locale === "vi" ? "en" : "vi";

  return (
    <footer className="border-t-2 border-biscute-chocolate bg-biscute-deep-pink py-12 text-biscute-cream lg:border-t-4">
      <div className="container-biscute">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <GeometricLogo />
            <p className="mt-3 type-meta text-biscute-pale-pink">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="type-label mb-3">{t("shop")}</p>
            <ul className="type-meta space-y-2 text-biscute-pale-pink">
              <li>
                <Link href="/shop" className="hover:text-biscute-white">
                  {tNav("shop")}
                </Link>
              </li>
              <li>
                <Link href="/collections/souvenirs" className="hover:text-biscute-white">
                  {tNav("souvenirs")}
                </Link>
              </li>
              <li>
                <Link href="/collections/apparel" className="hover:text-biscute-white">
                  {tNav("apparel")}
                </Link>
              </li>
              <li>
                <Link href="/collections/gifts" className="hover:text-biscute-white">
                  {tNav("gifts")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="type-label mb-3">{t("explore")}</p>
            <ul className="type-meta space-y-2 text-biscute-pale-pink">
              <li>
                <Link href="/characters" className="hover:text-biscute-white">
                  {tNav("characters")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-biscute-white">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/visit" className="hover:text-biscute-white">
                  {tNav("visit")}
                </Link>
              </li>
              <li className="whitespace-pre-line">{tVisit("address")}</li>
              <li>
                <span className="type-label text-biscute-pale-pink/70">
                  {t("hoursLabel")}:{" "}
                </span>
                {tVisit("hours")}
              </li>
            </ul>
          </div>

          <div>
            <p className="type-label mb-3">
              {switchLocale === "en" ? "Language" : "Ngôn ngữ"}
            </p>
            <Link
              href={pathname}
              locale={switchLocale}
              className="type-cta inline-flex min-h-11 items-center border-2 border-biscute-pale-pink/40 px-4 text-biscute-pale-pink transition-colors hover:border-biscute-white hover:text-biscute-white"
            >
              {switchLocale === "en" ? "English" : "Tiếng Việt"}
            </Link>
          </div>
        </div>

        <p className="type-meta mt-6 border-t-2 border-biscute-pale-pink/30 pt-6 text-center text-biscute-pale-pink/70">
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
