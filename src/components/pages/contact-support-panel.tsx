"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Camera,
  ChevronDown,
  Mail,
  MessageCircle,
  Mic,
  Paperclip,
  Phone,
  SendHorizonal,
  Square,
  X,
} from "lucide-react";
import { useSupportChat } from "@/components/providers/support-chat-provider";
import type { ContactChannelIcon } from "@/types/contactpage";

function ChannelIcon({ icon, size = 18 }: { icon: ContactChannelIcon; size?: number }) {
  if (icon === "whatsapp") return <MessageCircle size={size} />;
  if (icon === "messenger") return <SendHorizonal size={size} />;
  if (icon === "instagram") return <Camera size={size} />;
  if (icon === "email") return <Mail size={size} />;
  return <Phone size={size} />;
}

function formatBytes(size: number) {
  if (size <= 0) {
    return "0 KB";
  }

  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactSupportPanel({
  mode = "page",
  onClose,
  stateClassName = "",
}: {
  mode?: "page" | "widget";
  onClose?: () => void;
  stateClassName?: string;
}) {
  const [draft, setDraft] = useState("");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recorderSupported, setRecorderSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recorderChunksRef = useRef<Blob[]>([]);
  const { maxAttachmentBytes, messages, sendMessage, chatSettings, channels } = useSupportChat();
  const maxAttachmentLabel = useMemo(
    () => `${Math.round(maxAttachmentBytes / (1024 * 1024))}MB`,
    [maxAttachmentBytes],
  );
  const totalPendingBytes = useMemo(
    () => pendingFiles.reduce((sum, file) => sum + file.size, 0),
    [pendingFiles],
  );

  useEffect(() => {
    setRecorderSupported(typeof window !== "undefined" && "MediaRecorder" in window && "mediaDevices" in navigator);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timer);
  }, [mode, stateClassName]);

  useEffect(() => {
    const node = bodyRef.current;

    if (!node) {
      return;
    }

    node.scrollTo({
      top: node.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    return () => {
      recorderRef.current?.stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFiles = Array.from(event.target.files || []);

    if (!nextFiles.length) {
      return;
    }

    const mergedFiles = [...pendingFiles, ...nextFiles];
    const nextSize = mergedFiles.reduce((sum, file) => sum + file.size, 0);

    if (nextSize > maxAttachmentBytes) {
      setError(`Total file size cannot exceed ${maxAttachmentLabel}.`);
      event.target.value = "";
      return;
    }

    setPendingFiles(mergedFiles);
    setError("");
    event.target.value = "";
    textareaRef.current?.focus();
  };

  const handleRemoveFile = (index: number) => {
    setPendingFiles((current) => current.filter((_, currentIndex) => currentIndex !== index));
    textareaRef.current?.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.trim() && pendingFiles.length === 0) {
      return;
    }

    setSending(true);
    const result = await sendMessage({
      text: draft,
      files: pendingFiles,
    });
    setSending(false);

    if (result.ok) {
      setDraft("");
      setPendingFiles([]);
      setError("");
      textareaRef.current?.focus();
      return;
    }

    if ("error" in result) {
      setError(result.error);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const form = event.currentTarget.form;
      form?.requestSubmit();
    }
  };

  const handleVoiceRecord = async () => {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
      return;
    }

    if (!recorderSupported) {
      setError("Voice recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderChunksRef.current = [];
      recorderRef.current = recorder;

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          recorderChunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener("stop", () => {
        const blob = new Blob(recorderChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const file = new File([blob], `voice-${Date.now()}.webm`, {
          type: blob.type || "audio/webm",
        });

        stream.getTracks().forEach((track) => track.stop());

        setPendingFiles((current) => {
          const mergedFiles = [...current, file];
          const nextSize = mergedFiles.reduce((sum, entry) => sum + entry.size, 0);

          if (nextSize > maxAttachmentBytes) {
            setError(`Total file size cannot exceed ${maxAttachmentLabel}.`);
            return current;
          }

          setError("");
          return mergedFiles;
        });

        textareaRef.current?.focus();
      });

      recorder.start();
      setRecording(true);
      setError("");
    } catch {
      setError("Microphone access denied.");
    }
  };

  return (
    <div
      className={`contact-support ${mode === "widget" ? "contact-support--widget" : ""} ${stateClassName}`.trim()}
    >
      <div className="contact-support__header">
        {mode === "widget" ? (
          <>
            <div className="contact-support__widget-tab">
              <MessageCircle size={15} />
              <span>Messages</span>
            </div>
            <button
              aria-label="Minimize chat"
              className="contact-support__minimize"
              type="button"
              onClick={onClose}
            >
              <ChevronDown size={18} />
            </button>
          </>
        ) : (
          <>
            <div className="contact-support__avatar">{chatSettings.avatarLetter}</div>
            <div className="contact-support__meta">
              <strong>{chatSettings.brandName}</strong>
              <span>{chatSettings.supportStatusText}</span>
            </div>
          </>
        )}
      </div>

      <div className="contact-support__body" ref={bodyRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`contact-support__row contact-support__row--${message.author}`}
          >
            {mode === "widget" && message.author === "support" ? (
              <div className="contact-support__bubble-icon" aria-hidden="true">
                <MessageCircle size={14} />
              </div>
            ) : null}

            <div
              className={`contact-support__message contact-support__message--${message.author} ${
                mode === "widget" ? "contact-support__message--widget" : ""
              }`}
            >
              {message.text ? <p>{message.text}</p> : null}
              {message.attachments.length ? (
                <div className="contact-support__attachments">
                  {message.attachments.map((attachment) => (
                    <div className="contact-support__attachment" key={attachment.id}>
                      {attachment.kind === "image" ? <img alt={attachment.name} src={attachment.url} /> : null}
                      {attachment.kind === "video" ? (
                        <video controls preload="metadata" src={attachment.url} />
                      ) : null}
                      {attachment.kind === "audio" ? (
                        <div className="contact-support__file-card">
                          <audio controls preload="metadata" src={attachment.url} />
                        </div>
                      ) : null}
                      {attachment.kind === "file" ? (
                        <div className="contact-support__file-card">
                          <Paperclip size={18} />
                        </div>
                      ) : null}
                      <div className="contact-support__attachment-meta">
                        <strong>{attachment.name}</strong>
                        <span>{formatBytes(attachment.size)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              <span>{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      {pendingFiles.length ? (
        <div className="contact-support__pending">
          {pendingFiles.map((file, index) => (
            <div className="contact-support__pending-chip" key={`${file.name}-${file.size}-${index}`}>
              <span>{file.name}</span>
              <small>{formatBytes(file.size)}</small>
              <button
                aria-label={`Remove ${file.name}`}
                type="button"
                onClick={() => handleRemoveFile(index)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <form
        className={`contact-support__composer ${mode === "widget" ? "contact-support__composer--widget" : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          ref={fileInputRef}
          className="contact-support__file-input"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label className="contact-support__input">
          <textarea
            ref={textareaRef}
            placeholder={chatSettings.composerPlaceholder}
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="contact-support__tools">
            <button
              aria-label="Attach files"
              className="contact-support__tool"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip size={18} />
            </button>
            <button
              aria-label={recording ? "Stop recording" : "Record voice message"}
              className={`contact-support__tool ${recording ? "is-recording" : ""}`}
              type="button"
              onClick={() => void handleVoiceRecord()}
            >
              {recording ? <Square size={15} /> : <Mic size={18} />}
            </button>
          </div>
        </label>
        <button
          aria-label="Send message"
          className="contact-support__send"
          disabled={sending}
          type="submit"
        >
          <SendHorizonal size={18} />
        </button>
      </form>

      <div className="contact-support__status">
        <span>{chatSettings.statusBarText}</span>
        <span>{formatBytes(totalPendingBytes)} / {maxAttachmentLabel}</span>
      </div>

      {error ? <p className="contact-support__error">{error}</p> : null}

      {mode === "page" ? (
        <div className="contact-support__footer">
          <p>Message us directly</p>
          <div className="contact-support__channels">
            {channels.filter((c) => c.enabled).map((channel) => {
              return (
                <Link
                  key={channel.id}
                  className="contact-support__channel"
                  href={channel.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <ChannelIcon icon={channel.icon} size={18} />
                  <span>{channel.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
