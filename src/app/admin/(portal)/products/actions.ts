"use server";

import { revalidatePath } from "next/cache";
import { normalizeShopContent, saveShopPageContent } from "@/lib/shoppage-management";

export async function saveShopContentAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeShopContent(parsed);
    const saved = await saveShopPageContent(normalized);

    revalidatePath("/shop");
    revalidatePath("/admin/products");

    return {
      ok: true,
      message: "Shop settings saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save Shop settings.",
    };
  }
}
