// ─── Contact Channel ─────────────────────────────────────────────────────────

export type ContactChannelIcon = "whatsapp" | "messenger" | "instagram" | "email" | "phone";

export interface ContactChannel {
  id: string;
  label: string;
  href: string;
  icon: ContactChannelIcon;
  enabled: boolean;
}

// ─── Chat Settings ────────────────────────────────────────────────────────────

export interface ChatSettings {
  avatarLetter: string;
  brandName: string;
  supportStatusText: string;
  welcomeMessage: string;
  composerPlaceholder: string;
  statusBarText: string;
  chatButtonLabel: string;
  maxAttachmentMb: number;
}

// ─── Full Contact Page Content ────────────────────────────────────────────────

export interface ContactPageContent {
  channels: ContactChannel[];
  chatSettings: ChatSettings;
  updatedAt?: string;
}
