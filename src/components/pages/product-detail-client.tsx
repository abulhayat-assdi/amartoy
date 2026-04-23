"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  BadgeCheck,
  ChevronDown,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { useStore } from "@/components/providers/store-provider";
import { company } from "@/data/site";
import type { Product } from "@/types/site";

interface ProductReview {
  id: string;
  author: string;
  title: string;
  text: string;
  rating: number;
  date: string;
  location: string;
}

function WhatsAppIcon(props: { size?: number }) {
  const { size = 30 } = props;

  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <path
        d="M12.02 3.2a8.77 8.77 0 0 0-7.52 13.3L3.2 20.8l4.42-1.27a8.77 8.77 0 1 0 4.4-16.33Z"
        fill="#25D366"
      />
      <path
        d="m7.65 18.32.35-1.3a6.25 6.25 0 1 1 2.88 1.08 6.2 6.2 0 0 1-3.23-.9Z"
        fill="#fff"
      />
      <path
        d="M15.35 13.88c-.2-.1-1.18-.58-1.36-.64-.18-.07-.3-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.22.15-.42.05a5.1 5.1 0 0 1-1.5-.92 5.62 5.62 0 0 1-1.04-1.3c-.1-.18 0-.28.08-.38.1-.1.2-.23.3-.35.1-.11.13-.2.2-.34.07-.13.03-.26-.02-.36-.05-.1-.44-1.08-.6-1.48-.16-.39-.33-.33-.44-.33h-.38c-.13 0-.35.05-.53.25-.18.2-.69.67-.69 1.63 0 .96.7 1.89.8 2.02.1.13 1.37 2.08 3.3 2.92.46.2.82.31 1.1.4.47.15.9.13 1.24.08.38-.05 1.18-.48 1.35-.95.17-.46.17-.86.12-.95-.05-.08-.18-.13-.38-.23Z"
        fill="#25D366"
      />
    </svg>
  );
}

