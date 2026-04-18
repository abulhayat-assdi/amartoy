import Image from "next/image";
import { SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/data/site";

export function AboutSplit({
  eyebrow = "Creative Approach",
  title = "We help you take care of the kids",
  description = "Not only do we sell toys, but we also try to make sure that your children are safe playing, learning, and having fun!",
  primaryImage = "/images/about/about-1.svg",
  secondaryImage = "/images/about/about-2.svg",
  showStats = true,
}) {
  return (
    <section className="section about-split">
      <div className="container about-split__grid">
        <Reveal className="about-split__media">
          <div className="about-split__photo about-split__photo--primary">
            <Image alt="Happy kids enjoying AmarToy" className="about-split__image" height={1000} src={primaryImage} width={1600} />
          </div>
          <div className="about-split__badge">
            <SmilePlus size={34} />
            <span>About Us</span>
          </div>
          <div className="about-split__photo about-split__photo--secondary">
            <Image alt="Creative learning play scene" className="about-split__image" height={1000} src={secondaryImage} width={1600} />
          </div>
        </Reveal>

        <Reveal className="about-split__copy" delay={0.1}>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{description}</p>
          {showStats ? (
            <div className="stats-row">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value.toLocaleString()}+</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          ) : null}
          <Button href="/shop/">Shop Now</Button>
        </Reveal>
      </div>
    </section>
  );
}
