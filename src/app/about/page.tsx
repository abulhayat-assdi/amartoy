import { BrandsStrip } from "@/components/sections/brands-strip";
import { AboutSplit } from "@/components/sections/about-split";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PageHero } from "@/components/ui/page-hero";
import { pageBanners } from "@/data/site";

export default function AboutPage() {
  return (
    <>
      <PageHero
        {...pageBanners.about}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <AboutSplit
        description="We provide and offer premium toys that feel warm, premium, and easy to shop online. The whole interface is built to make parents feel confident."
      />
      <TestimonialsSection compact />
      <BrandsStrip />
    </>
  );
}
