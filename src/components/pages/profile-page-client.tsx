"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PackageOpen, ShoppingBag, Heart, User, MapPin, Edit3 } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/providers/store-provider";
import { createClient } from "@/utils/supabase/client";
import type { ProfilePageContent } from "@/types/profilepage";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface ProfilePageProps {
  content: ProfilePageContent;
}

export function ProfilePage({ content }: ProfilePageProps) {
  const router = useRouter();
  const { wishlistItems, cartItems } = useStore();
  const [profile, setProfile] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "orders" | "wishlist" | "cart">("info");
  
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace("/login/?redirect=/profile/");
        return;
      }
      setProfile(data.user);
      setLoading(false);
    };

    fetchUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login/");
  };

  if (loading) {
    return (
      <div className="container section" style={{ minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "var(--color-primary)", fontWeight: 600 }}>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <section className="section profile-dashboard" style={{ background: "var(--color-surface)", minHeight: "80vh" }}>
      <div className="container">
        
        <div className="profile-dashboard__header" style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "2rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>{content.pageTitle}</h1>
          <p style={{ color: "var(--color-text-muted)" }}>Welcome back, {profile?.email}</p>
        </div>

        <div className="profile-dashboard__layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
          
          <div className="profile-dashboard__nav" style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <button 
              className={clsx("admin-nav__link", activeTab === "info" && "admin-nav__link--active")}
              onClick={() => setActiveTab("info")}
              style={{ background: activeTab === "info" ? "white" : "transparent", padding: "0.75rem 1.25rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: activeTab === "info" ? "var(--color-primary)" : "var(--color-text-muted)", boxShadow: activeTab === "info" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}
            >
              <User size={18} /> {content.personalInfoTabLabel}
            </button>
            <button 
              className={clsx("admin-nav__link", activeTab === "orders" && "admin-nav__link--active")}
              onClick={() => setActiveTab("orders")}
              style={{ background: activeTab === "orders" ? "white" : "transparent", padding: "0.75rem 1.25rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: activeTab === "orders" ? "var(--color-primary)" : "var(--color-text-muted)", boxShadow: activeTab === "orders" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}
            >
              <PackageOpen size={18} /> {content.ordersTabLabel}
            </button>
            <button 
              className={clsx("admin-nav__link", activeTab === "wishlist" && "admin-nav__link--active")}
              onClick={() => setActiveTab("wishlist")}
              style={{ background: activeTab === "wishlist" ? "white" : "transparent", padding: "0.75rem 1.25rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: activeTab === "wishlist" ? "var(--color-primary)" : "var(--color-text-muted)", boxShadow: activeTab === "wishlist" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}
            >
              <Heart size={18} /> {content.wishlistTabLabel}
            </button>
            <button 
              className={clsx("admin-nav__link", activeTab === "cart" && "admin-nav__link--active")}
              onClick={() => setActiveTab("cart")}
              style={{ background: activeTab === "cart" ? "white" : "transparent", padding: "0.75rem 1.25rem", borderRadius: "8px", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", color: activeTab === "cart" ? "var(--color-primary)" : "var(--color-text-muted)", boxShadow: activeTab === "cart" ? "0 2px 8px rgba(0,0,0,0.05)" : "none" }}
            >
              <ShoppingBag size={18} /> {content.cartTabLabel}
            </button>
          </div>

          <div className="profile-dashboard__content" style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 4px 24px rgba(31, 45, 116, 0.04)" }}>
            
            {activeTab === "info" && (
              <div className="profile-dashboard__pane fade-in">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)" }}>{content.personalInfoTabLabel}</h3>
                  <button className="icon-btn icon-btn--soft"><Edit3 size={16} /></button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>Account ID</label>
                    <p style={{ marginTop: "0.25rem", fontWeight: 500, fontFamily: "monospace", fontSize: "0.85rem" }}>{profile?.id}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>Email Address</label>
                    <p style={{ marginTop: "0.25rem", fontWeight: 500 }}>{profile?.email}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>Last Sign In</label>
                    <p style={{ marginTop: "0.25rem", fontWeight: 500 }}>{profile?.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleDateString() : "Unknown"}</p>
                  </div>
                </div>

                <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleLogout} variant="secondary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <LogOut size={16} /> {content.logoutButtonText}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="profile-dashboard__pane fade-in">
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "1.5rem" }}>{content.ordersTabLabel}</h3>
                <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-muted)" }}>
                  <PackageOpen size={48} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
                  <p>{content.emptyOrdersMessage}</p>
                  <Button variant="primary" style={{ marginTop: "1rem" }} onClick={() => router.push("/shop/")}>Start Shopping</Button>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="profile-dashboard__pane fade-in">
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "1.5rem" }}>{content.wishlistTabLabel}</h3>
                {wishlistItems.length ? (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
                    {wishlistItems.map((item) => (
                      <li key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{ width: 48, height: 48, background: "var(--color-surface)", borderRadius: "6px" }} />
                          <span style={{ fontWeight: 600 }}>{item.name}</span>
                        </div>
                        <Button variant="secondary">Move to Cart</Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-muted)" }}>
                    <Heart size={48} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
                    <p>{content.emptyWishlistMessage}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "cart" && (
              <div className="profile-dashboard__pane fade-in">
                <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: "1.5rem" }}>{content.cartTabLabel}</h3>
                {cartItems.length ? (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
                    {cartItems.map((item) => (
                      <li key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", border: "1px solid rgba(0,0,0,0.05)", borderRadius: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{ width: 48, height: 48, background: "var(--color-surface)", borderRadius: "6px" }} />
                          <div>
                            <span style={{ fontWeight: 600, display: "block" }}>{item.name}</span>
                            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700 }}>৳{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--color-text-muted)" }}>
                    <ShoppingBag size={48} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
                    <p>{content.emptyCartMessage}</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
