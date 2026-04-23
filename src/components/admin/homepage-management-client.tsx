"use client";

import { useMemo, useState, useTransition } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  Film,
  FolderKanban,
  ImagePlus,
  LayoutTemplate,
  MessageSquareQuote,
  PackagePlus,
  PencilLine,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { saveHomepageContentAction, uploadHomepageAssetAction } from "@/app/admin/(portal)/home/actions";
import type {
  HomeBlogSection,
  HomeCategoryItem,
  HomeFeatureItem,
  HomeHeroSlide,
  HomePageContent,
  HomePopularProductsSection,
  HomePromoSection,
  HomeReviewMediaItem,
  HomeVideoSection,
} from "@/types/homepage";

interface HomepageManagementClientProps {
  initialContent: HomePageContent;
  updatedAtLabel: string;
}

type EditorState =
  | {
      section: "hero";
      mode: "create" | "edit";
      index: number | null;
      draft: HomeHeroSlide;
    }
  | {
      section: "category";
      mode: "create" | "edit";
      index: number | null;
      draft: HomeCategoryItem;
    }
  | {
      section: "review";
      mode: "create" | "edit";
      index: number | null;
      draft: HomeReviewMediaItem;
    }
  | {
      section: "feature";
      mode: "create" | "edit";
      index: number | null;
      draft: HomeFeatureItem;
    }
  | {
      section: "popular";
      mode: "edit";
      draft: HomePopularProductsSection;
    }
  | {
      section: "promo";
      mode: "edit";
      draft: HomePromoSection;
    }
  | {
      section: "video";
      mode: "edit";
      draft: HomeVideoSection;
    }
  | {
      section: "blog";
      mode: "edit";
      draft: HomeBlogSection;
    };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createHeroSlide(): HomeHeroSlide {
  return {
    id: createId("hero"),
    eyebrow: "",
    title: "",
    description: "",
    ctaLabel: "Discover Now",
    ctaHref: "/shop/",
    imageUrl: "",
    accent: "sky",
  };
}

function createCategoryItem(): HomeCategoryItem {
  return {
    id: createId("category"),
    name: "",
    slug: "",
    href: "",
    imageUrl: "",
    description: "",
  };
}

function createReviewItem(): HomeReviewMediaItem {
  return {
    id: createId("review"),
    type: "image",
    src: "",
    poster: "",
    title: "",
    description: "",
    author: "",
  };
}

function createFeatureItem(): HomeFeatureItem {
  return {
    id: createId("feature"),
    title: "",
    subtitle: "",
    icon: "badge-dollar-sign",
  };
}

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

