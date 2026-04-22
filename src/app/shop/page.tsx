"use client";

import { useState, useMemo, useEffect } from "react";
import { pageBanners, products, tags } from "@/data/site";
import { PageHero } from "@/components/ui/page-hero";
import { ProductCard } from "@/components/ui/product-card";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceMax, setPriceMax] = useState(100);

  const itemsPerPage = 12;

  const allPrices = products.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  useEffect(() => {
    setPriceMax(maxPrice);
  }, [maxPrice]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (selectedTags.length) {
      filtered = filtered.filter(p => selectedTags.some(tag => p.tags.includes(tag)));
    }
    filtered = filtered.filter(p => p.price <= priceMax);
    return filtered;
  }, [searchQuery, selectedCategory, selectedTags, priceMax]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    // latest as is
    return sorted;
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, sortBy]);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, sortedProducts.length);

  return (
    <>
      <PageHero
        {...pageBanners.shop}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <section className="section">
        <div className="container shop-layout">
          <aside className="shop-sidebar">
            <div className="sidebar-widget">
              <h3>Cart</h3>
              <p>No products in the cart.</p>
            </div>
            <div className="sidebar-widget">
              <h3>Search for products</h3>
              <input
                className="shop-search"
                placeholder="Search products ..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sidebar-widget">
              <h3>Product categories</h3>
              <ul className="sidebar-list">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <li
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={selectedCategory === cat ? "active" : ""}
                  >
                    {cat} ({count})
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-widget">
              <h3>Price range</h3>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
              />
              <span>Up to ${priceMax}</span>
            </div>
            <div className="sidebar-widget">
              <h3>Tags</h3>
              <div className="tag-cloud">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }}
                    className={selectedTags.includes(tag) ? "active" : ""}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="shop-toolbar">
              <span>Showing {startItem}-{endItem} of {sortedProducts.length} products</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="latest">Sort by latest</option>
                <option value="popular">Sort by popularity</option>
                <option value="price-low">Price: low to high</option>
              </select>
            </div>
            <div className="grid-3 product-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <span
                    key={page}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
