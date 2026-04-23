"use server";

import { revalidatePath } from "next/cache";
import { normalizeHomepageContent, saveHomePageContent } from "@/lib/homepage-management";
import { uploadToSupabaseStorage } from "@/lib/supabase-rest";

export async function saveHomepageContentAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeHomepageContent(parsed);
    const saved = await saveHomePageContent(normalized);

    revalidatePath("/");
    revalidatePath("/admin/home");

    return {
      ok: true,
      message: "Homepage content saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save homepage content.",
    };
  }
}

export async function uploadHomepageAssetAction(formData: FormData) {
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "homepage");

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
