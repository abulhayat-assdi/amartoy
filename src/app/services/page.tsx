import { services, pageBanners } from "@/data/site";
import { PageHero } from "@/components/ui/page-hero";
import { ServiceCard } from "@/components/ui/service-card";
import { FeaturesStrip } from "@/components/sections/features-strip";
import { BrandsStrip } from "@/components/sections/brands-strip";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        {...pageBanners.services}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <section className="section section-alt">
        <div className="container">
          <div className="grid-4">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesStrip />
      <BrandsStrip heading="Meet our top clients & partners" />
    </>
  );
}
