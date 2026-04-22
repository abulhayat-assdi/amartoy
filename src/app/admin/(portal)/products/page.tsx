import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";
import { adminPageContent, adminProducts } from "@/data/admin";

export default function AdminProductsPage() {
  return (
    <AdminTablePageClient
      columnLabels={["Price", "Stock"]}
      description={adminPageContent.products.description}
      eyebrow={adminPageContent.products.eyebrow}
      rows={adminProducts}
      title={adminPageContent.products.title}
    />
  );
}
