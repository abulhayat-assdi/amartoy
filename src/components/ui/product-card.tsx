"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import type { Product } from "@/types/site";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore();
  const active = wishlist.includes(product.id);

  return (
    <article className="product-card">
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
        <div className="product-card__actions">
          <Link className="btn btn--primary product-card__button" href={`/product/${product.slug}/`}>
            <ShoppingBag size={16} />
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
