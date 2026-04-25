"use server";

import { revalidatePath } from "next/cache";
import { normalizeAdminConfig, saveAdminConfig } from "@/lib/admin-management";

export async function saveAdminConfigAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeAdminConfig(parsed);
    const saved = await saveAdminConfig(normalized);

    revalidatePath("/admin/admin-management");
    revalidatePath("/admin", "layout");

    return {
      ok: true,
      message: "Admin profiles saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save admin profiles.",
    };
  }
}
