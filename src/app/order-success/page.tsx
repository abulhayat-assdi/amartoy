"use client";

import { useEffect, useState } from "react";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { formatCurrency } from "@/data/site";

interface Order {
  id: string;
  date: string;
  email: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <>
        <PageHero
          eyebrow="Order Received"
          title="Thank you. Your order has been received."
          description="A friendly confirmation screen with order pills and a simple next step back into the catalog."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Order Success" },
          ]}
        />
        <section className="section">
          <div className="container">
            <div className="success-card">
              <p>No order found. Please place an order first.</p>
              <Button href="/shop/">Continue Shopping</Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Order Received"
        title="Thank you. Your order has been received."
        description="A friendly confirmation screen with order pills and a simple next step back into the catalog."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Order Success" },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="success-card">
            <div className="success-check">
              <CheckCheck size={48} />
            </div>
            <h2>Thank you. Your order has been received.</h2>
            <div className="success-pills">
              <div>
                <span>Order Number</span>
                <strong>{order.id}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{order.date}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{order.email}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            </div>
            <div className="detail-card success-table">
              {order.items.map((item) => (
                <div className="summary-row" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <strong>{formatCurrency(item.quantity * item.price)}</strong>
                </div>
              ))}
              <div className="summary-row summary-row--total">
                <span>Grand Total</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
            </div>
            <Button href="/shop/">Continue Shopping</Button>
          </div>
        </div>
      </section>
    </>
  );
}
