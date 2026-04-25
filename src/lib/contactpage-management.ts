import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { ChatSettings, ContactChannel, ContactChannelIcon, ContactPageContent } from "@/types/contactpage";

const CONTACT_SLUG = "contact";

type ContactPageRow = {
  content: ContactPageContent;
  updated_at?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function ensureList<T>(value: unknown, fallback: T[]) {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function ensureNumber(value: unknown, fallback = 20) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function ensureBool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function makeId(prefix: string, index: number) {
  return `${prefix}-${index + 1}`;
}

const VALID_ICONS: ContactChannelIcon[] = ["whatsapp", "messenger", "instagram", "email", "phone"];

function ensureIcon(value: unknown, fallback: ContactChannelIcon = "email"): ContactChannelIcon {
  return VALID_ICONS.includes(value as ContactChannelIcon) ? (value as ContactChannelIcon) : fallback;
}

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULT_CHANNELS: ContactChannel[] = [
  {
    id: "channel-1",
    label: "WhatsApp",
    href: "https://wa.me/8801700000000?text=Hi%20AmarToy%20Support",
    icon: "whatsapp",
    enabled: true,
  },
  {
    id: "channel-2",
    label: "Messenger",
    href: "https://m.me/amartoy",
    icon: "messenger",
    enabled: true,
  },
  {
    id: "channel-3",
    label: "Instagram",
    href: "https://www.instagram.com/amartoy",
    icon: "instagram",
    enabled: true,
  },
  {
    id: "channel-4",
    label: "Email",
    href: "mailto:support@amartoy.com?subject=Support%20Request",
    icon: "email",
    enabled: true,
  },
  {
    id: "channel-5",
    label: "Call",
    href: "tel:+18408412569",
    icon: "phone",
    enabled: true,
  },
];

const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  avatarLetter: "A",
  brandName: "AmarToy",
  supportStatusText: "Live Support",
  welcomeMessage: "Assalamu Alaikum, welcome to AmarToy. How can we help you?",
  composerPlaceholder: "Compose your message...",
  statusBarText: "Bangla + English supported",
  chatButtonLabel: "Please Chat",
  maxAttachmentMb: 20,
};

export const DEFAULT_CONTACT_CONTENT: ContactPageContent = {
  channels: DEFAULT_CHANNELS,
  chatSettings: DEFAULT_CHAT_SETTINGS,
};

// ─── Normalizers ──────────────────────────────────────────────────────────────

function normalizeChannel(item: Partial<ContactChannel>, index: number): ContactChannel {
  const fallback = DEFAULT_CHANNELS[index];
  return {
    id: ensureText(item?.id, fallback?.id || makeId("channel", index)),
    label: ensureText(item?.label, fallback?.label || ""),
    href: ensureText(item?.href, fallback?.href || ""),
    icon: ensureIcon(item?.icon, fallback?.icon || "email"),
    enabled: ensureBool(item?.enabled, true),
  };
}

function normalizeChannels(value: unknown): ContactChannel[] {
  return ensureList<Partial<ContactChannel>>(value, DEFAULT_CHANNELS).map(normalizeChannel);
}

function normalizeChatSettings(value: unknown): ChatSettings {
  const input = (value || {}) as Partial<ChatSettings>;
  return {
    avatarLetter: ensureText(input.avatarLetter, DEFAULT_CHAT_SETTINGS.avatarLetter),
    brandName: ensureText(input.brandName, DEFAULT_CHAT_SETTINGS.brandName),
    supportStatusText: ensureText(input.supportStatusText, DEFAULT_CHAT_SETTINGS.supportStatusText),
    welcomeMessage: ensureText(input.welcomeMessage, DEFAULT_CHAT_SETTINGS.welcomeMessage),
    composerPlaceholder: ensureText(input.composerPlaceholder, DEFAULT_CHAT_SETTINGS.composerPlaceholder),
    statusBarText: ensureText(input.statusBarText, DEFAULT_CHAT_SETTINGS.statusBarText),
    chatButtonLabel: ensureText(input.chatButtonLabel, DEFAULT_CHAT_SETTINGS.chatButtonLabel),
    maxAttachmentMb: ensureNumber(input.maxAttachmentMb, DEFAULT_CHAT_SETTINGS.maxAttachmentMb),
  };
}

export function normalizeContactContent(value: unknown): ContactPageContent {
  const input = (value || {}) as Partial<ContactPageContent>;
  return {
    channels: normalizeChannels(input.channels),
    chatSettings: normalizeChatSettings(input.chatSettings),
    updatedAt: ensureText(input.updatedAt),
  };
}

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function getContactPageContent(): Promise<ContactPageContent> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_CONTACT_CONTENT;
  }

  try {
    const rows = await supabaseRestRequest<ContactPageRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${CONTACT_SLUG}&limit=1`,
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_CONTACT_CONTENT;
    }

    return normalizeContactContent({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_CONTACT_CONTENT;
  }
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function saveContactPageContent(content: ContactPageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Contact page content requires Supabase service role configuration.");
  }

  const normalized = normalizeContactContent({
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
        slug: CONTACT_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true,
  );

  return normalized;
}
