"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Product } from "@/lib/catalog";
import ProductCard from "./ProductCard";

interface TrackMetrics {
  maxOverflow: number;
  scrolledFromStart: number;
  remainingToEnd: number;
  cards: HTMLElement[];
  firstRect: DOMRect;
}

function readTrackMetrics(track: HTMLDivElement, ar: boolean): TrackMetrics | null {
  const cards = Array.from(track.children) as HTMLElement[];
  if (!cards.length) return null;

  const trackRect = track.getBoundingClientRect();
  const firstRect = cards[0].getBoundingClientRect();
  const lastRect = cards[cards.length - 1].getBoundingClientRect();

  if (ar) {
    const totalSpan = firstRect.right - lastRect.left;
    const maxOverflow = Math.max(0, totalSpan - trackRect.width);
    const scrolledFromStart = Math.max(0, firstRect.right - trackRect.right);
    const remainingToEnd = Math.max(0, trackRect.left - lastRect.left);
    return { maxOverflow, scrolledFromStart, remainingToEnd, cards, firstRect };
  }

  const totalSpan = lastRect.right - firstRect.left;
  const maxOverflow = Math.max(0, totalSpan - trackRect.width);
  const scrolledFromStart = Math.max(0, trackRect.left - firstRect.left);
  const remainingToEnd = Math.max(0, lastRect.right - trackRect.right);
  return { maxOverflow, scrolledFromStart, remainingToEnd, cards, firstRect };
}

