import { products as hardcodedProducts, categories as hardcodedCategories } from "@/data/site";
import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { ShopCategory, ShopPageContent, ShopProduct, ShopSettings } from "@/types/shoppage";

const SHOP_SLUG = "shop";

type ShopPageRow = {
  content: ShopPageContent;
  updated_at?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function ensureNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ensureBool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function makeId(prefix: string, index: number) {
  return `${prefix}-${index + 1}`;
}

// ─── Default values from hardcoded data ───────────────────────────────────────

const DEFAULT_PRODUCTS: ShopProduct[] = hardcodedProducts.map((product, index) => ({
  id: makeId("product", index),
  slug: product.slug,
  name: product.name,
  image: product.image,
  category: product.category,
  categorySlug: product.categorySlug,
  price: product.price,
  originalPrice: product.originalPrice,
  description: product.description,
  shortDescription: product.shortDescription,
  tags: product.tags,
  saleLabel: product.saleLabel,
  rating: product.rating,
  stock: product.stock,
  sku: product.sku,
  enabled: true,
}));

const DEFAULT_CATEGORIES: ShopCategory[] = hardcodedCategories.map((cat, index) => ({
  id: makeId("category", index),
  name: cat.name,
  slug: cat.slug,
  description: cat.description,
  enabled: true,
}));

const DEFAULT_SETTINGS: ShopSettings = {
  shopTitle: "Shop",
  shopEyebrow: "Premium toys curated for joyful everyday play",
  shopDescription: "Browse hand-picked toys, collections, and giftable favorites.",
  itemsPerPage: 12,
  currency: "৳",
  shippingInsideDhaka: 60,
  shippingOutsideDhaka: 120,
};

export const DEFAULT_SHOP_CONTENT: ShopPageContent = {
  products: DEFAULT_PRODUCTS,
  categories: DEFAULT_CATEGORIES,
  settings: DEFAULT_SETTINGS,
};

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeProduct(item: Partial<ShopProduct>, index: number): ShopProduct {
  const fallback = DEFAULT_PRODUCTS[index];
  return {
    id: ensureText(item?.id, fallback?.id || makeId("product", index)),
    slug: ensureText(item?.slug, fallback?.slug || ""),
    name: ensureText(item?.name, fallback?.name || ""),
    image: ensureText(item?.image, fallback?.image || ""),
    category: ensureText(item?.category, fallback?.category || ""),
    categorySlug: ensureText(item?.categorySlug, fallback?.categorySlug || ""),
    price: ensureNumber(item?.price, fallback?.price || 0),
    originalPrice: item?.originalPrice ? ensureNumber(item.originalPrice, 0) : undefined,
    description: ensureText(item?.description, fallback?.description || ""),
    shortDescription: ensureText(item?.shortDescription, fallback?.shortDescription || ""),
    tags: ensureList<string>(item?.tags, fallback?.tags || []),
    saleLabel: item?.saleLabel ? ensureText(item.saleLabel) : null,
    rating: ensureNumber(item?.rating, fallback?.rating || 5),
    stock: ensureText(item?.stock, fallback?.stock || "In stock"),
    sku: ensureText(item?.sku, fallback?.sku || ""),
    enabled: ensureBool(item?.enabled, true),
  };
}

function normalizeProducts(value: unknown): ShopProduct[] {
  return ensureList<Partial<ShopProduct>>(value, DEFAULT_PRODUCTS).map(normalizeProduct);
}

function normalizeCategory(item: Partial<ShopCategory>, index: number): ShopCategory {
  const fallback = DEFAULT_CATEGORIES[index];
  return {
    id: ensureText(item?.id, fallback?.id || makeId("category", index)),
    name: ensureText(item?.name, fallback?.name || ""),
    slug: ensureText(item?.slug, fallback?.slug || ""),
    description: ensureText(item?.description, fallback?.description || ""),
    enabled: ensureBool(item?.enabled, true),
  };
}

function normalizeCategories(value: unknown): ShopCategory[] {
  return ensureList<Partial<ShopCategory>>(value, DEFAULT_CATEGORIES).map(normalizeCategory);
}

function normalizeSettings(value: unknown): ShopSettings {
  const input = (value || {}) as Partial<ShopSettings>;
  return {
    shopTitle: ensureText(input.shopTitle, DEFAULT_SETTINGS.shopTitle),
    shopEyebrow: ensureText(input.shopEyebrow, DEFAULT_SETTINGS.shopEyebrow),
    shopDescription: ensureText(input.shopDescription, DEFAULT_SETTINGS.shopDescription),
    itemsPerPage: ensureNumber(input.itemsPerPage, DEFAULT_SETTINGS.itemsPerPage),
    currency: ensureText(input.currency, DEFAULT_SETTINGS.currency),
    shippingInsideDhaka: ensureNumber(input.shippingInsideDhaka, DEFAULT_SETTINGS.shippingInsideDhaka),
    shippingOutsideDhaka: ensureNumber(input.shippingOutsideDhaka, DEFAULT_SETTINGS.shippingOutsideDhaka),
  };
}

export function normalizeShopContent(value: unknown): ShopPageContent {
  const input = (value || {}) as Partial<ShopPageContent>;
  return {
    products: normalizeProducts(input.products),
    categories: normalizeCategories(input.categories),
    settings: normalizeSettings(input.settings),
    updatedAt: ensureText(input.updatedAt),
  };
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getShopPageContent(): Promise<ShopPageContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_SHOP_CONTENT;
  }

  try {
    const rows = await supabaseRestRequest<ShopPageRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${SHOP_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_SHOP_CONTENT;
    }

    return normalizeShopContent({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_SHOP_CONTENT;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function saveShopPageContent(content: ShopPageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Shop page content requires Supabase service role configuration.");
  }

  const normalized = normalizeShopContent({
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
        slug: SHOP_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}
