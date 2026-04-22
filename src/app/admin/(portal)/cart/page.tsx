import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";
import { adminCartRows, adminPageContent } from "@/data/admin";

export default function AdminCartPage() {
  return (
    <AdminTablePageClient
      columnLabels={["Value", "Location"]}
      description={adminPageContent.cart.description}
      eyebrow={adminPageContent.cart.eyebrow}
      rows={adminCartRows}
      title={adminPageContent.cart.title}
    />
  );
}
