"use client";

import clsx from "clsx";
import { MessageCircleHeart, Newspaper, Sparkles, Users } from "lucide-react";
import { ToyArtwork } from "@/components/ui/toy-artwork";

type IllustrationVariant = "toy" | "story" | "person";

interface IllustrationPanelProps {
  variant?: IllustrationVariant;
  artwork?: string;
  accent?: string;
  title?: string;
  label?: string;
  className?: string;
}

export function IllustrationPanel({
  variant = "toy",
  artwork = "blocks",
  accent = "accent-peach",
  title,
  label,
  className,
}: IllustrationPanelProps) {
  const Icon = variant === "story" ? Newspaper : variant === "person" ? Users : Sparkles;

  return (
    <div className={clsx("illustration-panel", accent, `illustration-panel--${variant}`, className)}>
      <div className="illustration-panel__orb illustration-panel__orb--one" />
      <div className="illustration-panel__orb illustration-panel__orb--two" />

      <div className="illustration-panel__badge">
        <Icon size={16} />
        <span>{label || title || "AmarToy"}</span>
      </div>

      {variant === "person" ? (
        <div className="illustration-person">
          <div className="illustration-person__halo" />
          <div className="illustration-person__head" />
          <div className="illustration-person__body" />
          <div className="illustration-person__arm illustration-person__arm--left" />
          <div className="illustration-person__arm illustration-person__arm--right" />
          <div className="illustration-person__bubble">
            <MessageCircleHeart size={16} />
            <span>{title || "Friendly support"}</span>
          </div>
        </div>
      ) : (
        <div className="illustration-panel__art">
          <ToyArtwork className="illustration-panel__toy" type={artwork} />
        </div>
      )}

      {title ? <p className="illustration-panel__title">{title}</p> : null}
    </div>
  );
}
