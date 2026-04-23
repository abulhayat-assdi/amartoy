"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { useStore } from "@/components/providers/store-provider";

export function CartPageClient() {
  const { cartItems, subtotal, removeFromCart, updateQuantity } = useStore();
  const shipping = subtotal > 0 ? 24 : 0;
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
      setCouponError("");
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
    }
  };

  const updateCart = () => {
    // Since updates are live, perhaps refresh or show message
    alert("Cart updated!");
  };

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
              <div className="cart-table__art">
                <Image alt={item.name} className="cart-table__image" height={900} src={item.image} width={900} />
              </div>
              <div>
                <strong>{item.name}</strong>
                <p>{item.category}</p>
              </div>
            </div>
            <span><CurrencyDisplay amount={item.price} /></span>
            <div className="qty-stepper">
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                −
              </button>
              <input readOnly value={item.quantity} />
              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <span><CurrencyDisplay amount={item.price * item.quantity} /></span>
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
        <Button variant="outline" onClick={updateCart}>Update Cart</Button>
      </div>

      <div className="cart-summary-grid">
        <div className="coupon-box">
          <h3>Coupon Code</h3>
          <div className="coupon-box__row">
            <input
              placeholder="Coupon code"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button onClick={applyCoupon}>Apply Coupon</Button>
          </div>
          {couponError && <p className="error">{couponError}</p>}
          {discount > 0 && <p className="success">Discount applied: <CurrencyDisplay amount={discount} /></p>}
        </div>
        <div className="summary-card">
          <h3>Cart Totals</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong><CurrencyDisplay amount={subtotal} /></strong>
          </div>
          {discount > 0 && (
            <div className="summary-row">
              <span>Discount</span>
              <strong>-<CurrencyDisplay amount={discount} /></strong>
            </div>
          )}
          <div className="summary-row">
            <span>Shipping</span>
            <strong><CurrencyDisplay amount={shipping} /></strong>
          </div>
          <div className="summary-row summary-row--total">
            <span>Total</span>
            <strong><CurrencyDisplay amount={total} /></strong>
          </div>
          <Button className="checkout-btn" href="/checkout/">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
