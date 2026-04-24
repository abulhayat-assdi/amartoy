import Link from "next/link";
import { ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import type { GlobalSettings } from "@/types/globalsettings";

interface FooterProps {
  globalSettings: GlobalSettings;
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-2.9 0-4.7 1.8-4.7 5V11H7v3h2.5v7h4z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.4 1.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M14.7 2h2.6a5 5 0 0 0 4.2 4.2v2.6a7.4 7.4 0 0 1-4.2-1.3v6.8a6.3 6.3 0 1 1-6.3-6.3c.3 0 .7 0 1 .1v2.7a3.6 3.6 0 1 0 2.7 3.5V2Z" />
    </svg>
  );
}

function renderSocialIcon(iconName: string, size = 18) {
  switch (iconName.toLowerCase()) {
    case "facebook": return <FacebookIcon size={size} />;
    case "youtube": return <YouTubeIcon size={size} />;
    case "instagram": return <InstagramIcon size={size} />;
    case "tiktok": return <TikTokIcon size={size} />;
    default: return <Globe size={size} />;
  }
}

export function Footer({ globalSettings }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="site-footer__brand-head">
              <div className="site-footer__brand-mark">{globalSettings.brandName.substring(0, 2).toUpperCase()}</div>
              <div className="site-footer__brand-copy">
                <BrandLogo light logoUrl={globalSettings.logoUrl} brandName={globalSettings.brandName} tagline={globalSettings.brandTagline} />
              </div>
            </div>

            <p className="site-footer__summary">
              {globalSettings.footerDescription}
            </p>

            <div className="site-footer__socials">
              {globalSettings.socialLinks.map((item) => (
                <Link
                  aria-label={item.label}
                  className="site-footer__social"
                  href={item.href}
                  key={item.id}
                  target="_blank"
                >
                  {renderSocialIcon(item.icon, 18)}
                </Link>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h3>Quick Links</h3>
            <div className="site-footer__links">
              {globalSettings.quickLinks.map((item) => (
                <Link href={item.href} key={item.id}>
                  <ChevronRight size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h3>About Business</h3>
            <div className="site-footer__links">
              {globalSettings.businessLinks.map((item) => (
                <Link href={item.href} key={item.id}>
                  <ChevronRight size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h3>Contact Us</h3>
            <div className="site-footer__contact-list">
              <p>
                <MapPin size={16} />
                <span>
                  {globalSettings.shortAddress}, {globalSettings.city}
                </span>
              </p>
              <Link href={`tel:${globalSettings.phone.replaceAll(" ", "")}`}>
                <Phone size={16} />
                <span>{globalSettings.phone}</span>
              </Link>
              <Link href={`tel:${globalSettings.secondaryPhone.replaceAll(" ", "")}`}>
                <Phone size={16} />
                <span>{globalSettings.secondaryPhone}</span>
              </Link>
              <Link href={`mailto:${globalSettings.email}`}>
                <Mail size={16} />
                <span>{globalSettings.email}</span>
              </Link>
              <Link href={globalSettings.website} target="_blank">
                <Globe size={16} />
                <span>{globalSettings.website}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{globalSettings.brandName} © {new Date().getFullYear()}. All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <Link href={globalSettings.developerUrl} target="_blank">
              {globalSettings.developerName}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
