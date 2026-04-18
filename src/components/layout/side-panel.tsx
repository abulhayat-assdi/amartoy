"use client";

import Link from "next/link";
import { MessageCircle, PlayCircle, X } from "lucide-react";
import { company } from "@/data/site";
import { BrandLogo } from "@/components/ui/brand-logo";

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.471h3.047v-2.642c0-3.007 1.786-4.668 4.533-4.668 1.312 0 2.686.262 2.686.262v2.951h-1.514c-1.518 0-1.99.955-1.99 1.936v2.348h3.407l-.533 3.472h-2.874v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2m0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.055.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "WhatsApp", href: "https://whatsapp.com", icon: MessageCircle },
  { label: "YouTube", href: "https://youtube.com", icon: PlayCircle },
];

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
}

export function SidePanel({ open, onClose }: SidePanelProps) {
  return (
    <>
      <button
        aria-hidden={!open}
        className={`side-panel-overlay ${open ? "side-panel-overlay--open" : ""}`}
        onClick={onClose}
        type="button"
      />
      <aside className={`side-panel ${open ? "side-panel--open" : ""}`}>
        <div className="side-panel__top">
          <BrandLogo light />
          <button className="side-panel__close" type="button" onClick={onClose} aria-label="Close panel">
            <X size={22} />
          </button>
        </div>

        <div className="side-panel__socials">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <Link key={social.label} className="side-panel__social-btn" href={social.href} target="_blank">
                <Icon size={18} />
              </Link>
            );
          })}
        </div>

        <div className="side-panel__content">
          <p className="side-panel__eyebrow">Have a Project?</p>
          <Link className="side-panel__email" href={`mailto:${company.email}`}>
            {company.email}
          </Link>
          <Link className="side-panel__brief" href="/contact/" onClick={onClose}>
            Want to work with us? Send brief
          </Link>
          <p className="side-panel__phone">{company.phone}</p>
          <Link className="side-panel__shop" href="/shop/" onClick={onClose}>
            Go to Shop
          </Link>
        </div>
      </aside>
    </>
  );
}
