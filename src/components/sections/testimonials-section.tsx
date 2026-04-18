"use client";

import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function TestimonialsSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`section testimonials-section ${compact ? "testimonials-section--compact" : ""}`}>
      <div className="container">
        <div className="testimonials-section__layout">
          <div className="testimonials-section__intro">
            <SectionHeading
              align="left"
              eyebrow="Testimonials"
              title="What Our Clients Say About Us"
              description="We appreciate your kind and honest feedback and invite you to our amazing store."
            />
            <Button className="testimonials-section__button" href="/about/">
              About Us
            </Button>
          </div>
          <Swiper
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
            }}
            className="testimonials-swiper"
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={24}
          >
            {testimonials.slice(0, compact ? 2 : 3).map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <article className="testimonial-card">
                  <Quote className="testimonial-card__icon" size={34} />
                  <p className="testimonial-card__quote">{testimonial.quote}</p>
                  <div className="testimonial-card__person">
                    <div className="testimonial-card__avatar">{testimonial.name[0]}</div>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
