"use client";

import Link from "next/link";
import {
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
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { adminNavigation } from "@/data/admin";
import type { ReactNode } from "react";

const iconMap = {
  Dashboard: LayoutDashboard,
  Home: ClipboardList,
  Products: Package2,
  Cart: ShoppingCart,
  Blog: FileText,
  About: BookOpen,
  Contacts: Mail,
  Settings: Settings2,
};

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [timeLabel, setTimeLabel] = useState("");
  const [dateLabel, setDateLabel] = useState("");

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
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <div className="admin-badge-logo">
            <span className="admin-badge-logo__mark">AT</span>
            <div>
              <strong>AmarToy</strong>
              <p>Sales & Marketing</p>
            </div>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {adminNavigation.map((item) => {
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
          <div className="admin-user-card">
            <span className="admin-user-card__avatar">A</span>
            <div>
              <strong>Abul Hayat</strong>
              <p>Admin</p>
            </div>
          </div>

          <Link className="admin-logout-btn" href="/admin/login/">
            <LogOut size={16} />
            Logout
          </Link>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-topbar">
          <div className="admin-topbar__title-wrap">
            <p className="admin-topbar__eyebrow">Internal Portal</p>
            <h1 className="admin-topbar__title">AmarToy Admin</h1>
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
                <strong>Abul Hayat</strong>
                <p>Admin</p>
              </div>
              <span className="admin-profile-chip__avatar">AH</span>
            </div>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
