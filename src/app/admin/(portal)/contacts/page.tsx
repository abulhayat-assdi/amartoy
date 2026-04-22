import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";
import { adminContactRows, adminPageContent } from "@/data/admin";

export default function AdminContactsPage() {
  return (
    <AdminTablePageClient
      columnLabels={["Type", "Stage"]}
      description={adminPageContent.contacts.description}
      eyebrow={adminPageContent.contacts.eyebrow}
      rows={adminContactRows}
      title={adminPageContent.contacts.title}
    />
  );
}
