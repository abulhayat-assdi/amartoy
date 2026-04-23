import { blogPosts, categories, features, heroSlides, reviewMediaItems } from "@/data/site";
import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type {
  HomeBlogSection,
  HomeCategoryItem,
  HomeFeatureItem,
  HomeHeroAccent,
  HomeHeroSlide,
  HomePageContent,
  HomePopularProductsSection,
  HomePromoSection,
  HomeReviewMediaItem,
  HomeVideoSection,
} from "@/types/homepage";
import type { BlogPost, Product } from "@/types/site";

const HOMEPAGE_SLUG = "home";
const DEFAULT_FEATURE_ICONS: HomeFeatureItem["icon"][] = [
  "badge-dollar-sign",
  "package-check",
  "shield-check",
  "message-circle",
];

type HomepageRow = {
  content: HomePageContent;
  updated_at?: string;
};

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function clampLimit(value: unknown, fallback = 3) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(6, Math.max(1, Math.round(parsed)));
}

function makeId(prefix: string, fallbackIndex: number) {
  return `${prefix}-${fallbackIndex + 1}`;
}

function normalizeHeroAccent(value: unknown, fallback: HomeHeroAccent = "sky"): HomeHeroAccent {
  return ["sky", "sun", "coral", "mint", "rose"].includes(String(value))
    ? (value as HomeHeroAccent)
    : fallback;
}

function normalizeHeroSlides(value: unknown): HomeHeroSlide[] {
  const fallback = heroSlides.map((slide, index) => ({
    id: makeId("hero", index),
    eyebrow: slide.eyebrow,
    title: slide.title,
    description: slide.description,
    ctaLabel: slide.cta,
    ctaHref: "/shop/",
    imageUrl: slide.image,
    accent: normalizeHeroAccent(slide.accent, "sky"),
  }));

  return ensureList<Partial<HomeHeroSlide>>(value, fallback).map((slide, index) => ({
    id: ensureText(slide?.id, fallback[index]?.id || makeId("hero", index)),
    eyebrow: ensureText(slide?.eyebrow, fallback[index]?.eyebrow || ""),
    title: ensureText(slide?.title, fallback[index]?.title || ""),
    description: ensureText(slide?.description, fallback[index]?.description || ""),
    ctaLabel: ensureText(slide?.ctaLabel, fallback[index]?.ctaLabel || "Discover Now"),
    ctaHref: ensureText(slide?.ctaHref, "/shop/"),
    imageUrl: ensureText(slide?.imageUrl, fallback[index]?.imageUrl || ""),
    accent: normalizeHeroAccent(slide?.accent, fallback[index]?.accent || "sky"),
  }));
}

function normalizeCategories(value: unknown): HomeCategoryItem[] {
  const fallback = categories.map((category, index) => ({
    id: makeId("category", index),
    name: category.name,
    slug: category.slug,
    href: category.href,
    imageUrl: category.image,
    description: category.description,
  }));

  return ensureList<Partial<HomeCategoryItem>>(value, fallback).map((item, index) => ({
    id: ensureText(item?.id, fallback[index]?.id || makeId("category", index)),
    name: ensureText(item?.name, fallback[index]?.name || ""),
    slug: ensureText(item?.slug, fallback[index]?.slug || ""),
    href: ensureText(item?.href, fallback[index]?.href || `/shop/?section=${fallback[index]?.slug || ""}`),
    imageUrl: ensureText(item?.imageUrl, fallback[index]?.imageUrl || ""),
    description: ensureText(item?.description, fallback[index]?.description || ""),
  }));
}

function normalizeReviewMedia(value: unknown): HomeReviewMediaItem[] {
  const fallback = reviewMediaItems.map((item, index) => ({
    id: makeId("review", index),
    type: item.type,
    src: item.src,
    poster: item.poster,
    title: item.title,
    description: item.description,
    author: item.author,
  }));

  return ensureList<Partial<HomeReviewMediaItem>>(value, fallback).map((item, index) => ({
    id: ensureText(item?.id, fallback[index]?.id || makeId("review", index)),
    type: item?.type === "video" ? "video" : "image",
    src: ensureText(item?.src, fallback[index]?.src || ""),
    poster: ensureText(item?.poster, fallback[index]?.poster || ""),
    title: ensureText(item?.title, fallback[index]?.title || ""),
    description: ensureText(item?.description, fallback[index]?.description || ""),
    author: ensureText(item?.author, fallback[index]?.author || ""),
  }));
}

function normalizeFeatures(value: unknown): HomeFeatureItem[] {
  const fallback = features.map((item, index) => ({
    id: makeId("feature", index),
    title: item.title,
    subtitle: item.subtitle,
    icon: DEFAULT_FEATURE_ICONS[index] || "shield-check",
  }));

  return ensureList<Partial<HomeFeatureItem>>(value, fallback).map((item, index) => ({
    id: ensureText(item?.id, fallback[index]?.id || makeId("feature", index)),
    title: ensureText(item?.title, fallback[index]?.title || ""),
    subtitle: ensureText(item?.subtitle, fallback[index]?.subtitle || ""),
    icon: DEFAULT_FEATURE_ICONS.includes(item?.icon as HomeFeatureItem["icon"])
      ? (item?.icon as HomeFeatureItem["icon"])
      : fallback[index]?.icon || "shield-check",
  }));
}

