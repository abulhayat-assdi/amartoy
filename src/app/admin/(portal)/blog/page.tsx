import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";
import { adminBlogRows, adminPageContent } from "@/data/admin";

export default function AdminBlogPage() {
  return (
    <AdminTablePageClient
      columnLabels={["Published", "Performance"]}
      description={adminPageContent.blog.description}
      eyebrow={adminPageContent.blog.eyebrow}
      rows={adminBlogRows}
      title={adminPageContent.blog.title}
    />
  );
}
