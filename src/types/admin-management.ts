export interface AdminPermission {
  pageId: string; // matches an id or label from adminNavigation
  canRead: boolean;
  canWrite: boolean;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: "super-admin" | "admin";
  permissions: AdminPermission[];
  createdAt: string;
}

export interface AdminManagementConfig {
  admins: AdminProfile[];
  updatedAt?: string;
}
