import {
  BadgeDollarSign,
  LifeBuoy,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "shopping-bag": ShoppingBag,
  truck: Truck,
  "life-buoy": LifeBuoy,
  "badge-dollar-sign": BadgeDollarSign,
};

interface Service {
  title: string;
  text: string;
  icon: keyof typeof icons;
  color: string;
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] || Sparkles;

  return (
    <article className={`service-card service-card--${service.color}`}>
      <div className="service-card__icon">
        <Icon size={30} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <div className="service-card__dots">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}
