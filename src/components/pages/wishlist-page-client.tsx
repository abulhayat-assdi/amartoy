"use client";

import Image from "next/image";
import { HeartOff, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";

export function WishlistPageClient() {
  const { wishlistItems, toggleWishlist, addToCart } = useStore();

  if (!wishlistItems.length) {
    return (
      <div className="empty-card">
        <HeartOff size={36} />
        <h2>No products in your wishlist</h2>
        <Button href="/shop/">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="wishlist-table">
      <div className="wishlist-table__head">
        <span>Remove</span>
        <span>Product Image</span>
        <span>Product Name</span>
        <span>Unit Price</span>
        <span>Stock Status</span>
        <span>Add to Cart</span>
      </div>
      {wishlistItems.map((item) => (
        <div className="wishlist-table__row" key={item.id}>
          <button className="remove-btn" type="button" onClick={() => toggleWishlist(item.id)}>
            ×
          </button>
          <div className={`wishlist-table__art ${item.accent}`}>
            <Image alt={item.name} className="wishlist-table__image" height={900} src={item.image} width={900} />
          </div>
          <strong>{item.name}</strong>
          <span>{formatCurrency(item.price)}</span>
          <span className="stock-badge">{item.stock}</span>
          <Button onClick={() => addToCart(item.id)}>
            <ShoppingBag size={16} />
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
}
