"use client";

import Link from "next/link";
import { Grid2x2, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { BrandLogo } from "@/components/ui/brand-logo";
import { navigation } from "@/data/site";
import { useStore } from "@/components/providers/store-provider";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenPanel: () => void;
}

export function Header({ onOpenSearch, onOpenPanel }: HeaderProps) {
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

  return (
    <>
      <header className={clsx("site-header", isScrolled && "site-header--scrolled")}>
        <div className="container header-inner">
          <BrandLogo />

          <nav className="main-nav" aria-label="Primary">
            {navigation.map((item) => (
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
            <BrandLogo />
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
            {navigation.map((item) => (
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
