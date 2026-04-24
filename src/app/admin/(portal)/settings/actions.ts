"use server";

import { revalidatePath } from "next/cache";
import { normalizeGlobalSettings, saveGlobalSettings } from "@/lib/globalsettings-management";

export async function saveGlobalSettingsAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeGlobalSettings(parsed);
    const saved = await saveGlobalSettings(normalized);

    revalidatePath("/", "layout"); // Revalidate entire site to update header/footer

    return {
      ok: true,
      message: "Global settings saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save settings.",
    };
  }
}
