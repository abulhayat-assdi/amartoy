"use client";

import { useMemo, useState, useTransition } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  FileText,
  ImagePlus,
  LayoutTemplate,
  PencilLine,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { saveBlogContentAction, uploadBlogAssetAction } from "@/app/admin/(portal)/blog/actions";
import type { BlogPageContent, BlogPageHeader, BlogPostItem, BlogSidebarBanner } from "@/types/blogpage";

interface BlogManagementClientProps {
  initialContent: BlogPageContent;
  updatedAtLabel: string;
}

type EditorState =
  | {
      section: "header";
      mode: "edit";
      draft: BlogPageHeader;
    }
  | {
      section: "post";
      mode: "create" | "edit";
      index: number | null;
      draft: BlogPostItem;
    }
  | {
      section: "banner";
      mode: "edit";
      draft: BlogSidebarBanner;
    };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createPost(): BlogPostItem {
  const now = new Date();
  const formatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return {
    id: createId("post"),
    slug: "",
    title: "",
    category: "",
    date: formatted,
    image: "",
    excerpt: "",
    author: "",
    authorImage: "",
    intro: "",
    paragraphs: ["", "", "", ""],
    quote: "",
    detailImage: "",
    tags: [],
    likes: 0,
    published: true,
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
  badge,
  onEdit,
  onDelete,
  onToggle,
}: {
  title: string;
  subtitle: string;
  meta?: string;
  badge?: { label: string; published: boolean };
  onEdit: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
}) {
  return (
    <article className="homepage-admin__item-card">
      <div className="homepage-admin__item-body">
        <strong>{title}</strong>
        <p>{subtitle}</p>
        {meta ? <span>{meta}</span> : null}
        {badge ? (
          <span
            style={{
              display: "inline-block",
              marginTop: "4px",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: 600,
              background: badge.published ? "var(--clr-success-muted, #d1fae5)" : "var(--clr-warning-muted, #fef3c7)",
              color: badge.published ? "var(--clr-success, #059669)" : "var(--clr-warning, #d97706)",
            }}
          >
            {badge.label}
          </span>
        ) : null}
      </div>
      <div className="homepage-admin__item-actions">
        {onToggle ? (
          <button
            className="admin-icon-btn admin-icon-btn--soft"
            type="button"
            onClick={onToggle}
            aria-label={badge?.published ? "Unpublish" : "Publish"}
            title={badge?.published ? "Click to unpublish" : "Click to publish"}
          >
            {badge?.published ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
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

export function BlogManagementClient({ initialContent, updatedAtLabel }: BlogManagementClientProps) {
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

  const publishedCount = content.posts.filter((p) => p.published).length;

  const openEditor = (nextEditor: EditorState) => {
    setStatus("");
    setEditor(nextEditor);
  };

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveBlogContentAction(serializedContent);
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

    const result = await uploadBlogAssetAction(formData);
    setStatus(result.message);

    if (result.ok && result.url) {
      setEditor((current) => {
        if (!current) return current;

        if (current.section === "post") {
          if (target === "post-image") return { ...current, draft: { ...current.draft, image: result.url } };
          if (target === "post-detail-image") return { ...current, draft: { ...current.draft, detailImage: result.url } };
          if (target === "post-author-image") return { ...current, draft: { ...current.draft, authorImage: result.url } };
        }

        if (current.section === "banner" && target === "banner-image") {
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
      if (editor.section === "header") {
        return { ...current, header: editor.draft };
      }

      if (editor.section === "post") {
        const next = [...current.posts];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, posts: next };
      }

      if (editor.section === "banner") {
        return { ...current, sidebarBanner: editor.draft };
      }

      return current;
    });

    setEditor(null);
    setStatus("Section draft updated. Click Save Blog Page to publish the changes.");
  };

  const deletePost = (index: number) => {
    setContent((current) => ({
      ...current,
      posts: current.posts.filter((_, i) => i !== index),
    }));
    setStatus("Post removed from the draft. Click Save Blog Page to make it live.");
  };

  const togglePublished = (index: number) => {
    setContent((current) => {
      const next = [...current.posts];
      next[index] = { ...next[index], published: !next[index].published };
      return { ...current, posts: next };
    });
  };

  // Helper: update a single paragraph
  const updateParagraph = (index: number, value: string) => {
    if (!editor || editor.section !== "post") return;
    const paragraphs = [...editor.draft.paragraphs];
    paragraphs[index] = value;
    setEditor({ ...editor, draft: { ...editor.draft, paragraphs } });
  };

  const addParagraph = () => {
    if (!editor || editor.section !== "post") return;
    setEditor({ ...editor, draft: { ...editor.draft, paragraphs: [...editor.draft.paragraphs, ""] } });
  };

  const removeParagraph = (index: number) => {
    if (!editor || editor.section !== "post") return;
    setEditor({
      ...editor,
      draft: { ...editor.draft, paragraphs: editor.draft.paragraphs.filter((_, i) => i !== index) },
    });
  };

  return (
    <div className="admin-page homepage-admin">
      {/* ── Page Header ── */}
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Blog CMS</p>
          <h2 className="admin-page__title">Blog Management</h2>
        </div>

        <div className="homepage-admin__hero-actions">
          <div className="homepage-admin__stat">
            <span>Last Updated</span>
            <strong>{latestUpdatedAt}</strong>
          </div>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Blog Page"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        {/* ── Page Header Section ── */}
        <SectionBlock
          icon={<LayoutTemplate size={18} />}
          title="Page Header"
          description="Blog পেইজের eyebrow, title এবং description।"
          badge="Single block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "header", mode: "edit", draft: content.header })}
            >
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.header.title}
              subtitle={content.header.description}
              meta={`Eyebrow: ${content.header.eyebrow}`}
              onEdit={() => openEditor({ section: "header", mode: "edit", draft: content.header })}
            />
          </div>
        </SectionBlock>

        {/* ── Blog Posts ── */}
        <SectionBlock
          icon={<FileText size={18} />}
          title="Blog Posts"
          description={`সব blog post add, edit, delete এবং publish/unpublish করুন।`}
          badge={`${publishedCount} published / ${content.posts.length} total`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "post", mode: "create", index: null, draft: createPost() })}
            >
              <Plus size={16} />
              New Post
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.posts.map((post, index) => (
              <SummaryCard
                key={post.id}
                title={post.title || `Post ${index + 1}`}
                subtitle={post.excerpt || "No excerpt set."}
                meta={`${post.category} • ${post.date} • /${post.slug}/`}
                badge={{ label: post.published ? "Published" : "Draft", published: post.published }}
                onEdit={() => openEditor({ section: "post", mode: "edit", index, draft: post })}
                onDelete={() => deletePost(index)}
                onToggle={() => togglePublished(index)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Sidebar Banner ── */}
        <SectionBlock
          icon={<ImagePlus size={18} />}
          title="Sidebar Banner"
          description="Blog sidebar-এর promotional banner block।"
          badge="Single block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "banner", mode: "edit", draft: content.sidebarBanner })}
            >
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.sidebarBanner.tagline}
              subtitle={`Brand: ${content.sidebarBanner.brandLabel} • Link: ${content.sidebarBanner.href}`}
              meta={`Image: ${content.sidebarBanner.imageUrl || "Not set"}`}
              onEdit={() => openEditor({ section: "banner", mode: "edit", draft: content.sidebarBanner })}
            />
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
                  {editor.section === "header" && "Page Header"}
                  {editor.section === "post" && (editor.mode === "create" ? "New Blog Post" : "Edit Blog Post")}
                  {editor.section === "banner" && "Sidebar Banner"}
                </h3>
              </div>
              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              {/* ── Header Editor ── */}
              {editor.section === "header" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: e.target.value } })}
                    />
                  </Field>
                  <Field label="Title">
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
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, description: e.target.value } })}
                    />
                  </Field>
                </>
              ) : null}

              {/* ── Post Editor ── */}
              {editor.section === "post" ? (
                <>
                  {/* Row 1: title + slug */}
                  <Field label="Title" full>
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, title: e.target.value } })}
                    />
                  </Field>
                  <Field label="Slug">
                    <input
                      className="admin-input"
                      value={editor.draft.slug}
                      placeholder="my-post-url"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, slug: e.target.value } })}
                    />
                  </Field>
                  <Field label="Category">
                    <input
                      className="admin-input"
                      value={editor.draft.category}
                      placeholder="Toys"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, category: e.target.value } })}
                    />
                  </Field>
                  <Field label="Date">
                    <input
                      className="admin-input"
                      value={editor.draft.date}
                      placeholder="Apr 23, 2026"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, date: e.target.value } })}
                    />
                  </Field>
                  <Field label="Author">
                    <input
                      className="admin-input"
                      value={editor.draft.author}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, author: e.target.value } })}
                    />
                  </Field>
                  <Field label="Likes">
                    <input
                      className="admin-input"
                      type="number"
                      min={0}
                      value={editor.draft.likes}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, likes: Number(e.target.value) || 0 } })
                      }
                    />
                  </Field>
                  <Field label="Status">
                    <select
                      className="admin-input"
                      value={editor.draft.published ? "published" : "draft"}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, published: e.target.value === "published" } })
                      }
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </Field>
                  <Field label="Tags (comma separated)">
                    <input
                      className="admin-input"
                      value={editor.draft.tags.join(", ")}
                      placeholder="Article, Toys, Featured"
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: {
                            ...editor.draft,
                            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Excerpt" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.excerpt}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, excerpt: e.target.value } })}
                    />
                  </Field>
                  <Field label="Intro" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.intro}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, intro: e.target.value } })}
                    />
                  </Field>
                  <Field label="Pull Quote" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.quote}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, quote: e.target.value } })}
                    />
                  </Field>

                  {/* Paragraphs */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontWeight: 600, fontSize: "13px" }}>Paragraphs</span>
                      <button className="admin-btn admin-btn--soft" type="button" onClick={addParagraph} style={{ padding: "4px 10px", fontSize: "12px" }}>
                        <Plus size={13} /> Add Paragraph
                      </button>
                    </div>
                    {editor.draft.paragraphs.map((para, index) => (
                      <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <textarea
                          className="admin-input homepage-admin__textarea"
                          value={para}
                          placeholder={`Paragraph ${index + 1}`}
                          onChange={(e) => updateParagraph(index, e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <button
                          className="admin-icon-btn admin-icon-btn--soft"
                          type="button"
                          onClick={() => removeParagraph(index)}
                          aria-label="Remove paragraph"
                          style={{ alignSelf: "flex-start", marginTop: "2px" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Thumbnail Image */}
                  <Field label="Thumbnail Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.image}
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, image: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "post-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(e) => handleUpload(e, "blog/thumbnails", "post-image")} />
                      </label>
                    </div>
                  </Field>

                  {/* Detail Image */}
                  <Field label="Detail Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.detailImage}
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, detailImage: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "post-detail-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(e) => handleUpload(e, "blog/detail", "post-detail-image")} />
                      </label>
                    </div>
                  </Field>

                  {/* Author Image */}
                  <Field label="Author Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.authorImage}
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, authorImage: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "post-author-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(e) => handleUpload(e, "blog/authors", "post-author-image")} />
                      </label>
                    </div>
                  </Field>
                </>
              ) : null}

              {/* ── Banner Editor ── */}
              {editor.section === "banner" ? (
                <>
                  <Field label="Brand Label">
                    <input
                      className="admin-input"
                      value={editor.draft.brandLabel}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, brandLabel: e.target.value } })}
                    />
                  </Field>
                  <Field label="Button / Link URL">
                    <input
                      className="admin-input"
                      value={editor.draft.href}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, href: e.target.value } })}
                    />
                  </Field>
                  <Field label="Tagline" full>
                    <input
                      className="admin-input"
                      value={editor.draft.tagline}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, tagline: e.target.value } })}
                    />
                  </Field>
                  <Field label="Banner Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.imageUrl}
                        onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, imageUrl: e.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "banner-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(e) => handleUpload(e, "blog/banner", "banner-image")} />
                      </label>
                    </div>
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
