"use client";

import Link from "next/link";
import { Grid2x2, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useStore } from "@/components/providers/store-provider";
import { usePathname } from "next/navigation";
import type { GlobalSettings } from "@/types/globalsettings";

interface HeaderProps {
  globalSettings: GlobalSettings;
  onOpenSearch: () => void;
  onOpenPanel: () => void;
}

export function Header({ globalSettings, onOpenSearch, onOpenPanel }: HeaderProps) {
  const pathname = usePathname();
  const { cartCount } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Dummy auth state: replace with real auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // TODO: Replace with real auth check
    setIsLoggedIn(typeof window !== "undefined" && window.localStorage.getItem("amartoy-demo-user") === "1");
  }, [pathname]);

  return (
    <>
      <header className={clsx("site-header", isScrolled && "site-header--scrolled")}> 
        <div className="container header-inner">
          <BrandLogo logoUrl={globalSettings.logoUrl} brandName={globalSettings.brandName} tagline={globalSettings.brandTagline} />

          <nav className="main-nav" aria-label="Primary">
            {globalSettings.headerNav.map((item) => (
              <div className="nav-item" key={item.label}>
                <Link
                  className={clsx("nav-item__link", pathname === item.href && "nav-item__link--active")}
                  href={item.href}
                >
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <Link
              aria-label={isLoggedIn ? "Profile" : "Login"}
              className="header-signin"
              href={isLoggedIn ? "/profile/" : "/login/"}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M16 20v-2a4 4 0 0 0-8 0v2"/></svg>
              <span>{isLoggedIn ? "Hello, My Profile" : "Hello, Sign in"}</span>
            </Link>
            <Link aria-label="View cart" className="icon-btn icon-btn--cart" href="/cart/">
              <ShoppingBag size={22} />
              {cartCount ? <span className="cart-count-badge">{cartCount}</span> : null}
            </Link>
            <button aria-label="Search" className="icon-btn" type="button" onClick={onOpenSearch}>
              <Search size={22} />
            </button>
            <button aria-label="Info panel" className="icon-btn" type="button" onClick={onOpenPanel}>
              <Grid2x2 size={22} />
            </button>
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="icon-btn icon-btn--mobile"
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div className={clsx("mobile-drawer", mobileOpen && "mobile-drawer--open")}>
        <div className="mobile-drawer__panel">
          <div className="mobile-drawer__header">
            <BrandLogo logoUrl={globalSettings.logoUrl} brandName={globalSettings.brandName} tagline={globalSettings.brandTagline} />
            <button
              aria-label="Close menu"
              className="icon-btn icon-btn--mobile"
              type="button"
              onClick={() => setMobileOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="mobile-nav">
            {globalSettings.headerNav.map((item) => (
              <div key={item.label}>
                <Link className={pathname === item.href ? "active" : ""} href={item.href}>
                  {item.label}
                </Link>
                {item.children?.length ? (
                  <div className="mobile-nav__children">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
        <button className="mobile-drawer__backdrop" type="button" onClick={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
