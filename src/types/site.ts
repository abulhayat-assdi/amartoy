export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  author: string;
  authorImage: string;
  intro: string;
  paragraphs: string[];
  quote: string;
  detailImage: string;
  tags: string[];
  likes: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  href: string;
  image: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface ProductMedia {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
}

export interface ReviewMediaItem {
  id: number;
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  description: string;
  author: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: string;
  media?: ProductMedia[];
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  accent: string;
  artwork: string;
  tags: string[];
  saleLabel: string | null;
  rating: number;
  stock: string;
  sku: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}
