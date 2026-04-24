"use server";

import { revalidatePath } from "next/cache";
import { saveLoginPageContent } from "@/lib/loginpage-management";
import { saveProfilePageContent } from "@/lib/profilepage-management";
import type { LoginPageContent } from "@/types/loginpage";
import type { ProfilePageContent } from "@/types/profilepage";

export async function saveAuthPagesAction(loginPayload: string, profilePayload: string) {
  try {
    const loginParsed = JSON.parse(loginPayload) as LoginPageContent;
    const profileParsed = JSON.parse(profilePayload) as ProfilePageContent;
    
    await saveLoginPageContent(loginParsed);
    await saveProfilePageContent(profileParsed);

    revalidatePath("/login");
    revalidatePath("/profile");

    return {
      ok: true,
      message: "Auth & Profile settings saved successfully.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save settings.",
    };
  }
}
