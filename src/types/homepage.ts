export type HomeHeroAccent = "sky" | "sun" | "coral" | "mint" | "rose";

export interface HomeHeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  accent: HomeHeroAccent;
}

export interface HomeCategoryItem {
  id: string;
  name: string;
  slug: string;
  href: string;
  imageUrl: string;
  description: string;
}

export interface HomeReviewMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  description: string;
  author: string;
}

export interface HomeFeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: "badge-dollar-sign" | "package-check" | "shield-check" | "message-circle";
}

export interface HomePromoSection {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  imageUrl: string;
}

export interface HomeVideoSection {
  eyebrow: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
}

export interface HomePopularProductsSection {
  eyebrow: string;
  title: string;
  description: string;
  productLinks: string[];
}

export interface HomeBlogSection {
  eyebrow: string;
  title: string;
  description: string;
  limit: number;
}

export interface HomePageContent {
  heroSlides: HomeHeroSlide[];
  categories: HomeCategoryItem[];
  reviewMedia: HomeReviewMediaItem[];
  features: HomeFeatureItem[];
  promoSection: HomePromoSection;
  videoSection: HomeVideoSection;
  popularProductsSection: HomePopularProductsSection;
  blogSection: HomeBlogSection;
  updatedAt?: string;
}
