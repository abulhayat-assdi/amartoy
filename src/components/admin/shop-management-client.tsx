"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import {
  Box,
  Eye,
  EyeOff,
  Layers,
  Package,
  PencilLine,
  Plus,
  Save,
  Search,
  Settings,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { saveShopContentAction } from "@/app/admin/(portal)/products/actions";
import type { ShopCategory, ShopPageContent, ShopProduct, ShopSettings } from "@/types/shoppage";

interface ShopManagementClientProps {
  initialContent: ShopPageContent;
  updatedAtLabel: string;
}

type EditorState =
  | {
      section: "product";
      mode: "create" | "edit";
      index: number | null;
      draft: ShopProduct;
    }
  | {
      section: "category";
      mode: "create" | "edit";
      index: number | null;
      draft: ShopCategory;
    }
  | {
      section: "settings";
      mode: "edit";
      draft: ShopSettings;
    };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createProduct(): ShopProduct {
  return {
    id: createId("product"),
    slug: "",
    name: "",
    image: "",
    category: "",
    categorySlug: "",
    price: 0,
    description: "",
    shortDescription: "",
    tags: [],
    saleLabel: null,
    rating: 5,
    stock: "In stock",
    sku: "",
    enabled: true,
  };
}

function createCategory(): ShopCategory {
  return {
    id: createId("category"),
    name: "",
    slug: "",
    description: "",
    enabled: true,
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
  enabled,
  onEdit,
  onDelete,
  onToggle,
}: {
  title: ReactNode;
  subtitle: string;
  meta?: string;
  enabled?: boolean;
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
        {enabled !== undefined ? (
          <span
            style={{
              display: "inline-block",
              marginTop: "4px",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: 600,
              background: enabled ? "var(--clr-success-muted, #d1fae5)" : "var(--clr-neutral-muted, #f3f4f6)",
              color: enabled ? "var(--clr-success, #059669)" : "var(--clr-neutral, #6b7280)",
            }}
          >
            {enabled ? "Enabled" : "Disabled"}
          </span>
        ) : null}
      </div>
      <div className="homepage-admin__item-actions">
        {onToggle ? (
          <button
            className="admin-icon-btn admin-icon-btn--soft"
            type="button"
            onClick={onToggle}
            aria-label={enabled ? "Disable" : "Enable"}
            title={enabled ? "Click to disable" : "Click to enable"}
          >
            {enabled ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
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

// ─── Products Section (grouped by category + search) ─────────────────────────

function ProductsSection({
  products,
  categories,
  currency,
  search,
  deferredSearch,
  onSearchChange,
  enabledCount,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
}: {
  products: ShopProduct[];
  categories: ShopCategory[];
  currency: string;
  search: string;
  deferredSearch: string;
  onSearchChange: (v: string) => void;
  enabledCount: number;
  onAdd: () => void;
  onEdit: (index: number, product: ShopProduct) => void;
  onDelete: (index: number) => void;
  onToggle: (index: number) => void;
}) {
  const query = deferredSearch.toLowerCase().trim();

  // Filter products by search
  const filteredProducts = useMemo(() => {
    if (!query) return products.map((p, i) => ({ product: p, originalIndex: i }));
    return products
      .map((p, i) => ({ product: p, originalIndex: i }))
      .filter(
        ({ product }) =>
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
  }, [products, query]);

  // Group by category
  const grouped = useMemo(() => {
    const categoryMap = new Map<string, { product: ShopProduct; originalIndex: number }[]>();

    // Initialize from categories list so order is maintained
    for (const cat of categories) {
      categoryMap.set(cat.name, []);
    }
    // Add "Uncategorized" fallback
    categoryMap.set("__uncategorized__", []);

    for (const entry of filteredProducts) {
      const key = entry.product.category || "__uncategorized__";
      if (!categoryMap.has(key)) {
        categoryMap.set(key, []);
      }
      categoryMap.get(key)!.push(entry);
    }

    // Convert to array and filter out empty
    return Array.from(categoryMap.entries())
      .filter(([, items]) => items.length > 0)
      .map(([categoryName, items]) => ({
        categoryName: categoryName === "__uncategorized__" ? "Uncategorized" : categoryName,
        items,
      }));
  }, [filteredProducts, categories]);

  const isSearching = query.length > 0;

  return (
    <section className="homepage-admin__section">
      <div className="homepage-admin__section-head">
        <div className="homepage-admin__section-copy">
          <span className="homepage-admin__section-icon"><Package size={18} /></span>
          <div>
            <div className="homepage-admin__section-title-row">
              <h3>Products</h3>
              <span className="homepage-admin__count">{enabledCount} enabled / {products.length} total</span>
            </div>
            <p>Manage products by category — Add, Edit, Delete.</p>
          </div>
        </div>
        <button className="admin-btn admin-btn--soft" type="button" onClick={onAdd}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "0 0 1rem",
        maxWidth: "480px",
      }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1,
            background: "var(--admin-card, #fff)",
            border: "1.5px solid var(--admin-border, #e2e5ea)",
            borderRadius: "10px",
            padding: "8px 14px",
            transition: "border-color .2s",
          }}
        >
          <Search size={16} style={{ opacity: 0.45, flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              fontSize: "0.875rem",
              color: "inherit",
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                lineHeight: 1,
                color: "var(--clr-neutral, #6b7280)",
              }}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      {isSearching && filteredProducts.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "2rem 1rem",
          color: "var(--clr-neutral, #6b7280)",
          fontSize: "0.95rem",
        }}>
          <p>No products found matching &quot;{deferredSearch}&quot;</p>
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.categoryName} style={{ marginBottom: "1.5rem" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "0.75rem",
              paddingBottom: "0.5rem",
              borderBottom: "1.5px solid var(--admin-border, #e2e5ea)",
            }}>
              <Layers size={15} style={{ opacity: 0.5 }} />
              <h4 style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "var(--admin-heading, #1e293b)" }}>
                {group.categoryName}
              </h4>
              <span style={{
                fontSize: "0.75rem",
                padding: "2px 8px",
                borderRadius: "12px",
                background: "var(--clr-success-muted, #d1fae5)",
                color: "var(--clr-success, #059669)",
                fontWeight: 600,
              }}>
                {group.items.length} product{group.items.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="homepage-admin__cards">
              {group.items.map(({ product, originalIndex }) => (
                <SummaryCard
                  key={product.id}
                  title={
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Box size={14} />
                      {product.name || `Product ${originalIndex + 1}`}
                    </span>
                  }
                  subtitle={`${currency}${product.price} — ${product.category || "No category"}`}
                  meta={`SKU: ${product.sku || "—"} • Stock: ${product.stock}`}
                  enabled={product.enabled}
                  onEdit={() => onEdit(originalIndex, product)}
                  onDelete={() => onDelete(originalIndex)}
                  onToggle={() => onToggle(originalIndex)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ShopManagementClient({ initialContent, updatedAtLabel }: ShopManagementClientProps) {
  const [content, setContent] = useState(initialContent);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [status, setStatus] = useState("");
  const [isSaving, startSaving] = useTransition();
  const [productSearch, setProductSearch] = useState("");
  const deferredSearch = useDeferredValue(productSearch);

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

  const enabledProductCount = content.products.filter((p) => p.enabled).length;
  const enabledCategoryCount = content.categories.filter((c) => c.enabled).length;

  const openEditor = (nextEditor: EditorState) => {
    setStatus("");
    setEditor(nextEditor);
  };

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveShopContentAction(serializedContent);
      setStatus(result.message);
      if (result.ok && result.updatedAt) {
        setContent((current) => ({ ...current, updatedAt: result.updatedAt }));
      }
    });
  };

  const submitEditor = () => {
    if (!editor) return;

    setContent((current) => {
      if (editor.section === "settings") {
        return { ...current, settings: editor.draft };
      }

      if (editor.section === "product") {
        const next = [...current.products];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, products: next };
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

      return current;
    });

    setEditor(null);
    setStatus("Settings updated in draft. Click Save to publish.");
  };

  const deleteProduct = (index: number) => {
    setContent((current) => ({
      ...current,
      products: current.products.filter((_, i) => i !== index),
    }));
    setStatus("Product removed. Click Save to publish.");
  };

  const deleteCategory = (index: number) => {
    setContent((current) => ({
      ...current,
      categories: current.categories.filter((_, i) => i !== index),
    }));
    setStatus("Category removed. Click Save to publish.");
  };

  const toggleProduct = (index: number) => {
    setContent((current) => {
      const next = [...current.products];
      next[index] = { ...next[index], enabled: !next[index].enabled };
      return { ...current, products: next };
    });
  };

  const toggleCategory = (index: number) => {
    setContent((current) => {
      const next = [...current.categories];
      next[index] = { ...next[index], enabled: !next[index].enabled };
      return { ...current, categories: next };
    });
  };

  return (
    <div className="admin-page homepage-admin">
      {/* ── Page Header ── */}
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Shop CMS</p>
          <h2 className="admin-page__title">Shop & Product Management</h2>
        </div>

        <div className="homepage-admin__hero-actions">
          <div className="homepage-admin__stat">
            <span>Last Updated</span>
            <strong>{latestUpdatedAt}</strong>
          </div>
          <button className="admin-btn homepage-admin__save-btn" type="button" onClick={handleSave} disabled={isSaving}>
            <Save size={16} />
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </section>

      {status ? <p className="homepage-admin__status">{status}</p> : null}

      <div className="homepage-admin__layout">
        {/* ── Shop Settings ── */}
        <SectionBlock
          icon={<Settings size={18} />}
          title="Shop Settings"
          description="Shop page title, shipping charges, items per page, etc."
          badge="Single block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "settings", mode: "edit", draft: content.settings })}
            >
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={`"${content.settings.shopTitle}" — ${content.settings.currency}`}
              subtitle={content.settings.shopEyebrow}
              meta={`Items/Page: ${content.settings.itemsPerPage} • Dhaka: ${content.settings.currency}${content.settings.shippingInsideDhaka} • Outside: ${content.settings.currency}${content.settings.shippingOutsideDhaka}`}
              onEdit={() => openEditor({ section: "settings", mode: "edit", draft: content.settings })}
            />
          </div>
        </SectionBlock>

        {/* ── Categories ── */}
        <SectionBlock
          icon={<Layers size={18} />}
          title="Categories"
          description="Manage product categories — name, slug, description."
          badge={`${enabledCategoryCount} enabled / ${content.categories.length} total`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "category", mode: "create", index: null, draft: createCategory() })}
            >
              <Plus size={16} />
              Add Category
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.categories.map((category, index) => (
              <SummaryCard
                key={category.id}
                title={category.name || `Category ${index + 1}`}
                subtitle={category.description || "No description set"}
                meta={`Slug: ${category.slug || "—"}`}
                enabled={category.enabled}
                onEdit={() => openEditor({ section: "category", mode: "edit", index, draft: category })}
                onDelete={() => deleteCategory(index)}
                onToggle={() => toggleCategory(index)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Products (grouped by category with search) ── */}
        <ProductsSection
          products={content.products}
          categories={content.categories}
          currency={content.settings.currency}
          search={productSearch}
          deferredSearch={deferredSearch}
          onSearchChange={setProductSearch}
          enabledCount={enabledProductCount}
          onAdd={() => openEditor({ section: "product", mode: "create", index: null, draft: createProduct() })}
          onEdit={(index, product) => openEditor({ section: "product", mode: "edit", index, draft: product })}
          onDelete={deleteProduct}
          onToggle={toggleProduct}
        />
      </div>

      {/* ── Editor Modal ── */}
      {editor ? (
        <div className="homepage-admin__modal" role="dialog" aria-modal="true">
          <button className="homepage-admin__modal-backdrop" type="button" onClick={() => setEditor(null)} />
          <div className="homepage-admin__modal-panel">
            <div className="homepage-admin__modal-head">
              <div>
                <p>{editor.mode === "create" ? "Create New" : "Edit"}</p>
                <h3>
                  {editor.section === "product" && (editor.mode === "create" ? "New Product" : "Edit Product")}
                  {editor.section === "category" && (editor.mode === "create" ? "New Category" : "Edit Category")}
                  {editor.section === "settings" && "Shop Settings"}
                </h3>
              </div>
              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              {/* ── Product Editor ── */}
              {editor.section === "product" ? (
                <>
                  <Field label="Product Name">
                    <input
                      className="admin-input"
                      value={editor.draft.name}
                      placeholder="Skywinder Toy"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, name: e.target.value } })}
                    />
                  </Field>
                  <Field label="Slug" hint="URL-friendly name">
                    <input
                      className="admin-input"
                      value={editor.draft.slug}
                      placeholder="skywinder-toy"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, slug: e.target.value } })}
                    />
                  </Field>
                  <Field label="Price" hint="Number only">
                    <input
                      className="admin-input"
                      type="number"
                      min={0}
                      value={editor.draft.price}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, price: Number(e.target.value) || 0 } })
                      }
                    />
                  </Field>
                  <Field label="Original Price" hint="Optional, for discount display">
                    <input
                      className="admin-input"
                      type="number"
                      min={0}
                      value={editor.draft.originalPrice || ""}
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: { ...editor.draft, originalPrice: Number(e.target.value) || undefined },
                        })
                      }
                    />
                  </Field>
                  <Field label="Category">
                    <select
                      className="admin-input"
                      value={editor.draft.category}
                      onChange={(e) => {
                        const selectedCat = content.categories.find((c) => c.name === e.target.value);
                        setEditor({
                          ...editor,
                          draft: {
                            ...editor.draft,
                            category: e.target.value,
                            categorySlug: selectedCat?.slug || e.target.value.toLowerCase().replace(/\s+/g, "-"),
                          },
                        });
                      }}
                    >
                      <option value="">Select Category</option>
                      {content.categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="SKU">
                    <input
                      className="admin-input"
                      value={editor.draft.sku}
                      placeholder="AT-1001"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, sku: e.target.value } })}
                    />
                  </Field>
                  <Field label="Image URL" full>
                    <input
                      className="admin-input"
                      value={editor.draft.image}
                      placeholder="/images/real/toy-blocks.jpg"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, image: e.target.value } })}
                    />
                  </Field>
                  <Field label="Short Description" full>
                    <input
                      className="admin-input"
                      value={editor.draft.shortDescription}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, shortDescription: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Full Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.description}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, description: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Rating" hint="1-5">
                    <select
                      className="admin-input"
                      value={editor.draft.rating}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, rating: Number(e.target.value) } })
                      }
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {"★".repeat(r)} ({r})
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Stock Status">
                    <select
                      className="admin-input"
                      value={editor.draft.stock}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, stock: e.target.value } })}
                    >
                      <option value="In stock">In stock</option>
                      <option value="Out of stock">Out of stock</option>
                      <option value="Low stock">Low stock</option>
                    </select>
                  </Field>
                  <Field label="Sale Label" hint="Hot, New, -20%, etc.">
                    <input
                      className="admin-input"
                      value={editor.draft.saleLabel || ""}
                      placeholder="Hot / New / -20%"
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, saleLabel: e.target.value || null } })
                      }
                    />
                  </Field>
                  <Field label="Tags" full hint="Comma separated">
                    <input
                      className="admin-input"
                      value={editor.draft.tags.join(", ")}
                      placeholder="Electronic, Outdoor, Best Seller"
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: {
                            ...editor.draft,
                            tags: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Status" full>
                    <select
                      className="admin-input"
                      value={editor.draft.enabled ? "enabled" : "disabled"}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, enabled: e.target.value === "enabled" } })
                      }
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </Field>
                </>
              ) : null}

              {/* ── Category Editor ── */}
              {editor.section === "category" ? (
                <>
                  <Field label="Category Name">
                    <input
                      className="admin-input"
                      value={editor.draft.name}
                      placeholder="Bath Toys"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, name: e.target.value } })}
                    />
                  </Field>
                  <Field label="Slug" hint="URL-friendly">
                    <input
                      className="admin-input"
                      value={editor.draft.slug}
                      placeholder="bath-toys"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, slug: e.target.value } })}
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
                  <Field label="Status" full>
                    <select
                      className="admin-input"
                      value={editor.draft.enabled ? "enabled" : "disabled"}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, enabled: e.target.value === "enabled" } })
                      }
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </Field>
                </>
              ) : null}

              {/* ── Settings Editor ── */}
              {editor.section === "settings" ? (
                <>
                  <Field label="Shop Title">
                    <input
                      className="admin-input"
                      value={editor.draft.shopTitle}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, shopTitle: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Currency Symbol">
                    <input
                      className="admin-input"
                      value={editor.draft.currency}
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, currency: e.target.value } })}
                    />
                  </Field>
                  <Field label="Eyebrow Text" full>
                    <input
                      className="admin-input"
                      value={editor.draft.shopEyebrow}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, shopEyebrow: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Description" full>
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.shopDescription}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, shopDescription: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Items Per Page" hint="Default: 12">
                    <input
                      className="admin-input"
                      type="number"
                      min={4}
                      max={48}
                      value={editor.draft.itemsPerPage}
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: { ...editor.draft, itemsPerPage: Number(e.target.value) || 12 },
                        })
                      }
                    />
                  </Field>
                  <Field label="Shipping Inside Dhaka" hint="in BDT">
                    <input
                      className="admin-input"
                      type="number"
                      min={0}
                      value={editor.draft.shippingInsideDhaka}
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: { ...editor.draft, shippingInsideDhaka: Number(e.target.value) || 0 },
                        })
                      }
                    />
                  </Field>
                  <Field label="Shipping Outside Dhaka" hint="in BDT">
                    <input
                      className="admin-input"
                      type="number"
                      min={0}
                      value={editor.draft.shippingOutsideDhaka}
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: { ...editor.draft, shippingOutsideDhaka: Number(e.target.value) || 0 },
                        })
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
                {editor.mode === "create" ? (editor.section === "product" ? "Add Product" : "Add Category") : "Update"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
