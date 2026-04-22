import { PageHero } from "@/components/ui/page-hero";
import { AccountPageClient } from "@/components/pages/account-page-client";

export default function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Area"
        title="My Account"
        description="Restore your shopper shortcuts, saved products, and account-side navigation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Account" },
        ]}
      />
      <AccountPageClient />
    </>
  );
}
