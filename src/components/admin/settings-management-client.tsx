"use client";

import { useMemo, useState, useTransition } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  Briefcase,
  Building2,
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Menu,
  PencilLine,
  PhoneCall,
  Plus,
  Save,
  Share2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { saveGlobalSettingsAction, uploadSettingsAssetAction } from "@/app/admin/(portal)/settings/actions";
import type { GlobalSettings, NavLink, SocialLink } from "@/types/globalsettings";

interface SettingsManagementClientProps {
  initialContent: GlobalSettings;
  updatedAtLabel: string;
}

type EditorState =
  | { section: "brand"; draft: GlobalSettings }
  | { section: "contact"; draft: GlobalSettings }
  | { section: "developer"; draft: GlobalSettings }
  | { section: "headerNav"; mode: "create" | "edit"; index: number | null; draft: NavLink }
  | { section: "quickLinks"; mode: "create" | "edit"; index: number | null; draft: NavLink }
  | { section: "businessLinks"; mode: "create" | "edit"; index: number | null; draft: NavLink }
  | { section: "socialLinks"; mode: "create" | "edit"; index: number | null; draft: SocialLink }
  | { section: "footerDescription"; draft: string };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// ─── UI Sub-components ────────────────────────────────────────────────────────

function SectionBlock({
  icon,
  title,
  description,
  badge,
  action,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  badge: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="homepage-admin__section">
      <div className="homepage-admin__section-head">
        <div className="homepage-admin__section-copy">
          <span className="homepage-admin__section-icon">{icon}</span>
          <div>
            <div className="homepage-admin__section-title-row">
              <h3>{title}</h3>
              <span className="homepage-admin__count">{badge}</span>
            </div>
            <p>{description}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SummaryCard({
  title,
  subtitle,
  meta,
  onEdit,
  onDelete,
}: {
  title: ReactNode;
  subtitle: string;
  meta?: string;
  onEdit: () => void;
  onDelete?: () => void;
}) {
  return (
    <article className="homepage-admin__item-card">
      <div className="homepage-admin__item-body">
        <strong>{title}</strong>
        <p>{subtitle}</p>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className="homepage-admin__item-actions">
        <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={onEdit} aria-label="Edit">
          <PencilLine size={16} />
        </button>
        {onDelete ? (
          <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={onDelete} aria-label="Delete">
            <Trash2 size={16} />
          </button>
        ) : null}
      </div>
    </article>
  );
}

function Field({
  label,
  hint,
  children,
  full = false,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`homepage-admin__field${full ? " homepage-admin__field--full" : ""}`}>
      <span>
        {label}
        {hint ? <small style={{ fontWeight: 400, opacity: 0.65, marginLeft: "6px" }}>({hint})</small> : null}
      </span>
      {children}
    </label>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function SettingsManagementClient({ initialContent, updatedAtLabel }: SettingsManagementClientProps) {
  const [content, setContent] = useState<GlobalSettings>(initialContent);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [status, setStatus] = useState("");
  const [uploadingTarget, setUploadingTarget] = useState("");
  const [isSaving, startSaving] = useTransition();

  const serializedContent = useMemo(() => JSON.stringify(content), [content]);

  const latestUpdatedAt = content.updatedAt
    ? new Date(content.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : updatedAtLabel;

  const openEditor = (nextEditor: EditorState) => {
    setStatus("");
    setEditor(nextEditor);
  };

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveGlobalSettingsAction(serializedContent);
      setStatus(result.message);
      if (result.ok && result.updatedAt) {
        setContent((current) => ({ ...current, updatedAt: result.updatedAt }));
      }
    });
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>, folder: string, target: string) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    setUploadingTarget(target);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const result = await uploadSettingsAssetAction(formData);
    setStatus(result.message);

    if (result.ok && result.url) {
      setEditor((current) => {
        if (!current) return current;
        if (current.section === "brand" && target === "brand-logo") {
          return { ...current, draft: { ...current.draft, logoUrl: result.url } };
        }
        return current;
      });
    }

    setUploadingTarget("");
    event.target.value = "";
  };

  const submitEditor = () => {
    if (!editor) return;

    setContent((current) => {
      if (editor.section === "brand" || editor.section === "contact" || editor.section === "developer") {
        return editor.draft;
      }
      
      if (editor.section === "footerDescription") {
        return { ...current, footerDescription: editor.draft };
      }

      const applyArrayChange = <T,>(arr: T[], mode: "create" | "edit", index: number | null, draft: T) => {
        const next = [...arr];
        if (mode === "create" || index === null) next.push(draft);
        else next[index] = draft;
        return next;
      };

      if (editor.section === "headerNav") {
        return { ...current, headerNav: applyArrayChange(current.headerNav, editor.mode, editor.index, editor.draft) };
      }
      if (editor.section === "quickLinks") {
        return { ...current, quickLinks: applyArrayChange(current.quickLinks, editor.mode, editor.index, editor.draft) };
      }
      if (editor.section === "businessLinks") {
        return { ...current, businessLinks: applyArrayChange(current.businessLinks, editor.mode, editor.index, editor.draft) };
      }
      if (editor.section === "socialLinks") {
        return { ...current, socialLinks: applyArrayChange(current.socialLinks, editor.mode, editor.index, editor.draft) };
      }

      return current;
    });

    setEditor(null);
    setStatus("Settings updated in draft. Click Save to publish.");
  };

  const deleteItem = (key: "headerNav" | "quickLinks" | "businessLinks" | "socialLinks", index: number) => {
    setContent((current) => ({
      ...current,
      [key]: current[key].filter((_, i) => i !== index),
    }));
    setStatus("Item removed. Click Save to publish.");
  };

  return (
    <div className="admin-page homepage-admin">
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Global CMS</p>
          <h2 className="admin-page__title">Header & Footer Management</h2>
        </div>
        <div className="homepage-admin__hero-actions">
          <div className="homepage-admin__stat">
            <span>Last Updated</span>
            <strong>{latestUpdatedAt}</strong>
          </div>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        
        {/* ── Brand & Basic Info ── */}
        <SectionBlock
          icon={<ImageIcon size={18} />}
          title="Brand Settings"
          description="Website logo, name, and tagline"
          badge="Global"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "brand", draft: { ...content } })}
            >
              <PencilLine size={16} /> Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.brandName}
              subtitle={content.brandTagline}
              meta={content.logoUrl ? `Logo: ${content.logoUrl}` : "Using text logo"}
              onEdit={() => openEditor({ section: "brand", draft: { ...content } })}
            />
          </div>
        </SectionBlock>

        {/* ── Contact Info ── */}
        <SectionBlock
          icon={<PhoneCall size={18} />}
          title="Contact Details"
          description="Phone number, email, and address (Headquarters)"
          badge="Footer / Global"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "contact", draft: { ...content } })}
            >
              <PencilLine size={16} /> Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.shortAddress}
              subtitle={`${content.phone} | ${content.email}`}
              meta={`${content.city} • Web: ${content.website}`}
              onEdit={() => openEditor({ section: "contact", draft: { ...content } })}
            />
          </div>
        </SectionBlock>

        {/* ── Header Navigation ── */}
        <SectionBlock
          icon={<Menu size={18} />}
          title="Header Navigation"
          description="Header main menu links"
          badge={`${content.headerNav.length} links`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "headerNav", mode: "create", index: null, draft: { id: createId("nav"), label: "", href: "/" } })}
            >
              <Plus size={16} /> Add Link
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.headerNav.map((link, i) => (
              <SummaryCard
                key={link.id}
                title={link.label}
                subtitle={link.href}
                meta={link.children?.length ? `${link.children.length} sub-items` : "No sub-items"}
                onEdit={() => openEditor({ section: "headerNav", mode: "edit", index: i, draft: link })}
                onDelete={() => deleteItem("headerNav", i)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Footer Description ── */}
        <SectionBlock
          icon={<Building2 size={18} />}
          title="Footer Text"
          description="Description text below the logo"
          badge="1 block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "footerDescription", draft: content.footerDescription })}
            >
              <PencilLine size={16} /> Edit
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title="Brand Summary"
              subtitle={content.footerDescription}
              onEdit={() => openEditor({ section: "footerDescription", draft: content.footerDescription })}
            />
          </div>
        </SectionBlock>

        {/* ── Footer Quick Links ── */}
        <SectionBlock
          icon={<LinkIcon size={18} />}
          title="Quick Links (Footer)"
          description="Footer Quick Links column"
          badge={`${content.quickLinks.length} links`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "quickLinks", mode: "create", index: null, draft: { id: createId("ql"), label: "", href: "/" } })}
            >
              <Plus size={16} /> Add Link
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.quickLinks.map((link, i) => (
              <SummaryCard
                key={link.id}
                title={link.label}
                subtitle={link.href}
                onEdit={() => openEditor({ section: "quickLinks", mode: "edit", index: i, draft: link })}
                onDelete={() => deleteItem("quickLinks", i)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Footer Business Links ── */}
        <SectionBlock
          icon={<Briefcase size={18} />}
          title="About Business (Footer)"
          description="Footer About Business column"
          badge={`${content.businessLinks.length} links`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "businessLinks", mode: "create", index: null, draft: { id: createId("bl"), label: "", href: "/" } })}
            >
              <Plus size={16} /> Add Link
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.businessLinks.map((link, i) => (
              <SummaryCard
                key={link.id}
                title={link.label}
                subtitle={link.href}
                onEdit={() => openEditor({ section: "businessLinks", mode: "edit", index: i, draft: link })}
                onDelete={() => deleteItem("businessLinks", i)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Social Links ── */}
        <SectionBlock
          icon={<Share2 size={18} />}
          title="Social Media Links"
          description="Footer social media icons"
          badge={`${content.socialLinks.length} links`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "socialLinks", mode: "create", index: null, draft: { id: createId("sl"), label: "Facebook", href: "https://", icon: "facebook" } })}
            >
              <Plus size={16} /> Add Social
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.socialLinks.map((link, i) => (
              <SummaryCard
                key={link.id}
                title={link.label}
                subtitle={link.href}
                meta={`Icon: ${link.icon}`}
                onEdit={() => openEditor({ section: "socialLinks", mode: "edit", index: i, draft: link })}
                onDelete={() => deleteItem("socialLinks", i)}
              />
            ))}
          </div>
        </SectionBlock>
      </div>

      {/* ── Editor Modal ── */}
      {editor ? (
        <div className="homepage-admin__modal" role="dialog" aria-modal="true">
          <button className="homepage-admin__modal-backdrop" type="button" onClick={() => setEditor(null)} />
          <div className="homepage-admin__modal-panel">
            <div className="homepage-admin__modal-head">
              <div>
                <h3>
                  {editor.section === "brand" && "Edit Brand Settings"}
                  {editor.section === "contact" && "Edit Contact Details"}
                  {editor.section === "developer" && "Edit Developer Info"}
                  {editor.section === "footerDescription" && "Edit Footer Text"}
                  {["headerNav", "quickLinks", "businessLinks"].includes(editor.section) && ("mode" in editor && editor.mode === "create" ? "Add Link" : "Edit Link")}
                  {editor.section === "socialLinks" && (editor.mode === "create" ? "Add Social Link" : "Edit Social Link")}
                </h3>
              </div>
              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              
              {editor.section === "brand" && (
                <>
                  <Field label="Brand Name">
                    <input
                      className="admin-input"
                      value={editor.draft.brandName}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, brandName: e.target.value } })}
                    />
                  </Field>
                  <Field label="Brand Tagline">
                    <input
                      className="admin-input"
                      value={editor.draft.brandTagline}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, brandTagline: e.target.value } })}
                    />
                  </Field>
                  <Field label="Logo URL" full hint="Leave blank to use text logo">
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.logoUrl || ""}
                        placeholder="/images/logo.svg"
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, logoUrl: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "brand-logo" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(event) => handleUpload(event, "settings/brand", "brand-logo")} />
                      </label>
                    </div>
                  </Field>
                </>
              )}

              {editor.section === "contact" && (
                <>
                  <Field label="Primary Phone">
                    <input className="admin-input" value={editor.draft.phone} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, phone: e.target.value } })} />
                  </Field>
                  <Field label="Secondary Phone">
                    <input className="admin-input" value={editor.draft.secondaryPhone} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, secondaryPhone: e.target.value } })} />
                  </Field>
                  <Field label="General Email">
                    <input className="admin-input" value={editor.draft.email} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, email: e.target.value } })} />
                  </Field>
                  <Field label="Support Email">
                    <input className="admin-input" value={editor.draft.supportEmail} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, supportEmail: e.target.value } })} />
                  </Field>
                  <Field label="Short Address" full>
                    <input className="admin-input" value={editor.draft.shortAddress} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, shortAddress: e.target.value } })} />
                  </Field>
                  <Field label="City & ZIP">
                    <input className="admin-input" value={editor.draft.city} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, city: e.target.value } })} />
                  </Field>
                  <Field label="Website URL">
                    <input className="admin-input" value={editor.draft.website} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, website: e.target.value } })} />
                  </Field>
                  <Field label="Full Address" full>
                    <textarea className="admin-input homepage-admin__textarea" value={editor.draft.address} onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, address: e.target.value } })} />
                  </Field>
                </>
              )}

              {editor.section === "footerDescription" && (
                <Field label="Summary Text" full>
                  <textarea
                    className="admin-input homepage-admin__textarea"
                    style={{ minHeight: "120px" }}
                    value={editor.draft}
                    onChange={(e) => setEditor({ ...editor, draft: e.target.value })}
                  />
                </Field>
              )}

              {["headerNav", "quickLinks", "businessLinks"].includes(editor.section) && (
                <>
                  <Field label="Label" full>
                    <input
                      className="admin-input"
                      value={(editor.draft as NavLink).label}
                      onChange={(e) => setEditor({ ...editor, draft: { ...(editor.draft as NavLink), label: e.target.value } } as any)}
                    />
                  </Field>
                  <Field label="URL (Href)" full>
                    <input
                      className="admin-input"
                      value={(editor.draft as NavLink).href}
                      onChange={(e) => setEditor({ ...editor, draft: { ...(editor.draft as NavLink), href: e.target.value } } as any)}
                    />
                  </Field>
                </>
              )}

              {editor.section === "socialLinks" && (
                <>
                  <Field label="Platform Name">
                    <input
                      className="admin-input"
                      value={(editor.draft as SocialLink).label}
                      onChange={(e) => setEditor({ ...editor, draft: { ...(editor.draft as SocialLink), label: e.target.value } })}
                    />
                  </Field>
                  <Field label="Icon Type">
                    <select
                      className="admin-input"
                      value={(editor.draft as SocialLink).icon}
                      onChange={(e) => setEditor({ ...editor, draft: { ...(editor.draft as SocialLink), icon: e.target.value } })}
                    >
                      <option value="facebook">Facebook</option>
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                    </select>
                  </Field>
                  <Field label="Profile URL" full>
                    <input
                      className="admin-input"
                      value={(editor.draft as SocialLink).href}
                      onChange={(e) => setEditor({ ...editor, draft: { ...(editor.draft as SocialLink), href: e.target.value } })}
                    />
                  </Field>
                </>
              )}

            </div>

            <div className="homepage-admin__modal-actions">
              <button className="admin-btn admin-btn--soft" type="button" onClick={() => setEditor(null)}>
                Cancel
              </button>
              <button className="admin-btn" type="button" onClick={submitEditor}>
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
