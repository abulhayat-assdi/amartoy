"use client";

import Link from "next/link";
import {
  AppWindow,
  Bell,
  BookOpen,
  ClipboardList,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Package2,
  Settings2,
  ShoppingCart,
  UserCircle,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { adminNavigation } from "@/data/admin";
import type { ReactNode } from "react";
import type { AdminProfile } from "@/types/admin-management";
import { adminLogoutAction } from "@/app/admin/(auth)/login/actions";

const iconMap = {
  Dashboard: LayoutDashboard,
  "Header & Footer": AppWindow,
  Home: ClipboardList,
  Products: Package2,
  Cart: ShoppingCart,
  Blog: FileText,
  About: BookOpen,
  Contacts: Mail,
  "Login Management": UserCircle,
  Settings: Settings2,
  "Admin Management": ShieldCheck,
};

export function AdminShell({ children, profile }: { children: ReactNode; profile?: AdminProfile }) {
  const pathname = usePathname();
  const [timeLabel, setTimeLabel] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDateLabel(
        new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(now),
      );

      setTimeLabel(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }).format(now),
      );
    };

    updateDateTime();
    const timer = window.setInterval(updateDateTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="admin-shell">
      {isMobileMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      <aside className={clsx("admin-sidebar", isMobileMenuOpen && "admin-sidebar--open")}>
        <div className="admin-sidebar__brand">
          <div className="admin-badge-logo" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
              <span className="admin-badge-logo__mark">AT</span>
              <div>
                <strong>AmarToy</strong>
                <p>Sales & Marketing</p>
              </div>
            </div>
            <button 
              className="admin-mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNavigation.map((item) => {
            if (profile?.role !== "super-admin") {
              const perm = profile?.permissions?.find(p => p.pageId === item.label);
              if (!perm?.canRead) return null;
            }

            const Icon = iconMap[item.label as keyof typeof iconMap] ?? ClipboardList;

            return (
              <Link
                key={item.href}
                className={clsx("admin-nav__link", pathname === item.href && "admin-nav__link--active")}
                href={item.href}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <form action={adminLogoutAction}>
            <button className="admin-logout-btn" type="submit" style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", color: "inherit", font: "inherit", textAlign: "left" }}>
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="admin-topbar__title-wrap" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button 
              className="admin-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <p className="admin-topbar__eyebrow">Internal Portal</p>
              <h1 className="admin-topbar__title">AmarToy Admin</h1>
            </div>
          </div>

          <div className="admin-topbar__meta">
            <div className="admin-time-pill">
              <Clock3 size={15} />
              <span>{dateLabel || "Wednesday, April 22, 2026"}</span>
              <span className="admin-time-pill__divider" />
              <span>{timeLabel || "11:00:00 AM"}</span>
            </div>

            <button className="admin-icon-btn" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>

            <div className="admin-profile-chip">
              <div>
                <strong>{profile?.name || "Admin"}</strong>
                <p>{profile?.role === "super-admin" ? "Super Admin" : "Admin"}</p>
              </div>
              <span className="admin-profile-chip__avatar">{profile?.name?.charAt(0).toUpperCase() || "A"}</span>
            </div>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
