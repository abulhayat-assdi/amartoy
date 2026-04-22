import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { ProductCard } from "@/components/ui/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Product } from "@/types/site";

interface ProductsShowcaseProps {
  eyebrow: string;
  title: string;
  products: Product[];
  background?: string;
  className?: string;
  showLink?: boolean;
  cardVariant?: "default" | "shop" | "recommendation";
}

export function ProductsShowcase({
  eyebrow,
  title,
  products,
  background = "section",
  className,
  showLink = true,
  cardVariant = "default",
}: ProductsShowcaseProps) {
  return (
    <section className={clsx(background, className)}>
      <div className="container">
        <SectionHeading align="center" eyebrow={eyebrow} title={title} />
        <div className="grid-4 product-grid">
          {products.map((product, index) => (
            <Reveal delay={index * 0.08} key={product.id}>
              <ProductCard product={product} variant={cardVariant} />
            </Reveal>
          ))}
        </div>
        {showLink ? (
          <div className="section-link-row">
            <Link className="section-link" href="/shop/">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
