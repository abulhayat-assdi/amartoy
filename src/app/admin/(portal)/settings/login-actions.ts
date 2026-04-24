"use server";

import { revalidatePath } from "next/cache";
import { saveLoginPageContent } from "@/lib/loginpage-management";
import type { LoginPageContent } from "@/types/loginpage";

export async function saveLoginPageAction(payload: string) {
  try {
    const parsed = JSON.parse(payload) as LoginPageContent;
    const saved = await saveLoginPageContent(parsed);

    revalidatePath("/login");

    return {
      ok: true,
      message: "Login page settings saved successfully.",
      updatedAt: saved.updated_at,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save login page settings.",
    };
  }
}
