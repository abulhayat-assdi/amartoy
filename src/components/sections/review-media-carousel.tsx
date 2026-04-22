"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { reviewMediaItems } from "@/data/site";
import type { ReviewMediaItem } from "@/types/site";

function getLoopedIndex(index: number, length: number) {
  if (length === 0) {
    return 0;
  }

  return (index + length) % length;
}

export function ReviewMediaCarousel() {
  const [activeItem, setActiveItem] = useState<ReviewMediaItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => reviewMediaItems, []);

  useEffect(() => {
    if (!activeItem) {
      const timer = window.setInterval(() => {
        setActiveIndex((current) => getLoopedIndex(current + 1, slides.length));
      }, 3000);

      return () => window.clearInterval(timer);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem, slides.length]);

  useEffect(() => {
    if (!activeItem || typeof document === "undefined") {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [activeItem]);

  const previewSlides = useMemo(() => {
    if (!slides.length) {
      return [];
    }

    return [
      {
        item: slides[getLoopedIndex(activeIndex - 1, slides.length)],
        tone: "side",
      },
      {
        item: slides[getLoopedIndex(activeIndex, slides.length)],
        tone: "current",
      },
      {
        item: slides[getLoopedIndex(activeIndex + 1, slides.length)],
        tone: "side",
      },
    ] as const;
  }, [activeIndex, slides]);

  return (
    <>
      <section className="home-section home-section--media-review">
        <div className="container">
          <div className="home-section__heading home-section__heading--center review-carousel__heading">
            <p className="home-kicker">Customer Reviews</p>
            <h2>Photos and video stories from real families</h2>
            <p className="review-carousel__intro">
              Add image or video reviews here and they will rotate automatically every 3 seconds in an endless loop.
            </p>
          </div>

          <div className="review-carousel">
            <button
              className="review-carousel__nav review-carousel__nav--prev"
              type="button"
              aria-label="Previous review"
              onClick={() => setActiveIndex((current) => getLoopedIndex(current - 1, slides.length))}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="review-carousel__viewport">
              <div className="review-carousel__stage">
                {previewSlides.map(({ item, tone }, index) => (
                  <article
                    key={`${item.id}-${tone}-${index}`}
                    className={`review-card review-card--${tone}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveItem(item)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveItem(item);
                      }
                    }}
                  >
                    <div className="review-card__media">
                      <Image
                        alt={item.title}
                        className="review-card__image"
                        fill
                        sizes="(max-width: 768px) 90vw, 68vw"
                        src={item.type === "video" && item.poster ? item.poster : item.src}
                      />
                      <div className="review-card__overlay" />
                      <div className="review-card__play">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>

                    <div className="review-card__content">
                      <p>{item.description}</p>
                      <strong>{item.author}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              className="review-carousel__nav review-carousel__nav--next"
              type="button"
              aria-label="Next review"
              onClick={() => setActiveIndex((current) => getLoopedIndex(current + 1, slides.length))}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {activeItem ? (
        <div className="review-modal" role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <button
            className="review-modal__backdrop"
            type="button"
            aria-label="Close review preview"
            onClick={() => setActiveItem(null)}
          />

          <div className="review-modal__content">
            <button className="review-modal__close" type="button" onClick={() => setActiveItem(null)}>
              <X size={22} />
            </button>

            <div className="review-modal__media">
              {activeItem.type === "video" ? (
                <video
                  className="review-modal__video"
                  autoPlay
                  controls
                  playsInline
                  poster={activeItem.poster}
                  src={activeItem.src}
                />
              ) : (
                <Image
                  alt={activeItem.title}
                  className="review-modal__image"
                  fill
                  sizes="90vw"
                  src={activeItem.src}
                />
              )}
            </div>

            <div className="review-modal__copy">
              <h3>{activeItem.title}</h3>
              <p>{activeItem.description}</p>
              <strong>{activeItem.author}</strong>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
