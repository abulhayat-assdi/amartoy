"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Dummy data for demonstration
const dummyProfile = {
  name: "Demo User",
  email: "demo@amartoy.com",
  mobile: "01700000000",
  childAge: 7,
  offers: ["10% off on next order", "Free shipping for orders above 2000৳"],
  orders: [
    { id: "ORD-001", product: "Building Block Set", status: "Delivered" },
    { id: "ORD-002", product: "Puzzle Set", status: "Processing" },
  ],
  wishlist: [
    { id: 1, name: "Toy Car" },
    { id: 2, name: "Doll House" },
  ],
  cart: [
    { id: 3, name: "Action Figure" },
  ],
};

export function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // TODO: Replace with real user fetch/auth
    setProfile(dummyProfile);
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <h2>My Profile</h2>
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <div><b>Name:</b> {profile.name}</div>
          <div><b>Email:</b> {profile.email}</div>
          <div><b>Mobile:</b> {profile.mobile}</div>
          <div><b>Child's Age:</b> {profile.childAge}</div>
        </div>
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <h3>Offers for you</h3>
          <ul>
            {profile.offers.map((offer: string, i: number) => (
              <li key={i}>{offer}</li>
            ))}
          </ul>
        </div>
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <h3>Orders</h3>
          <ul>
            {profile.orders.map((order: any) => (
              <li key={order.id}>{order.product} - <b>{order.status}</b></li>
            ))}
          </ul>
        </div>
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <h3>Wishlist</h3>
          <ul>
            {profile.wishlist.map((item: any) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <h3>Cart</h3>
          <ul>
            {profile.cart.map((item: any) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <Button onClick={() => router.push("/login/")}>Logout</Button>
      </div>
    </section>
  );
}
