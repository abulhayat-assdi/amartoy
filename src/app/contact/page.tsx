import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, pageBanners } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        {...pageBanners.contact}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contacts" },
        ]}
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-visual">
            <div className="contact-visual__panel" />
            <Image
              alt="Friendly AmarToy customer support"
              className="contact-visual__art"
              height={1200}
              src="/images/contact/contact-girl.svg"
              width={900}
            />
            <span className="contact-shape contact-shape--cross" />
            <span className="contact-shape contact-shape--ring" />
          </div>

          <div className="contact-card">
            <p className="eyebrow">Contact Us</p>
            <h2>Have Questions? Get in touch!</h2>
            <form className="contact-form">
              <input className="form-input" placeholder="Name" type="text" />
              <input className="form-input" placeholder="Email Address" type="email" />
              <input className="form-input" placeholder="Phone" type="text" />
              <input className="form-input" placeholder="Subject" type="text" />
              <textarea className="form-input" placeholder="How can we help you? Feel free to get in touch!" rows={6} />
              <label className="newsletter-form__check">
                <input type="checkbox" />
                <span>I agree that my submitted data is being collected and stored.</span>
              </label>
              <Button>Get In Touch</Button>
            </form>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">
                  <MapPin size={18} />
                </span>
                <div>
                  <strong>Address</strong>
                  <p>{company.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <Mail size={18} />
                </span>
                <div>
                  <strong>Email</strong>
                  <p>{company.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <Phone size={18} />
                </span>
                <div>
                  <strong>Phone</strong>
                  <p>{company.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <iframe loading="lazy" src={company.mapEmbed} title="AmarToy office map" />
      </section>
    </>
  );
}
