import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminAccess } from "@/lib/admin-management";
import type { ReactNode } from "react";

export default async function AdminAuthLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const adminEmail = cookieStore.get("admin_email")?.value;

  if (adminEmail) {
    const profile = await verifyAdminAccess(adminEmail);
    if (profile) {
      redirect("/admin/dashboard/");
    }
  }

  return children;
}
