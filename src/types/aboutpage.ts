// ─── About Hero Section ────────────────────────────────────────────────────

export interface AboutHeroSection {
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  signature: string;
  imageUrl: string;
  badgeNumber: string;
  badgeLabel: string;
}

// ─── Highlight Item ─────────────────────────────────────────────────────────

export interface AboutHighlightItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

// ─── Full About Page Content ─────────────────────────────────────────────────

export interface AboutPageContent {
  heroSection: AboutHeroSection;
  highlights: AboutHighlightItem[];
  updatedAt?: string;
}
