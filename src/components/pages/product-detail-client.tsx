"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/components/ui/currency-display";
import { useStore } from "@/components/providers/store-provider";
import type { Product } from "@/types/site";

interface ProductReview {
  id: string;
  author: string;
  text: string;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const { addToCart } = useStore();
  const initialReviews: ProductReview[] = [
    {
      id: `${product.id}-review-1`,
      author: "Nusrat J.",
      text: `My child loved the ${product.name} right away. The quality feels premium and it looks exactly like the photos.`,
    },
    {
      id: `${product.id}-review-2`,
      author: "Rahim A.",
      text: `Delivery was smooth and the ${product.name} feels sturdy enough for everyday play. খুব সুন্দর একটা product.`,
    },
    {
      id: `${product.id}-review-3`,
      author: "Sadia K.",
      text: `This product page made it easy to choose, and the toy itself kept my kid engaged for a long time.`,
    },
  ];
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const mediaItems =
    product.media && product.media.length
      ? product.media.slice(0, 4)
      : Array.from({ length: 4 }, (_, index) => ({
          type: "image" as const,
          src: product.image,
          alt: `${product.name} view ${index + 1}`,
        }));
  const activeMedia = mediaItems[activeMediaIndex] ?? mediaItems[0];

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [product.id]);

  useEffect(() => {
    setReviews(initialReviews);
    setActiveReviewIndex(0);
    setIsReviewFormOpen(false);
    setReviewName("");
    setReviewText("");
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

  useEffect(() => {
    if (reviews.length < 2 || activeTab !== "reviews") {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveReviewIndex((currentIndex) => (currentIndex + 1) % reviews.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [activeTab, reviews.length]);

  const activeReview = reviews[activeReviewIndex] ?? reviews[0];

  const handleReviewSubmit = () => {
    const author = reviewName.trim();
    const text = reviewText.trim();

    if (!author || !text) {
      return;
    }

    const nextReviews = [
      ...reviews,
      {
        id: `${product.id}-review-${Date.now()}`,
        author,
        text,
      },
    ];

    setReviews(nextReviews);
    setActiveReviewIndex(nextReviews.length - 1);
    setReviewName("");
    setReviewText("");
    setIsReviewFormOpen(false);
  };

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="product-gallery__stage">
          <div className="product-gallery__thumbs">
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
      </div>

      <div className="detail-card product-detail__info">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <div className="product-card__price-row">
          {product.originalPrice ? (
            <CurrencyDisplay amount={product.originalPrice} className="product-card__price product-card__price--original" />
          ) : null}
          <CurrencyDisplay amount={product.price} className="product-card__price" />
        </div>
        <p>{product.description}</p>
        <div className="qty-stepper">
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            -
          </button>
          <input readOnly value={quantity} />
          <button type="button" onClick={() => setQuantity((value) => value + 1)}>
            +
          </button>
        </div>
        <Button
          onClick={() => {
            addToCart(product.id, quantity);
            router.push("/checkout/");
          }}
        >
          <ShoppingBag size={16} />
          Buy Now
        </Button>
        <button className="wishlist-link" type="button" onClick={() => addToCart(product.id, quantity)}>
          <ShoppingBag size={18} />
          Add to Cart
        </button>
        <div className="product-meta">
          <span>Product ID: {product.sku}</span>
        </div>

        <div className="product-tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            type="button"
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </div>
        <div className="product-tabs__panel">
          {activeTab === "description" ? (
            <p>
              {product.description} Designed using the AmarToy design system with rounded
              edges, premium spacing, and a product detail layout built for conversion.
            </p>
          ) : (
            <div className="product-reviews">
              <div className="product-reviews__header">
                <div className="product-reviews__count">
                  <strong>{reviews.length} Reviews</strong>
                  <span>Auto-changing every 4 seconds</span>
                </div>
                <Button
                  className="product-reviews__button"
                  variant="outline"
                  onClick={() => setIsReviewFormOpen((current) => !current)}
                >
                  Give Review
                </Button>
              </div>

              <div className="product-review-card">
                <strong>{activeReview.author}</strong>
                <p>{activeReview.text}</p>
              </div>

              <div className="product-reviews__dots" aria-label="Review navigation">
                {reviews.map((review, index) => (
                  <button
                    key={review.id}
                    className={clsx(
                      "product-reviews__dot",
                      index === activeReviewIndex && "is-active",
                    )}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    onClick={() => setActiveReviewIndex(index)}
                  />
                ))}
              </div>

              {isReviewFormOpen ? (
                <div className="product-review-form">
                  <input
                    className="product-review-form__input"
                    placeholder="Your name"
                    type="text"
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                  />
                  <textarea
                    className="product-review-form__textarea"
                    placeholder="Write your review"
                    rows={4}
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                  />
                  <div className="product-review-form__actions">
                    <Button onClick={handleReviewSubmit}>Submit Review</Button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
