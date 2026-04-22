import Link from "next/link";
import { Heart, Package, Settings, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const accountCards = [
  {
    title: "Orders",
    text: "Track recent purchases, delivery state, and successful checkout history.",
    href: "/checkout/",
    icon: Package,
  },
  {
    title: "Cart",
    text: "Jump back into active shopping sessions and unfinished toy selections.",
    href: "/cart/",
    icon: ShoppingBag,
  },
  {
    title: "Wishlist",
    text: "Open saved favorites and move them back into the cart in one tap.",
    href: "/wishlist/",
    icon: Heart,
  },
  {
    title: "Admin Portal",
    text: "Access the recovered management area for content and storefront operations.",
    href: "/admin/login/",
    icon: Settings,
  },
];

export function AccountPageClient() {
  return (
    <section className="section">
      <div className="container">
        <div className="account-intro">
          <div>
            <p className="eyebrow">My Account</p>
            <h2 className="section-heading__title">Your shopper dashboard is back</h2>
            <p>
              This page restores the account area that ties together orders, wishlist, cart activity, and quick
              access to the admin portal.
            </p>
          </div>
          <Button href="/shop/">Continue Shopping</Button>
        </div>

        <div className="grid-4">
          {accountCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link className="detail-card account-card" href={card.href} key={card.title}>
                <span className="account-card__icon">
                  <Icon size={20} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
