import { CartPageClient } from "@/components/pages/cart-page-client";
import { PageHero } from "@/components/ui/page-hero";

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Basket"
        title="Cart"
        description="A clean cart layout with quantity controls, coupon entry, and a bright checkout summary."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />
      <section className="section">
        <div className="container">
          <CartPageClient />
        </div>
      </section>
    </>
  );
}
