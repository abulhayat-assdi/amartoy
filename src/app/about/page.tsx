import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getAboutPageContent } from "@/lib/aboutpage-management";
import Image from "next/image";

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const { heroSection, highlights } = content;

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
                src={heroSection.imageUrl || "/images/real/kids-playroom.jpg"}
                width={1000}
              />
            </div>

            <div className="about-reimagined__badge">
              <span className="about-reimagined__badge-number">{heroSection.badgeNumber}</span>
              <span className="about-reimagined__badge-label">{heroSection.badgeLabel}</span>
            </div>

            <span className="about-reimagined__dot about-reimagined__dot--one" />
            <span className="about-reimagined__dot about-reimagined__dot--two" />
            <span className="about-reimagined__ring about-reimagined__ring--one" />
            <span className="about-reimagined__ring about-reimagined__ring--two" />
            <span className="about-reimagined__scribble about-reimagined__scribble--left" />
            <span className="about-reimagined__scribble about-reimagined__scribble--right" />
          </div>

          <div className="about-reimagined__content">
            <p className="about-reimagined__eyebrow">{heroSection.eyebrow}</p>
            <h1>{heroSection.title}</h1>
            <div className="about-reimagined__copy">
              {heroSection.paragraph1 && <p>{heroSection.paragraph1}</p>}
              {heroSection.paragraph2 && <p>{heroSection.paragraph2}</p>}
              {heroSection.paragraph3 && <p>{heroSection.paragraph3}</p>}
            </div>
            <p className="about-reimagined__signature">{heroSection.signature}</p>
          </div>
        </div>
      </section>

      <section className="about-reimagined-points">
        <div className="container">
          <div className="about-reimagined-points__grid">
            {highlights.map((item) => (
              <article className="about-reimagined-points__item" key={item.id}>
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
