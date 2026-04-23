"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

export interface SupportChatAttachment {
  id: string;
  kind: "image" | "video" | "audio" | "file";
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface SupportChatMessage {
  id: string;
  author: "support" | "user";
  text: string;
  time: string;
  attachments: SupportChatAttachment[];
}

interface SendMessagePayload {
  text: string;
  files: File[];
}

interface SupportChatContextValue {
  isOpen: boolean;
  unreadCount: number;
  maxAttachmentBytes: number;
  messages: SupportChatMessage[];
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (payload: SendMessagePayload) => Promise<{ ok: true } | { ok: false; error: string }>;
}

const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

const initialMessages: SupportChatMessage[] = [
  {
    id: "support-welcome",
    author: "support",
    text: "আসসালামু আলাইকুম, AmarToy-এ আপনাকে স্বাগতম। আমরা কিভাবে সহযোগিতা করতে পারি?",
    time: "Online now",
    attachments: [],
  },
];

const SupportChatContext = createContext<SupportChatContextValue | null>(null);

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function createAttachment(file: File): SupportChatAttachment {
  let kind: SupportChatAttachment["kind"] = "file";

  if (file.type.startsWith("image/")) {
    kind = "image";
  } else if (file.type.startsWith("video/")) {
    kind = "video";
  } else if (file.type.startsWith("audio/")) {
    kind = "audio";
  }

  return {
    id: `attachment-${crypto.randomUUID()}`,
    kind,
    name: file.name,
    size: file.size,
    type: file.type,
    url: URL.createObjectURL(file),
  };
}

export function SupportChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<SupportChatMessage[]>(initialMessages);
  const attachmentUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      attachmentUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setUnreadCount(0);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((current) => {
      const next = !current;
      if (next) {
        setUnreadCount(0);
      }
      return next;
    });
  }, []);

  const sendMessage = useCallback<SupportChatContextValue["sendMessage"]>(async ({ text, files }) => {
    const trimmedText = text.trim();

    if (!trimmedText && files.length === 0) {
      return { ok: false, error: "Write a message or add a file first." };
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_ATTACHMENT_BYTES) {
      return {
        ok: false,
        error: "Please keep the total attachment size within 20MB.",
      };
    }

    const attachments = files.map((file) => {
      const attachment = createAttachment(file);
      attachmentUrlsRef.current.push(attachment.url);
      return attachment;
    });

    const userMessage: SupportChatMessage = {
      id: `user-${Date.now()}`,
      author: "user",
      text: trimmedText,
      time: formatTime(new Date()),
      attachments,
    };

    setMessages((current) => [...current, userMessage]);

    return { ok: true };
  }, []);

  const value = useMemo<SupportChatContextValue>(
    () => ({
      isOpen,
      unreadCount,
      maxAttachmentBytes: MAX_ATTACHMENT_BYTES,
      messages,
      openChat,
      closeChat,
      toggleChat,
      sendMessage,
    }),
    [closeChat, isOpen, messages, openChat, sendMessage, toggleChat, unreadCount],
  );

  return <SupportChatContext.Provider value={value}>{children}</SupportChatContext.Provider>;
}

export function useSupportChat() {
  const context = useContext(SupportChatContext);

  if (!context) {
    throw new Error("useSupportChat must be used within SupportChatProvider");
  }

  return context;
}
