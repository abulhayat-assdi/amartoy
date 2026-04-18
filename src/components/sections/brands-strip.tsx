import { brands } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function BrandsStrip({ heading = "We work with the best brands" }: { heading?: string }) {
  const items = [...brands, ...brands];

  return (
    <section className="section brands-strip">
      <div className="container brands-strip__header">
        <SectionHeading align="left" eyebrow="Partners" title={heading} />
      </div>
      <div className="brand-marquee">
        <div className="brand-track">
          {items.map((brand, index) => (
            <div className="brand-pill" key={`${brand}-${index}`}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
