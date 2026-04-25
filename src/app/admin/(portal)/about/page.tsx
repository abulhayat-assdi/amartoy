export const dynamic = "force-dynamic";

import { AboutManagementClient } from "@/components/admin/about-management-client";
import { getAboutPageContent } from "@/lib/aboutpage-management";

export default async function AdminAboutPage() {
  const content = await getAboutPageContent();

  return (
    <AboutManagementClient
      initialContent={content}
      updatedAtLabel={content.updatedAt || "Draft not saved yet"}
    />
  );
}
