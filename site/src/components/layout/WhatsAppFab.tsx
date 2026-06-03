"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { contact } from "@/content/site";

export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={contact.primaryWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-500 hover:scale-105 ${
        show ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <span className="animate-calm-pulse pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" />
      <MessageCircle size={26} className="relative" />
    </a>
  );
}
