"use client";

import type { CSSProperties } from "react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import clsx from "clsx";
import { categories, formatCurrency, getShowcaseProductsByCategorySlug, products } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import { ProductCard } from "@/components/ui/product-card";

export default function ShopPage() {
  const { cartCount, subtotal } = useStore();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceMax, setPriceMax] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  const deferredSearchQuery = useDeferredValue(searchQuery);

  const itemsPerPage = 12;

  const allPrices = products.map((product) => product.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const rangeProgress = ((priceMax - minPrice) / Math.max(maxPrice - minPrice, 1)) * 100;
  const hasActiveFilters = Boolean(searchQuery || selectedCategory || priceMax < maxPrice);

  const priceRangeStyle = {
    "--shop-range-progress": `${rangeProgress}%`,
  } as CSSProperties;

  useEffect(() => {
    setPriceMax(maxPrice);
  }, [maxPrice]);

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

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (deferredSearchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(deferredSearchQuery.toLowerCase()),
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    filtered = filtered.filter((product) => product.price <= priceMax);
    return filtered;
  }, [deferredSearchQuery, selectedCategory, priceMax]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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

  const startItem = sortedProducts.length ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, sortedProducts.length);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceMax(maxPrice);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);

    if (typeof document !== "undefined") {
      document.getElementById("shop-catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

        <div className="shop-page__layout" id="shop-catalog">
          <main className="shop-page__main">
            <div className="shop-page__catalog-head">
              <div>
                <p className="shop-page__catalog-eyebrow">Latest</p>
                <h2>Latest Products</h2>
              </div>
              <p>By default you will see the latest 12 products here.</p>
            </div>

            <div className="shop-page__toolbar">
              <div className="shop-page__results">
                <span>
                  Showing {startItem}-{endItem} of {sortedProducts.length} results
                </span>
                <p>
                  {selectedCategory ? `${selectedCategory} collection` : "All playful categories"}{" "}
                  with prices up to {formatCurrency(priceMax)}
                </p>
              </div>
              <div className="shop-page__toolbar-controls">
                <button
                  className="shop-page__filter-toggle"
                  type="button"
                  aria-expanded={showFilters}
                  aria-controls="shop-filters"
                  onClick={() => setShowFilters((current) => !current)}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
                <label className="shop-page__sort">
                  <span>Sort by</span>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                  </select>
                </label>
              </div>
            </div>

            {!paginatedProducts.length ? (
              <div className="shop-page__empty">
                <h2>No products match this filter</h2>
                <p>Try another category or expand your price range to bring more toys back.</p>
                <button className="shop-page__clear" type="button" onClick={clearFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="shop-page__grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="shop" />
                ))}
              </div>
            )}

            {totalPages > 1 ? (
              <div className="shop-page__pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    className={clsx("shop-page__page-btn", page === currentPage && "active")}
                    type="button"
                    onClick={() => changePage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="shop-page__page-btn"
                  type="button"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  aria-label="Go to next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : null}

            <div className="shop-page__category-showcases">
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

          <aside className={clsx("shop-page__sidebar", showFilters && "is-open")} id="shop-filters">
            <div className="shop-page__panel">
              <h3>Cart</h3>
              <p>
                {cartCount
                  ? `${cartCount} item${cartCount > 1 ? "s" : ""} ready in your cart.`
                  : "No products in the cart."}
              </p>
              {cartCount ? (
                <strong className="shop-page__panel-price">{formatCurrency(subtotal)}</strong>
              ) : null}
              <Link className="shop-page__cart-link" href="/cart/">
                Open cart
              </Link>
            </div>

            <div className="shop-page__panel">
              <label className="shop-page__search" htmlFor="shop-search">
                <Search size={18} />
                <input
                  id="shop-search"
                  className="shop-search"
                  placeholder="Search for products ..."
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </label>
            </div>

            <div className="shop-page__panel">
              <div className="shop-page__panel-header">
                <h3>Product categories</h3>
                {selectedCategory ? (
                  <button
                    className="shop-page__mini-clear"
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
              <ul className="shop-page__category-list">
                {categoryEntries.map(([category, count]) => (
                  <li key={category}>
                    <button
                      className={clsx(
                        "shop-page__category-button",
                        selectedCategory === category && "active",
                      )}
                      type="button"
                      onClick={() =>
                        setSelectedCategory((current) => (current === category ? null : category))
                      }
                    >
                      <span>{category}</span>
                      <strong>({count})</strong>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="shop-page__panel">
              <div className="shop-page__panel-header">
                <h3>Filter</h3>
                {hasActiveFilters ? (
                  <button className="shop-page__mini-clear" type="button" onClick={clearFilters}>
                    Reset
                  </button>
                ) : null}
              </div>
              <div className="shop-page__range-wrap" style={priceRangeStyle}>
                <input
                  className="shop-page__range"
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceMax}
                  onChange={(event) => setPriceMax(Number(event.target.value))}
                />
              </div>
              <p className="shop-page__range-label">
                Price: {formatCurrency(minPrice)} - {formatCurrency(priceMax)}
              </p>
              <button className="shop-page__apply" type="button" onClick={() => setShowFilters(false)}>
                Apply filters
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
