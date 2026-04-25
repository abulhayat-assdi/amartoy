export const dynamic = "force-dynamic";

import { ShopManagementClient } from "@/components/admin/shop-management-client";
import { getShopPageContent } from "@/lib/shoppage-management";

export default async function AdminProductsPage() {
  const content = await getShopPageContent();

  return (
    <ShopManagementClient
      initialContent={content}
      updatedAtLabel={content.updatedAt || "Draft not saved yet"}
    />
  );
}
