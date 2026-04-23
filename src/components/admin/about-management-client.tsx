"use client";

import { useMemo, useState, useTransition } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  FileText,
  ImagePlus,
  ListOrdered,
  PencilLine,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { saveAboutContentAction, uploadAboutAssetAction } from "@/app/admin/(portal)/about/actions";
import type { AboutHeroSection, AboutHighlightItem, AboutPageContent } from "@/types/aboutpage";

interface AboutManagementClientProps {
  initialContent: AboutPageContent;
  updatedAtLabel: string;
}

type EditorState =
  | {
      section: "hero";
      mode: "edit";
      draft: AboutHeroSection;
    }
  | {
      section: "highlight";
      mode: "create" | "edit";
      index: number | null;
      draft: AboutHighlightItem;
    };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createHighlightItem(existingCount: number): AboutHighlightItem {
  return {
    id: createId("highlight"),
    number: String(existingCount + 1).padStart(2, "0"),
    title: "",
    description: "",
  };
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
  title: string;
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
        <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={onEdit} aria-label={`Edit ${title}`}>
          <PencilLine size={16} />
        </button>
        {onDelete ? (
          <button
            className="admin-icon-btn admin-icon-btn--soft"
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${title}`}
          >
            <Trash2 size={16} />
          </button>
        ) : null}
      </div>
    </article>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`homepage-admin__field${full ? " homepage-admin__field--full" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function AboutManagementClient({
  initialContent,
  updatedAtLabel,
}: AboutManagementClientProps) {
  const [content, setContent] = useState(initialContent);
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
      const result = await saveAboutContentAction(serializedContent);
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

    const result = await uploadAboutAssetAction(formData);
    setStatus(result.message);

    if (result.ok && result.url) {
      setEditor((current) => {
        if (!current) return current;

        if (current.section === "hero" && target === "hero-image") {
          return { ...current, draft: { ...current.draft, imageUrl: result.url } };
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
      if (editor.section === "hero") {
        return { ...current, heroSection: editor.draft };
      }

      if (editor.section === "highlight") {
        const next = [...current.highlights];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, highlights: next };
      }

      return current;
    });

    setEditor(null);
    setStatus("Section draft updated. Click Save About Page to publish the changes.");
  };

  const deleteHighlight = (index: number) => {
    setContent((current) => ({
      ...current,
      highlights: current.highlights.filter((_, itemIndex) => itemIndex !== index),
    }));
    setStatus("Highlight removed from the draft. Click Save About Page to make it live.");
  };

  return (
    <div className="admin-page homepage-admin">
      {/* ── Page Header ── */}
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">About Page CMS</p>
          <h2 className="admin-page__title">About Us Management</h2>
        </div>

        <div className="homepage-admin__hero-actions">
          <div className="homepage-admin__stat">
            <span>Last Updated</span>
            <strong>{latestUpdatedAt}</strong>
          </div>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save About Page"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        {/* ── Hero / Brand Story ── */}
        <SectionBlock
          icon={<FileText size={18} />}
          title="Hero / Brand Story"
          description="About পেইজের মূল সেকশন — eyebrow, title, তিনটি paragraph, signature, image এবং badge।"
          badge="Single block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "hero", mode: "edit", draft: content.heroSection })}
            >
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.heroSection.title}
              subtitle={content.heroSection.paragraph1.slice(0, 120) + "…"}
              meta={`Image: ${content.heroSection.imageUrl || "Not set"} • Badge: ${content.heroSection.badgeNumber} ${content.heroSection.badgeLabel}`}
              onEdit={() => openEditor({ section: "hero", mode: "edit", draft: content.heroSection })}
            />
          </div>
        </SectionBlock>

        {/* ── Highlights Grid ── */}
        <SectionBlock
          icon={<ListOrdered size={18} />}
          title="Highlights Grid"
          description="Numbered highlight cards — add, edit, delete করুন।"
          badge={`${content.highlights.length} items`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() =>
                openEditor({
                  section: "highlight",
                  mode: "create",
                  index: null,
                  draft: createHighlightItem(content.highlights.length),
                })
              }
            >
              <Plus size={16} />
              Add Highlight
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.highlights.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={`${item.number}. ${item.title || `Highlight ${index + 1}`}`}
                subtitle={item.description || "No description yet."}
                onEdit={() => openEditor({ section: "highlight", mode: "edit", index, draft: item })}
                onDelete={() => deleteHighlight(index)}
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
                <p>{editor.mode === "create" ? "Create New" : "Edit Section"}</p>
                <h3>
                  {editor.section === "hero" && "Hero / Brand Story"}
                  {editor.section === "highlight" && "Highlight Item"}
                </h3>
              </div>

              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              {/* ── Hero Editor ── */}
              {editor.section === "hero" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: e.target.value } })}
                    />
                  </Field>
                  <Field label="Signature">
                    <input
                      className="admin-input"
                      value={editor.draft.signature}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, signature: e.target.value } })}
                    />
                  </Field>
                  <Field label="Badge Number">
                    <input
                      className="admin-input"
                      value={editor.draft.badgeNumber}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, badgeNumber: e.target.value } })}
                    />
                  </Field>
                  <Field label="Badge Label">
                    <input
                      className="admin-input"
                      value={editor.draft.badgeLabel}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, badgeLabel: e.target.value } })}
                    />
                  </Field>
                  <Field label="Title" full>
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, title: e.target.value } })}
                    />
                  </Field>
                  <Field label="Paragraph 1" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.paragraph1}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, paragraph1: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Paragraph 2" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.paragraph2}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, paragraph2: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Paragraph 3" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.paragraph3}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, paragraph3: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Hero Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.imageUrl}
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, imageUrl: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "hero-image" ? "Uploading..." : "Upload"}
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUpload(e, "about/hero", "hero-image")}
                        />
                      </label>
                    </div>
                  </Field>
                </>
              ) : null}

              {/* ── Highlight Editor ── */}
              {editor.section === "highlight" ? (
                <>
                  <Field label="Number">
                    <input
                      className="admin-input"
                      value={editor.draft.number}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, number: e.target.value } })}
                      placeholder="01"
                    />
                  </Field>
                  <Field label="Title" full>
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, title: e.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: e.target.value } })
                      }
                    />
                  </Field>
                </>
              ) : null}
            </div>

            <div className="homepage-admin__modal-actions">
              <button className="admin-btn admin-btn--soft" type="button" onClick={() => setEditor(null)}>
                Cancel
              </button>
              <button className="admin-btn" type="button" onClick={submitEditor}>
                {editor.mode === "create" ? "Add to Section" : "Update Section"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
