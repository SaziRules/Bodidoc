"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

export default function SubscriptionModal({ onClose }: Props) {
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = () => {
    if (!email) return;
    // TODO: wire to mailing list provider
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full max-w-3xl shadow-2xl flex overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ minHeight: "400px" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-white hover:text-[#112942] transition-colors z-10 bg-transparent border-0 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* ── Left: form ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          {!submitted ? (
            <>
              <h2 className="font-display text-[28px] md:text-[27px] font-semibold text-[#112942] leading-6.25 text-center mb-3">
                Down for more?<br />We got you!
              </h2>
              <p className="text-[14px] font-normal text-[#112942] text-center leading-5.25 mb-8 italic">
                Subscribe for all the latest product drops,<br />
                limited offers and in-store event info
              </p>

              <div className="flex flex-col gap-3">
                {/* Email field */}
                <div className="flex items-center border border-[#d8d8d8] focus-within:border-[#112942] transition-colors duration-200">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 text-[12px] tracking-widest uppercase placeholder:text-[#bbb] text-[#112942] bg-transparent border-0 outline-none font-light"
                  />
                  <button
                    onClick={handleSubmit}
                    aria-label="Submit email"
                    className="px-4 py-3 text-[#bbb] hover:text-[#112942] transition-colors bg-transparent border-0 cursor-pointer shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Phone field */}
                <div className="flex items-center border border-[#d8d8d8] focus-within:border-[#112942] transition-colors duration-200">
                  <input
                    type="tel"
                    placeholder="PHONE"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 text-[12px] tracking-widest uppercase placeholder:text-[#bbb] text-[#112942] bg-transparent border-0 outline-none font-light"
                  />
                  <button
                    onClick={handleSubmit}
                    aria-label="Submit phone"
                    className="px-4 py-3 text-[#bbb] hover:text-[#112942] transition-colors bg-transparent border-0 cursor-pointer shrink-0"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-[12px] font-light text-[#aaa] text-center leading-4 mt-5 max-w-xs mx-auto">
                If you subscribe to Bodidoc, please note that you are agreeing to receive recurring promotional and marketing messages from us. These messages are automated, including email and text. Consent is not a condition of any purchase. Please view our{" "}
                <a href="/terms-conditions-privacy-policy" onClick={onClose} className="text-[#db73b6] underline underline-offset-2 hover:opacity-70 transition-opacity">
                  Terms of Use and Privacy Policy
                </a>
                .
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="font-display text-[26px] font-normal text-[#112942] mb-3">You&apos;re in!</p>
              <p className="text-[13px] font-light text-[#777] leading-relaxed">
                Thanks for subscribing. Watch this space for<br />
                product drops, offers, and event news.
              </p>
            </div>
          )}
        </div>

        {/* ── Right: lifestyle image ── */}
        <div className="hidden md:block relative w-80 shrink-0">
          <Image
            src="/images/subscription-modal.png"
            alt="Bodidoc"
            fill
            className="object-cover object-center"
            sizes="320px"
          />
        </div>
      </div>
    </div>
  );
}