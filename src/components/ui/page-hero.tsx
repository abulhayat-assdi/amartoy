import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/types/site";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="decor-circle decor-circle--one" />
      <div className="decor-circle decor-circle--two" />
      <div className="container page-hero__inner">
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero__title">{title}</h1>
        {description ? <p className="page-hero__description">{description}</p> : null}
        {breadcrumbs.length ? (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="breadcrumbs__item">
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
                {index < breadcrumbs.length - 1 ? <ChevronRight size={14} /> : null}
              </span>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
