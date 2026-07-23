"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, Search, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { GeometricLogo } from "@/components/brand/geometric-logo";
import { SearchDrawer } from "./search-drawer";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", key: "shop" },
  { href: "/collections/souvenirs", key: "souvenirs" },
  { href: "/collections/apparel", key: "apparel" },
  { href: "/collections/gifts", key: "gifts" },
  { href: "/visit", key: "visit" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const switchLocale = locale === "vi" ? "en" : "vi";

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-biscute-chocolate bg-biscute-pink text-biscute-white lg:border-b-4">
        <div className="container-biscute grid h-14 grid-cols-[1fr_auto_1fr] items-stretch gap-4 lg:h-16">
          <div className="flex items-center gap-2 lg:gap-3">
            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white text-biscute-chocolate shadow-biscute-sm btn-press lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("menu")}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <Link href="/" className="-ml-1 transition-opacity hover:opacity-80 sm:-ml-2 lg:-ml-3">
              <GeometricLogo />
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:text-biscute-pale-pink",
                  pathname.startsWith(link.href) && "text-biscute-pale-pink underline decoration-4 underline-offset-4"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white text-biscute-chocolate shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href={pathname}
              locale={switchLocale}
              className="flex h-11 items-center border-2 border-biscute-chocolate bg-biscute-white px-3 text-xs font-bold uppercase tracking-widest text-biscute-chocolate shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
            >
              {switchLocale.toUpperCase()}
            </Link>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="border-t-2 border-biscute-chocolate bg-biscute-pink px-4 py-4 text-biscute-white lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-2 border-transparent px-3 py-3 text-sm font-bold uppercase tracking-wider hover:border-biscute-white hover:bg-biscute-deep-pink"
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                href={pathname}
                locale={switchLocale}
                onClick={() => setMobileOpen(false)}
                className="border-2 border-transparent px-3 py-3 text-sm font-bold uppercase tracking-wider hover:border-biscute-white hover:bg-biscute-deep-pink"
              >
                {switchLocale === "en" ? "English" : "Tiếng Việt"}
              </Link>
            </div>
          </nav>
        )}
      </header>

      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
