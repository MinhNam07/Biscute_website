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
  type PassportId,
} from "@/lib/passport";
import "./passport-section.css";
import "./homepage-colors.css";

type RewardPhase = "idle" | "shake" | "peel" | "open";

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
  const [rewardPhase, setRewardPhase] = useState<RewardPhase>("idle");
  /** Local hold so a stuck justUnlocked flag cannot permanently hide the reward. */
  const [sealUntilPeel, setSealUntilPeel] = useState(false);
  const animatedEpoch = useRef<number>(-1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
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
      setPressing(new Set(newlyStamped));
    }

    if (justUnlocked) {
      if (reduceMotion) {
        setSealUntilPeel(false);
        setRewardPhase("open");
        const done = window.setTimeout(() => {
          setPressing(new Set());
          acknowledgePassportAnimations();
        }, 80);
        timersRef.current.push(done);
        return;
      }

      // Sequence (~1s): stamp lands → pause → shake → peel → open
      setSealUntilPeel(true);
      setRewardPhase("idle");
      const afterStamp = newlyStamped.length > 0 ? 450 : 0;
      const shakeAt = afterStamp + 180;
      const peelAt = shakeAt + 150;
      const doneAt = peelAt + 220;

      const tShake = window.setTimeout(() => setRewardPhase("shake"), shakeAt);
      const tPeel = window.setTimeout(() => {
        setSealUntilPeel(false);
        setRewardPhase("peel");
      }, peelAt);
      const tDone = window.setTimeout(() => {
        setRewardPhase("open");
        setPressing(new Set());
        acknowledgePassportAnimations();
      }, doneAt);

      timersRef.current.push(tShake, tPeel, tDone);
      return;
    }

    const clearPress = window.setTimeout(() => {
      setPressing(new Set());
      acknowledgePassportAnimations();
    }, reduceMotion ? 80 : 550);
    timersRef.current.push(clearPress);
  }, [newlyStamped, justUnlocked, sessionEpoch]);

  // If already unlocked (or unlock flag cleared) without an active seal, show open.
  useEffect(() => {
    if (rewardUnlocked && !justUnlocked && !sealUntilPeel) {
      setRewardPhase((phase) => (phase === "idle" || phase === "shake" ? "open" : phase));
    }
  }, [rewardUnlocked, justUnlocked, sealUntilPeel]);

  const showRewardContent = rewardUnlocked && !sealUntilPeel;
  const rewardClass =
    rewardPhase === "shake"
      ? "passport-secret passport-secret--sealed passport-secret--shake"
      : rewardPhase === "peel"
        ? "passport-secret passport-secret--peel"
        : showRewardContent || rewardPhase === "open"
          ? "passport-secret passport-secret--open"
          : "passport-secret passport-secret--sealed";

  return (
    <SectionWrapper bg="cream" spacing="standard" id="passport">
      <div className="passport-book">
        <div className="passport-book__grain" aria-hidden />
        <div className="passport-book__doodle passport-book__doodle--plane" aria-hidden />
        <div className="passport-book__doodle passport-book__doodle--post" aria-hidden />

        <header className="passport-book__header">
          <div>
            <h2 className="passport-book__title">{t("title")}</h2>
            <p className="type-meta mt-2 text-biscute-chocolate/70">{t("subtitle")}</p>
          </div>
          <p className="passport-book__count type-label" aria-live="polite">
            {t("progress", { stamped: stampedCount, total })}
          </p>
        </header>

        <div className="passport-book__slots">
          <svg
            className="passport-book__trail"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              className="passport-book__trail-path"
              d="M30 42 C70 18 110 62 150 38 C190 14 230 66 270 40 C310 18 350 52 370 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="3 5"
              strokeLinecap="round"
            />
            <path
              className="passport-book__trail-arrow"
              d="M362 30 L372 36 L362 42"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <g className="passport-book__trail-plane" transform="translate(188 22)">
              <path
                d="M0 8 L14 4 L0 0 L2 4 Z"
                fill="currentColor"
                opacity="0.9"
              />
            </g>
            <circle cx="90" cy="28" r="1.6" fill="currentColor" opacity="0.7" />
            <circle cx="250" cy="52" r="1.4" fill="currentColor" opacity="0.65" />
          </svg>

          {PASSPORT_COLLECTIONS.map((meta, index) => {
            const stamped = progress.stamps[meta.id];
            return (
              <Link
                key={meta.id}
                href={`/collections/${meta.routeHandle}`}
                className={`passport-book__slot passport-book__slot--${index + 1} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-biscute-pink focus-visible:ring-offset-2`}
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

        <div className={rewardClass}>
          <div className="passport-secret__ticket">
            <div className="passport-secret__perf" aria-hidden />
            <div className="passport-secret__perf passport-secret__perf--right" aria-hidden />

            {showRewardContent ? (
              <>
                <div className="passport-secret__rays" aria-hidden />
                <p className="passport-secret__eyebrow type-label">{t("unlockedEyebrow")}</p>
                <p className="passport-secret__headline">{t("unlockedTitle")}</p>
                <p className="passport-secret__body type-body">
                  {t("unlockedBody")}
                </p>
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
                <div className="passport-secret__classified" aria-hidden>
                  <span className="passport-secret__top-secret">{t("lockedSeal")}</span>
                </div>
                <div className="passport-secret__postal" aria-hidden />
                <div className="passport-secret__redact" aria-hidden>
                  <span />
                  <span />
                  <span />
                </div>
                <p className="passport-secret__eyebrow type-label">{t("lockedEyebrow")}</p>
                <p className="passport-secret__body type-body">
                  {t("lockedBody")}
                </p>
                <p className="passport-secret__hint type-meta">
                  {t("lockedHint", { count: remaining })}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
