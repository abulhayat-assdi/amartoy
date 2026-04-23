"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { HomeVideoSection as HomeVideoSectionData } from "@/types/homepage";

export function HomeVideoSection({ content }: { content: HomeVideoSectionData }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="home-section home-section--soft home-video">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p className="home-video__intro">{content.description}</p>
          </div>

          <button className="home-video__frame" type="button" onClick={() => setIsOpen(true)}>
            <Image
              alt={content.title}
              className="home-video__poster"
              fill
              sizes="(max-width: 768px) 100vw, 76vw"
              src={content.posterUrl}
            />
            <div className="home-video__overlay" />
            <span className="home-video__play">
              <Play size={24} fill="currentColor" />
            </span>
          </button>
        </div>
      </section>

      {isOpen ? (
        <div className="review-modal" role="dialog" aria-modal="true" aria-label={content.title}>
          <button className="review-modal__backdrop" type="button" onClick={() => setIsOpen(false)} />
          <div className="review-modal__content">
            <button className="review-modal__close" type="button" onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
            <div className="review-modal__media">
              <video className="review-modal__video" autoPlay controls playsInline poster={content.posterUrl} src={content.videoUrl} />
            </div>
            <div className="review-modal__copy">
              <h3>{content.title}</h3>
              <p>{content.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
