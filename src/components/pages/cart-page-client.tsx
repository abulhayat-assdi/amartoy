"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";

export function CartPageClient() {
  const { cartItems, subtotal, removeFromCart, updateQuantity } = useStore();
  const shipping = subtotal > 0 ? 24 : 0;
  const total = subtotal + shipping;

  return (
    <div className="cart-layout">
      <div className="cart-table">
        <div className="cart-table__head">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
          <span>Remove</span>
        </div>
        {cartItems.map((item) => (
          <div className="cart-table__row" key={item.id}>
            <div className="cart-table__product">
              <div className={`cart-table__art ${item.accent}`}>
                <Image alt={item.name} className="cart-table__image" height={900} src={item.image} width={900} />
              </div>
              <div>
                <strong>{item.name}</strong>
                <p>{item.category}</p>
              </div>
            </div>
            <span>{formatCurrency(item.price)}</span>
            <div className="qty-stepper">
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                −
              </button>
              <input readOnly value={item.quantity} />
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <span>{formatCurrency(item.price * item.quantity)}</span>
            <button className="remove-btn" type="button" onClick={() => removeFromCart(item.id)}>
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {!cartItems.length ? <p className="empty-state">Your cart is currently empty.</p> : null}
      </div>

      <div className="cart-actions">
        <Button href="/shop/" variant="outline">
          Continue Shopping
        </Button>
        <Button variant="outline">Update Cart</Button>
      </div>

      <div className="cart-summary-grid">
        <div className="coupon-box">
          <h3>Coupon Code</h3>
          <div className="coupon-box__row">
            <input placeholder="Coupon code" type="text" />
            <Button>Apply Coupon</Button>
          </div>
        </div>
        <div className="summary-card">
          <h3>Cart Totals</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{formatCurrency(shipping)}</strong>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <Button className="checkout-btn" href="/checkout/">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
