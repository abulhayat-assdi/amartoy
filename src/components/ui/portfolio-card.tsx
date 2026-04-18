import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PortfolioCard({ post }) {
  return (
    <Link className="portfolio-card" href="/blog/">
      <Image alt={post.title} className="portfolio-card__image" height={1000} src={post.image} width={1600} />
      <div className="portfolio-card__meta">
        <p className="portfolio-card__category">{post.category}</p>
        <p className="portfolio-card__date">{post.date}</p>
        <h3 className="portfolio-card__title">{post.title}</h3>
        <span className="portfolio-card__cta">
          Read More
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
