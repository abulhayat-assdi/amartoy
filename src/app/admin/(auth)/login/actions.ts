"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminAccess } from "@/lib/admin-management";

export async function adminLoginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter your email and password" };
  }

  // Check if they are in the admin list
  const profile = await verifyAdminAccess(email);
  
  if (!profile) {
    return { error: "Access denied. You do not have admin permissions." };
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_email", email, { 
    path: "/", 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  
  redirect("/admin/dashboard/");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_email");
  redirect("/admin/login/");
}
