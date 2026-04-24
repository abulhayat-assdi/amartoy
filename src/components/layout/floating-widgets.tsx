"use client";

import { ArrowUp, MessageCircle, Store } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ContactSupportPanel } from "@/components/pages/contact-support-panel";
import { useSupportChat } from "@/components/providers/support-chat-provider";

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [widgetClosing, setWidgetClosing] = useState(false);
  const { isOpen, closeChat, openChat, toggleChat, unreadCount, chatSettings } = useSupportChat();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setWidgetClosing(false);
      setWidgetVisible(true);
      return;
    }

    if (!widgetVisible) {
      return;
    }

    setWidgetClosing(true);
    const timer = window.setTimeout(() => {
      setWidgetVisible(false);
      setWidgetClosing(false);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [isOpen, widgetVisible]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    if (isOpen) {
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [isOpen]);

  const handleOpenToggle = () => {
    if (isOpen) {
      closeChat();
      return;
    }

    openChat();
  };

  return (
    <>
      {widgetVisible ? (
        <>
          <button
            aria-label="Close chat"
            className={`floating-chat-backdrop ${widgetClosing ? "is-closing" : "is-open"}`}
            type="button"
            onClick={closeChat}
          />
          <ContactSupportPanel
            mode="widget"
            onClose={toggleChat}
            stateClassName={widgetClosing ? "is-closing" : "is-open"}
          />
        </>
      ) : null}

      <button className="floating-chat" type="button" onClick={handleOpenToggle}>
        <div className="floating-chat__bubble">
          <MessageCircle size={18} />
          {unreadCount > 0 ? <span className="floating-chat__badge">{unreadCount}</span> : null}
        </div>
        <span className="floating-chat__label">{chatSettings.chatButtonLabel}</span>
      </button>



      {showTop ? (
        <button
          className="scroll-top"
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} />
        </button>
      ) : null}
    </>
  );
}
