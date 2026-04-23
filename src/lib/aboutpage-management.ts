import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { AboutHeroSection, AboutHighlightItem, AboutPageContent } from "@/types/aboutpage";

const ABOUT_SLUG = "about";

type AboutPageRow = {
  content: AboutPageContent;
  updated_at?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function makeId(prefix: string, fallbackIndex: number) {
  return `${prefix}-${fallbackIndex + 1}`;
}

// ─── Default values (mirrors the static about page data) ─────────────────────

const DEFAULT_HERO: AboutHeroSection = {
  eyebrow: "About AmarToy",
  title: "We are doing more than you expect",
  paragraph1:
    "Welcome to AmarToy, where every collection is shaped around safe play, imagination, and dependable service for families across Dhaka. What started as a simple goal to make toy shopping easier has grown into an online store focused on joyful discovery and trusted quality.",
  paragraph2:
    "We believe the best children's products bring together creativity, comfort, and long-lasting value. That is why we handpick toys that feel fun, giftable, and practical for everyday moments, from learning through play to celebrating special milestones.",
  paragraph3:
    "Our mission is to make each order feel easy and reassuring, whether you are choosing a birthday surprise or stocking up on family favorites. With responsive service, curated selections, and fast delivery, we work to give parents a smoother shopping experience from start to finish.",
  signature: "AmarToy Store",
  imageUrl: "/images/real/kids-playroom.jpg",
  badgeNumber: "1+",
  badgeLabel: "Years Experience",
};

const DEFAULT_HIGHLIGHTS: AboutHighlightItem[] = [
  {
    id: "highlight-1",
    number: "01",
    title: "We are online store located in the Dhaka city",
    description:
      "Experience a toy shop designed for busy families, with playful products and a smooth online ordering journey.",
  },
  {
    id: "highlight-2",
    number: "02",
    title: "Freshly curated toy collections",
    description:
      "We carefully choose safe, joyful, and age-friendly toys so every collection feels thoughtful and exciting.",
  },
  {
    id: "highlight-3",
    number: "03",
    title: "Next day delivery in Dhaka city",
    description:
      "Fast local fulfillment helps families receive gift-worthy picks and everyday favorites right on time.",
  },
  {
    id: "highlight-4",
    number: "04",
    title: "Professional, experienced team",
    description:
      "Our team is focused on dependable service, helpful guidance, and a shopping experience parents can trust.",
  },
  {
    id: "highlight-5",
    number: "05",
    title: "The highest standards of service",
    description:
      "From order confirmation to delivery updates, we work to keep each customer touchpoint clear and reliable.",
  },
  {
    id: "highlight-6",
    number: "06",
    title: "Cash on delivery available",
    description:
      "Flexible payment options make ordering simpler, especially for families who prefer to pay at the doorstep.",
  },
];

export const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  heroSection: DEFAULT_HERO,
  highlights: DEFAULT_HIGHLIGHTS,
};

// ─── Normalizers ─────────────────────────────────────────────────────────────

function normalizeHeroSection(value: unknown): AboutHeroSection {
  const input = (value || {}) as Partial<AboutHeroSection>;

  return {
    eyebrow: ensureText(input.eyebrow, DEFAULT_HERO.eyebrow),
    title: ensureText(input.title, DEFAULT_HERO.title),
    paragraph1: ensureText(input.paragraph1, DEFAULT_HERO.paragraph1),
    paragraph2: ensureText(input.paragraph2, DEFAULT_HERO.paragraph2),
    paragraph3: ensureText(input.paragraph3, DEFAULT_HERO.paragraph3),
    signature: ensureText(input.signature, DEFAULT_HERO.signature),
    imageUrl: ensureText(input.imageUrl, DEFAULT_HERO.imageUrl),
    badgeNumber: ensureText(input.badgeNumber, DEFAULT_HERO.badgeNumber),
    badgeLabel: ensureText(input.badgeLabel, DEFAULT_HERO.badgeLabel),
  };
}

function normalizeHighlights(value: unknown): AboutHighlightItem[] {
  return ensureList<Partial<AboutHighlightItem>>(value, DEFAULT_HIGHLIGHTS).map((item, index) => ({
    id: ensureText(item?.id, DEFAULT_HIGHLIGHTS[index]?.id || makeId("highlight", index)),
    number: ensureText(item?.number, DEFAULT_HIGHLIGHTS[index]?.number || String(index + 1).padStart(2, "0")),
    title: ensureText(item?.title, DEFAULT_HIGHLIGHTS[index]?.title || ""),
    description: ensureText(item?.description, DEFAULT_HIGHLIGHTS[index]?.description || ""),
  }));
}

export function normalizeAboutContent(value: unknown): AboutPageContent {
  const input = (value || {}) as Partial<AboutPageContent>;

  return {
    heroSection: normalizeHeroSection(input.heroSection),
    highlights: normalizeHighlights(input.highlights),
    updatedAt: ensureText(input.updatedAt),
  };
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getAboutPageContent(): Promise<AboutPageContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_ABOUT_CONTENT;
  }

  try {
    const rows = await supabaseRestRequest<AboutPageRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${ABOUT_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_ABOUT_CONTENT;
    }

    return normalizeAboutContent({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_ABOUT_CONTENT;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function saveAboutPageContent(content: AboutPageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving About page content requires Supabase service role configuration.");
  }

  const normalized = normalizeAboutContent({
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
        slug: ABOUT_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}
