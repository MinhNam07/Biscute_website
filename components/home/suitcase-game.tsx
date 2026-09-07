"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/brand/section-wrapper";
import { STORE_MAPS_URL } from "@/lib/constants/store";
import {
  SUITCASE_CAPACITY,
  clearVietnamBag,
  getSuitcaseState,
  packItem,
  unpackItem,
} from "@/lib/vietnam-bag";
import type { BiscuteProduct } from "@/lib/types";
import "./home-sections.css";
import "./suitcase-game.css";

type SuitcaseGameProps = {
  products: BiscuteProduct[];
};

type CompletionPhase = "idle" | "settling" | "react" | "tag" | "ready";

const SOUVENIR_ROTATIONS = [-6, 4, -2] as const;
const PACK_DURATION_MS = 560;
const UNPACK_DURATION_MS = 280;
const COMPLETION_SETTLE_MS = 280;
const COMPLETION_REACT_MS = 220;
const COMPLETION_TAG_MS = 280;
const BAG_FULL_MS = 1600;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function canFineDrag(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function SuitcaseGame({ products }: SuitcaseGameProps) {
  const t = useTranslations("suitcase");
  const locale = useLocale() as "vi" | "en";
  const options = products;
  const productByHandle = useRef(
    new Map(options.map((product) => [product.handle, product]))
  );
  productByHandle.current = new Map(
    options.map((product) => [product.handle, product])
  );

  const [packedItemIds, setPackedItemIds] = useState<string[]>([]);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(1);
  const [dragEnabled, setDragEnabled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stampingId, setStampingId] = useState<string | null>(null);
  const [bagImpact, setBagImpact] = useState(false);
  const [bagShake, setBagShake] = useState(false);
  const [bagFullVisible, setBagFullVisible] = useState(false);
  const [completionPhase, setCompletionPhase] =
    useState<CompletionPhase>("idle");
  const [enteringId, setEnteringId] = useState<string | null>(null);
  const [exitingId, setExitingId] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const bagInteriorRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const reduceMotionRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    reduceMotionRef.current = reduced;
    setReduceMotion(reduced);
    setDragEnabled(canFineDrag());

    const ids = getSuitcaseState().packedItemIds;
    setPackedItemIds(ids);
    if (ids.length >= SUITCASE_CAPACITY) {
      setCompletionPhase("ready");
    }

    return () => clearTimers();
  }, [clearTimers]);

  const showCompletionCopy =
    packedItemIds.length >= SUITCASE_CAPACITY &&
    completionPhase === "ready";
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollBack(scrollLeft > 8);
    setCanScrollForward(scrollLeft < scrollWidth - clientWidth - 8);

    const card = track.querySelector<HTMLElement>("[data-suitcase-card]");
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    const cardWidth = card?.offsetWidth ?? 200;
    const step = cardWidth + gap;
    const index = Math.min(
      options.length,
      Math.max(1, Math.round(scrollLeft / step) + 1)
    );
    setCarouselIndex(index);
  }, [options.length]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-suitcase-card]");
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
    const distance = (card?.offsetWidth ?? 200) + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }, []);

  const handleTrackKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByCard(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByCard(1);
      }
    },
    [scrollByCard]
  );

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => updateScrollState());
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateScrollState, options.length]);

  const runCompletionSequence = useCallback(() => {
    clearTimers();
    if (reduceMotionRef.current) {
      setCompletionPhase("ready");
      return;
    }

    setCompletionPhase("settling");
    schedule(() => {
      setBagImpact(true);
      setCompletionPhase("react");
    }, COMPLETION_SETTLE_MS);

    schedule(() => {
      setBagImpact(false);
      setCompletionPhase("tag");
    }, COMPLETION_SETTLE_MS + COMPLETION_REACT_MS);

    schedule(() => {
      setCompletionPhase("ready");
    }, COMPLETION_SETTLE_MS + COMPLETION_REACT_MS + COMPLETION_TAG_MS);
  }, [clearTimers, schedule]);

  const flyToBag = useCallback(
    (cardEl: HTMLElement, onDone: () => void) => {
      const interior = bagInteriorRef.current;
      const imageEl = cardEl.querySelector<HTMLElement>(
        "[data-suitcase-chip-art]"
      );
      if (!interior || !imageEl || reduceMotionRef.current) {
        onDone();
        return;
      }

      const from = imageEl.getBoundingClientRect();
      const to = interior.getBoundingClientRect();
      const clone = imageEl.cloneNode(true) as HTMLElement;
      clone.classList.add("suitcase-fly-clone");
      clone.style.position = "fixed";
      clone.style.left = `${from.left}px`;
      clone.style.top = `${from.top}px`;
      clone.style.width = `${from.width}px`;
      clone.style.height = `${from.height}px`;
      clone.style.margin = "0";
      clone.style.zIndex = "80";
      clone.style.pointerEvents = "none";
      clone.style.borderRadius = "12px";
      clone.style.overflow = "hidden";
      document.body.appendChild(clone);

      const targetX =
        to.left + to.width / 2 - from.width * 0.35 - from.left;
      const targetY =
        to.top + to.height / 2 - from.height * 0.35 - from.top;

      const animation = clone.animate(
        [
          {
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            opacity: 1,
          },
          {
            transform: `translate(${targetX * 0.55}px, ${targetY * 0.4}px) scale(0.85) rotate(-8deg)`,
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: `translate(${targetX}px, ${targetY}px) scale(0.42) rotate(6deg)`,
            opacity: 0.15,
          },
        ],
        {
          duration: PACK_DURATION_MS,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        }
      );

      animation.onfinish = () => {
        clone.remove();
        onDone();
      };
      animation.oncancel = () => {
        clone.remove();
        onDone();
      };
    },
    []
  );

  const showBagFullFeedback = useCallback(() => {
    setBagShake(true);
    setBagFullVisible(true);
    schedule(() => setBagShake(false), 520);
    schedule(() => setBagFullVisible(false), BAG_FULL_MS);
  }, [schedule]);

  const pack = useCallback(
    (handle: string, cardEl?: HTMLElement | null) => {
      if (animating) return;

      const result = packItem(handle);
      if (!result.ok) {
        if (result.reason === "full") showBagFullFeedback();
        return;
      }

      setAnimating(true);
      setStampingId(handle);

      const finishPack = () => {
        setPackedItemIds(result.state.packedItemIds);
        setEnteringId(handle);
        setBagImpact(true);
        setStampingId(null);

        schedule(() => setBagImpact(false), 220);
        schedule(() => setEnteringId(null), 420);
        schedule(() => {
          setAnimating(false);
          if (result.state.packedItemIds.length >= SUITCASE_CAPACITY) {
            runCompletionSequence();
          }
        }, reduceMotionRef.current ? 40 : 120);
      };

      if (cardEl && !reduceMotionRef.current) {
        flyToBag(cardEl, finishPack);
      } else {
        finishPack();
      }
    },
    [animating, flyToBag, runCompletionSequence, schedule, showBagFullFeedback]
  );

  const unpack = useCallback(
    (handle: string) => {
      if (animating) return;
      setAnimating(true);
      setExitingId(handle);
      clearTimers();
      setCompletionPhase("idle");

      const duration = reduceMotionRef.current ? 40 : UNPACK_DURATION_MS;
      schedule(() => {
        const next = unpackItem(handle);
        setPackedItemIds(next.packedItemIds);
        setExitingId(null);
        setAnimating(false);
      }, duration);
    },
    [animating, clearTimers, schedule]
  );

  const toggle = useCallback(
    (handle: string, cardEl?: HTMLElement | null) => {
      if (packedItemIds.includes(handle)) {
        unpack(handle);
        return;
      }
      pack(handle, cardEl);
    },
    [pack, packedItemIds, unpack]
  );

  const unpackAll = useCallback(() => {
    clearTimers();
    clearVietnamBag();
    setPackedItemIds([]);
    setCompletionPhase("idle");
    setEnteringId(null);
    setExitingId(null);
    setStampingId(null);
    setAnimating(false);
  }, [clearTimers]);

  const onDragStart = (e: React.DragEvent, handle: string) => {
    if (!dragEnabled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", handle);
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const handle = e.dataTransfer.getData("text/plain");
    if (handle) {
      if (packedItemIds.includes(handle)) return;
      pack(handle);
    }
  };

  const tagReady =
    completionPhase === "tag" ||
    completionPhase === "ready" ||
    (packedItemIds.length >= SUITCASE_CAPACITY && reduceMotion);

  return (
    <SectionWrapper bg="mustard" spacing="featured" id="suitcase">
      <h2 className="type-section-title">{t("title")}</h2>
      <p className="type-body-lg mt-2 max-w-xl">{t("prompt")}</p>
      <p className="type-meta mt-1 opacity-70">{t("hint")}</p>

      <div className="suitcase-layout mt-8">
        <div className="suitcase-rail">
          <div
            ref={trackRef}
            className="suitcase-chips"
            role="list"
            aria-label={t("title")}
            tabIndex={0}
            onScroll={updateScrollState}
            onKeyDown={handleTrackKeyDown}
          >
            {options.map((product) => {
              const selected = packedItemIds.includes(product.handle);
              const stamping = stampingId === product.handle;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="listitem"
                  data-suitcase-card
                  draggable={dragEnabled && !selected}
                  onDragStart={(e) => onDragStart(e, product.handle)}
                  onClick={(e) =>
                    toggle(product.handle, e.currentTarget)
                  }
                  data-selected={selected ? "true" : "false"}
                  data-stamping={stamping ? "true" : "false"}
                  className="suitcase-chip"
                  aria-pressed={selected}
                  aria-label={
                    selected
                      ? t("unpackItem", { name: product.title[locale] })
                      : t("packItem", { name: product.title[locale] })
                  }
                >
                  <span className="suitcase-chip__doodle" aria-hidden />
                  <div className="suitcase-chip__image">
                    <div
                      data-suitcase-chip-art
                      className="suitcase-chip__art"
                    >
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt[locale]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 42vw, (max-width: 1280px) 28vw, 220px"
                      />
                    </div>
                  </div>
                  <span className="suitcase-chip__label type-meta line-clamp-2">
                    {product.title[locale]}
                  </span>
                  <span className="suitcase-chip__invite type-label" aria-hidden>
                    {selected ? t("unpackHint") : t("packMe")}
                  </span>
                  {selected || stamping ? (
                    <span className="suitcase-chip__stamp type-label" aria-hidden>
                      {t("packedStamp")}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="suitcase-nav">
            <button
              type="button"
              className="suitcase-nav__btn btn-press"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollBack}
              aria-label={t("prev")}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            {options.length > 1 ? (
              <span className="suitcase-nav__position type-label" aria-live="polite">
                {t("carouselPosition", {
                  current: carouselIndex,
                  total: options.length,
                })}
              </span>
            ) : null}
            <button
              type="button"
              className="suitcase-nav__btn btn-press"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollForward}
              aria-label={t("next")}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div
          className="suitcase-bag"
          data-shake={bagShake ? "true" : "false"}
          data-impact={bagImpact ? "true" : "false"}
        >
          <div className="suitcase-bag__trolley" aria-hidden>
            <div className="suitcase-bag__grip" />
            <div className="suitcase-bag__poles">
              <span className="suitcase-bag__pole" />
              <span className="suitcase-bag__pole" />
            </div>
          </div>
          <div
            className="suitcase-bag__shell"
            data-complete={tagReady ? "true" : "false"}
          >
            <div className="suitcase-bag__latches" aria-hidden>
              <span className="suitcase-bag__latch" />
              <span className="suitcase-bag__latch" />
            </div>
            <span
              className="suitcase-bag__tag type-label"
              data-ready={tagReady ? "true" : "false"}
              aria-hidden
            >
              <span className="suitcase-bag__tag-face suitcase-bag__tag-face--idle">
                <span>{t("tagIdleLine1")}</span>
                <span>{t("tagIdleLine2")}</span>
              </span>
              <span className="suitcase-bag__tag-face suitcase-bag__tag-face--ready">
                <span>{t("tagReadyLine1")}</span>
                <span>{t("tagReadyLine2")}</span>
              </span>
            </span>
            <div
              ref={bagInteriorRef}
              onDragOver={(e) => {
                if (dragEnabled) e.preventDefault();
              }}
              onDrop={onDrop}
              data-ready={showCompletionCopy ? "true" : "false"}
              data-phase={completionPhase}
              className="suitcase-bag__interior"
            >
              <p className="suitcase-bag__status type-label" aria-live="polite">
                {t("slots", { count: packedItemIds.length })}
              </p>

              <div className="suitcase-bag__bay">
                {packedItemIds.length === 0 ? (
                  <div className="suitcase-bag__empty">
                    <p className="suitcase-bag__empty-title type-label">
                      {t("emptyBay")}
                    </p>
                    <p className="suitcase-bag__empty-hint type-meta">
                      {t("emptyBayHint")}
                    </p>
                  </div>
                ) : (
                  <ul className="suitcase-bag__souvenirs">
                    {packedItemIds.map((handle, index) => {
                      const product = productByHandle.current.get(handle);
                      if (!product) return null;
                      const rotation =
                        SOUVENIR_ROTATIONS[index] ?? SOUVENIR_ROTATIONS[0];
                      return (
                        <li
                          key={handle}
                          className="suitcase-bag__souvenir"
                          data-entering={enteringId === handle ? "true" : "false"}
                          data-exiting={exitingId === handle ? "true" : "false"}
                          style={{
                            ["--souvenir-rotate" as string]: `${rotation}deg`,
                            ["--souvenir-index" as string]: String(index),
                          }}
                        >
                          <button
                            type="button"
                            className="suitcase-bag__souvenir-btn"
                            onClick={() => unpack(handle)}
                            aria-label={t("unpackItem", {
                              name: product.title[locale],
                            })}
                          >
                            <Image
                              src={product.images[0].url}
                              alt=""
                              width={96}
                              height={120}
                              className="suitcase-bag__souvenir-img"
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {bagFullVisible ? (
                <div className="suitcase-bag__full" role="status" aria-live="assertive">
                  <p className="suitcase-bag__full-title type-label">
                    {t("bagFullTitle")}
                  </p>
                  <p className="suitcase-bag__full-body type-meta">
                    {t("bagFullBody")}
                  </p>
                </div>
              ) : null}

              {showCompletionCopy ? (
                <div className="suitcase-bag__actions">
                  <p className="type-card-title text-biscute-chocolate">
                    {t("ready")}
                  </p>
                  <p className="suitcase-bag__ready-body type-meta">
                    {t("readyBody")}
                  </p>
                  <Button variant="primary" asChild>
                    <a
                      href={STORE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("ctaVisit")}
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={unpackAll}>
                    {t("ctaClear")}
                  </Button>
                </div>
              ) : packedItemIds.length > 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="suitcase-bag__unpack-all"
                  onClick={unpackAll}
                >
                  {t("ctaClear")}
                </Button>
              ) : null}
            </div>
            <div className="suitcase-bag__wheels" aria-hidden>
              <span className="suitcase-bag__wheel" />
              <span className="suitcase-bag__wheel" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
