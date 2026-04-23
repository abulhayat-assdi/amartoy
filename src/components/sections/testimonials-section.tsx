"use client";

import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";

const SLIDE_INTERVAL = 4000;
const CARDS_PER_VIEW = 2;

export function TestimonialsSection({ compact = false }: { compact?: boolean }) {
  const items = compact ? testimonials : testimonials;
  const total = items.length;
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  // Get visible cards (2 at a time, wrapping around)
  const getVisible = () => {
    const count = compact ? 2 : CARDS_PER_VIEW;
    return Array.from({ length: count }, (_, i) => items[(current + i) % total]);
  };

  const visible = getVisible();

  return (
    <section className={`section testimonials-section ${compact ? "testimonials-section--compact" : ""}`}>
      <div className="testimonials-section__backdrop" />
      <div className="container">
        <div className="testimonials-section__layout">
          <div className="testimonials-section__intro">
            <p className="testimonials-section__eyebrow">Testimonials</p>
            <h2 className="testimonials-section__title">What Our Clients Say About Us</h2>
            <p className="testimonials-section__description">
              We appreciate your kind and honest feedback and invite you to our amazing store.
            </p>
            <Button className="testimonials-section__button" href="/about/">
              About Us
            </Button>

            {!compact ? (
              <div className="testimonials-section__nav">
                <button
                  aria-label="Previous review"
                  className="testimonials-section__nav-btn"
                  onClick={() => { prev(); resetTimer(); }}
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  aria-label="Next review"
                  className="testimonials-section__nav-btn"
                  onClick={() => { next(); resetTimer(); }}
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            ) : null}

            {/* Dots */}
            <div className="testimonials-section__dots">
              {items.map((_, i) => (
                <button
                  aria-label={`Go to review ${i + 1}`}
                  className={`testimonials-section__dot${i === current ? " testimonials-section__dot--active" : ""}`}
                  key={i}
                  onClick={() => { goTo(i); resetTimer(); }}
                />
              ))}
            </div>
          </div>

          <div className="testimonials-section__cards">
            {visible.map((testimonial, index) => (
              <article
                className={`testimonial-card testimonial-card--showcase testimonials-section__card-slide`}
                key={`${testimonial.id}-${current}-${index}`}
              >
                <div className={`testimonial-card__quote-mark testimonial-card__quote-mark--${index % 2 === 0 ? "blue" : "green"}`}>
                  <Quote size={28} />
                </div>
                <p className="testimonial-card__quote">{testimonial.quote}</p>
                <div className="testimonial-card__person">
                  <div className="testimonial-card__avatar">{testimonial.name[0]}</div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
