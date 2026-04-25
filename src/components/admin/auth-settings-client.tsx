"use client";

import { useState, useTransition } from "react";
import { LogIn, Save } from "lucide-react";
import { saveLoginPageAction } from "@/app/admin/(portal)/settings/login-actions";
import type { LoginPageContent } from "@/types/loginpage";

interface AuthSettingsClientProps {
  loginContent: LoginPageContent;
}

export function AuthSettingsClient({ loginContent }: AuthSettingsClientProps) {
  const [content, setContent] = useState<LoginPageContent>(loginContent);
  const [status, setStatus] = useState("");
  const [isSaving, startSaving] = useTransition();

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveLoginPageAction(JSON.stringify(content));
      setStatus(result.message);
      if (result.ok && result.updatedAt) {
        setContent((current) => ({ ...current, updatedAt: result.updatedAt }));
      }
    });
  };

  const handleChange = (field: keyof LoginPageContent, value: string) => {
    setContent((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="admin-page homepage-admin">
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Auth Pages CMS</p>
          <h2 className="admin-page__title">Sign In & Registration</h2>
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
                <p>Manage customer login page text and logical labels</p>
              </div>
            </div>
          </div>
          
          <div className="homepage-admin__form-grid" style={{ padding: "1.5rem", background: "white", borderRadius: "12px", border: "1px solid rgba(31, 45, 116, 0.08)" }}>
            <label className="homepage-admin__field">
              <span>Page Title</span>
              <input 
                className="admin-input" 
                value={content.title} 
                onChange={(e) => handleChange("title", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Page Subtitle</span>
              <input 
                className="admin-input" 
                value={content.subtitle} 
                onChange={(e) => handleChange("subtitle", e.target.value)} 
              />
            </label>
            
            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Email Field Label</span>
              <input 
                className="admin-input" 
                value={content.emailLabel} 
                onChange={(e) => handleChange("emailLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Email Placeholder</span>
              <input 
                className="admin-input" 
                value={content.emailPlaceholder} 
                onChange={(e) => handleChange("emailPlaceholder", e.target.value)} 
              />
            </label>

            <label className="homepage-admin__field">
              <span>Password Field Label</span>
              <input 
                className="admin-input" 
                value={content.passwordLabel} 
                onChange={(e) => handleChange("passwordLabel", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Password Placeholder</span>
              <input 
                className="admin-input" 
                value={content.passwordPlaceholder} 
                onChange={(e) => handleChange("passwordPlaceholder", e.target.value)} 
              />
            </label>

            <div style={{ gridColumn: "1 / -1", height: "1px", background: "rgba(0,0,0,0.05)", margin: "1rem 0" }} />

            <label className="homepage-admin__field">
              <span>Submit Button Text</span>
              <input 
                className="admin-input" 
                value={content.submitButtonText} 
                onChange={(e) => handleChange("submitButtonText", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Forgot Password Text</span>
              <input 
                className="admin-input" 
                value={content.forgotPasswordText} 
                onChange={(e) => handleChange("forgotPasswordText", e.target.value)} 
              />
            </label>

            <label className="homepage-admin__field">
              <span>Registration Prompt Text</span>
              <input 
                className="admin-input" 
                value={content.registerPromptText} 
                onChange={(e) => handleChange("registerPromptText", e.target.value)} 
              />
            </label>
            <label className="homepage-admin__field">
              <span>Registration Link Text</span>
              <input 
                className="admin-input" 
                value={content.registerLinkText} 
                onChange={(e) => handleChange("registerLinkText", e.target.value)} 
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