export default function ProductCarousel({
  products,
  variant = "catalog",
  showUsageBadge = false,
  ariaLabel,
}: {
  products: readonly Product[];
  variant?: "catalog" | "spotlight";
  showUsageBadge?: boolean;
  ariaLabel: string;
}) {
  const { lang } = useApp();
  const ar = lang === "ar";
  const trackRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef<{ offset: number; until: number } | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(products.length > 1);
  const [hasOverflow, setHasOverflow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const count = products.length;
  const clampedActive = Math.min(activeIndex, Math.max(0, count - 1));

  useEffect(() => {
    pendingScrollRef.current = null;
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [products.length, lang]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const metrics = readTrackMetrics(track, ar);
    if (!metrics) return;

    const { maxOverflow, scrolledFromStart, remainingToEnd } = metrics;
    const overflows = maxOverflow > 6;
    setHasOverflow(overflows);

    const inProgrammaticScroll =
      pendingScrollRef.current !== null && Date.now() < pendingScrollRef.current.until;

    if (variant === "spotlight") {
      if (overflows && !inProgrammaticScroll && count > 1) {
        const idxFromScroll = Math.round((scrolledFromStart / maxOverflow) * (count - 1));
        setActiveIndex(Math.max(0, Math.min(count - 1, idxFromScroll)));
      }
      if (!inProgrammaticScroll) {
        setCanPrev(overflows ? scrolledFromStart > 6 || clampedActive > 0 : clampedActive > 0);
        setCanNext(overflows ? remainingToEnd > 6 || clampedActive < count - 1 : clampedActive < count - 1);
        setProgress(overflows ? Math.min(1, scrolledFromStart / maxOverflow) : count > 1 ? clampedActive / (count - 1) : 1);
      }
      return;
    }

    if (!inProgrammaticScroll) {
      setCanPrev(scrolledFromStart > 6);
      setCanNext(remainingToEnd > 6);
      setProgress(overflows ? Math.min(1, Math.max(0, scrolledFromStart / maxOverflow)) : 1);
    }
  }, [ar, clampedActive, count, variant]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(measure);
    const track = trackRef.current;
    if (!track) return () => window.cancelAnimationFrame(raf);

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [measure, lang]);

  function scrollByOffsetFromStart(targetFromStart: number, metrics: TrackMetrics) {
    const track = trackRef.current;
    if (!track) return;

    const clampedTarget = Math.max(0, Math.min(metrics.maxOverflow, Math.round(targetFromStart)));
    const offsetChange = clampedTarget - metrics.scrolledFromStart;
    const physicalDelta = ar ? -offsetChange : offsetChange;

    pendingScrollRef.current = { offset: clampedTarget, until: Date.now() + 480 };
    track.scrollBy({ left: physicalDelta, behavior: "smooth" });
  }

  function scrollToIndex(targetIdx: number) {
    const idx = Math.max(0, Math.min(count - 1, targetIdx));
    setActiveIndex(idx);

    const track = trackRef.current;
    if (!track) return;
    const metrics = readTrackMetrics(track, ar);
    if (!metrics) return;

    const { maxOverflow } = metrics;
    const targetFromStart = count > 1 ? Math.round((maxOverflow * idx) / (count - 1)) : 0;

    setCanPrev(idx > 0 || targetFromStart > 6);
    setCanNext(idx < count - 1 || targetFromStart < maxOverflow - 6);
    setProgress(maxOverflow > 6 ? targetFromStart / maxOverflow : count > 1 ? idx / (count - 1) : 1);

    scrollByOffsetFromStart(targetFromStart, metrics);
  }

  function step(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;

    if (variant === "spotlight") {
      scrollToIndex(clampedActive + direction);
      return;
    }

    const metrics = readTrackMetrics(track, ar);
    if (!metrics) return;

    const { maxOverflow, scrolledFromStart, cards, firstRect } = metrics;
    if (maxOverflow <= 4) return;

    // Build ordered unique card-start stops strictly within [0, maxOverflow]
    const stops: number[] = [0];
    for (const card of cards) {
      const r = card.getBoundingClientRect();
      const rawOffset = ar ? firstRect.right - r.right : r.left - firstRect.left;
      const clamped = Math.min(maxOverflow, Math.max(0, Math.round(rawOffset)));
      if (clamped - stops[stops.length - 1] >= 24) {
        stops.push(clamped);
      }
    }
    if (maxOverflow - stops[stops.length - 1] >= 24) {
      stops.push(Math.round(maxOverflow));
    } else if (stops.length > 1) {
      stops[stops.length - 1] = Math.round(maxOverflow);
    }

    const activeBaseline =
      pendingScrollRef.current && Date.now() < pendingScrollRef.current.until
        ? pendingScrollRef.current.offset
        : scrolledFromStart;

    let targetOffset = activeBaseline;
    if (direction === 1) {
      const nextStop = stops.find((stop) => stop > activeBaseline + 14);
      targetOffset = nextStop ?? Math.round(maxOverflow);
    } else {
      const prevStops = stops.filter((stop) => stop < activeBaseline - 14);
      targetOffset = prevStops.length ? prevStops[prevStops.length - 1] : 0;
    }

    setCanPrev(targetOffset > 6);
    setCanNext(targetOffset < maxOverflow - 6);
    setProgress(Math.min(1, Math.max(0, targetOffset / Math.max(1, maxOverflow))));

    scrollByOffsetFromStart(targetOffset, metrics);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(ar ? 1 : -1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(ar ? -1 : 1);
    }
  }

  const prevLabel = ar ? "السابق" : "Previous";
  const nextLabel = ar ? "التالي" : "Next";
  const showControls = hasOverflow || variant === "spotlight";

  return (
    <div
      className={[
        "ics-carousel",
        variant === "spotlight" ? "is-spotlight-carousel" : "is-catalog-carousel",
        !hasOverflow && count <= 3 ? "is-compact-row" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    >
      <div className="ics-carousel-stage">
        {showControls && count > 1 && (
          <button
            type="button"
            className="ics-carousel-side-btn is-prev"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label={prevLabel}
          >
            {ar ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        )}

        <div
          className="ics-carousel-track"
          ref={trackRef}
          onScroll={measure}
          tabIndex={0}
        >
          {products.map((product, index) => (
            <div
              className="ics-carousel-slide"
              key={product.id}
              onClick={variant === "spotlight" ? () => scrollToIndex(index) : undefined}
            >
              <ProductCard
                product={product}
                variant={variant === "spotlight" ? "spotlight" : "default"}
                isActive={variant === "spotlight" && index === clampedActive}
                showUsageBadge={showUsageBadge}
              />
            </div>
          ))}
        </div>

        {showControls && count > 1 && (
          <button
            type="button"
            className="ics-carousel-side-btn is-next"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label={nextLabel}
          >
            {ar ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </button>
        )}
      </div>

      {showControls && count > 1 && (
        <div className="ics-carousel-controls">
          <div className="ics-carousel-nav-group">
            <button
              type="button"
              className="ics-carousel-btn"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label={prevLabel}
            >
              {ar ? <ChevronRight size={19} /> : <ChevronLeft size={19} />}
            </button>
            <button
              type="button"
              className="ics-carousel-btn"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label={nextLabel}
            >
              {ar ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
            </button>
          </div>

          <div className="ics-carousel-progress-wrap" aria-hidden="true">
            <div className="ics-carousel-progress-track">
              <div
                className="ics-carousel-progress-fill"
                style={{ width: `${Math.max(18, Math.round(progress * 100))}%` }}
              />
            </div>
            {variant === "spotlight" && (
              <div className="ics-carousel-dots">
                {products.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item[lang]}
                    aria-current={idx === clampedActive ? "true" : undefined}
                    className={"ics-carousel-dot" + (idx === clampedActive ? " is-active" : "")}
                    onClick={() => scrollToIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
