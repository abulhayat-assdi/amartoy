"use server";

import { revalidatePath } from "next/cache";
import { normalizeAboutContent, saveAboutPageContent } from "@/lib/aboutpage-management";
import { uploadToSupabaseStorage } from "@/lib/supabase-rest";

export async function saveAboutContentAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeAboutContent(parsed);
    const saved = await saveAboutPageContent(normalized);

    revalidatePath("/about");
    revalidatePath("/admin/about");

    return {
      ok: true,
      message: "About page content saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save About page content.",
    };
  }
}

export async function uploadAboutAssetAction(formData: FormData) {
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "about");

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
