"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import type { Product } from "@/types/site";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const active = wishlist.includes(product.id);

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className={`product-gallery__main ${product.accent}`}>
          <Image alt={product.name} className="product-gallery__image" height={900} src={product.image} width={900} />
        </div>
        <div className="product-gallery__thumbs">
          {[0, 1, 2, 3].map((item) => (
            <div className={`product-gallery__thumb ${product.accent}`} key={item}>
              <Image
                alt={`${product.name} preview ${item + 1}`}
                className="product-gallery__thumb-image"
                height={900}
                src={product.image}
                width={900}
              />
            </div>
          ))}
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
