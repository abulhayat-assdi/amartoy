import { LoginManagementClient } from "@/components/admin/login-management-client";
import { getLoginPageContent } from "@/lib/loginpage-management";
import { getProfilePageContent } from "@/lib/profilepage-management";

export default async function LoginManagementPage() {
  const loginContent = await getLoginPageContent();
  const profileContent = await getProfilePageContent();
  
  return <LoginManagementClient loginContent={loginContent} profileContent={profileContent} />;
}
