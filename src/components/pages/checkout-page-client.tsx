"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";

export function CheckoutPageClient() {
  const { cartItems, subtotal } = useStore();
  const shipping = subtotal ? 24 : 0;
  const total = subtotal + shipping;

  return (
    <div className="checkout-layout">
      <form className="detail-card checkout-form">
        <h2>Billing Details</h2>
        <div className="form-grid">
          {[
            "First Name",
            "Last Name",
            "Country",
            "Address",
            "City",
            "State",
            "ZIP",
            "Phone",
            "Email",
          ].map((label) => (
            <label className="form-group" key={label}>
              <span className="form-label">{label}</span>
              <input className="form-input" placeholder={label} type="text" />
            </label>
          ))}
        </div>
      </form>

      <aside className="summary-card checkout-summary">
        <h3>Your Order</h3>
        <div className="checkout-summary__items">
          {cartItems.map((item) => (
            <div className="checkout-summary__item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.quantity} × {formatCurrency(item.price)}
                </span>
              </div>
              <strong>{formatCurrency(item.quantity * item.price)}</strong>
            </div>
          ))}
        </div>
        <div className="summary-row">
          <span>Cart Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <strong>{formatCurrency(shipping)}</strong>
        </div>
        <div className="summary-row summary-row--total">
          <span>Grand Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <Button href="/order-success/">Place Order</Button>
      </aside>
    </div>
  );
}
