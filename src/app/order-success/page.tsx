"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, CheckCheck, Clock3, Hash, Truck, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { formatCurrency } from "@/data/site";

interface Order {
  id: string;
  date: string;
  orderedAt?: string;
  email: string;
  phone?: string;
  customerName?: string;
  paymentMethod?: string;
  division?: string;
  district?: string;
  address?: string;
  subtotal?: number;
  shipping?: number;
  discount?: number;
  note?: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const parseOrderDate = (order: Order) => {
  if (order.orderedAt) {
    const parsed = new Date(order.orderedAt);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  const [day, month, year] = order.date.split("/");
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const formatRangeDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  const estimatedDelivery = useMemo(() => {
    if (!order) {
      return "";
    }

    const orderDate = parseOrderDate(order);
    const isDhakaCity =
      order.division === "Dhaka" && order.district === "Dhaka"
        ? true
        : Boolean(order.address?.includes("Dhaka, Dhaka"));

    const minDays = isDhakaCity ? 2 : 4;
    const maxDays = isDhakaCity ? 3 : 5;
    const minDate = new Date(orderDate);
    const maxDate = new Date(orderDate);

    minDate.setDate(orderDate.getDate() + minDays);
    maxDate.setDate(orderDate.getDate() + maxDays);

    return `${formatRangeDate(minDate)} - ${formatRangeDate(maxDate)}`;
  }, [order]);

  if (!order) {
    return (
      <>
        <PageHero
          eyebrow="Order Received"
          title="Thank you. Your order has been received."
          description="A friendly confirmation screen with order details and a simple next step back into the catalog."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Order Success" },
          ]}
        />
        <section className="section">
          <div className="container">
            <div className="success-card success-card--premium">
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
        description="A polished confirmation screen with delivery details, payment summary, and the next expected timeline."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Order Success" },
        ]}
      />
      <section className="section">
        <div className="container">
          <div className="success-card success-card--premium">
            <div className="success-check">
              <CheckCheck size={48} />
            </div>

            <div className="success-card__hero">
              <p className="checkout-kicker">Order Confirmed</p>
              <h2>Thank you. Your order has been received.</h2>
              <p>
                We have recorded your order successfully. Our team will confirm, pack, and dispatch it shortly.
              </p>
            </div>

            <div className="success-pills success-pills--premium">
              <div className="success-pill">
                <span><Hash size={16} /> Order Number</span>
                <strong>{order.id}</strong>
              </div>
              <div className="success-pill">
                <span><CalendarDays size={16} /> Date</span>
                <strong>{order.date}</strong>
              </div>
              <div className="success-pill">
                <span><WalletCards size={16} /> Total Taka</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
              <div className="success-pill">
                <span><Clock3 size={16} /> Estimate Delivery Date</span>
                <strong>{estimatedDelivery}</strong>
              </div>
            </div>

            <div className="success-panels">
              <div className="detail-card success-panel">
                <div className="success-panel__head">
                  <Truck size={18} />
                  <strong>Customer & Delivery Details</strong>
                </div>
                {order.customerName ? (
                  <div className="summary-row">
                    <span>Customer</span>
                    <strong>{order.customerName}</strong>
                  </div>
                ) : null}
                {order.phone ? (
                  <div className="summary-row">
                    <span>Mobile Number</span>
                    <strong>{order.phone}</strong>
                  </div>
                ) : null}
                {order.email ? (
                  <div className="summary-row">
                    <span>Email</span>
                    <strong>{order.email}</strong>
                  </div>
                ) : null}
                {order.paymentMethod ? (
                  <div className="summary-row">
                    <span>Payment Method</span>
                    <strong>{order.paymentMethod}</strong>
                  </div>
                ) : null}
                {order.address ? (
                  <div className="summary-row">
                    <span>Delivery Address</span>
                    <strong>{order.address}</strong>
                  </div>
                ) : null}
                {order.note ? (
                  <div className="summary-row">
                    <span>Order Note</span>
                    <strong>{order.note}</strong>
                  </div>
                ) : null}
              </div>

              <div className="detail-card success-panel">
                <div className="success-panel__head">
                  <WalletCards size={18} />
                  <strong>Order Summary</strong>
                </div>
                {order.items.map((item) => (
                  <div className="summary-row" key={item.id}>
                    <span>{item.name} x {item.quantity}</span>
                    <strong>{formatCurrency(item.quantity * item.price)}</strong>
                  </div>
                ))}
                {typeof order.subtotal === "number" ? (
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(order.subtotal)}</strong>
                  </div>
                ) : null}
                {typeof order.shipping === "number" ? (
                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>{formatCurrency(order.shipping)}</strong>
                  </div>
                ) : null}
                {typeof order.discount === "number" && order.discount > 0 ? (
                  <div className="summary-row">
                    <span>Discount</span>
                    <strong>-{formatCurrency(order.discount)}</strong>
                  </div>
                ) : null}
                <div className="summary-row summary-row--total">
                  <span>Grand Total</span>
                  <strong>{formatCurrency(order.total)}</strong>
                </div>
              </div>
            </div>

            <Button href="/shop/">Continue Shopping</Button>
          </div>
        </div>
      </section>
    </>
  );
}
