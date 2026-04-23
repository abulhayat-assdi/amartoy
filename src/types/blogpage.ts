// ─── Blog Post ───────────────────────────────────────────────────────────────

export interface BlogPostItem {
  id: string;
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
  published: boolean;
}

// ─── Blog Page Header ─────────────────────────────────────────────────────────

export interface BlogPageHeader {
  eyebrow: string;
  title: string;
  description: string;
}

// ─── Blog Sidebar Banner ─────────────────────────────────────────────────────

export interface BlogSidebarBanner {
  imageUrl: string;
  brandLabel: string;
  tagline: string;
  href: string;
}

// ─── Full Blog Page Content ───────────────────────────────────────────────────

export interface BlogPageContent {
  header: BlogPageHeader;
  posts: BlogPostItem[];
  sidebarBanner: BlogSidebarBanner;
  updatedAt?: string;
}
