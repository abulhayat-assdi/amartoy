import { AdminShell } from "@/components/admin/admin-shell";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminAccess } from "@/lib/admin-management";

export default async function AdminPortalLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const adminEmail = cookieStore.get("admin_email")?.value;

  if (!adminEmail) {
    redirect("/admin/login/");
  }

  const profile = await verifyAdminAccess(adminEmail);
  if (!profile) {
    redirect("/admin/login/");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
