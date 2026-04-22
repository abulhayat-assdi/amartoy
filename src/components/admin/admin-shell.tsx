"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { adminNavigation } from "@/data/admin";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <BrandLogo />
          <p>Admin Portal</p>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNavigation.map((item) => (
            <Link
              key={item.href}
              className={clsx("admin-nav__link", pathname === item.href && "admin-nav__link--active")}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p>Signed in as admin@amartoy.com</p>
          <Link className="admin-btn admin-btn--full" href="/admin/login/">
            <LogOut size={16} />
            Switch Account
          </Link>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar__eyebrow">Recovered Features</p>
            <h1 className="admin-topbar__title">AmarToy Admin</h1>
          </div>
          <div className="admin-topbar__chips">
            <span className="admin-badge">Storefront Synced</span>
            <span className="admin-badge admin-badge--dark">Static Preview</span>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
