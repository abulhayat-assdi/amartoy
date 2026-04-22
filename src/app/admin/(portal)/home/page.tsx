import { AdminTablePageClient } from "@/components/admin/admin-table-page-client";

const homeRows = [
  {
    id: "HME-01",
    primary: "Hero Slider",
    secondary: "3 slides configured",
    columns: ["Published", "Apr 22, 2026"],
    status: { label: "Live", tone: "success" as const },
  },
  {
    id: "HME-02",
    primary: "Featured Products",
    secondary: "4 products pinned",
    columns: ["Curated", "Needs review"],
    status: { label: "Ready", tone: "info" as const },
  },
  {
    id: "HME-03",
    primary: "Testimonials Strip",
    secondary: "3 entries active",
    columns: ["Synced", "Static content"],
    status: { label: "Stable", tone: "warning" as const },
  },
];

export default function AdminHomePage() {
  return (
    <AdminTablePageClient
      columnLabels={["State", "Updated"]}
      description="Track homepage content modules and publishing status for the public storefront."
      eyebrow="Content"
      rows={homeRows}
      title="Homepage Control"
    />
  );
}
