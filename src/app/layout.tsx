import type { Metadata } from "next";
import type { ReactNode } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "@/app/globals.css";
import { StoreProvider } from "@/components/providers/store-provider";
import { SupportChatProvider } from "@/components/providers/support-chat-provider";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "AmarToy | Toys and Games",
  description:
    "Playful Next.js storefront for AmarToy, prepared for Firebase-backed content and checkout flows.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StoreProvider>
          <SupportChatProvider>
            <AppShell>{children}</AppShell>
          </SupportChatProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
