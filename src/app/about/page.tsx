import Image from "next/image";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

const aboutHighlights = [
  {
    number: "01",
    title: "We are online store located in the Dhaka city",
    description:
      "Experience a toy shop designed for busy families, with playful products and a smooth online ordering journey.",
  },
  {
    number: "02",
    title: "Freshly curated toy collections",
    description:
      "We carefully choose safe, joyful, and age-friendly toys so every collection feels thoughtful and exciting.",
  },
  {
    number: "03",
    title: "Next day delivery in Dhaka city",
    description:
      "Fast local fulfillment helps families receive gift-worthy picks and everyday favorites right on time.",
  },
  {
    number: "04",
    title: "Professional, experienced team",
    description:
      "Our team is focused on dependable service, helpful guidance, and a shopping experience parents can trust.",
  },
  {
    number: "05",
    title: "The highest standards of service",
    description:
      "From order confirmation to delivery updates, we work to keep each customer touchpoint clear and reliable.",
  },
  {
    number: "06",
    title: "Cash on delivery available",
    description:
      "Flexible payment options make ordering simpler, especially for families who prefer to pay at the doorstep.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-reimagined">
        <div className="container about-reimagined__layout">
          <div className="about-reimagined__visual">
            <div className="about-reimagined__photo about-reimagined__photo--main">
              <Image
                alt="Happy child playing with a toy"
                className="about-reimagined__image"
                height={1200}
                priority
                src="/images/real/kids-playroom.jpg"
                width={1000}
              />
            </div>

            <div className="about-reimagined__badge">
              <span className="about-reimagined__badge-number">1+</span>
              <span className="about-reimagined__badge-label">Years Experience</span>
            </div>

            <span className="about-reimagined__dot about-reimagined__dot--one" />
            <span className="about-reimagined__dot about-reimagined__dot--two" />
            <span className="about-reimagined__ring about-reimagined__ring--one" />
            <span className="about-reimagined__ring about-reimagined__ring--two" />
            <span className="about-reimagined__scribble about-reimagined__scribble--left" />
            <span className="about-reimagined__scribble about-reimagined__scribble--right" />
          </div>

          <div className="about-reimagined__content">
            <p className="about-reimagined__eyebrow">About AmarToy</p>
            <h1>We are doing more than you expect</h1>
            <div className="about-reimagined__copy">
              <p>
                Welcome to AmarToy, where every collection is shaped around safe play,
                imagination, and dependable service for families across Dhaka. What started as a
                simple goal to make toy shopping easier has grown into an online store focused on
                joyful discovery and trusted quality.
              </p>
              <p>
                We believe the best children&apos;s products bring together creativity, comfort, and
                long-lasting value. That is why we handpick toys that feel fun, giftable, and
                practical for everyday moments, from learning through play to celebrating special
                milestones.
              </p>
              <p>
                Our mission is to make each order feel easy and reassuring, whether you are
                choosing a birthday surprise or stocking up on family favorites. With responsive
                service, curated selections, and fast delivery, we work to give parents a smoother
                shopping experience from start to finish.
              </p>
            </div>
            <p className="about-reimagined__signature">AmarToy Store</p>
          </div>
        </div>
      </section>

      <section className="about-reimagined-points">
        <div className="container">
          <div className="about-reimagined-points__grid">
            {aboutHighlights.map((item) => (
              <article className="about-reimagined-points__item" key={item.number}>
                <span className="about-reimagined-points__number">{item.number}</span>
                <div className="about-reimagined-points__body">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection compact />
    </>
  );
}
