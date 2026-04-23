"use client";

import { useMemo, useState, useTransition } from "react";
import type { ReactNode } from "react";
import {
  Camera,
  Eye,
  EyeOff,
  Mail,
  MessageCircle,
  PencilLine,
  Phone,
  Plus,
  Save,
  Send,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { saveContactContentAction } from "@/app/admin/(portal)/contacts/actions";
import type { ChatSettings, ContactChannel, ContactChannelIcon, ContactPageContent } from "@/types/contactpage";

interface ContactManagementClientProps {
  initialContent: ContactPageContent;
  updatedAtLabel: string;
}

type EditorState =
  | {
      section: "channel";
      mode: "create" | "edit";
      index: number | null;
      draft: ContactChannel;
    }
  | {
      section: "chat";
      mode: "edit";
      draft: ChatSettings;
    };

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function createChannel(): ContactChannel {
  return {
    id: createId("channel"),
    label: "",
    href: "",
    icon: "email",
    enabled: true,
  };
}

const ICON_OPTIONS: { value: ContactChannelIcon; label: string }[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "messenger", label: "Messenger" },
  { value: "instagram", label: "Instagram" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone / Call" },
];

function ChannelIcon({ icon, size = 16 }: { icon: ContactChannelIcon; size?: number }) {
  if (icon === "whatsapp") return <MessageCircle size={size} />;
  if (icon === "messenger") return <Send size={size} />;
  if (icon === "instagram") return <Camera size={size} />;
  if (icon === "email") return <Mail size={size} />;
  return <Phone size={size} />;
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
            aria-label={enabled ? "Disable channel" : "Enable channel"}
            title={enabled ? "Click to disable" : "Click to enable"}
          >
            {enabled ? <EyeOff size={16} /> : <Eye size={16} />}
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

export function ContactManagementClient({ initialContent, updatedAtLabel }: ContactManagementClientProps) {
  const [content, setContent] = useState(initialContent);
  const [editor, setEditor] = useState<EditorState | null>(null);
  const [status, setStatus] = useState("");
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

  const enabledCount = content.channels.filter((c) => c.enabled).length;

  const openEditor = (nextEditor: EditorState) => {
    setStatus("");
    setEditor(nextEditor);
  };

  const handleSave = () => {
    setStatus("");
    startSaving(async () => {
      const result = await saveContactContentAction(serializedContent);
      setStatus(result.message);
      if (result.ok && result.updatedAt) {
        setContent((current) => ({ ...current, updatedAt: result.updatedAt }));
      }
    });
  };

  const submitEditor = () => {
    if (!editor) return;

    setContent((current) => {
      if (editor.section === "chat") {
        return { ...current, chatSettings: editor.draft };
      }

      if (editor.section === "channel") {
        const next = [...current.channels];
        if (editor.index === null) {
          next.push(editor.draft);
        } else {
          next[editor.index] = editor.draft;
        }
        return { ...current, channels: next };
      }

      return current;
    });

    setEditor(null);
    setStatus("Settings updated in draft. Click Save to publish.");
  };

  const deleteChannel = (index: number) => {
    setContent((current) => ({
      ...current,
      channels: current.channels.filter((_, i) => i !== index),
    }));
    setStatus("Channel removed. Click Save to publish.");
  };

  const toggleChannel = (index: number) => {
    setContent((current) => {
      const next = [...current.channels];
      next[index] = { ...next[index], enabled: !next[index].enabled };
      return { ...current, channels: next };
    });
  };

  return (
    <div className="admin-page homepage-admin">
      {/* ── Page Header ── */}
      <section className="homepage-admin__hero">
        <div>
          <p className="admin-page__eyebrow homepage-admin__eyebrow">Contact & Chat CMS</p>
          <h2 className="admin-page__title">Contact & Chat Management</h2>
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
        {/* ── Contact Channels ── */}
        <SectionBlock
          icon={<MessageCircle size={18} />}
          title="Contact Channels"
          description='Contact পেইজের "Message us directly" section — WhatsApp, Messenger, Email, Call ইত্যাদি।'
          badge={`${enabledCount} enabled / ${content.channels.length} total`}
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "channel", mode: "create", index: null, draft: createChannel() })}
            >
              <Plus size={16} />
              Add Channel
            </button>
          }
        >
          <div className="homepage-admin__cards">
            {content.channels.map((channel, index) => (
              <SummaryCard
                key={channel.id}
                title={
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <ChannelIcon icon={channel.icon} size={14} />
                    {channel.label || `Channel ${index + 1}`}
                  </span>
                }
                subtitle={channel.href || "No link set"}
                enabled={channel.enabled}
                onEdit={() => openEditor({ section: "channel", mode: "edit", index, draft: channel })}
                onDelete={() => deleteChannel(index)}
                onToggle={() => toggleChannel(index)}
              />
            ))}
          </div>
        </SectionBlock>

        {/* ── Please Chat / Live Chat Settings ── */}
        <SectionBlock
          icon={<Settings size={18} />}
          title="Please Chat Settings"
          description={`Floating chat button, welcome message, avatar, composer placeholder সব এখানে।`}
          badge="Single block"
          action={
            <button
              className="admin-btn admin-btn--soft"
              type="button"
              onClick={() => openEditor({ section: "chat", mode: "edit", draft: content.chatSettings })}
            >
              <PencilLine size={16} />
              Manage
            </button>
          }
        >
          <div className="homepage-admin__cards homepage-admin__cards--single">
            <SummaryCard
              title={`"${content.chatSettings.chatButtonLabel}" — ${content.chatSettings.brandName}`}
              subtitle={content.chatSettings.welcomeMessage}
              meta={`Avatar: ${content.chatSettings.avatarLetter} • Status: ${content.chatSettings.supportStatusText} • Max: ${content.chatSettings.maxAttachmentMb}MB`}
              onEdit={() => openEditor({ section: "chat", mode: "edit", draft: content.chatSettings })}
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
                <p>{editor.mode === "create" ? "Create New" : "Edit"}</p>
                <h3>
                  {editor.section === "channel" && (editor.mode === "create" ? "New Contact Channel" : "Edit Channel")}
                  {editor.section === "chat" && "Please Chat Settings"}
                </h3>
              </div>
              <button className="admin-icon-btn admin-icon-btn--soft" type="button" onClick={() => setEditor(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="homepage-admin__form-grid">
              {/* ── Channel Editor ── */}
              {editor.section === "channel" ? (
                <>
                  <Field label="Label">
                    <input
                      className="admin-input"
                      value={editor.draft.label}
                      placeholder="WhatsApp"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, label: e.target.value } })}
                    />
                  </Field>
                  <Field label="Icon">
                    <select
                      className="admin-input"
                      value={editor.draft.icon}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, icon: e.target.value as ContactChannelIcon } })
                      }
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Link / href" full hint="WhatsApp: https://wa.me/8801…, Email: mailto:…, Phone: tel:+880…">
                    <input
                      className="admin-input"
                      value={editor.draft.href}
                      placeholder="https://wa.me/8801700000000"
                      onChange={(e) => setEditor({ ...editor, draft: { ...editor.draft, href: e.target.value } })}
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

              {/* ── Chat Settings Editor ── */}
              {editor.section === "chat" ? (
                <>
                  <Field label="Chat Button Label" hint="Floating button এ দেখায়">
                    <input
                      className="admin-input"
                      value={editor.draft.chatButtonLabel}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, chatButtonLabel: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Avatar Letter" hint="Chat header circle এ দেখায়">
                    <input
                      className="admin-input"
                      value={editor.draft.avatarLetter}
                      maxLength={2}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, avatarLetter: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Brand Name">
                    <input
                      className="admin-input"
                      value={editor.draft.brandName}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, brandName: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Support Status Text" hint="e.g. Live Support, Online">
                    <input
                      className="admin-input"
                      value={editor.draft.supportStatusText}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, supportStatusText: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Max Attachment Size (MB)" hint="Default: 20">
                    <input
                      className="admin-input"
                      type="number"
                      min={1}
                      max={100}
                      value={editor.draft.maxAttachmentMb}
                      onChange={(e) =>
                        setEditor({
                          ...editor,
                          draft: { ...editor.draft, maxAttachmentMb: Number(e.target.value) || 20 },
                        })
                      }
                    />
                  </Field>
                  <Field label="Status Bar Text" hint="Composer নিচে দেখায়">
                    <input
                      className="admin-input"
                      value={editor.draft.statusBarText}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, statusBarText: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Composer Placeholder" full>
                    <input
                      className="admin-input"
                      value={editor.draft.composerPlaceholder}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, composerPlaceholder: e.target.value } })
                      }
                    />
                  </Field>
                  <Field label="Welcome Message" full hint="Chat open হলে প্রথম message হিসেবে দেখায়">
                    <textarea
                      className="admin-input homepage-admin__textarea"
                      value={editor.draft.welcomeMessage}
                      onChange={(e) =>
                        setEditor({ ...editor, draft: { ...editor.draft, welcomeMessage: e.target.value } })
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
                {editor.mode === "create" ? "Add Channel" : "Update"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
