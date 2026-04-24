"use client";

import { useState, useTransition } from "react";
import { LogIn, UserCircle, Save } from "lucide-react";
import { saveAuthPagesAction } from "@/app/admin/(portal)/login-management/auth-actions";
import type { LoginPageContent } from "@/types/loginpage";
import type { ProfilePageContent } from "@/types/profilepage";

interface LoginManagementClientProps {
  loginContent: LoginPageContent;
  profileContent: ProfilePageContent;
}

export function LoginManagementClient({ loginContent, profileContent }: LoginManagementClientProps) {
  const [loginDraft, setLoginDraft] = useState<LoginPageContent>(loginContent);
  const [profileDraft, setProfileDraft] = useState<ProfilePageContent>(profileContent);
  const [status, setStatus] = useState("");
  const [isSaving, startSaving] = useTransition();

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveAuthPagesAction(JSON.stringify(loginDraft), JSON.stringify(profileDraft));
      setStatus(result.message);
    });
  };

  const handleLoginChange = (field: keyof LoginPageContent, value: string) => {
    setLoginDraft((current) => ({ ...current, [field]: value }));
  };

  const handleProfileChange = (field: keyof ProfilePageContent, value: string) => {
    setProfileDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="admin-page homepage-admin">
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Auth Pages CMS</p>
          <h2 className="admin-page__title">Log in & Dashboard Management</h2>
        </div>
        <div className="homepage-admin__hero-actions">
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
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
              <span className="homepage-admin__section-icon"><LogIn size={18} /></span>
              <div>
                <h3>Sign In Page Config</h3>
                <p>কাস্টমার লগিন পেইজের টেক্সট এবং লজিক্যাল লেবেল ম্যানেজ করুন</p>
              </div>
            </div>
          </div>
          
          <div className="homepage-admin__form-grid" style={{ padding: "1.5rem", background: "white", borderRadius: "12px", border: "1px solid rgba(31, 45, 116, 0.08)" }}>
            <label className="homepage-admin__field">
              <span>Page Title</span>
              <input 
                className="admin-input" 
                value={loginDraft.title} 
                onChange={(e) => handleLoginChange("title", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Page Subtitle</span>
              <input 
                className="admin-input" 
                value={loginDraft.subtitle} 
                onChange={(e) => handleLoginChange("subtitle", e.target.value)} 
              />
            </label>
            
            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Email Field Label</span>
              <input 
                className="admin-input" 
                value={loginDraft.emailLabel} 
                onChange={(e) => handleLoginChange("emailLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Email Placeholder</span>
              <input 
                className="admin-input" 
                value={loginDraft.emailPlaceholder} 
                onChange={(e) => handleLoginChange("emailPlaceholder", e.target.value)} 
              />
            </label>

            <label className="homepage-admin__field">
              <span>Password Field Label</span>
              <input 
                className="admin-input" 
                value={loginDraft.passwordLabel} 
                onChange={(e) => handleLoginChange("passwordLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Password Placeholder</span>
              <input 
                className="admin-input" 
                value={loginDraft.passwordPlaceholder} 
                onChange={(e) => handleLoginChange("passwordPlaceholder", e.target.value)} 
              />
            </label>

            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Submit Button Text</span>
              <input 
                className="admin-input" 
                value={loginDraft.submitButtonText} 
                onChange={(e) => handleLoginChange("submitButtonText", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Forgot Password Text</span>
              <input 
                className="admin-input" 
                value={loginDraft.forgotPasswordText} 
                onChange={(e) => handleLoginChange("forgotPasswordText", e.target.value)} 
              />
            </label>

            <label className="homepage-admin__field">
              <span>Registration Prompt Text</span>
              <input 
                className="admin-input" 
                value={loginDraft.registerPromptText} 
                onChange={(e) => handleLoginChange("registerPromptText", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Registration Link Text</span>
              <input 
                className="admin-input" 
                value={loginDraft.registerLinkText} 
                onChange={(e) => handleLoginChange("registerLinkText", e.target.value)} 
              />
            </label>
          </div>
        </section>

        <section className="homepage-admin__section" style={{ marginTop: "2rem" }}>
          <div className="homepage-admin__section-head">
            <div className="homepage-admin__section-copy">
              <span className="homepage-admin__section-icon"><UserCircle size={18} /></span>
              <div>
                <h3>Customer Dashboard Config</h3>
                <p>লগিন করার পর ইউজার প্রোফাইল বা ড্যাশবোর্ড পেইজে কি কি লেখা দেখবে</p>
              </div>
            </div>
          </div>
          
          <div className="homepage-admin__form-grid" style={{ padding: "1.5rem", background: "white", borderRadius: "12px", border: "1px solid rgba(31, 45, 116, 0.08)" }}>
            <label className="homepage-admin__field">
              <span>Page Title</span>
              <input 
                className="admin-input" 
                value={profileDraft.pageTitle} 
                onChange={(e) => handleProfileChange("pageTitle", e.target.value)} 
              />
            </label>
            
            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Personal Info Tab</span>
              <input 
                className="admin-input" 
                value={profileDraft.personalInfoTabLabel} 
                onChange={(e) => handleProfileChange("personalInfoTabLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Orders Tab Label</span>
              <input 
                className="admin-input" 
                value={profileDraft.ordersTabLabel} 
                onChange={(e) => handleProfileChange("ordersTabLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Wishlist Tab Label</span>
              <input 
                className="admin-input" 
                value={profileDraft.wishlistTabLabel} 
                onChange={(e) => handleProfileChange("wishlistTabLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Cart Tab Label</span>
              <input 
                className="admin-input" 
                value={profileDraft.cartTabLabel} 
                onChange={(e) => handleProfileChange("cartTabLabel", e.target.value)} 
              />
            </label>

            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field" style={{ gridColumn: "1 / -1" }}>
              <span>Empty Orders Message</span>
              <input 
                className="admin-input" 
                value={profileDraft.emptyOrdersMessage} 
                onChange={(e) => handleProfileChange("emptyOrdersMessage", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field" style={{ gridColumn: "1 / -1" }}>
              <span>Empty Wishlist Message</span>
              <input 
                className="admin-input" 
                value={profileDraft.emptyWishlistMessage} 
                onChange={(e) => handleProfileChange("emptyWishlistMessage", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field" style={{ gridColumn: "1 / -1" }}>
              <span>Empty Cart Message</span>
              <input 
                className="admin-input" 
                value={profileDraft.emptyCartMessage} 
                onChange={(e) => handleProfileChange("emptyCartMessage", e.target.value)} 
              />
            </label>

            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Logout Button Text</span>
              <input 
                className="admin-input" 
                value={profileDraft.logoutButtonText} 
                onChange={(e) => handleProfileChange("logoutButtonText", e.target.value)} 
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
