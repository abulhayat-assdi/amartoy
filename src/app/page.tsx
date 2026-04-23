import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CircleHelp, PackageCheck, ShieldCheck } from "lucide-react";
import { blogPosts, products } from "@/data/site";
import { HomeVideoSection } from "@/components/sections/home-video-section";
import { HeroSlider } from "@/components/sections/hero-slider";
import { ReviewMediaCarousel } from "@/components/sections/review-media-carousel";
import { ProductCard } from "@/components/ui/product-card";
import { getHomePageContent, getHomepagePopularProducts, getLatestBlogPosts } from "@/lib/homepage-management";

const featureIcons = {
  "badge-dollar-sign": BadgeDollarSign,
  "package-check": PackageCheck,
  "shield-check": ShieldCheck,
  "message-circle": CircleHelp,
};

export default async function HomePage() {
  const homepageContent = await getHomePageContent();
  const featuredProducts = getHomepagePopularProducts(homepageContent, products);
  const featuredPosts = getLatestBlogPosts(blogPosts, homepageContent.blogSection.limit);

  return (
    <>
      <HeroSlider
        slides={homepageContent.heroSlides.map((slide) => ({
          ...slide,
          image: slide.imageUrl,
        }))}
      />

      <section className="home-section home-section--tight">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">Categories</p>
            <h2>We design toys not just for kids but with kids</h2>
          </div>

          <div className="home-categories-grid">
            {homepageContent.categories.map((category) => (
              <Link className="home-category-card" href={category.href} key={category.id}>
                <Image alt={category.name} fill className="home-category-card__image" src={category.imageUrl} />
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

      <ReviewMediaCarousel items={homepageContent.reviewMedia} />

      <section className="home-section home-section--soft">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">{homepageContent.popularProductsSection.eyebrow}</p>
            <h2>{homepageContent.popularProductsSection.title}</h2>
            <p>{homepageContent.popularProductsSection.description}</p>
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
          {homepageContent.features.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons] ?? ShieldCheck;

            return (
              <div className="home-feature-item" key={feature.id}>
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
          alt={homepageContent.promoSection.title}
          className="home-promo-banner__image"
          fill
          sizes="100vw"
          src={homepageContent.promoSection.imageUrl}
        />
        <div className="home-promo-banner__overlay" />
        <div className="home-promo-banner__content">
          <p>{homepageContent.promoSection.eyebrow}</p>
          <h2>{homepageContent.promoSection.title}</h2>
          <span>{homepageContent.promoSection.description}</span>
          <Link className="home-promo-banner__button" href={homepageContent.promoSection.buttonHref}>
            {homepageContent.promoSection.buttonLabel}
          </Link>
        </div>
      </section>

      <HomeVideoSection content={homepageContent.videoSection} />

      <section className="home-section">
        <div className="container">
          <div className="home-section__heading home-section__heading--center">
            <p className="home-kicker">{homepageContent.blogSection.eyebrow}</p>
            <h2>{homepageContent.blogSection.title}</h2>
            <p>{homepageContent.blogSection.description}</p>
          </div>

          <div className="home-blog-grid">
            {featuredPosts.map((post) => (
              <article className="home-blog-card" key={post.id}>
                <Link className="home-blog-card__image-wrap" href={`/blog/${post.slug}/`}>
                  <Image alt={post.title} fill className="home-blog-card__image" src={post.image} />
                </Link>
                <div className="home-blog-card__meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <Link className="home-blog-card__title" href={`/blog/${post.slug}/`}>
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
