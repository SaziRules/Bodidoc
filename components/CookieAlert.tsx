"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SHOW_DELAY = 1500;   // appear after 1.5s
const AUTO_HIDE  = 10000;  // animate out after 10s

export default function CookieAlert() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding]   = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), SHOW_DELAY);
    const hide = setTimeout(() => dismiss(), SHOW_DELAY + AUTO_HIDE);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed z-998 transition-all duration-400 ease-out
        bottom-0 left-0 right-0
        md:bottom-8 md:left-8 md:right-auto md:max-w-[320px]
        ${hiding
          ? "opacity-0 translate-y-2 pointer-events-none"
          : "opacity-100 translate-y-0"
        }`}
    >
      <div className="bg-white border-t md:border border-[#e8e8e8] shadow-[0_-4px_24px_rgba(17,41,66,0.08)] md:shadow-[0_4px_24px_rgba(17,41,66,0.08)] px-5 py-4 md:rounded-md flex md:block items-center gap-4">
        <p className="flex-1 text-[13px] font-normal text-[#333] leading-relaxed">
          Bodidoc uses cookies to help personalise your visit and save your preferences. By using this site, you agree to our{" "}
          <Link
            href="/terms-conditions-privacy-policy"
            className="text-[#112942] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            use of cookies
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 md:mt-2.5 text-[10px] tracking-[0.15em] uppercase font-medium text-[#112942] border border-[#112942]/20 px-3 py-1 hover:bg-[#112942] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent rounded-[3px]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}