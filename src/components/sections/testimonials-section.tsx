"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { Button } from "@/components/ui/button";

export function TestimonialsSection({ compact = false }: { compact?: boolean }) {
  const items = testimonials.slice(0, compact ? 2 : 3);

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
          </div>

          <div className="testimonials-section__cards">
            {items.map((testimonial, index) => (
              <article className="testimonial-card testimonial-card--showcase" key={testimonial.id}>
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
