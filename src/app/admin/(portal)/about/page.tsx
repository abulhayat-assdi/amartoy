import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";

const aboutRows = [
  {
    id: "ABT-01",
    primary: "Brand Story",
    secondary: "Main about intro block",
    columns: ["Published", "Apr 22, 2026"],
    status: { label: "Live", tone: "success" as const },
  },
  {
    id: "ABT-02",
    primary: "Testimonials",
    secondary: "Compact testimonial section",
    columns: ["3 entries", "Synced"],
    status: { label: "Ready", tone: "info" as const },
  },
  {
    id: "ABT-03",
    primary: "Partner logos",
    secondary: "Brand strip module",
    columns: ["Visible", "Manual review"],
    status: { label: "Draft", tone: "warning" as const },
  },
];

export default function AdminAboutPage() {
  return (
    <AdminTablePageClient
      columnLabels={["State", "Updated"]}
      description="Manage the trust-building sections that support the public About page."
      eyebrow="Brand"
      rows={aboutRows}
      title="About Page Content"
    />
  );
}
