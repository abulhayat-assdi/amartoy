import { ContactManagementClient } from "@/components/admin/contact-management-client";
import { getContactPageContent } from "@/lib/contactpage-management";

export default async function AdminContactsPage() {
  const content = await getContactPageContent();

  return (
    <ContactManagementClient
      initialContent={content}
      updatedAtLabel={content.updatedAt || "Draft not saved yet"}
    />
  );
}
