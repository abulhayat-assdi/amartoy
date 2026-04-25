export const dynamic = "force-dynamic";

import { HomepageManagementClient } from "@/components/admin/homepage-management-client";
import { getHomePageContent } from "@/lib/homepage-management";

export default async function AdminHomePage() {
  const content = await getHomePageContent();

  return <HomepageManagementClient initialContent={content} updatedAtLabel={content.updatedAt || "Draft not saved yet"} />;
}
