import Image from "next/image";
import { CircleHelp, Mail, Paperclip, Phone, SendHorizonal, UserRound } from "lucide-react";
import { company } from "@/data/site";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-visual">
            <div className="contact-visual__panel" />
            <div className="contact-visual__glow" />
            <Image
              alt="Friendly AmarToy customer support"
              className="contact-visual__art"
              height={1200}
              src="/images/contact/contact-girl.svg"
              width={900}
            />
            <span className="contact-shape contact-shape--cross" />
            <span className="contact-shape contact-shape--ring" />
            <span className="contact-shape contact-shape--ring-small" />
            <span className="contact-shape contact-shape--cross-bottom" />
          </div>

          <div className="contact-card contact-card--minimal">
            <p className="eyebrow contact-card__eyebrow">Contact Us</p>
            <h1>Have Questions? Get in touch!</h1>
            <form className="contact-form">
              <label className="contact-field">
                <UserRound size={18} strokeWidth={1.7} />
                <input className="contact-field__input" placeholder="Name" type="text" />
              </label>
              <label className="contact-field">
                <Mail size={18} strokeWidth={1.7} />
                <input className="contact-field__input" placeholder="Email Address" type="email" />
              </label>
              <label className="contact-field">
                <Phone size={18} strokeWidth={1.7} />
                <input className="contact-field__input" placeholder="Phone" type="text" />
              </label>
              <label className="contact-field">
                <CircleHelp size={18} strokeWidth={1.7} />
                <input className="contact-field__input" placeholder="Subject" type="text" />
              </label>
              <label className="contact-field contact-field--textarea">
                <Paperclip size={18} strokeWidth={1.7} />
                <textarea
                  className="contact-field__input contact-field__textarea"
                  placeholder="How can we help you? Feel free to get in touch!"
                  rows={6}
                />
              </label>
              <label className="contact-consent">
                <input type="checkbox" />
                <span>
                  I agree that my submitted data is being <u>collected and stored.</u>
                </span>
              </label>
              <Button className="contact-submit" type="submit">
                <SendHorizonal size={18} />
                Get In Touch
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <iframe loading="lazy" src={company.mapEmbed} title="AmarToy office map" />
      </section>
    </>
  );
}
