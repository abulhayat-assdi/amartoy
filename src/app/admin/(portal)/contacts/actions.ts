"use server";

import { revalidatePath } from "next/cache";
import { normalizeContactContent, saveContactPageContent } from "@/lib/contactpage-management";

export async function saveContactContentAction(payload: string) {
  try {
    const parsed = JSON.parse(payload);
    const normalized = normalizeContactContent(parsed);
    const saved = await saveContactPageContent(normalized);

    revalidatePath("/contact");
    revalidatePath("/admin/contacts");

    return {
      ok: true,
      message: "Contact & Chat settings saved successfully.",
      updatedAt: saved.updatedAt || new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save Contact settings.",
    };
  }
}
