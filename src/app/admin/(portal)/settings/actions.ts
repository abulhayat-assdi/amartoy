"use server";

import { revalidatePath } from "next/cache";
import { normalizeGlobalSettings, saveGlobalSettings } from "@/lib/globalsettings-management";

import { uploadToSupabaseStorage } from "@/lib/supabase-rest";

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

export async function uploadSettingsAssetAction(formData: FormData) {
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "settings");

  if (!(file instanceof File) || !file.size) {
    return {
      ok: false,
      message: "Please choose a file before uploading.",
    };
  }

  try {
    const url = await uploadToSupabaseStorage(file, folder);
    return {
      ok: true,
      message: "Asset uploaded successfully.",
      url,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not upload the asset.",
    };
  }
}
