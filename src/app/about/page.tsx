import Image from "next/image";
import Link from "next/link";
import { Crown, Rocket, Sparkles } from "lucide-react";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function AboutPage() {
  return (
    <>
      <section className="about-page-hero">
        <div className="container about-page-hero__inner">
          <div className="about-page-hero__visual">
            <div className="about-page-hero__shape" />
            <div className="about-page-hero__star about-page-hero__star--big">
              <Sparkles size={120} strokeWidth={1.5} />
            </div>
            <div className="about-page-hero__star about-page-hero__star--small about-page-hero__star--one">
              <Sparkles size={28} strokeWidth={2} />
            </div>
            <div className="about-page-hero__star about-page-hero__star--small about-page-hero__star--two">
              <Sparkles size={28} strokeWidth={2} />
            </div>
            <div className="about-page-hero__rocket">
              <Rocket size={126} strokeWidth={1.8} />
            </div>
            <div className="about-page-hero__image-wrap">
              <Image
                alt="Kids playing outdoors"
                className="about-page-hero__image"
                height={1200}
                priority
                src="/images/real/happy-outdoors.jpg"
                width={1200}
              />
            </div>
          </div>

          <div className="about-page-hero__copy">
            <p className="about-page-kicker">What We Do</p>
            <h1>We provide & offer premium toys</h1>
            <p>
              We appreciate your trust. Our clients choose us and our products because they know
              we care about quality, joy, and safe play.
            </p>
            <Link className="btn about-page-hero__button" href="/shop/">
              Discover Now
            </Link>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-story__media about-story__media--left">
            <Image
              alt="Two smiling kids"
              className="about-story__image"
              height={1200}
              src="/images/real/kids-playroom.jpg"
              width={1000}
            />
            <div className="about-story__crown">
              <Crown size={52} strokeWidth={1.8} />
            </div>
            <div className="about-story__seal">
              <svg aria-hidden="true" className="about-story__seal-ring" viewBox="0 0 160 160">
                <defs>
                  <path
                    d="M 80,80 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
                    id="about-us-seal-path"
                  />
                </defs>
                <text>
                  <textPath href="#about-us-seal-path" startOffset="0%">
                    ABOUT US • ABOUT US • ABOUT US • ABOUT US •
                  </textPath>
                </text>
              </svg>
              <div className="about-story__seal-center" aria-hidden="true">
                <span className="about-story__seal-face">
                  <i className="about-story__seal-eye about-story__seal-eye--left" />
                  <i className="about-story__seal-eye about-story__seal-eye--right" />
                  <i className="about-story__seal-smile" />
                </span>
              </div>
            </div>
          </div>

          <div className="about-story__content">
            <div className="about-story__copy">
              <p className="about-page-kicker">Creative Approach</p>
              <h2>We help you take care of the kids</h2>
              <p>
                Not only do we sell toys, but we also try to make sure that your children are safe
                playing, learning, and having fun.
              </p>
            </div>

            <div className="about-story__media about-story__media--right">
              <Image
                alt="Child playing with bubbles"
                className="about-story__image"
                height={900}
                src="/images/real/headphones-boy.jpg"
                width={1400}
              />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection compact />
    </>
  );
}
