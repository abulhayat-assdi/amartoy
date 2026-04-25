import { ProfilePage } from "@/components/pages/profile-page-client";
import { getProfilePageContent } from "@/lib/profilepage-management";
import { redirect } from "next/navigation";

export default async function Profile() {
  // Profile section hidden for now
  redirect("/");
  const content = await getProfilePageContent();
  return <ProfilePage content={content} />;
}
