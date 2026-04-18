import { CheckoutPageClient } from "@/components/pages/checkout-page-client";
import { PageHero } from "@/components/ui/page-hero";

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Secure Checkout"
        title="Checkout"
        description="Billing form and order summary layout designed to connect cleanly with Firebase-backed flows later."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Checkout" },
        ]}
      />
      <section className="section">
        <div className="container">
          <CheckoutPageClient />
        </div>
      </section>
    </>
  );
}
