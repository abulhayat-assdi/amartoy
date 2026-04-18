import { WishlistPageClient } from "@/components/pages/wishlist-page-client";
import { PageHero } from "@/components/ui/page-hero";

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Saved Favourites"
        title="Wishlist"
        description="A full-width wishlist table with stock badges and quick add-to-cart actions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Wishlist" },
        ]}
      />
      <section className="section">
        <div className="container">
          <WishlistPageClient />
        </div>
      </section>
    </>
  );
}
