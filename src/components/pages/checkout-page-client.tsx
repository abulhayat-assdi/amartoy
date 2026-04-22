"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";

interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}

interface Errors {
  [key: string]: string;
}

export function CheckoutPageClient() {
  const { cartItems, subtotal, clearCart } = useStore();
  const router = useRouter();
  const shipping = subtotal ? 24 : 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save order to localStorage
      const order = {
        id: `AT-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        email: formData.email,
        total,
        items: cartItems,
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      clearCart();
      router.push("/order-success/");
    }
  };

  return (
    <div className="checkout-layout">
      <form className="detail-card checkout-form" onSubmit={handleSubmit}>
        <h2>Billing Details</h2>
        <div className="form-grid">
          {[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "country", label: "Country" },
            { key: "address", label: "Address" },
            { key: "city", label: "City" },
            { key: "state", label: "State" },
            { key: "zip", label: "ZIP" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
          ].map(({ key, label }) => (
            <label className="form-group" key={key}>
              <span className="form-label">{label}</span>
              <input
                className={`form-input ${errors[key] ? "error" : ""}`}
                name={key}
                placeholder={label}
                type={key === "email" ? "email" : "text"}
                value={formData[key as keyof FormData]}
                onChange={handleChange}
              />
              {errors[key] && <span className="error-message">{errors[key]}</span>}
            </label>
          ))}
        </div>
        <Button type="submit">Place Order</Button>
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
      </aside>
    </div>
  );
}
