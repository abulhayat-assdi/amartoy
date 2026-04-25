export const dynamic = "force-dynamic";

import { BlogManagementClient } from "@/components/admin/blog-management-client";
import { getBlogPageContent } from "@/lib/blogpage-management";

export default async function AdminBlogPage() {
  const content = await getBlogPageContent();

  return (
    <BlogManagementClient
      initialContent={content}
      updatedAtLabel={content.updatedAt || "Draft not saved yet"}
    />
  );
}
