import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthPageClient } from "@/components/pages/auth-page-client";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function Login() {
  // Profile section hidden for now
  redirect("/");
  
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    redirect("/profile/");
  }

  return <AuthPageClient defaultIsLogin={true} />;
}
