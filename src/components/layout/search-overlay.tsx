"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost, Product } from "@/types/site";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  posts: BlogPost[];
}

export function SearchOverlay({ open, onClose, products, posts }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    const matchedProducts = products
      .filter((product) => product.name.toLowerCase().includes(value))
      .slice(0, 4)
      .map((product) => ({
        label: product.name,
        href: `/product/${product.slug}/`,
        type: "Product" as const,
      }));

    const matchedPosts = posts
      .filter((post) => post.title.toLowerCase().includes(value))
      .slice(0, 3)
      .map((post) => ({
        label: post.title,
        href: "/blog/",
        type: "Article" as const,
      }));

    return [...matchedProducts, ...matchedPosts];
  }, [posts, products, query]);

  return (
    <div className={`search-overlay ${open ? "search-overlay--open" : ""}`}>
      <button className="search-overlay__backdrop" type="button" onClick={onClose} aria-label="Close search" />
      <div className="search-overlay__panel">
        <button className="search-overlay__close" type="button" onClick={onClose} aria-label="Close search">
          <X size={26} />
        </button>
        <div className="search-overlay__box">
          <div className="search-overlay__field">
            <Search size={28} />
            <input
              autoFocus={open}
              className="search-overlay__input"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type words and hit enter"
              value={query}
            />
          </div>
          {query ? (
            <div className="search-overlay__results">
              {results.length ? (
                results.map((result) => (
                  <Link key={`${result.type}-${result.label}`} href={result.href} onClick={onClose}>
                    <span>{result.label}</span>
                    <em>{result.type}</em>
                  </Link>
                ))
              ) : (
                <p className="search-overlay__empty">No matching products or articles found.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
