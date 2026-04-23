"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { useStore } from "@/components/providers/store-provider";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import type { Product } from "@/types/site";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "shop" | "recommendation";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const router = useRouter();
  const { addToCart, cart, wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(product.id);
  const isAlreadyInCart = cart.some((item) => item.id === product.id);
  const isShopVariant = variant === "shop";
  const isRecommendationVariant = variant === "recommendation";

  const handleAddToCart = (event?: MouseEvent) => {
    event?.preventDefault();

    if (isAlreadyInCart) {
      router.push("/checkout/");
      return;
    }

    addToCart(product.id);
  };

  if (isShopVariant) {
    return (
      <article className="product-card product-card--shop">
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
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
            </button>
            <Link
              className="product-card__action-bubble product-card__action-bubble--link"
              href={`/product/${product.slug}/`}
              aria-label={`Go to ${product.name} details`}
            >
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="product-card__body">
          <p className="product-card__category">{product.category}</p>
          <Link className="product-card__name" href={`/product/${product.slug}/`}>
            {product.name}
          </Link>
          <div className="product-card__price-row">
            {product.originalPrice ? (
              <CurrencyDisplay amount={product.originalPrice} className="product-card__price product-card__price--original" />
              ) : null}
              <CurrencyDisplay amount={product.price} className="product-card__price" />
            </div>
            <Link className="product-card__shop-cta" href={`/product/${product.slug}/`}>
              <ShoppingBag size={15} />
              View Product
            </Link>
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
            <CurrencyDisplay amount={product.originalPrice} className="product-card__price product-card__price--original" />
          ) : null}
          <CurrencyDisplay amount={product.price} className="product-card__price" />
        </div>
        {isShopVariant ? null : (
          <div className="product-card__actions">
            <button className="btn btn--primary product-card__button" type="button" onClick={handleAddToCart}>
              <ShoppingBag size={16} />
              {isAlreadyInCart ? "Go to Checkout" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
