// ─── Shop CMS Types ────────────────────────────────────────────────────────────

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  tags: string[];
  saleLabel: string | null;
  rating: number;
  stock: string;
  sku: string;
  enabled: boolean;
}

export interface ShopCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  enabled: boolean;
}

export interface ShopSettings {
  shopTitle: string;
  shopEyebrow: string;
  shopDescription: string;
  itemsPerPage: number;
  currency: string;
  shippingInsideDhaka: number;
  shippingOutsideDhaka: number;
}

export interface ShopPageContent {
  products: ShopProduct[];
  categories: ShopCategory[];
  settings: ShopSettings;
  updatedAt?: string;
}
