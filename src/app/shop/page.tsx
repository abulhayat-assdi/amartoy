"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { getShowcaseProductsByCategorySlug, products } from "@/data/site";
import { ProductCard } from "@/components/ui/product-card";

export default function ShopPage() {
  const searchParams = useSearchParams();

  const latestProducts = useMemo(() => {
    return [...products].sort((a, b) => b.id - a.id).slice(0, 4);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categoryEntries = useMemo(
    () => Object.entries(categoryCounts).sort(([left], [right]) => left.localeCompare(right)),
    [categoryCounts],
  );

  const categoryShowcases = useMemo(
    () =>
      categoryEntries.map(([category, count]) => {
        const matchingProduct = products.find((product) => product.category === category);
        const categorySlug = matchingProduct?.categorySlug ?? category.toLowerCase().replace(/\s+/g, "-");

        return {
          category,
          categorySlug,
          count,
          products: getShowcaseProductsByCategorySlug(categorySlug, 4),
        };
      }),
    [categoryEntries],
  );

  useEffect(() => {
    const sectionSlug = searchParams.get("section");

    if (!sectionSlug || typeof document === "undefined") {
      return;
    }

    const scrollTarget = () => {
      document.getElementById(`category-${sectionSlug}`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    scrollTarget();

    const timer = window.setTimeout(scrollTarget, 250);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  return (
    <section className="shop-page">
      <div className="container">
        <header className="shop-page__hero">
          <p className="shop-page__eyebrow">Premium toys curated for joyful everyday play</p>
          <h1>Shop</h1>
          <a className="shop-page__jump" href="#shop-catalog" aria-label="Jump to product catalog">
            <ChevronDown size={22} />
          </a>
        </header>

        <div id="shop-catalog" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <main className="shop-page__main" style={{ minWidth: 0 }}>
            <div className="shop-page__category-showcases" style={{ marginTop: 0 }}>
              <section className="shop-page__category-section">
                <div className="shop-page__category-section-head">
                  <div>
                    <p className="shop-page__catalog-eyebrow">Latest</p>
                    <h3>Latest Products</h3>
                  </div>
                  <Link
                    className="shop-page__see-more"
                    href="/shop/latest/"
                  >
                    See More Products
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="shop-page__grid shop-page__grid--showcase">
                  {latestProducts.map((product) => (
                    <ProductCard key={`latest-${product.id}`} product={product} variant="shop" />
                  ))}
                </div>
              </section>

              {categoryShowcases.map((showcase) => (
                <section
                  className="shop-page__category-section"
                  id={`category-${showcase.categorySlug}`}
                  key={showcase.category}
                >
                  <div className="shop-page__category-section-head">
                    <div>
                      <p className="shop-page__catalog-eyebrow">{showcase.category}</p>
                      <h3>{showcase.category}</h3>
                    </div>
                    <Link
                      className="shop-page__see-more"
                      href={`/shop/${showcase.categorySlug}/`}
                    >
                      See More Products
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="shop-page__grid shop-page__grid--showcase">
                    {showcase.products.map((product) => (
                      <ProductCard key={`${showcase.category}-${product.id}`} product={product} variant="shop" />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
