import { company, navigation } from "@/data/site";
import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { GlobalSettings, NavLink, SocialLink } from "@/types/globalsettings";

const SETTINGS_SLUG = "global-settings";

type SettingsRow = {
  content: GlobalSettings;
  updated_at?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function makeId(prefix: string, index: number) {
  return `${prefix}-${index + 1}`;
}

// ─── Default values from hardcoded data ───────────────────────────────────────

const DEFAULT_HEADER_NAV: NavLink[] = navigation.map((nav, index) => ({
  id: makeId("nav", index),
  label: nav.label,
  href: nav.href,
  children: nav.children?.map((child, cIndex) => ({
    id: makeId(`nav-${index}-child`, cIndex),
    label: child.label,
    href: child.href,
  })),
}));

const DEFAULT_QUICK_LINKS: NavLink[] = [
  { id: "ql-1", label: "Shop", href: "/shop/" },
  { id: "ql-2", label: "Offers", href: "/shop/" },
  { id: "ql-3", label: "All Products", href: "/shop/" },
  { id: "ql-4", label: "Blog", href: "/blog/" },
];

const DEFAULT_BUSINESS_LINKS: NavLink[] = [
  { id: "bl-1", label: "About us", href: "/about/" },
  { id: "bl-2", label: "Contact us", href: "/contact/" },
  { id: "bl-3", label: "Privacy Policy", href: "/contact/" },
  { id: "bl-4", label: "Terms & Conditions", href: "/contact/" },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { id: "sl-1", label: "Facebook", href: company.developerUrl, icon: "facebook" },
  { id: "sl-2", label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { id: "sl-3", label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { id: "sl-4", label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
];

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  brandName: company.name,
  brandTagline: "Toys and Games",
  logoUrl: "",
  phone: company.phone,
  secondaryPhone: company.secondaryPhone,
  email: company.email,
  supportEmail: company.supportEmail,
  address: company.address,
  shortAddress: company.shortAddress,
  city: company.city,
  website: company.website,
  developerName: company.developerName,
  developerUrl: company.developerUrl,
  headerNav: DEFAULT_HEADER_NAV,
  footerDescription: "Your trusted destination for playful products, dependable service, and a smooth shopping experience for families across Bangladesh.",
  quickLinks: DEFAULT_QUICK_LINKS,
  businessLinks: DEFAULT_BUSINESS_LINKS,
  socialLinks: DEFAULT_SOCIAL_LINKS,
};

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeNavLink(item: Partial<NavLink>, index: number): NavLink {
  return {
    id: ensureText(item?.id, makeId("navlink", index)),
    label: ensureText(item?.label, "New Link"),
    href: ensureText(item?.href, "/"),
    children: Array.isArray(item?.children) ? item.children.map((c, i) => normalizeNavLink(c, i)) : undefined,
  };
}

function normalizeNavLinks(value: unknown, fallback: NavLink[]): NavLink[] {
  return ensureList<Partial<NavLink>>(value, fallback).map(normalizeNavLink);
}

function normalizeSocialLink(item: Partial<SocialLink>, index: number): SocialLink {
  return {
    id: ensureText(item?.id, makeId("social", index)),
    label: ensureText(item?.label, "Social"),
    href: ensureText(item?.href, "#"),
    icon: ensureText(item?.icon, "facebook"),
  };
}

function normalizeSocialLinks(value: unknown, fallback: SocialLink[]): SocialLink[] {
  return ensureList<Partial<SocialLink>>(value, fallback).map(normalizeSocialLink);
}

export function normalizeGlobalSettings(value: unknown): GlobalSettings {
  const input = (value || {}) as Partial<GlobalSettings>;
  return {
    brandName: ensureText(input.brandName, DEFAULT_GLOBAL_SETTINGS.brandName),
    brandTagline: ensureText(input.brandTagline, DEFAULT_GLOBAL_SETTINGS.brandTagline),
    logoUrl: ensureText(input.logoUrl, ""),
    phone: ensureText(input.phone, DEFAULT_GLOBAL_SETTINGS.phone),
    secondaryPhone: ensureText(input.secondaryPhone, DEFAULT_GLOBAL_SETTINGS.secondaryPhone),
    email: ensureText(input.email, DEFAULT_GLOBAL_SETTINGS.email),
    supportEmail: ensureText(input.supportEmail, DEFAULT_GLOBAL_SETTINGS.supportEmail),
    address: ensureText(input.address, DEFAULT_GLOBAL_SETTINGS.address),
    shortAddress: ensureText(input.shortAddress, DEFAULT_GLOBAL_SETTINGS.shortAddress),
    city: ensureText(input.city, DEFAULT_GLOBAL_SETTINGS.city),
    website: ensureText(input.website, DEFAULT_GLOBAL_SETTINGS.website),
    developerName: ensureText(input.developerName, DEFAULT_GLOBAL_SETTINGS.developerName),
    developerUrl: ensureText(input.developerUrl, DEFAULT_GLOBAL_SETTINGS.developerUrl),
    headerNav: normalizeNavLinks(input.headerNav, DEFAULT_GLOBAL_SETTINGS.headerNav),
    footerDescription: ensureText(input.footerDescription, DEFAULT_GLOBAL_SETTINGS.footerDescription),
    quickLinks: normalizeNavLinks(input.quickLinks, DEFAULT_GLOBAL_SETTINGS.quickLinks),
    businessLinks: normalizeNavLinks(input.businessLinks, DEFAULT_GLOBAL_SETTINGS.businessLinks),
    socialLinks: normalizeSocialLinks(input.socialLinks, DEFAULT_GLOBAL_SETTINGS.socialLinks),
    updatedAt: ensureText(input.updatedAt),
  };
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getGlobalSettings(): Promise<GlobalSettings> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_GLOBAL_SETTINGS;
  }

  try {
    const rows = await supabaseRestRequest<SettingsRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${SETTINGS_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_GLOBAL_SETTINGS;
    }

    return normalizeGlobalSettings({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_GLOBAL_SETTINGS;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function saveGlobalSettings(content: GlobalSettings) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Global Settings requires Supabase service role configuration.");
  }

  const normalized = normalizeGlobalSettings({
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
        slug: SETTINGS_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}
