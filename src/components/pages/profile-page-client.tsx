"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/providers/store-provider";
import {
  getCurrentStoredUser,
  getStoredOrdersForCurrentUser,
  logoutStoredUser,
  type StoredOrder,
  type StoredUser,
} from "@/lib/auth";

export function ProfilePage() {
  const router = useRouter();
  const { wishlistItems, cartItems } = useStore();
  const [profile, setProfile] = useState<StoredUser | null>(null);
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    const currentUser = getCurrentStoredUser();

    if (!currentUser) {
      router.replace("/login/?redirect=/profile/");
      return;
    }

    setProfile(currentUser);
    setOrders(getStoredOrdersForCurrentUser());
  }, [router]);

  if (!profile) {
    return <div className="container section">Loading...</div>;
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <h2>My Profile</h2>

        <div className="detail-card" style={{ marginBottom: 24, padding: 24 }}>
          <div><b>Name:</b> {profile.name}</div>
          <div><b>Email:</b> {profile.email || "Not provided"}</div>
          <div><b>Mobile:</b> {profile.mobile}</div>
          <div><b>Date of Birth:</b> {profile.dateOfBirth || "Not provided"}</div>
          <div><b>Gender:</b> {profile.gender || "Not provided"}</div>
        </div>

        <div className="detail-card" style={{ marginBottom: 24, padding: 24 }}>
          <h3>My Orders</h3>
          {orders.length ? (
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              {orders.map((order) => (
                <li key={order.id} style={{ marginBottom: 12 }}>
                  <div><b>{order.id}</b> - {order.date}</div>
                  <div>{order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}</div>
                  <div><b>Total:</b> ৳{order.total}</div>
                  <div><b>Status:</b> Order placed</div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: 12 }}>You have not placed any orders yet.</p>
          )}
        </div>

        <div className="detail-card" style={{ marginBottom: 24, padding: 24 }}>
          <h3>Wishlist</h3>
          {wishlistItems.length ? (
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              {wishlistItems.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: 12 }}>Your wishlist is empty.</p>
          )}
        </div>

        <div className="detail-card" style={{ marginBottom: 24, padding: 24 }}>
          <h3>Cart</h3>
          {cartItems.length ? (
            <ul style={{ margin: "12px 0 0", paddingLeft: 20 }}>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ marginTop: 12 }}>Your cart is empty.</p>
          )}
        </div>

        <Button
          onClick={() => {
            logoutStoredUser();
            router.push("/login/");
          }}
        >
          Logout
        </Button>
      </div>
    </section>
  );
}
