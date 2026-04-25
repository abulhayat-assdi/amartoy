import { getAdminConfig } from "@/lib/admin-management";
import { AdminManagementClient } from "@/components/admin/admin-management-client";

export const metadata = {
  title: "Admin & Profile Management | AmarToy Admin",
};

export default async function AdminManagementPage() {
  const config = await getAdminConfig();

  return <AdminManagementClient initialConfig={config} />;
}
