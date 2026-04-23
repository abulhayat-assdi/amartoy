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
import type { ChatSettings, ContactChannel } from "@/types/contactpage";

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
  chatSettings: ChatSettings;
  channels: ContactChannel[];
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (payload: SendMessagePayload) => Promise<{ ok: true } | { ok: false; error: string }>;
}

const DEFAULT_MAX_MB = 20;
const DEFAULT_MAX_ATTACHMENT_BYTES = DEFAULT_MAX_MB * 1024 * 1024;

export const DEFAULT_CHAT_SETTINGS_FALLBACK: ChatSettings = {
  avatarLetter: "A",
  brandName: "AmarToy",
  supportStatusText: "Live Support",
  welcomeMessage: "আসসালামু আলাইকুম, AmarToy-এ আপনাকে স্বাগতম। আমরা কিভাবে সহযোগিতা করতে পারি?",
  composerPlaceholder: "Compose your message...",
  statusBarText: "Bangla + English supported",
  chatButtonLabel: "Please Chat",
  maxAttachmentMb: DEFAULT_MAX_MB,
};

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

export function SupportChatProvider({
  children,
  settings,
  channels = [],
}: {
  children: ReactNode;
  settings?: ChatSettings;
  channels?: ContactChannel[];
}) {
  const chatSettings = settings ?? DEFAULT_CHAT_SETTINGS_FALLBACK;
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const maxAttachmentBytes = (chatSettings.maxAttachmentMb ?? DEFAULT_MAX_MB) * 1024 * 1024;

  const initialMessages: SupportChatMessage[] = useMemo(
    () => [
      {
        id: "support-welcome",
        author: "support" as const,
        text: chatSettings.welcomeMessage,
        time: "Online now",
        attachments: [],
      },
    ],
    // intentionally only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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
    if (totalBytes > maxAttachmentBytes) {
      return {
        ok: false,
        error: `Please keep the total attachment size within ${chatSettings.maxAttachmentMb}MB.`,
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
      maxAttachmentBytes,
      messages,
      chatSettings,
      channels,
      openChat,
      closeChat,
      toggleChat,
      sendMessage,
    }),
    [channels, chatSettings, closeChat, isOpen, maxAttachmentBytes, messages, openChat, sendMessage, toggleChat, unreadCount],
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
