"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { TravelStamp } from "@/components/brand/travel-stamp";
import { PostalFrame } from "@/components/brand/postal-frame";
import {
  acknowledgePassportAnimations,
  usePassportProgress,
} from "@/hooks/use-passport-stamps";
import {
  PASSPORT_COLLECTIONS,
  type PassportId,
  type PassportProgress,
} from "@/lib/passport";
import { STORE_MAPS_URL } from "@/lib/constants/store";
import "./passport-section.css";
import "./homepage-colors.css";


type RewardPhase = "idle" | "shake" | "peel" | "open";

function formatCancelDate(iso: string | undefined, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString(locale === "vi" ? "vi-VN" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    })
    .toUpperCase();
}

function PassportHeader({
  title,
  productLine,
  subtitle,
}: {
  title: string;
  productLine: string;
  subtitle: string;
}) {
  return (
    <header className="passport-book__header">
      <h2 className="passport-book__title">{title}</h2>
      <p className="passport-book__product type-label">{productLine}</p>
      <p className="passport-book__lede">{subtitle}</p>
    </header>
  );
}

function StampCollectionGrid({
  progress,
  pressing,
  locale,
  exploreLabel,
  stampedLabel,
  cancelBrand,
  cancelOffice,
  cancelPlace,
  cancelCountry,
  stampAriaInked,
  stampAriaBlank,
}: {
  progress: PassportProgress;
  pressing: ReadonlySet<PassportId>;
  locale: string;
  exploreLabel: string;
  stampedLabel: string;
  cancelBrand: string;
  cancelOffice: string;
  cancelPlace: string;
  cancelCountry: string;
  stampAriaInked: (name: string) => string;
  stampAriaBlank: (name: string) => string;
}) {
  return (
    <div className="passport-book__board">
      {PASSPORT_COLLECTIONS.map((meta, index) => {
        const stamped = progress.stamps[meta.id];
        const cancelDate = formatCancelDate(
          progress.stampedAt[meta.id],
          locale
        );
        return (
          <Link
            key={meta.id}
            href={`/collections/${meta.routeHandle}`}
            className={`passport-book__slot passport-book__slot--${index + 1} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-biscute-pink focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-warm-cream)]`}
            aria-label={
              stamped
                ? stampAriaInked(meta.label)
                : stampAriaBlank(meta.label)
            }
          >
            <TravelStamp
              id={meta.id}
              stamped={stamped}
              animate={pressing.has(meta.id)}
              label={meta.label}
              exploreLabel={exploreLabel}
              stampedLabel={stampedLabel}
              cancelBrand={cancelBrand}
              cancelOffice={cancelOffice}
              cancelPlace={cancelPlace}
              cancelCountry={cancelCountry}
              cancelDate={cancelDate || undefined}
            />
          </Link>
        );
      })}
    </div>
  );
}

function StampProgress({ label }: { label: string }) {
  return (
    <p className="passport-book__count type-label" aria-live="polite">
      {label}
    </p>
  );
}

function PerforatedDivider() {
  return (
    <div className="passport-book__tear" aria-hidden>
      <span className="passport-book__tear-line" />
    </div>
  );
}

