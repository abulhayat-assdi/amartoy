export interface NavLink {
  id: string;
  label: string;
  href: string;
  children?: NavLink[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: string; // 'facebook' | 'youtube' | 'instagram' | 'tiktok'
}

export interface GlobalSettings {
  // Brand
  brandName: string;
  brandTagline: string;
  logoUrl?: string; // Optional custom logo

  // Contact Info
  phone: string;
  secondaryPhone: string;
  email: string;
  supportEmail: string;
  address: string;
  shortAddress: string;
  city: string;
  website: string;

  // Developer Info
  developerName: string;
  developerUrl: string;

  // Header Nav
  headerNav: NavLink[];

  // Footer Nav
  footerDescription: string;
  quickLinks: NavLink[];
  businessLinks: NavLink[];
  socialLinks: SocialLink[];

  updatedAt?: string;
}
