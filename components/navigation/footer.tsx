"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GeometricLogo } from "@/components/brand/geometric-logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t-2 border-biscute-chocolate bg-biscute-deep-pink py-12 text-biscute-cream lg:border-t-4">
      <div className="container-biscute">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <GeometricLogo />
            <p className="mt-3 text-sm font-medium text-biscute-pale-pink">
              Cute memories from Vietnam.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest">{t("shop")}</p>
            <ul className="space-y-2 text-sm font-medium text-biscute-pale-pink">
              <li><Link href="/collections/souvenirs" className="hover:text-biscute-white">{tNav("souvenirs")}</Link></li>
              <li><Link href="/collections/apparel" className="hover:text-biscute-white">{tNav("apparel")}</Link></li>
              <li><Link href="/collections/gifts" className="hover:text-biscute-white">{tNav("gifts")}</Link></li>
              <li><Link href="/gifts" className="hover:text-biscute-white">{tNav("gifts")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest">{t("about")}</p>
            <ul className="space-y-2 text-sm font-medium text-biscute-pale-pink">
              <li><Link href="/visit" className="hover:text-biscute-white">{tNav("visit")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest">{t("follow")}</p>
            <ul className="space-y-2 text-sm font-medium text-biscute-pale-pink">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-biscute-white">Instagram</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t-2 border-biscute-pale-pink/30 pt-6 text-center text-sm font-medium text-biscute-pale-pink/70">
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
