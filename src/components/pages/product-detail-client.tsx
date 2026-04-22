"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import type { Product } from "@/types/site";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const active = wishlist.includes(product.id);
  const mediaItems =
    product.media && product.media.length
      ? product.media.slice(0, 4)
      : Array.from({ length: 4 }, (_, index) => ({
          type: "image" as const,
          src: product.image,
          alt: `${product.name} view ${index + 1}`,
        }));
  const activeMedia = mediaItems[activeMediaIndex] ?? mediaItems[0];

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [product.id]);

  useEffect(() => {
    if (mediaItems.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveMediaIndex((currentIndex) => (currentIndex + 1) % mediaItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [mediaItems.length]);

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery__stage">
          <div className="product-gallery__thumbs">
            {mediaItems.map((item, index) => (
              <button
                className={clsx(
                  "product-gallery__thumb",
                  product.accent,
                  index === activeMediaIndex && "is-active",
                )}
                key={`${item.src}-${index}`}
                type="button"
                aria-label={`Show ${product.name} image ${index + 1}`}
                onClick={() => setActiveMediaIndex(index)}
              >
                {item.type === "video" ? (
                  <div className="product-gallery__thumb-video">
                    <video className="product-gallery__thumb-media" muted playsInline preload="metadata">
                      <source src={item.src} />
                    </video>
                    <span>Video</span>
                  </div>
                ) : (
                  <img
                    alt={item.alt || `${product.name} preview ${index + 1}`}
                    className="product-gallery__thumb-media"
                    loading="lazy"
                    src={item.src}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="product-gallery__main">
            <button className="product-gallery__zoom" type="button" aria-label="Preview current image">
              <Search size={18} />
            </button>
            {activeMedia.type === "video" ? (
              <video
                className="product-gallery__media"
                controls
                poster={activeMedia.poster}
                preload="metadata"
              >
                <source src={activeMedia.src} />
              </video>
            ) : (
              <img
                alt={activeMedia.alt || product.name}
                className="product-gallery__media"
                loading="eager"
                src={activeMedia.src}
              />
            )}
          </div>
        </div>
      </div>

      <div className="detail-card product-detail__info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="product-card__price-row">
          {product.originalPrice ? (
            <span className="product-card__price product-card__price--original">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
          <span className="product-card__price">{formatCurrency(product.price)}</span>
        </div>
        <p>{product.description}</p>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            -
          </button>
          <input readOnly value={quantity} />
          <button type="button" onClick={() => setQuantity((value) => value + 1)}>
            +
          </button>
        </div>
        <Button onClick={() => addToCart(product.id, quantity)}>
          <ShoppingBag size={16} />
          Buy Now
        </Button>
        <button className="wishlist-link" type="button" onClick={() => toggleWishlist(product.id)}>
          <Heart size={18} fill={active ? "currentColor" : "none"} />
          {active ? "Added to Wishlist" : "Add to Wishlist"}
        </button>
        <div className="product-meta">
          <span>Category: {product.category}</span>
          <span>Tags: {product.tags.join(", ")}</span>
          <span>Product ID: {product.sku}</span>
        </div>

        <div className="product-tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
        <div className="product-tabs__panel">
          {activeTab === "description" ? (
            <p>
              {product.description} Designed using the AmarToy design system with rounded
              edges, premium spacing, and a product detail layout built for conversion.
            </p>
          ) : (
            <p>
              "My child loved it immediately." "Premium look, quick checkout, and lovely
              packaging." "The page feels clean and easy to trust."
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
