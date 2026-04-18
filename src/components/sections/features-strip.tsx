import {
  BadgeDollarSign,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { features } from "@/data/site";

const icons = {
  "badge-dollar-sign": BadgeDollarSign,
  "package-check": PackageCheck,
  "shield-check": ShieldCheck,
  "message-circle": MessageCircle,
};

export function FeaturesStrip() {
  return (
    <section className="section features-strip">
      <div className="container features-strip__grid">
        {features.map((feature) => {
          const Icon = icons[feature.icon];

          return (
            <div className="feature-item" key={feature.title}>
              <div className="feature-item__icon">
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
  );
}
