"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { SidePanel } from "@/components/layout/side-panel";
import { FloatingWidgets } from "@/components/layout/floating-widgets";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { blogPosts, products } from "@/data/site";
import type { ReactNode } from "react";
import type { GlobalSettings } from "@/types/globalsettings";

interface AppShellProps {
  children: ReactNode;
  globalSettings: GlobalSettings;
}

export function AppShell({ children, globalSettings }: AppShellProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header 
        globalSettings={globalSettings}
        onOpenPanel={() => setPanelOpen(true)} 
        onOpenSearch={() => setSearchOpen(true)} 
      />
      <SearchOverlay
        onClose={() => setSearchOpen(false)}
        open={searchOpen}
        posts={blogPosts}
        products={products}
      />
      <SidePanel onClose={() => setPanelOpen(false)} open={panelOpen} />
      <main>{children}</main>
      <Footer globalSettings={globalSettings} />
      <FloatingWidgets />
      <MobileBottomNav />
    </>
  );
}
