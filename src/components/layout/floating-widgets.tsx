"use client";

import Link from "next/link";
import { ArrowUp, MessageCircle, Store } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="floating-chat">
        <div className="floating-chat__bubble">
          <MessageCircle size={18} />
        </div>
        <span className="floating-chat__label">Please Chat</span>
      </div>

      <div className="floating-rail">
        <Link aria-label="Shop catalog" href="/shop/">
          <Store size={18} />
        </Link>
      </div>

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
