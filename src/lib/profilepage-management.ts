import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { ProfilePageContent } from "@/types/profilepage";

const PROFILE_SETTINGS_SLUG = "profile-page-settings";

export const DEFAULT_PROFILE_PAGE: ProfilePageContent = {
  pageTitle: "My Dashboard",
  personalInfoTabLabel: "Personal Info",
  ordersTabLabel: "My Orders",
  wishlistTabLabel: "Wishlist",
  cartTabLabel: "Cart",
  emptyOrdersMessage: "You haven't placed any orders yet.",
  emptyWishlistMessage: "Your wishlist is empty.",
  emptyCartMessage: "Your cart is empty.",
  logoutButtonText: "Logout",
};

export async function getProfilePageContent(): Promise<ProfilePageContent> {
  if (!isSupabaseConfigured()) return DEFAULT_PROFILE_PAGE;

  try {
    const rows = await supabaseRestRequest<any[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${PROFILE_SETTINGS_SLUG}&limit=1`,
    );

    const row = rows[0];
    if (!row?.content) return DEFAULT_PROFILE_PAGE;

    return {
      pageTitle: row.content.pageTitle || DEFAULT_PROFILE_PAGE.pageTitle,
      personalInfoTabLabel: row.content.personalInfoTabLabel || DEFAULT_PROFILE_PAGE.personalInfoTabLabel,
      ordersTabLabel: row.content.ordersTabLabel || DEFAULT_PROFILE_PAGE.ordersTabLabel,
      wishlistTabLabel: row.content.wishlistTabLabel || DEFAULT_PROFILE_PAGE.wishlistTabLabel,
      cartTabLabel: row.content.cartTabLabel || DEFAULT_PROFILE_PAGE.cartTabLabel,
      emptyOrdersMessage: row.content.emptyOrdersMessage || DEFAULT_PROFILE_PAGE.emptyOrdersMessage,
      emptyWishlistMessage: row.content.emptyWishlistMessage || DEFAULT_PROFILE_PAGE.emptyWishlistMessage,
      emptyCartMessage: row.content.emptyCartMessage || DEFAULT_PROFILE_PAGE.emptyCartMessage,
      logoutButtonText: row.content.logoutButtonText || DEFAULT_PROFILE_PAGE.logoutButtonText,
      updatedAt: row.updated_at,
    };
  } catch {
    return DEFAULT_PROFILE_PAGE;
  }
}

export async function saveProfilePageContent(content: ProfilePageContent) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving Profile Settings requires Supabase service role configuration.");
  }

  const payload = {
    slug: PROFILE_SETTINGS_SLUG,
    content,
    updated_at: new Date().toISOString(),
  };

  await supabaseRestRequest(
    "/rest/v1/homepage_content",
    {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(payload),
    },
    true,
  );

  return payload;
}
