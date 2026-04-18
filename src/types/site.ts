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
}

export interface Category {
  id: number;
  name: string;
  href: string;
  image: string;
  description: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: string;
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
