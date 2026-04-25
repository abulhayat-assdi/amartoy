export const dynamic = "force-dynamic";

import { SettingsManagementClient } from "@/components/admin/settings-management-client";
import { getGlobalSettings } from "@/lib/globalsettings-management";

export default async function AdminHeaderFooterPage() {
  const settings = await getGlobalSettings();

  return (
    <SettingsManagementClient
      initialContent={settings}
      updatedAtLabel={settings.updatedAt || "Draft not saved yet"}
    />
  );
}
