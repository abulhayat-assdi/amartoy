import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { company } from "@/data/site";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Twitter", href: "https://x.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__intro">
          <p className="site-footer__eyebrow">Stay Connected</p>
          <h2>We improve your online performance</h2>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__column">
            <h3>Address</h3>
            <p>Germany</p>
            <p>{company.shortAddress}</p>
            <p>{company.city}</p>
          </div>

          <div className="site-footer__column">
            <h3>Say Hello</h3>
            <Link href={`mailto:${company.email}`}>{company.email}</Link>
            <Link className="site-footer__phone" href={`tel:${company.phone.replaceAll(" ", "")}`}>
              {company.phone}
            </Link>
          </div>

          <div className="site-footer__column">
            <h3>Socials</h3>
            {socialLinks.map((item) => (
              <Link href={item.href} key={item.label} target="_blank">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__column">
            <h3>Newsletter</h3>
            <form className="site-footer__newsletter">
              <label className="site-footer__field">
                <Mail size={18} />
                <input aria-label="Email Address" placeholder="Enter Your Email Address" type="email" />
                <button aria-label="Subscribe" type="submit">
                  <ArrowRight size={18} />
                </button>
              </label>
              <label className="site-footer__consent">
                <input type="checkbox" />
                <span>
                  I agree to the <Link href="/contact/">Privacy Policy</Link>.
                </span>
              </label>
            </form>
          </div>
        </div>

        <div className="site-footer__bottom">AmarToy © 2026. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
