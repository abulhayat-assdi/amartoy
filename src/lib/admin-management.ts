import { isSupabaseConfigured, isSupabaseWriteConfigured, supabaseRestRequest } from "@/lib/supabase-rest";
import type { AdminManagementConfig, AdminProfile, AdminPermission } from "@/types/admin-management";
import { adminNavigation } from "@/data/admin";

const ADMIN_SLUG = "admin-profiles";

type ConfigRow = {
  content: AdminManagementConfig;
  updated_at?: string;
};

export const DEFAULT_ADMIN_CONFIG: AdminManagementConfig = {
  admins: [],
};

export function normalizeAdminConfig(value: unknown): AdminManagementConfig {
  const input = (value || {}) as Partial<AdminManagementConfig>;
  return {
    admins: Array.isArray(input.admins) ? input.admins : [],
    updatedAt: input.updatedAt || new Date().toISOString(),
  };
}

export async function getAdminConfig(): Promise<AdminManagementConfig> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_ADMIN_CONFIG;
  }

  try {
    const rows = await supabaseRestRequest<ConfigRow[]>(
      `/rest/v1/homepage_content?select=content,updated_at&slug=eq.${ADMIN_SLUG}&limit=1`
    );
    const row = rows[0];

    if (!row?.content) {
      return DEFAULT_ADMIN_CONFIG;
    }

    return normalizeAdminConfig({
      ...row.content,
      updatedAt: row.updated_at,
    });
  } catch {
    return DEFAULT_ADMIN_CONFIG;
  }
}

export async function saveAdminConfig(config: AdminManagementConfig) {
  if (!isSupabaseWriteConfigured()) {
    throw new Error("Saving admin profiles requires Supabase service role configuration.");
  }

  const normalized = normalizeAdminConfig({
    ...config,
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
        slug: ADMIN_SLUG,
        content: normalized,
        updated_at: normalized.updatedAt,
      }),
    },
    true
  );

  return normalized;
}

export async function verifyAdminAccess(email: string | undefined): Promise<AdminProfile | null> {
  if (!email) return null;
  
  const config = await getAdminConfig();
  
  // If no admins exist at all, the first person to log in gets super-admin automatically.
  // This allows initial setup.
  if (config.admins.length === 0) {
    const defaultSuperAdmin: AdminProfile = {
      id: "admin-" + Date.now(),
      name: "Super Admin",
      email: email,
      role: "super-admin",
      permissions: adminNavigation.map(nav => ({
        pageId: nav.label,
        canRead: true,
        canWrite: true
      })),
      createdAt: new Date().toISOString()
    };
    
    // Save it if we can write
    try {
      if (isSupabaseWriteConfigured()) {
        await saveAdminConfig({ admins: [defaultSuperAdmin] });
      }
    } catch(e) {
      // ignore
    }
    return defaultSuperAdmin;
  }
  
  const profile = config.admins.find((admin) => admin.email.toLowerCase() === email.toLowerCase());
  return profile || null;
}