function MessengerIcon(props: { size?: number }) {
  const { size = 30 } = props;

  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <path
        d="M12 3.5c-4.76 0-8.5 3.49-8.5 8.2 0 2.69 1.22 5.04 3.21 6.62V21l2.53-1.4c.87.24 1.8.37 2.76.37 4.76 0 8.5-3.49 8.5-8.2s-3.74-8.27-8.5-8.27Z"
        fill="url(#messenger-gradient)"
      />
      <path
        d="m7.88 14.58 2.48-2.62 1.9 1.52 2.53-2.62-2.79 1.48-1.86-1.48-2.26 3.72Z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="messenger-gradient" x1="5.2" x2="18.8" y1="18.9" y2="5.1" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0099FF" />
          <stop offset="1" stopColor="#A033FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type ProductTab = "details" | "reviews";

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>("details");
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showAllHighlights, setShowAllHighlights] = useState(false);

  const mediaItems = useMemo(
    () =>
      product.media && product.media.length
        ? product.media.slice(0, 6)
        : Array.from({ length: 5 }, (_, index) => ({
            type: "image" as const,
            src: product.image,
            alt: `${product.name} view ${index + 1}`,
          })),
    [product.image, product.media, product.name],
  );

  const reviews: ProductReview[] = useMemo(
    () => [
      {
        id: `${product.id}-review-1`,
        author: "Rory K.",
        title: "Fun and durable",
        text: `I bought the ${product.name} as a gift and the kids jumped into play immediately. The colors are vibrant and the finish feels sturdy enough for regular use.`,
        rating: 5,
        date: "April 18, 2026",
        location: "the United States",
      },
      {
        id: `${product.id}-review-2`,
        author: "Jennifer L. Eppler",
        title: "Good for young children.",
        text: `Simple idea, really nice execution. It kept the children busy for a long time and even the adults were curious enough to try it.`,
        rating: 5,
        date: "February 25, 2026",
        location: "the United States",
      },
      {
        id: `${product.id}-review-3`,
        author: "jo",
        title: "Great for sensory children",
        text: `The tactile feel is the best part. It is quiet, colorful, and easy to hand over as a quick calming activity during the day.`,
        rating: 5,
        date: "March 20, 2026",
        location: "the United States",
      },
      {
        id: `${product.id}-review-4`,
        author: "Matilda",
        title: "Looks great in person",
        text: `The product matches the photos well and feels more premium than I expected. Delivery was smooth and the packaging arrived in good condition.`,
        rating: 4,
        date: "December 31, 2025",
        location: "Australia",
      },
    ],
    [product.id, product.name],
  );

  const activeMedia = mediaItems[activeMediaIndex] ?? mediaItems[0];
  const ratingCount = reviews.length * 46;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const highlights = [
    `Designed around ${product.category.toLowerCase()} play with a polished, gift-ready finish.`,
    `${product.description} The form factor feels easy to hold, store, and carry.`,
    `Rounded edges, dependable materials, and a kid-friendly silhouette make it comfortable for everyday use.`,
    `Works well for home play, gifting, and display thanks to the bright AmarToy styling.`,
    `Pairs nicely with other items in the ${product.category} collection for a fuller play setup.`,
  ];

  const visibleHighlights = showAllHighlights ? highlights : highlights.slice(0, 4);

  useEffect(() => {
    setActiveMediaIndex(0);
    setActiveTab("details");
    setShowAllHighlights(false);
  }, [product.id]);

  useEffect(() => {
    if (mediaItems.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveMediaIndex((currentIndex) => (currentIndex + 1) % mediaItems.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [mediaItems.length]);

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    router.push("/checkout/");
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="product-detail-shell">
      <div className="product-detail product-detail--marketplace">
        <section className="product-gallery product-gallery--marketplace">
          <div className="product-gallery__stage">
            <div className="product-gallery__thumbs" aria-label="Product gallery thumbnails">
              {mediaItems.map((item, index) => (
                <button
                  className={clsx("product-gallery__thumb", index === activeMediaIndex && "is-active")}
                  key={`${item.src}-${index}`}
                  type="button"
                  aria-label={`Show ${product.name} image ${index + 1}`}
                  onClick={() => setActiveMediaIndex(index)}
                >
                  {item.type === "video" ? (
                    <div className="product-gallery__thumb-video">
                      <video className="product-gallery__thumb-media" muted playsInline preload="metadata">
                        <source src={item.src} />
                      </video>
                      <span>Video</span>
                    </div>
                  ) : (
                    <img
                      alt={item.alt || `${product.name} preview ${index + 1}`}
                      className="product-gallery__thumb-media"
                      loading="lazy"
                      src={item.src}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="product-gallery__main">
              {activeMedia.type === "video" ? (
                <video
                  className="product-gallery__media"
                  controls
                  poster={activeMedia.poster}
                  preload="metadata"
                >
                  <source src={activeMedia.src} />
                </video>
              ) : (
                <img
                  alt={activeMedia.alt || product.name}
                  className="product-gallery__media"
                  loading="eager"
                  src={activeMedia.src}
                />
              )}
            </div>
          </div>

          <div className="product-gallery__mobileActions">
            <button className="product-icon-btn" type="button" aria-label="Save to wishlist">
              <Heart size={20} />
            </button>
            <button className="product-icon-btn" type="button" aria-label="Share product">
              <Share2 size={20} />
            </button>
          </div>

          <div className="product-gallery__dots" aria-label="Mobile image navigation">
            {mediaItems.map((item, index) => (
              <button
                key={`${item.src}-dot-${index}`}
                className={clsx("product-gallery__dot", index === activeMediaIndex && "is-active")}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveMediaIndex(index)}
              />
            ))}
          </div>
        </section>

        <section className="product-detail__content">
          <div className="product-brand-row">
            <div>
              <strong>{product.category}</strong>
              <a href={`/shop/${product.categorySlug}/`}>Visit the Store</a>
            </div>
            <div className="product-rating-inline">
              <span>{product.rating.toFixed(1)}</span>
              <div className="product-stars" aria-label={`${product.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < Math.round(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span>({ratingCount})</span>
            </div>
          </div>

          <h1 className="product-detail__title">{product.name}</h1>

          {product.saleLabel ? (
            <div className="product-badges">
              <span className="product-badge product-badge--deal">{product.saleLabel}</span>
            </div>
          ) : null}

          <div className="product-price-cluster">
            {discount > 0 ? <span className="product-price-cluster__discount">-{discount}%</span> : null}
            <div className="product-price-cluster__main">
              <CurrencyDisplay amount={product.price} className="product-card__price product-card__price--hero" />
              {product.originalPrice ? (
                <CurrencyDisplay
                  amount={product.originalPrice}
                  className="product-card__price product-card__price--original"
                />
              ) : null}
            </div>
          </div>

          <p className="product-lead">{product.shortDescription}</p>

          <div className="product-trust-strip">
            <div>
              <Truck size={18} />
              <span>Fast delivery across Bangladesh</span>
            </div>
            <div>
              <ShieldCheck size={18} />
              <span>Quality checked before dispatch</span>
            </div>
            <div>
              <BadgeCheck size={18} />
              <span>Official AmarToy collection</span>
            </div>
          </div>

          <div className="product-highlight-card">
            <h2>Top highlights</h2>
            <ul className="product-highlight-list">
              {visibleHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {highlights.length > 4 ? (
              <button
                className="product-highlight-card__toggle"
                type="button"
                onClick={() => setShowAllHighlights((current) => !current)}
              >
                {showAllHighlights ? "See less" : "See more"}
              </button>
            ) : null}
          </div>
        </section>

        <aside className="detail-card product-purchase-card">
          <div className="product-purchase-card__price">
            <CurrencyDisplay amount={product.price} className="product-card__price product-card__price--purchase" />
            {product.originalPrice ? (
              <span className="product-purchase-card__save">Save {discount}% on this item</span>
            ) : null}
          </div>

          <div className="product-purchase-card__delivery">
            <p>Shipping calculated at checkout for your selected address.</p>
            <p>
              Estimated delivery in <strong>2-4 business days</strong>
            </p>
          </div>

          <div className="product-purchase-card__address">
            <MapPin size={18} />
            <span>Deliver in Bangladesh</span>
          </div>

          <p className="product-purchase-card__stock">{product.stock}</p>

          <label className="product-purchase-card__qty">
            <span>Quantity</span>
            <div className="qty-stepper">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                -
              </button>
              <input readOnly value={quantity} />
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}>
                +
              </button>
            </div>
          </label>

          <Button className="product-purchase-card__cta" variant="secondary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button className="product-purchase-card__cta" onClick={handleBuyNow}>
            <ShoppingBag size={16} />
            Buy Now
          </Button>

          <div className="product-purchase-card__contacts" aria-label="Contact options">
            <a
              aria-label="Chat on WhatsApp"
              className="product-purchase-card__contact"
              href={`https://wa.me/${company.phone.replace(/[^\d]/g, "")}?text=Hi%20AmarToy`}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsAppIcon size={30} />
            </a>
            <a
              aria-label="Chat on Messenger"
              className="product-purchase-card__contact"
              href="https://m.me/amartoy"
              rel="noreferrer"
              target="_blank"
            >
              <MessengerIcon size={30} />
            </a>
          </div>

          <div className="product-purchase-card__meta">
            <span>SKU: {product.sku}</span>
            <span>Category: {product.category}</span>
          </div>
        </aside>
      </div>

      <div className="product-detail-sections">
        <div className="product-tabs product-tabs--marketplace">
          <button
            className={activeTab === "details" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>

        <div className="product-detail-sections__grid">
          <section
            className={clsx(
              "detail-card product-detail-section product-detail-section--details",
              activeTab !== "details" && "is-mobile-hidden",
            )}
          >
            <h2>Product details</h2>

            <div className="product-spec-grid">
              <div className="product-spec-card">
                <span>Best for</span>
                <strong>{product.category} collection</strong>
              </div>
              <div className="product-spec-card">
                <span>Theme</span>
                <strong>{product.tags.slice(0, 2).join(" · ")}</strong>
              </div>
              <div className="product-spec-card">
                <span>Finish</span>
                <strong>Child-safe rounded form</strong>
              </div>
              <div className="product-spec-card">
                <span>Availability</span>
                <strong>{product.stock}</strong>
              </div>
            </div>

            <div className="product-detail-copy">
              <h3>About this item</h3>
              <p>{product.description}</p>
              <p>
                Crafted to match the bright AmarToy storefront experience, this layout keeps the most important buying
                information visible while still giving enough detail for parents and gift buyers.
              </p>
            </div>
          </section>

          <section
            className={clsx(
              "detail-card product-detail-section product-detail-section--reviews",
              activeTab !== "reviews" && "is-mobile-hidden",
            )}
          >
            <div className="product-reviews__header product-reviews__header--summary">
              <div className="product-reviews__count">
                <strong>Customer reviews</strong>
                <span>
                  {product.rating.toFixed(1)} out of 5 based on {ratingCount} ratings
                </span>
              </div>
            </div>

            <div className="review-summary-grid">
              <div className="review-summary-bars">
                {[79, 13, 5, 2, 1].map((value, index) => (
                  <div className="review-summary-bars__row" key={index}>
                    <span>{5 - index} star</span>
                    <div className="review-summary-bars__track">
                      <div className="review-summary-bars__fill" style={{ width: `${value}%` }} />
                    </div>
                    <strong>{value}%</strong>
                  </div>
                ))}
              </div>

              <div className="review-summary-callout">
                <h3>Customers say</h3>
                <p>
                  Buyers appreciate the playful finish, durable build, and easy-to-love presentation. The bright
                  styling stands out most for gifting and everyday play.
                </p>
              </div>
            </div>

            <div className="review-media-strip">
              {mediaItems.slice(0, 5).map((item, index) => (
                <button
                  className="review-media-strip__item"
                  key={`${item.src}-review-${index}`}
                  type="button"
                  onClick={() => setActiveMediaIndex(index)}
                >
                  <img alt={item.alt || `${product.name} review media ${index + 1}`} src={item.src} />
                </button>
              ))}
            </div>

            <div className="review-list">
              {reviews.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-card__avatar">{review.author.charAt(0)}</div>
                  <div className="review-card__body">
                    <strong>{review.author}</strong>
                    <div className="product-stars review-card__stars" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          size={15}
                          fill={index < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                      <span>Verified Purchase</span>
                    </div>
                    <h4>{review.title}</h4>
                    <p>
                      Reviewed in {review.location} on {review.date}
                    </p>
                    <p>{review.text}</p>
                    <div className="review-card__actions">
                      <button type="button">Helpful</button>
                      <button type="button">Share</button>
                      <button type="button">Report</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button className="product-more-link" type="button">
              See more reviews <ChevronDown size={16} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
