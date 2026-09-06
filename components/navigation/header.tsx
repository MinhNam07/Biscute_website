"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, Search, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { GeometricLogo } from "@/components/brand/geometric-logo";
import { SearchDrawer } from "./search-drawer";
import { cn } from "@/lib/utils";
import "./mobile-nav.css";

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

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="mobile-header sticky top-0 z-40 border-b-2 border-biscute-chocolate bg-biscute-pink text-biscute-white lg:border-b-4">
        <div className="container-biscute grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 lg:h-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <button
            className="relative flex h-11 w-11 shrink-0 items-center justify-center border-2 border-biscute-chocolate bg-biscute-white text-biscute-chocolate shadow-biscute-sm btn-press lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("menu")}
            aria-expanded={mobileOpen}
          >
            <Menu
              className={cn(
                "menu-icon absolute h-5 w-5",
                mobileOpen ? "menu-icon--open" : "menu-icon--closed"
              )}
              aria-hidden={mobileOpen}
            />
            <X
              className={cn(
                "menu-icon absolute h-5 w-5",
                mobileOpen ? "menu-icon--closed" : "menu-icon--open"
              )}
              aria-hidden={!mobileOpen}
            />
          </button>

          <Link
            href="/"
            className="flex justify-center transition-opacity hover:opacity-80 lg:col-start-1 lg:row-start-1 lg:justify-start"
          >
            <GeometricLogo />
          </Link>

          <nav
            className="hidden items-center justify-center gap-6 lg:col-start-2 lg:row-start-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "type-nav transition-colors duration-200 hover:text-biscute-pale-pink",
                  pathname.startsWith(link.href) && "text-biscute-pale-pink underline decoration-4 underline-offset-4"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 lg:col-start-3 lg:row-start-1">
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
              className="type-label flex h-11 items-center border-2 border-biscute-chocolate bg-biscute-white px-3 text-biscute-chocolate shadow-biscute-sm btn-press hover:bg-biscute-pale-pink"
            >
              {switchLocale.toUpperCase()}
            </Link>
          </div>
        </div>

        <nav
          className="mobile-nav-panel lg:hidden"
          data-open={mobileOpen}
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          inert={!mobileOpen || undefined}
        >
          <div className="mobile-nav-panel__inner">
            <div className="mobile-nav-panel__content border-t-2 border-biscute-chocolate bg-biscute-pink text-biscute-white">
              <div className="mobile-nav-panel__links">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    tabIndex={mobileOpen ? undefined : -1}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "mobile-nav-link type-nav flex min-h-11 items-center border-2 border-transparent px-4 transition-[transform,background-color,border-color] duration-200 hover:border-biscute-white hover:bg-biscute-deep-pink active:translate-x-0.5 active:translate-y-0.5",
                      pathname.startsWith(link.href) &&
                        "border-biscute-white bg-biscute-deep-pink text-biscute-pale-pink"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
              <div className="mobile-nav-panel__locale border-t-2 border-biscute-chocolate/60">
                <Link
                  href={pathname}
                  locale={switchLocale}
                  tabIndex={mobileOpen ? undefined : -1}
                  onClick={() => setMobileOpen(false)}
                  className="mobile-nav-link type-nav flex min-h-11 items-center border-2 border-transparent px-4 transition-[transform,background-color,border-color] duration-200 hover:border-biscute-white hover:bg-biscute-deep-pink active:translate-x-0.5 active:translate-y-0.5"
                >
                  {switchLocale === "en" ? "English" : "Tiếng Việt"}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <SearchDrawer open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
