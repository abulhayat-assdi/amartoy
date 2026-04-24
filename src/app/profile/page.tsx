import { ProfilePage } from "@/components/pages/profile-page-client";
import { getProfilePageContent } from "@/lib/profilepage-management";

export default async function Profile() {
  const content = await getProfilePageContent();
  return <ProfilePage content={content} />;
}
