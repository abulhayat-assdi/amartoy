import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, categories, products } from "@/data/site";
import { HeroSlider } from "@/components/sections/hero-slider";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryCard } from "@/components/ui/category-card";
import { Reveal } from "@/components/ui/reveal";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { AboutSplit } from "@/components/sections/about-split";
import { FeaturesStrip } from "@/components/sections/features-strip";
import { VideoBanner } from "@/components/sections/video-banner";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BlogCard } from "@/components/ui/blog-card";

export default function HomePage() {
  const featuredProducts = products.filter((product) =>
    ["dolls-trailer", "construction-cup", "teddy-bear-toy", "emergency-truck"].includes(product.slug),
  );
  const catalogProducts = products.slice(0, 8);

  return (
    <>
      <HeroSlider />

      <section className="section home-categories">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Categories"
            title="We design toys not just for kids but with kids"
          />
          <div className="grid-4">
            {categories.map((category, index) => (
              <Reveal delay={index * 0.08} key={category.id}>
                <CategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProductsShowcase
        background="section"
        eyebrow="Shop AmarToy & Games"
        className="home-featured-products products-showcase--minimal"
        products={featuredProducts}
        showLink={false}
        title="Popular in Store"
      />

      <AboutSplit
        primaryImage="/images/real/kids-playroom.jpg"
        secondaryImage="/images/real/happy-outdoors.jpg"
      />

      <ProductsShowcase
        background="section"
        eyebrow="Shop AmarToy & Games"
        className="home-product-catalog products-showcase--minimal"
        products={catalogProducts}
        showLink={false}
        title="Popular in Store"
      />

      <FeaturesStrip />
      <VideoBanner />
      <TestimonialsSection />

      <section className="section home-blog">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Our Blog"
            title="Latest News"
            description="Editorial cards inspired by your reference layout, with clean spacing and strong visual hierarchy."
          />
          <div className="grid-3">
            {blogPosts.slice(0, 3).map((post, index) => (
              <Reveal delay={index * 0.1} key={post.id}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
          <div className="section-link-row">
            <Link className="section-link" href="/blog/">
              Explore the Blog
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
