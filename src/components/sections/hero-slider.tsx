"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlides } from "@/data/site";
import { Button } from "@/components/ui/button";

export function HeroSlider() {
  return (
    <section className="hero-slider">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        loop
        modules={[Autoplay, EffectFade, Pagination]}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className={`hero-slide hero-slide--${slide.accent}`}>
              <Image
                alt={slide.title}
                className="hero-slide__bg"
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.image}
              />
              <div className="hero-slide__overlay" />
              <div className="container hero-slide__inner">
                <div className="hero-slide__copy">
                  <p className="hero-slide__eyebrow">{slide.eyebrow}</p>
                  <h1 className="hero-slide__title">{slide.title}</h1>
                  <p className="hero-slide__description">{slide.description}</p>
                  <Button className="hero-slide__cta" href="/shop/">
                    {slide.cta}
                  </Button>
                </div>
              </div>
              <div className="hero-slide__decor" aria-hidden="true">
                <div className="hero-cloud hero-cloud--one" />
                <div className="hero-cloud hero-cloud--two" />
                {[...Array(8)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`hero-star hero-star--${(starIndex % 4) + 1}`}
                    fill="#fff1a8"
                    size={22 + (starIndex % 3) * 10}
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
