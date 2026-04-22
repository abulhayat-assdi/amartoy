import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CircleHelp,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { blogPosts, categories, features, formatCurrency, products } from "@/data/site";
import { ProductCard } from "@/components/ui/product-card";
import { HeroSlider } from "@/components/sections/hero-slider";
import { ReviewMediaCarousel } from "@/components/sections/review-media-carousel";

const featuredProducts = products.slice(0, 8);
const featuredPosts = [blogPosts[2], blogPosts[0], blogPosts[3]];

const featureIcons = [BadgeDollarSign, PackageCheck, ShoppingBag, CircleHelp];

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      <section className="home-section home-section--tight">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">Categories</p>
            <h2>We design toys not just for kids but with kids</h2>
          </div>

          <div className="home-categories-grid">
            {categories.map((category) => (
              <Link className="home-category-card" href={category.href} key={category.id}>
                <Image alt={category.name} fill className="home-category-card__image" src={category.image} />
                <div className="home-category-card__overlay" />
                <div className="home-category-card__content">
                  <h3>{category.name}</h3>
                  <span>
                    Shop Now
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ReviewMediaCarousel />

      <section className="home-section home-section--soft">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">Shop AmarToy Toys & Games</p>
            <h2>Popular in Store</h2>
          </div>

          <div className="grid-3 product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="shop" />
            ))}
          </div>
        </div>
      </section>

      <section className="home-features-strip">
        <div className="container home-features-strip__inner">
          {features.map((feature, index) => {
            const Icon = featureIcons[index] ?? ShieldCheck;

            return (
              <div className="home-feature-item" key={feature.title}>
                <div className="home-feature-item__icon">
                  <Icon size={26} />
                </div>
                <div>
                  <strong>{feature.title}</strong>
                  <p>{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-promo-banner">
        <Image
          alt="Happy kids outdoors"
          className="home-promo-banner__image"
          fill
          sizes="100vw"
          src="/images/real/happy-outdoors.jpg"
        />
        <div className="home-promo-banner__overlay" />
        <div className="home-promo-banner__play">
          <span>Play</span>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">Our Blog</p>
            <h2>Latest News</h2>
          </div>

          <div className="home-blog-grid">
            {featuredPosts.map((post) => (
              <article className="home-blog-card" key={post.id}>
                <Link className="home-blog-card__image-wrap" href="/blog/">
                  <Image alt={post.title} fill className="home-blog-card__image" src={post.image} />
                </Link>
                <div className="home-blog-card__meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <Link className="home-blog-card__title" href="/blog/">
                  {post.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
