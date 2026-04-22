export interface AdminNavItem {
  label: string;
  href: string;
}

export interface AdminMetric {
  label: string;
  value: string;
  trend: string;
}

export interface AdminActivity {
  title: string;
  meta: string;
  status: "success" | "warning" | "info";
}

export interface AdminTableRow {
  id: string;
  primary: string;
  secondary: string;
  columns: string[];
  status: {
    label: string;
    tone: "success" | "warning" | "danger" | "info";
  };
}

export const adminNavigation: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard/" },
  { label: "Home", href: "/admin/home/" },
  { label: "Products", href: "/admin/products/" },
  { label: "Cart", href: "/admin/cart/" },
  { label: "Blog", href: "/admin/blog/" },
  { label: "About", href: "/admin/about/" },
  { label: "Contacts", href: "/admin/contacts/" },
  { label: "Settings", href: "/admin/settings/" },
];

export const adminMetrics: AdminMetric[] = [
  { label: "Monthly Orders", value: "1,248", trend: "+12.4%" },
  { label: "Revenue", value: "BDT 8.4L", trend: "+8.1%" },
  { label: "Active Products", value: "126", trend: "+6 new" },
  { label: "Support Replies", value: "93%", trend: "Within 2h" },
];

export const adminActivities: AdminActivity[] = [
  {
    title: "Homepage banner refreshed for Eid campaign",
    meta: "Content team updated the hero slider 2 hours ago.",
    status: "info",
  },
  {
    title: "Low stock alert triggered for Puzzle Set",
    meta: "Inventory dropped below threshold in the last sync.",
    status: "warning",
  },
  {
    title: "12 new orders marked as paid",
    meta: "Checkout events synced successfully from the storefront.",
    status: "success",
  },
];

export const adminProducts: AdminTableRow[] = [
  {
    id: "PRD-001",
    primary: "Robot Toy",
    secondary: "Electronics",
    columns: ["BDT 2,500", "45 units"],
    status: { label: "Active", tone: "success" },
  },
  {
    id: "PRD-002",
    primary: "Building Block Set",
    secondary: "Educational",
    columns: ["BDT 1,200", "120 units"],
    status: { label: "Featured", tone: "info" },
  },
  {
    id: "PRD-003",
    primary: "Action Figure",
    secondary: "Collectibles",
    columns: ["BDT 850", "8 units"],
    status: { label: "Low Stock", tone: "warning" },
  },
  {
    id: "PRD-004",
    primary: "Puzzle Set",
    secondary: "Educational",
    columns: ["BDT 600", "0 units"],
    status: { label: "Hidden", tone: "danger" },
  },
];

export const adminCartRows: AdminTableRow[] = [
  {
    id: "CRT-1042",
    primary: "Rahim Uddin",
    secondary: "3 items in cart",
    columns: ["BDT 4,250", "Dhaka"],
    status: { label: "Abandoned", tone: "warning" },
  },
  {
    id: "CRT-1043",
    primary: "Nusrat Jahan",
    secondary: "1 item in cart",
    columns: ["BDT 1,200", "Chattogram"],
    status: { label: "Recoverable", tone: "info" },
  },
  {
    id: "CRT-1044",
    primary: "Ayan Ahmed",
    secondary: "5 items in cart",
    columns: ["BDT 6,890", "Sylhet"],
    status: { label: "Converted", tone: "success" },
  },
];

export const adminBlogRows: AdminTableRow[] = [
  {
    id: "BLG-201",
    primary: "Holiday Gift Ideas",
    secondary: "Toys",
    columns: ["Apr 26, 2026", "1.9k views"],
    status: { label: "Published", tone: "success" },
  },
  {
    id: "BLG-202",
    primary: "Choosing the Right Toy for an Infant",
    secondary: "Parenting",
    columns: ["Apr 27, 2026", "Draft"],
    status: { label: "Review", tone: "warning" },
  },
  {
    id: "BLG-203",
    primary: "Preschool Program Checklist",
    secondary: "Learning",
    columns: ["Apr 24, 2026", "842 views"],
    status: { label: "Published", tone: "info" },
  },
];

export const adminContactRows: AdminTableRow[] = [
  {
    id: "CNT-501",
    primary: "Wholesale inquiry",
    secondary: "maria@kidsmart.com",
    columns: ["Business", "Unread"],
    status: { label: "New", tone: "warning" },
  },
  {
    id: "CNT-502",
    primary: "Order support request",
    secondary: "parent.help@email.com",
    columns: ["Support", "Assigned"],
    status: { label: "Open", tone: "info" },
  },
  {
    id: "CNT-503",
    primary: "Partnership follow-up",
    secondary: "brand@playnest.com",
    columns: ["Partnership", "Replied"],
    status: { label: "Closed", tone: "success" },
  },
];

export const adminPageContent = {
  dashboard: {
    eyebrow: "Operations",
    title: "Store Dashboard",
    description: "A quick overview of sales, activity, and the storefront health signals you had before.",
  },
  home: {
    eyebrow: "Content",
    title: "Homepage Control",
    description: "Track hero slides, featured products, promo strips, and homepage publishing flow.",
  },
  products: {
    eyebrow: "Inventory",
    title: "Product Management",
    description: "Review catalog items, stock, and publish states from one clean table.",
  },
  cart: {
    eyebrow: "Recovery",
    title: "Cart Insights",
    description: "Monitor abandoned carts and follow up on high-intent shoppers.",
  },
  blog: {
    eyebrow: "Editorial",
    title: "Blog Management",
    description: "See article status, publishing dates, and content performance at a glance.",
  },
  about: {
    eyebrow: "Brand",
    title: "About Page Content",
    description: "Keep brand story, trust signals, and section blocks aligned with the storefront.",
  },
  contacts: {
    eyebrow: "Support",
    title: "Contact Inbox",
    description: "Centralize incoming leads, support messages, and partnership requests.",
  },
  settings: {
    eyebrow: "Configuration",
    title: "Store Settings",
    description: "Manage store details, notifications, payments, and admin-side preferences.",
  },
};