export function HomepageManagementClient({
  initialContent,
  updatedAtLabel,
}: HomepageManagementClientProps) {
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
      const result = await saveHomepageContentAction(serializedContent);
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

    const result = await uploadHomepageAssetAction(formData);
    setStatus(result.message);

    if (result.ok && result.url) {
      setEditor((current) => {
        if (!current) return current;

        if (current.section === "hero" && target === "hero-image") {
          return { ...current, draft: { ...current.draft, imageUrl: result.url } };
        }

        if (current.section === "category" && target === "category-image") {
          return { ...current, draft: { ...current.draft, imageUrl: result.url } };
        }

        if (current.section === "review") {
          if (target === "review-src") {
            return { ...current, draft: { ...current.draft, src: result.url } };
          }

          if (target === "review-poster") {
            return { ...current, draft: { ...current.draft, poster: result.url } };
          }
        }

        if (current.section === "promo" && target === "promo-image") {
          return { ...current, draft: { ...current.draft, imageUrl: result.url } };
        }

        if (current.section === "video") {
          if (target === "video-url") {
            return { ...current, draft: { ...current.draft, videoUrl: result.url } };
          }

          if (target === "video-poster") {
            return { ...current, draft: { ...current.draft, posterUrl: result.url } };
          }
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
        const next = [...current.heroSlides];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, heroSlides: next };
      }

      if (editor.section === "category") {
        const next = [...current.categories];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, categories: next };
      }

      if (editor.section === "review") {
        const next = [...current.reviewMedia];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, reviewMedia: next };
      }

      if (editor.section === "feature") {
        const next = [...current.features];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, features: next };
      }

      if (editor.section === "popular") {
        return { ...current, popularProductsSection: editor.draft };
      }

      if (editor.section === "promo") {
        return { ...current, promoSection: editor.draft };
      }

      if (editor.section === "video") {
        return { ...current, videoSection: editor.draft };
      }

      return { ...current, blogSection: editor.draft };
    });

    setEditor(null);
    setStatus("Section draft updated. Click Save Homepage to publish the changes.");
  };

  const deleteArrayItem = (section: "hero" | "category" | "review" | "feature", index: number) => {
    setContent((current) => {
      if (section === "hero") {
        return { ...current, heroSlides: current.heroSlides.filter((_, itemIndex) => itemIndex !== index) };
      }

      if (section === "category") {
        return { ...current, categories: current.categories.filter((_, itemIndex) => itemIndex !== index) };
      }

      if (section === "review") {
        return { ...current, reviewMedia: current.reviewMedia.filter((_, itemIndex) => itemIndex !== index) };
      }

      return { ...current, features: current.features.filter((_, itemIndex) => itemIndex !== index) };
    });

    setStatus("Item removed from the draft. Click Save Homepage to make it live.");
  };

  return (
    <div className="admin-page homepage-admin">
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Homepage CMS</p>
          <h2 className="admin-page__title">Homepage Management</h2>
        </div>

        <div className="homepage-admin__hero-actions">
          <div className="homepage-admin__stat">
            <span>Last Updated</span>
            <strong>{latestUpdatedAt}</strong>
          </div>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Homepage"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        <SectionBlock
          icon={<LayoutTemplate size={18} />}
          title="Hero Banner"
          description="Banner slides add, edit, delete আর CTA control."
          badge={`${content.heroSlides.length} slides`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "hero", mode: "create", index: null, draft: createHeroSlide() })}>
              <Plus size={16} />
              Add Banner
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.heroSlides.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.title || `Hero Banner ${index + 1}`}
                subtitle={item.description || "No banner description yet."}
                meta={`${item.ctaLabel || "CTA"} • ${item.ctaHref || "/shop/"}`}
                onEdit={() => openEditor({ section: "hero", mode: "edit", index, draft: item })}
                onDelete={() => deleteArrayItem("hero", index)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<FolderKanban size={18} />}
          title="Category Section"
          description="Homepage category card list."
          badge={`${content.categories.length} categories`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "category", mode: "create", index: null, draft: createCategoryItem() })}>
              <Plus size={16} />
              Add Category
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.categories.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.name || `Category ${index + 1}`}
                subtitle={item.description || "No category description yet."}
                meta={item.href || "No link set"}
                onEdit={() => openEditor({ section: "category", mode: "edit", index, draft: item })}
                onDelete={() => deleteArrayItem("category", index)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<MessageSquareQuote size={18} />}
          title="Customer Reviews"
          description="Image/video review cards."
          badge={`${content.reviewMedia.length} items`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "review", mode: "create", index: null, draft: createReviewItem() })}>
              <Plus size={16} />
              Add Review
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.reviewMedia.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.title || `Review ${index + 1}`}
                subtitle={item.description || "No review description yet."}
                meta={`${item.type.toUpperCase()} • ${item.author || "Unknown author"}`}
                onEdit={() => openEditor({ section: "review", mode: "edit", index, draft: item })}
                onDelete={() => deleteArrayItem("review", index)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<PackagePlus size={18} />}
          title="Popular Products"
          description="কোন product card homepage-এ দেখাবে সেটা link/slug দিয়ে control."
          badge={`${content.popularProductsSection.productLinks.length} products`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "popular", mode: "edit", draft: content.popularProductsSection })}>
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.popularProductsSection.title}
              subtitle={content.popularProductsSection.description}
              meta={content.popularProductsSection.productLinks.join(", ") || "No product links set"}
              onEdit={() => openEditor({ section: "popular", mode: "edit", draft: content.popularProductsSection })}
            />
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<ImagePlus size={18} />}
          title="Promo Section"
          description="Large image section + CTA text."
          badge="Single block"
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "promo", mode: "edit", draft: content.promoSection })}>
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.promoSection.title}
              subtitle={content.promoSection.description}
              meta={content.promoSection.buttonLabel}
              onEdit={() => openEditor({ section: "promo", mode: "edit", draft: content.promoSection })}
            />
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<Film size={18} />}
          title="Video Section"
          description="Video link/upload + poster + copy."
          badge="Single block"
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "video", mode: "edit", draft: content.videoSection })}>
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.videoSection.title}
              subtitle={content.videoSection.description}
              meta={content.videoSection.videoUrl}
              onEdit={() => openEditor({ section: "video", mode: "edit", draft: content.videoSection })}
            />
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<Sparkles size={18} />}
          title="Feature Strip"
          description="Trust badges and short value points."
          badge={`${content.features.length} items`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "feature", mode: "create", index: null, draft: createFeatureItem() })}>
              <Plus size={16} />
              Add Feature
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.features.map((item, index) => (
              <SummaryCard
                key={item.id}
                title={item.title || `Feature ${index + 1}`}
                subtitle={item.subtitle || "No subtitle set."}
                meta={item.icon}
                onEdit={() => openEditor({ section: "feature", mode: "edit", index, draft: item })}
                onDelete={() => deleteArrayItem("feature", index)}
              />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<LayoutTemplate size={18} />}
          title="Latest Blog Section"
          description="Latest published blog auto-feed settings."
          badge={`${content.blogSection.limit} posts`}
          action={
            <button className="admin-btn admin-btn--soft" type="button" onClick={() => openEditor({ section: "blog", mode: "edit", draft: content.blogSection })}>
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={content.blogSection.title}
              subtitle={content.blogSection.description}
              meta={`Limit: ${content.blogSection.limit}`}
              onEdit={() => openEditor({ section: "blog", mode: "edit", draft: content.blogSection })}
            />
          </div>
        </SectionBlock>
      </div>

      {editor ? (
        <div className="homepage-admin__modal" role="dialog" aria-modal="true">
          <button className="homepage-admin__modal-backdrop" type="button" onClick={() => setEditor(null)} />
          <div className="homepage-admin__modal-panel">
            <div className="homepage-admin__modal-head">
              <div>
                <p>{editor.mode === "create" ? "Create New" : "Edit Section"}</p>
                <h3>
                  {editor.section === "hero" && "Hero Banner"}
                  {editor.section === "category" && "Category"}
                  {editor.section === "review" && "Customer Review"}
                  {editor.section === "feature" && "Feature Item"}
                  {editor.section === "popular" && "Popular Products"}
                  {editor.section === "promo" && "Promo Section"}
                  {editor.section === "video" && "Video Section"}
                  {editor.section === "blog" && "Latest Blog Section"}
                </h3>
              </div>

              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              {editor.section === "hero" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: event.target.value } })}
                    />
                  </Field>
                  <Field label="CTA Label">
                    <input
                      className="admin-input"
                      value={editor.draft.ctaLabel}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, ctaLabel: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title" full>
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="CTA Link">
                    <input
                      className="admin-input"
                      value={editor.draft.ctaHref}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, ctaHref: event.target.value } })}
                    />
                  </Field>
                  <Field label="Accent">
                    <select
                      className="admin-input"
                      value={editor.draft.accent}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, accent: event.target.value as HomeHeroSlide["accent"] } })
                      }
                    >
                      <option value="sky">Sky</option>
                      <option value="sun">Sun</option>
                      <option value="coral">Coral</option>
                      <option value="mint">Mint</option>
                      <option value="rose">Rose</option>
                    </select>
                  </Field>
                  <Field label="Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.imageUrl}
                        onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, imageUrl: event.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "hero-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(event) => handleUpload(event, "homepage/hero", "hero-image")} />
                      </label>
                    </div>
                  </Field>
                </>
              ) : null}

              {editor.section === "category" ? (
                <>
                  <Field label="Category Name">
                    <input
                      className="admin-input"
                      value={editor.draft.name}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, name: event.target.value } })}
                    />
                  </Field>
                  <Field label="Slug">
                    <input
                      className="admin-input"
                      value={editor.draft.slug}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, slug: event.target.value } })}
                    />
                  </Field>
                  <Field label="Link">
                    <input
                      className="admin-input"
                      value={editor.draft.href}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, href: event.target.value } })}
                    />
                  </Field>
                  <Field label="Image URL">
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.imageUrl}
                        onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, imageUrl: event.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "category-image" ? "Uploading..." : "Upload"}
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleUpload(event, "homepage/categories", "category-image")}
                        />
                      </label>
                    </div>
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                </>
              ) : null}

              {editor.section === "review" ? (
                <>
                  <Field label="Type">
                    <select
                      className="admin-input"
                      value={editor.draft.type}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, type: event.target.value as HomeReviewMediaItem["type"] } })
                      }
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </Field>
                  <Field label="Author">
                    <input
                      className="admin-input"
                      value={editor.draft.author}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, author: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title" full>
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label={editor.draft.type === "video" ? "Video URL" : "Image URL"} full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.src}
                        onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, src: event.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "review-src" ? "Uploading..." : "Upload"}
                        <input
                          hidden
                          type="file"
                          accept={editor.draft.type === "video" ? "video/*" : "image/*"}
                          onChange={(event) =>
                            handleUpload(
                              event,
                              editor.draft.type === "video" ? "homepage/reviews/video" : "homepage/reviews/image",
                              "review-src",
                            )
                          }
                        />
                      </label>
                    </div>
                  </Field>
                  {editor.draft.type === "video" ? (
                    <Field label="Poster URL" full>
                      <div className="homepage-admin__asset-row">
                        <input
                          className="admin-input"
                          value={editor.draft.poster || ""}
                          onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, poster: event.target.value } })}
                        />
                        <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                          <Upload size={16} />
                          {uploadingTarget === "review-poster" ? "Uploading..." : "Upload"}
                          <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleUpload(event, "homepage/reviews/posters", "review-poster")}
                          />
                        </label>
                      </div>
                    </Field>
                  ) : null}
                </>
              ) : null}

              {editor.section === "feature" ? (
                <>
                  <Field label="Title">
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Subtitle">
                    <input
                      className="admin-input"
                      value={editor.draft.subtitle}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, subtitle: event.target.value } })}
                    />
                  </Field>
                  <Field label="Icon" full>
                    <select
                      className="admin-input"
                      value={editor.draft.icon}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, icon: event.target.value as HomeFeatureItem["icon"] } })
                      }
                    >
                      <option value="badge-dollar-sign">Badge Dollar</option>
                      <option value="package-check">Package Check</option>
                      <option value="shield-check">Shield Check</option>
                      <option value="message-circle">Message Circle</option>
                    </select>
                  </Field>
                </>
              ) : null}

              {editor.section === "popular" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title">
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Product Links or Slugs" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.productLinks.join("\n")}
                      onChange={(event) =>
                        setEditor({
                          ...editor,
                          draft: {
                            ...editor.draft,
                            productLinks: event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                          },
                        })
                      }
                    />
                  </Field>
                </>
              ) : null}

              {editor.section === "promo" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title">
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Button Label">
                    <input
                      className="admin-input"
                      value={editor.draft.buttonLabel}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, buttonLabel: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Button Link">
                    <input
                      className="admin-input"
                      value={editor.draft.buttonHref}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, buttonHref: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Promo Image URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.imageUrl}
                        onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, imageUrl: event.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "promo-image" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="image/*" onChange={(event) => handleUpload(event, "homepage/promo", "promo-image")} />
                      </label>
                    </div>
                  </Field>
                </>
              ) : null}

              {editor.section === "video" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title">
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Video URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.videoUrl}
                        onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, videoUrl: event.target.value } })}
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "video-url" ? "Uploading..." : "Upload"}
                        <input hidden type="file" accept="video/*" onChange={(event) => handleUpload(event, "homepage/video", "video-url")} />
                      </label>
                    </div>
                  </Field>
                  <Field label="Poster URL" full>
                    <div className="homepage-admin__asset-row">
                      <input
                        className="admin-input"
                        value={editor.draft.posterUrl}
                        onChange={(event) =>
                          setEditor({ ...editor, draft: { ...editor.draft, posterUrl: event.target.value } })
                        }
                      />
                      <label className="admin-btn admin-btn--soft homepage-admin__upload-btn">
                        <Upload size={16} />
                        {uploadingTarget === "video-poster" ? "Uploading..." : "Upload"}
                        <input
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleUpload(event, "homepage/video/posters", "video-poster")}
                        />
                      </label>
                    </div>
                  </Field>
                </>
              ) : null}

              {editor.section === "blog" ? (
                <>
                  <Field label="Eyebrow">
                    <input
                      className="admin-input"
                      value={editor.draft.eyebrow}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, eyebrow: event.target.value } })}
                    />
                  </Field>
                  <Field label="Title">
                    <input
                      className="admin-input"
                      value={editor.draft.title}
                      onChange={(event) => setEditor({ ...editor, draft: { ...editor.draft, title: event.target.value } })}
                    />
                  </Field>
                  <Field label="Post Limit">
                    <input
                      className="admin-input"
                      min={1}
                      max={6}
                      type="number"
                      value={editor.draft.limit}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, limit: Number(event.target.value) || 3 } })
                      }
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(event) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: event.target.value } })
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