function normalizePromoSection(value: unknown): HomePromoSection {
  const input = (value || {}) as Partial<HomePromoSection>;

  return {
    eyebrow: ensureText(input.eyebrow, "Family Moments"),
    title: ensureText(input.title, "Bring joyful play into every afternoon"),
    description: ensureText(
      input.description,
      "Use this large image section for campaigns, seasonal offers, or a short homepage message from the brand.",
    ),
    buttonLabel: ensureText(input.buttonLabel, "Shop Collection"),
    buttonHref: ensureText(input.buttonHref, "/shop/"),
    imageUrl: ensureText(input.imageUrl, "/images/real/happy-outdoors.jpg"),
  };
}

function normalizeVideoSection(value: unknown): HomeVideoSection {
  const input = (value || {}) as Partial<HomeVideoSection>;

  return {
    eyebrow: ensureText(input.eyebrow, "Video Story"),
    title: ensureText(input.title, "A quick look at playtime with AmarToy"),
    description: ensureText(
      input.description,
      "Upload your own MP4 link or paste an embeddable video URL to highlight brand storytelling on the homepage.",
    ),
    videoUrl: ensureText(
      input.videoUrl,
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    ),
    posterUrl: ensureText(input.posterUrl, "/images/real/playroom-toys.jpg"),
  };
}

function normalizePopularProductsSection(value: unknown): HomePopularProductsSection {
  const input = (value || {}) as Partial<HomePopularProductsSection>;
  const fallbackLinks = [
    "/product/skywinder-toy/",
    "/product/excavator-toy/",
    "/product/dolls-trailer/",
    "/product/genius-walker/",
  ];

  return {
    eyebrow: ensureText(input.eyebrow, "Shop AmarToy Toys & Games"),
    title: ensureText(input.title, "Popular in Store"),
    description: ensureText(
      input.description,
      "Pick which products appear on the homepage by adding product page links or direct product slugs.",
    ),
    productLinks: ensureList<string>(input.productLinks, fallbackLinks)
      .map((item) => ensureText(item))
      .filter(Boolean),
  };
}

function normalizeBlogSection(value: unknown): HomeBlogSection {
  const input = (value || {}) as Partial<HomeBlogSection>;

  return {
    eyebrow: ensureText(input.eyebrow, "Our Blog"),
    title: ensureText(input.title, "Latest News"),
    description: ensureText(
      input.description,
      "This section automatically shows the latest published blog posts based on publish date.",
    ),
    limit: clampLimit(input.limit, 3),
  };
}

export const DEFAULT_HOMEPAGE_CONTENT: HomePageContent = {
  heroSlides: normalizeHeroSlides(undefined),
  categories: normalizeCategories(undefined),
  reviewMedia: normalizeReviewMedia(undefined),
  features: normalizeFeatures(undefined),
  promoSection: normalizePromoSection(undefined),
  videoSection: normalizeVideoSection(undefined),
  popularProductsSection: normalizePopularProductsSection(undefined),
  blogSection: normalizeBlogSection(undefined),
};

export function normalizeHomepageContent(value: unknown): HomePageContent {
  const input = (value || {}) as Partial<HomePageContent>;

  return {
    heroSlides: normalizeHeroSlides(input.heroSlides),
    categories: normalizeCategories(input.categories),
    reviewMedia: normalizeReviewMedia(input.reviewMedia),
    features: normalizeFeatures(input.features),
    promoSection: normalizePromoSection(input.promoSection),
    videoSection: normalizeVideoSection(input.videoSection),
    popularProductsSection: normalizePopularProductsSection(input.popularProductsSection),
    blogSection: normalizeBlogSection(input.blogSection),
    updatedAt: ensureText(input.updatedAt),
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_HOMEPAGE_CONTENT;
  }

  try {
    const rows = await supabaseRestRequest<HomepageRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${HOMEPAGE_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_HOMEPAGE_CONTENT;
    }

    return normalizeHomepageContent({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_HOMEPAGE_CONTENT;
  }
}

export async function saveHomePageContent(content: HomePageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving homepage content requires Supabase service role configuration.");
  }

  const normalized = normalizeHomepageContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await supabaseRestRequest(
    "/rest/v1/homepage_content",
    {
      method: "POST",
      headers: {
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        slug: HOMEPAGE_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}

export function extractProductSlugFromLink(input: string) {
  const value = input.trim();
  if (!value) return "";

  const matchedPath = value.match(/\/product\/([^/?#]+)\/?/i);
  if (matchedPath?.[1]) {
    return matchedPath[1];
  }

  return value.replace(/^\/+|\/+$/g, "");
}

export function getHomepagePopularProducts(content: HomePageContent, products: Product[]) {
  const slugs = content.popularProductsSection.productLinks.map(extractProductSlugFromLink).filter(Boolean);
  const matchedProducts = slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean) as Product[];

  if (matchedProducts.length) {
    return matchedProducts;
  }

  return products.slice(0, 8);
}

export function getLatestBlogPosts(posts: BlogPost[], limit: number) {
  return [...posts]
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .slice(0, limit);
}