function RewardSection({
  rewardClass,
  unlocked,
  remaining,
  t,
}: {
  rewardClass: string;
  unlocked: boolean;
  remaining: number;
  t: ReturnType<typeof useTranslations<"passport">>;
}) {
  return (
    <div className={rewardClass} id="passport-reward">
      <div className="passport-secret__parcel">
        {unlocked ? (
          <>
            <p className="passport-secret__delivery-seal type-label">
              {t("unlockedEyebrow")}
            </p>
            <p className="passport-secret__headline">{t("unlockedTitle")}</p>
            <p className="passport-secret__body passport-secret__body--claim type-body">
              {t.rich("unlockedBody", {
                addr: (chunks) => (
                  <span className="passport-secret__addr">{chunks}</span>
                ),
              })}
            </p>
            <a
              href={STORE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="passport-secret__directions type-cta"
            >
              {t("unlockedDirections")}
              <ExternalLink
                className="passport-secret__directions-icon"
                aria-hidden
              />
            </a>
            <div className="passport-secret__footer type-label">
              <span>{t("unlockedTagNotForSale")}</span>
              <span aria-hidden>·</span>
              <span>{t("unlockedTagOneCute")}</span>
              <span aria-hidden>·</span>
              <span>{t("unlockedTagBrand")}</span>
            </div>
          </>
        ) : (
          <>
            <p className="passport-secret__eyebrow type-label">
              {t("lockedEyebrow")}
            </p>
            <p className="passport-secret__locked-mark type-label" aria-hidden>
              {t("lockedSeal")}
            </p>
            <p className="passport-secret__body type-body">{t("lockedBody")}</p>
            <p className="passport-secret__hint type-meta">
              {t("lockedHint", { count: remaining })}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export function PassportSection() {
  const t = useTranslations("passport");
  const locale = useLocale();
  const {
    progress,
    stampedCount,
    total,
    remaining,
    rewardUnlocked,
    newlyStamped,
    justUnlocked,
    sessionEpoch,
  } = usePassportProgress();

  const [pressing, setPressing] = useState<ReadonlySet<PassportId>>(new Set());
  const [rewardPhase, setRewardPhase] = useState<RewardPhase>(
    rewardUnlocked ? "open" : "idle"
  );
  const animatedEpoch = useRef<number>(-1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      // Allow the effect to re-arm after Strict Mode remount / nav remount.
      animatedEpoch.current = -1;
    };
  }, []);

  useEffect(() => {
    if (sessionEpoch === animatedEpoch.current) return;
    if (newlyStamped.length === 0 && !justUnlocked) return;

    animatedEpoch.current = sessionEpoch;
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (newlyStamped.length > 0) {
      const startPress = window.setTimeout(() => {
        setPressing(new Set(newlyStamped));
      }, 0);
      timersRef.current.push(startPress);
    }

    if (justUnlocked) {
      if (reduceMotion) {
        const openNow = window.setTimeout(() => setRewardPhase("open"), 0);
        const done = window.setTimeout(() => {
          setPressing(new Set());
          acknowledgePassportAnimations();
        }, 80);
        timersRef.current.push(openNow, done);
        return;
      }

      // Sequence (~1s): stamp lands → pause → shake → peel → open
      // Reward copy stays unlocked; phases only drive motion classes.
      const resetIdle = window.setTimeout(() => setRewardPhase("idle"), 0);
      const afterStamp = newlyStamped.length > 0 ? 450 : 0;
      const shakeAt = afterStamp + 180;
      const peelAt = shakeAt + 150;
      const doneAt = peelAt + 220;

      const tShake = window.setTimeout(() => setRewardPhase("shake"), shakeAt);
      const tPeel = window.setTimeout(() => setRewardPhase("peel"), peelAt);
      const tDone = window.setTimeout(() => {
        setRewardPhase("open");
        setPressing(new Set());
        acknowledgePassportAnimations();
      }, doneAt);

      timersRef.current.push(resetIdle, tShake, tPeel, tDone);
      return;
    }

    const clearPress = window.setTimeout(() => {
      setPressing(new Set());
      acknowledgePassportAnimations();
    }, reduceMotion ? 80 : 550);
    timersRef.current.push(clearPress);
  }, [newlyStamped, justUnlocked, sessionEpoch]);

  // Already unlocked with no pending unlock sequence → open state.
  useEffect(() => {
    if (!rewardUnlocked || justUnlocked) return;
    const open = window.setTimeout(() => setRewardPhase("open"), 0);
    return () => window.clearTimeout(open);
  }, [rewardUnlocked, justUnlocked]);

  // Content follows progress only — never gated by animation hold.
  const rewardClass =
    !rewardUnlocked
      ? "passport-secret passport-secret--sealed"
      : rewardPhase === "shake"
        ? "passport-secret passport-secret--open passport-secret--shake"
        : rewardPhase === "peel"
          ? "passport-secret passport-secret--open passport-secret--peel"
          : "passport-secret passport-secret--open";

  return (
    <SectionWrapper bg="cream" spacing="standard" id="passport">
      {/*
        THESIS: Oversized souvenir postage stamp — collect Little Vietnam as inked seals, not a 2×2 card grid.
        OWN-WORLD: Live perforated PostalFrame (helo chrome) + SVG lotus/tower watermarks; Outfit titles; ghost vs cancel seals.
        STORY: Visit collections → ink stamps → unlock Special Delivery sticker at the Hanoi shop.
        FIRST VIEWPORT: AIR MAIL / ISSUE chrome → title → blue product line → lede → 4-across stamps (2×2 mobile) → progress → tear → LOCKED.
        FORM: PostalFrame sheet layout · SVG print plates · seed helo.html + approved post-office-user-comp.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <div className="passport-book">
        <PostalFrame
          layout="sheet"
          uid="passport"
          className="passport-book__frame"
          airmailLine={`${t("airMail")} · ${t("brandMark")}`}
          postmarkPlace={t("cancelPlace")}
          postmarkCountry="VIỆT NAM"
        >
          <PassportHeader
            title={t("title")}
            productLine={t("productLine")}
            subtitle={t("subtitle")}
          />

          <StampCollectionGrid
            progress={progress}
            pressing={pressing}
            locale={locale}
            exploreLabel={t("explore")}
            stampedLabel={t("stamped")}
            cancelBrand={t("cancelBrand")}
            cancelOffice={t("cancelOffice")}
            cancelPlace={t("cancelPlace")}
            cancelCountry={t("cancelCountry")}
            stampAriaInked={(name) => t("stampAriaInked", { name })}
            stampAriaBlank={(name) => t("stampAriaBlank", { name })}
          />

          <StampProgress
            label={t("progress", {
              stamped: String(stampedCount).padStart(2, "0"),
              total: String(total).padStart(2, "0"),
            })}
          />

          <PerforatedDivider />

          <RewardSection
            rewardClass={rewardClass}
            unlocked={rewardUnlocked}
            remaining={remaining}
            t={t}
          />
        </PostalFrame>
      </div>
    </SectionWrapper>
  );
}
