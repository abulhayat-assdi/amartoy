"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import type { Product } from "@/types/site";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "shop" | "recommendation";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(product.id);
  const isShopVariant = variant === "shop";
  const isRecommendationVariant = variant === "recommendation";

  if (isShopVariant) {
    return (
      <article className="product-card product-card--shop">
        <Link
          aria-label={`View details for ${product.name}`}
          className="product-card__shop-link"
          href={`/product/${product.slug}/`}
        />
        <div className={clsx("product-card__visual", product.accent)}>
          {product.saleLabel ? (
            <span className="product-card__sale-badge">{product.saleLabel}</span>
          ) : null}
          <Image
            alt={product.name}
            className="product-card__image"
            height={900}
            src={product.image}
            width={900}
          />
          <div className="product-card__floating-actions">
            <button
              className={clsx("product-card__action-bubble", active && "active")}
              type="button"
              aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={active}
              onClick={(event) => {
                event.preventDefault();
                toggleWishlist(product.id);
              }}
            >
              <Heart size={16} />
            </button>
            <button
              className="product-card__action-bubble"
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={(event) => {
                event.preventDefault();
                addToCart(product.id);
              }}
            >
              <ShoppingBag size={16} />
            </button>
            <span className="product-card__action-bubble product-card__action-bubble--link">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <span className="product-card__name">{product.name}</span>
          <div className="product-card__price-row">
            {product.originalPrice ? (
              <span className="product-card__price product-card__price--original">
                {formatCurrency(product.originalPrice)}
              </span>
              ) : null}
              <span className="product-card__price">{formatCurrency(product.price)}</span>
            </div>
            <span className="product-card__shop-cta">
              <ShoppingBag size={15} />
              View Product
            </span>
          </div>
        </article>
      );
    }

  return (
    <article
      className={clsx(
        "product-card",
        isRecommendationVariant && "product-card--recommendation",
      )}
    >
      <div className={clsx("product-card__visual", product.accent)}>
        <Link
          aria-label={`View details for ${product.name}`}
          className="product-card__visual-link"
          href={`/product/${product.slug}/`}
        >
          {product.saleLabel ? (
            <span className="product-card__sale-badge">{product.saleLabel}</span>
          ) : null}
          <Image
            alt={product.name}
            className="product-card__image"
            height={900}
            src={product.image}
            width={900}
          />
        </Link>
        {isRecommendationVariant ? null : (
          <button
            className={clsx("product-card__wishlist", active && "active")}
            type="button"
            aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={active}
            onClick={(event) => {
              event.preventDefault();
              toggleWishlist(product.id);
            }}
          >
            <Heart size={16} />
          </button>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <Link className="product-card__name" href={`/product/${product.slug}/`}>
          {product.name}
        </Link>
        <div className="product-card__price-row">
          {product.originalPrice ? (
            <span className="product-card__price product-card__price--original">
              {formatCurrency(product.originalPrice)}
            </span>
          ) : null}
          <span className="product-card__price">{formatCurrency(product.price)}</span>
        </div>
        {isShopVariant ? null : (
          <div className="product-card__actions">
            <Link className="btn btn--primary product-card__button" href={`/product/${product.slug}/`}>
              <ShoppingBag size={16} />
              View Product
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
