"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { TravelStamp } from "@/components/brand/travel-stamp";
import {
  acknowledgePassportAnimations,
  usePassportProgress,
} from "@/hooks/use-passport-stamps";
import {
  PASSPORT_COLLECTIONS,
  resetPassport,
  type PassportId,
} from "@/lib/passport";
import "./passport-section.css";
import "./homepage-colors.css";

export function PassportSection() {
  const t = useTranslations("passport");
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
  const [peelOnce, setPeelOnce] = useState(false);
  const animatedEpoch = useRef<number>(-1);

  useEffect(() => {
    if (sessionEpoch === animatedEpoch.current) return;
    if (newlyStamped.length === 0 && !justUnlocked) return;

    animatedEpoch.current = sessionEpoch;

    if (justUnlocked) {
      setPeelOnce(true);
    }

    if (newlyStamped.length > 0) {
      setPressing(new Set(newlyStamped));
      const timer = window.setTimeout(() => {
        setPressing(new Set());
        acknowledgePassportAnimations();
      }, 550);
      return () => window.clearTimeout(timer);
    }

    acknowledgePassportAnimations();
  }, [newlyStamped, justUnlocked, sessionEpoch]);

  const showUnlocked = rewardUnlocked;
  const playPeel = showUnlocked && peelOnce;

  return (
    <SectionWrapper bg="cream" spacing="standard" id="passport">
      <div className="passport-book">
        <div className="passport-book__grain" aria-hidden />
        <div className="passport-book__doodle passport-book__doodle--plane" aria-hidden />
        <div className="passport-book__doodle passport-book__doodle--post" aria-hidden />

        <header className="passport-book__header">
          <div>
            <h2 className="type-section-title passport-book__title">{t("title")}</h2>
            <p className="type-meta mt-2 text-biscute-chocolate/70">{t("subtitle")}</p>
          </div>
          <p className="passport-book__count type-label" aria-live="polite">
            {t("progress", { stamped: stampedCount, total })}
          </p>
        </header>

        <div className="passport-book__slots">
          {PASSPORT_COLLECTIONS.map((meta) => {
            const stamped = progress.stamps[meta.id];
            return (
              <Link
                key={meta.id}
                href={`/collections/${meta.routeHandle}`}
                className="passport-book__slot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-biscute-pink focus-visible:ring-offset-2"
                aria-label={
                  stamped
                    ? t("stampAriaInked", { name: meta.label })
                    : t("stampAriaBlank", { name: meta.label })
                }
              >
                <TravelStamp
                  id={meta.id}
                  stamped={stamped}
                  animate={pressing.has(meta.id)}
                  label={meta.label}
                  exploreLabel={t("explore")}
                  stampedLabel={t("stamped")}
                />
              </Link>
            );
          })}
        </div>

        <div
          className={
            playPeel
              ? "passport-secret passport-secret--peel"
              : showUnlocked
                ? "passport-secret passport-secret--open"
                : "passport-secret passport-secret--sealed"
          }
        >
          <div className="passport-secret__ticket">
            <div className="passport-secret__perf" aria-hidden />
            {showUnlocked ? (
              <>
                <p className="passport-secret__eyebrow type-label">{t("unlockedEyebrow")}</p>
                <p className="passport-secret__headline type-subsection-title">
                  {t("unlockedTitle")}
                </p>
                <p className="type-body mt-3 text-biscute-chocolate/80">
                  {t("unlockedBody")}
                </p>
              </>
            ) : (
              <>
                <p className="passport-secret__eyebrow type-label">{t("lockedEyebrow")}</p>
                <p className="type-body mt-3 text-biscute-chocolate/75">
                  {t("lockedBody")}
                </p>
                <p className="type-meta mt-3 text-biscute-chocolate/60">
                  {t("lockedHint", { count: remaining })}
                </p>
              </>
            )}
          </div>
        </div>

        {process.env.NODE_ENV === "development" ? (
          <button
            type="button"
            className="passport-book__dev-reset type-label"
            onClick={() => {
              resetPassport();
              setPressing(new Set());
              setPeelOnce(false);
              animatedEpoch.current = -1;
            }}
          >
            {t("devReset")}
          </button>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
