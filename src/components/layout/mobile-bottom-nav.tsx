"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingBag, Phone, User } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useStore();
  
  // Dummy auth state matching header
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(typeof window !== "undefined" && window.localStorage.getItem("amartoy-demo-user") === "1");
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop/", icon: Store },
    { label: "Cart", href: "/cart/", icon: ShoppingBag, badge: cartCount },
    { label: "Contact", href: "/contact/", icon: Phone },
    { 
      label: isLoggedIn ? "Profile" : "Log in", 
      href: isLoggedIn ? "/profile/" : "/login/", 
      icon: User,
      isProfile: isLoggedIn
    },
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={clsx("mobile-bottom-nav__item", isActive && "active")}
          >
            <div className="mobile-bottom-nav__icon-wrapper">
              {item.isProfile ? (
                <div className="mobile-bottom-nav__avatar">
                  {/* Default initial for profile */}
                  <span>U</span>
                </div>
              ) : (
                <Icon size={22} />
              )}
              {item.badge ? (
                <span className="mobile-bottom-nav__badge">{item.badge}</span>
              ) : null}
            </div>
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
