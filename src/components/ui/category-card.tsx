import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/site";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link className="category-card" href={category.href}>
      <Image alt={category.name} className="category-card__image" height={1000} src={category.image} width={1600} />
      <div className="category-card__overlay" />
      <div className="category-card__content">
        <p className="category-card__title">{category.name}</p>
        <span className="category-card__link">
          Shop Now
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
