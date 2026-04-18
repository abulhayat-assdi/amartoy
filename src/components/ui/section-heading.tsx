import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx("section-heading", `section-heading--${align}`, className)}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading__title">{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  );
}
