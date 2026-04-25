"use client";

import { useState, useTransition } from "react";
import { Save, ShieldCheck, UserPlus, Edit, Trash2, X } from "lucide-react";
import { saveAdminConfigAction } from "@/app/admin/(portal)/admin-management/actions";
import type { AdminManagementConfig, AdminProfile, AdminPermission } from "@/types/admin-management";
import { adminNavigation } from "@/data/admin";

interface AdminManagementClientProps {
  initialConfig: AdminManagementConfig;
}

export function AdminManagementClient({ initialConfig }: AdminManagementClientProps) {
  const [config, setConfig] = useState<AdminManagementConfig>(initialConfig);
  const [status, setStatus] = useState("");
  const [isSaving, startSaving] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Current admin being added/edited
  const [currentAdmin, setCurrentAdmin] = useState<Partial<AdminProfile>>({
    name: "",
    email: "",
    role: "admin",
    permissions: [],
  });

  const handleSaveConfig = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveAdminConfigAction(JSON.stringify(config));
      setStatus(result.message);
    });
  };

  const openModalForNew = () => {
    setCurrentAdmin({
      id: "admin-" + Date.now(),
      name: "",
      email: "",
      role: "admin",
      permissions: adminNavigation.map(nav => ({
        pageId: nav.label,
        canRead: false,
        canWrite: false,
      })),
    });
    setIsModalOpen(true);
  };

  const openModalForEdit = (admin: AdminProfile) => {
    setCurrentAdmin({
      ...admin,
      // Ensure all navigation items have a permission entry
      permissions: adminNavigation.map(nav => {
        const existing = admin.permissions.find(p => p.pageId === nav.label);
        return existing || { pageId: nav.label, canRead: false, canWrite: false };
      })
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this admin?")) {
      setConfig({
        ...config,
        admins: config.admins.filter(a => a.id !== id),
      });
    }
  };

  const saveModal = () => {
    if (!currentAdmin.name || !currentAdmin.email) {
      alert("Name and Email are required");
      return;
    }
    
    setConfig(prev => {
      const existingIdx = prev.admins.findIndex(a => a.id === currentAdmin.id);
      let newAdmins = [...prev.admins];
      
      const adminToSave = {
        ...currentAdmin,
        id: currentAdmin.id || "admin-" + Date.now(),
        createdAt: currentAdmin.createdAt || new Date().toISOString(),
      } as AdminProfile;

      if (existingIdx >= 0) {
        newAdmins[existingIdx] = adminToSave;
      } else {
        newAdmins.push(adminToSave);
      }

      return { ...prev, admins: newAdmins };
    });
    
    setIsModalOpen(false);
  };

  const togglePermission = (pageId: string, type: "canRead" | "canWrite") => {
    setCurrentAdmin(prev => {
      const perms = [...(prev.permissions || [])];
      const idx = perms.findIndex(p => p.pageId === pageId);
      if (idx >= 0) {
        perms[idx] = { ...perms[idx], [type]: !perms[idx][type] };
      }
      return { ...prev, permissions: perms };
    });
  };

  return (
    <div className="admin-page homepage-admin">
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Security</p>
          <h2 className="admin-page__title">Admin & Profile Management</h2>
        </div>
        <div className="homepage-admin__hero-actions">
          <button className="admin-btn admin-btn--outline" type="button" onClick={openModalForNew}>
            <UserPlus size={16} />
            Add Admin
          </button>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSaveConfig} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        <section className="homepage-admin__section">
          <div className="homepage-admin__section-head">
            <div className="homepage-admin__section-copy">
              <span className="homepage-admin__section-icon"><ShieldCheck size={18} /></span>
              <div>
                <h3>Admin Accounts</h3>
                <p>Manage all users who have access to this portal and their specific read/write permissions.</p>
              </div>
            </div>
          </div>
          
          <div className="homepage-admin__table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {config.admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <strong>{admin.name}</strong>
                    </td>
                    <td>{admin.email}</td>
                    <td>
                      <span className={`admin-badge ${admin.role === "super-admin" ? "admin-badge--warning" : "admin-badge--info"}`}>
                        {admin.role === "super-admin" ? "Super Admin" : "Admin"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="admin-icon-btn" onClick={() => openModalForEdit(admin)}>
                        <Edit size={16} />
                      </button>
                      <button className="admin-icon-btn" onClick={() => handleDelete(admin.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {config.admins.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                      No admins configured. Please add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="admin-modal-content" style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                {currentAdmin.id?.startsWith("admin-") && !config.admins.find(a => a.id === currentAdmin.id) ? "Add New Admin" : "Edit Admin"}
              </h3>
              <button className="admin-icon-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <label className="homepage-admin__field" style={{ margin: 0 }}>
                  <span>Full Name</span>
                  <input 
                    className="admin-input" 
                    value={currentAdmin.name} 
                    onChange={e => setCurrentAdmin({...currentAdmin, name: e.target.value})}
                    placeholder="e.g. Abul Hayat"
                  />
                </label>
                <label className="homepage-admin__field" style={{ margin: 0 }}>
                  <span>Email Address</span>
                  <input 
                    className="admin-input" 
                    type="email"
                    value={currentAdmin.email} 
                    onChange={e => setCurrentAdmin({...currentAdmin, email: e.target.value})}
                    placeholder="e.g. admin@amartoy.com"
                  />
                </label>
              </div>
              
              <label className="homepage-admin__field" style={{ marginBottom: '2rem' }}>
                <span>Role</span>
                <select 
                  className="admin-input" 
                  value={currentAdmin.role}
                  onChange={e => setCurrentAdmin({...currentAdmin, role: e.target.value as "admin" | "super-admin"})}
                >
                  <option value="admin">Standard Admin (Restricted by permissions)</option>
                  <option value="super-admin">Super Admin (Full Access)</option>
                </select>
              </label>

              {currentAdmin.role !== "super-admin" && (
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Page Permissions</h4>
                  <table className="admin-table" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                    <thead style={{ background: '#f9fafb' }}>
                      <tr>
                        <th>Page Name</th>
                        <th style={{ textAlign: "center" }}>Can Read (See)</th>
                        <th style={{ textAlign: "center" }}>Can Write (Edit/Save)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAdmin.permissions?.map(p => (
                        <tr key={p.pageId}>
                          <td>{p.pageId}</td>
                          <td style={{ textAlign: "center" }}>
                            <input 
                              type="checkbox" 
                              checked={p.canRead} 
                              onChange={() => togglePermission(p.pageId, "canRead")} 
                              style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <input 
                              type="checkbox" 
                              checked={p.canWrite} 
                              onChange={() => togglePermission(p.pageId, "canWrite")} 
                              style={{ width: '1.25rem', height: '1.25rem' }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="admin-btn admin-btn--outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="admin-btn" onClick={saveModal}>Save Admin</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
