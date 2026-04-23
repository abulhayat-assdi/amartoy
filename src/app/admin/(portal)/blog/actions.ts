"use server";

import { revalidatePath } from "next/cache";
import { normalizeBlogContent, saveBlogPageContent } from "@/lib/blogpage-management";
import { uploadToSupabaseStorage } from "@/lib/supabase-rest";

export async function saveBlogContentAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeBlogContent(parsed);
    const saved = await saveBlogPageContent(normalized);

    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/admin/blog");

    return {
      ok: true,
      message: "Blog content saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save Blog content.",
    };
  }
}

export async function uploadBlogAssetAction(formData: FormData) {
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "blog");

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
