import Link from "next/link";
import { ChevronRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { company } from "@/data/site";

interface SocialIconProps {
  size?: number;
}

function FacebookIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-2.9 0-4.7 1.8-4.7 5V11H7v3h2.5v7h4z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.4 1.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M14.7 2h2.6a5 5 0 0 0 4.2 4.2v2.6a7.4 7.4 0 0 1-4.2-1.3v6.8a6.3 6.3 0 1 1-6.3-6.3c.3 0 .7 0 1 .1v2.7a3.6 3.6 0 1 0 2.7 3.5V2Z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Shop", href: "/shop/" },
  { label: "Offers", href: "/shop/" },
  { label: "All Products", href: "/shop/" },
  { label: "Blog", href: "/blog/" },
];

const businessLinks = [
  { label: "About us", href: "/about/" },
  { label: "Contact us", href: "/contact/" },
  { label: "Privacy Policy", href: "/contact/" },
  { label: "Terms & Conditions", href: "/contact/" },
];

const socialLinks = [
  { label: "Facebook", href: company.developerUrl, icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <div className="site-footer__brand-head">
              <div className="site-footer__brand-mark">AT</div>
              <div className="site-footer__brand-copy">
                <BrandLogo light />
              </div>
            </div>

            <p className="site-footer__summary">
              Your trusted destination for playful products, dependable service, and a smooth
              shopping experience for families across Bangladesh.
            </p>

            <div className="site-footer__socials">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    aria-label={item.label}
                    className="site-footer__social"
                    href={item.href}
                    key={item.label}
                    target="_blank"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="site-footer__column">
            <h3>Quick Links</h3>
            <div className="site-footer__links">
              {quickLinks.map((item) => (
                <Link href={item.href} key={item.label}>
                  <ChevronRight size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="site-footer__column">
            <h3>About Business</h3>
            <div className="site-footer__links">
              {businessLinks.map((item) => (
                <Link href={item.href} key={item.label}>
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
                  {company.shortAddress}, {company.city}
                </span>
              </p>
              <Link href={`tel:${company.phone.replaceAll(" ", "")}`}>
                <Phone size={16} />
                <span>{company.phone}</span>
              </Link>
              <Link href={`tel:${company.secondaryPhone.replaceAll(" ", "")}`}>
                <Phone size={16} />
                <span>{company.secondaryPhone}</span>
              </Link>
              <Link href={`mailto:${company.email}`}>
                <Mail size={16} />
                <span>{company.email}</span>
              </Link>
              <Link href={company.website} target="_blank">
                <Globe size={16} />
                <span>{company.website}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{company.name} © 2026. All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <Link href={company.developerUrl} target="_blank">
              {company.developerName}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
