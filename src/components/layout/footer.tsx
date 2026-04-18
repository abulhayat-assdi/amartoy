import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company, navigation } from "@/data/site";
import { BrandLogo } from "@/components/ui/brand-logo";

function XIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2m0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
    </svg>
  );
}

function DribbbleIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.743 2 8.272 2.001 7.007 2.06 2.7 2.473 2.473 6.993 2.06 7.007 2.001 8.272 2 8.743 2 12c0 3.257.01 3.728.06 4.993.413 5.014 4.946 5.247 4.947 4.947 1.265-.05 1.736-.06 4.993-.06s3.728.01 4.993.06c5.014.413 5.247 4.946 4.947 4.947-.05 1.265-.06 1.736-.06 4.993s.01 3.728.06 4.993c.413 5.014-4.946 5.247-4.947 4.947-1.265-.05-1.736-.06-4.993-.06-3.257 0-3.728-.01-4.993-.06-5.014-.413-5.247-4.946-4.947-4.947.05-1.265.06-1.736.06-4.993 0-3.257-.01-3.728-.06-4.993-.413-5.014 4.946-5.247 4.947-4.947 1.265.05 1.736.06 4.993.06M12 0c3.453 0 3.91.011 5.274.058 5.98.206 7.77 2.215 7.964 8.195.047 1.577.057 2.052.057 5.747s-.01 4.17-.057 5.747c-.194 5.98-1.984 7.989-7.964 8.195C15.91 23.99 15.453 24 12 24c-3.453 0-3.91-.011-5.274-.058-5.98-.206-7.77-2.215-7.964-8.195C.715 15.17.705 14.695.705 11s.01-4.17.057-5.747c.194-5.98 1.984-7.989 7.964-8.195C8.09.011 8.547 0 12 0" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.471h3.047v-2.642c0-3.007 1.786-4.668 4.533-4.668 1.312 0 2.686.262 2.686.262v2.951h-1.514c-1.518 0-1.99.955-1.99 1.936v2.348h3.407l-.533 3.472h-2.874v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const icons = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Dribbble", href: "https://dribbble.com", icon: DribbbleIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandLogo light />
          <p>We improve your online performance with a warm, playful storefront built for modern families.</p>
          <div className="footer-socials">
            {icons.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.label} href={item.href} aria-label={item.label} target="_blank">
                  <Icon size={17} />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          {navigation.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="footer-contact">
          <h3>Say Hello</h3>
          <p>{company.shortAddress}</p>
          <p>{company.city}</p>
          <Link href={`mailto:${company.email}`}>{company.email}</Link>
          <Link href={`tel:${company.phone.replaceAll(" ", "")}`}>{company.phone}</Link>
        </div>

        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <div className="newsletter-form__row">
              <input aria-label="Email Address" placeholder="Enter Your Email Address" type="email" />
              <button aria-label="Subscribe" type="submit">
                <ArrowRight size={18} />
              </button>
            </div>
            <label className="newsletter-form__check">
              <input type="checkbox" />
              <span>
                I agree to the <Link href="/contact/">Privacy Policy</Link>.
              </span>
            </label>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">AmarToy Copyright 2026. All Rights Reserved.</div>
    </footer>
  );
}
