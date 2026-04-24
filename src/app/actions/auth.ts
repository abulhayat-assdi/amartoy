"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function formatCredential(credential: string) {
  // If the string contains only digits and optional +, it's treated as a phone number
  const isPhone = /^[0-9+]+$/.test(credential.trim());
  if (isPhone) {
    return { email: `${credential.trim()}@my-ecommerce.com`, phone: credential.trim() };
  }
  return { email: credential.trim(), phone: null };
}

export async function loginAction(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const credential = formData.get("credential") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/profile/";
  
  if (!credential || !password) {
    return { error: "Please enter your email/phone and password" };
  }

  const { email } = formatCredential(credential);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signupAction(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const credential = formData.get("credential") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/profile/";
  
  if (!credential || !password || !name) {
    return { error: "Please fill all required fields" };
  }

  const { email, phone } = formatCredential(credential);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone: phone || null,
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}
