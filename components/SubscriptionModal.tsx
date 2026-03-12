"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Props = {
  onClose: () => void;
};

type Stage = "form" | "upsell" | "done";

// ─── Southern Africa dial codes ───────────────────────────────────────────────

const DIAL_CODES = [
  { code: "+27",  iso: "za", name: "South Africa" },
  { code: "+267", iso: "bw", name: "Botswana" },
  { code: "+268", iso: "sz", name: "Eswatini" },
  { code: "+266", iso: "ls", name: "Lesotho" },
  { code: "+265", iso: "mw", name: "Malawi" },
  { code: "+258", iso: "mz", name: "Mozambique" },
  { code: "+264", iso: "na", name: "Namibia" },
  { code: "+255", iso: "tz", name: "Tanzania" },
  { code: "+260", iso: "zm", name: "Zambia" },
  { code: "+263", iso: "zw", name: "Zimbabwe" },
];

const FlagImg = ({ iso, size = 20 }: { iso: string; size?: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://flagcdn.com/w40/${iso}.png`}
    srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
    alt=""
    className="rounded-[1px] shrink-0 block"
    style={{ width: size, height: "auto" }}
  />
);

// ─── Validation helpers ───────────────────────────────────────────────────────

function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
}

function isValidPhone(local: string) {
  const digits = local.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 11;
}

// ─── Phone field with anchored dropdown ──────────────────────────────────────

function PhoneField({
  dialCode,
  onDialChange,
  value,
  onChange,
  onKeyDown,
  onSubmit,
  loading,
  fieldWrap,
  inputClass,
  arrowBtn,
  arrow,
}: {
  dialCode: string;
  onDialChange: (code: string) => void;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  loading: boolean;
  fieldWrap: string;
  inputClass: string;
  arrowBtn: string;
  arrow: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const selected = DIAL_CODES.find((d) => d.code === dialCode) ?? DIAL_CODES[0];

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      {/* ── Input row ── */}
      <div className={fieldWrap}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 pl-3.5 pr-2 py-3 bg-transparent border-0 cursor-pointer shrink-0 group"
          aria-label="Select country code"
          aria-expanded={open}
        >
          <FlagImg iso={selected.iso} size={18} />
          <span className="text-[12px] font-light tracking-wide text-[#888] group-hover:text-[#112942] transition-colors">
            {selected.code}
          </span>
          <svg
            width="8" height="8" viewBox="0 0 24 24" fill="none"
            stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <div className="w-px h-4 bg-[#e0e0e0] shrink-0" />

        <input
          type="tel"
          placeholder="PHONE NUMBER"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={inputClass}
        />
        <button onClick={onSubmit} aria-label="Submit" disabled={loading} className={arrowBtn}>
          {arrow}
        </button>
      </div>

      {/* ── Dropdown ── */}
      <div
        className={`absolute left-0 top-[calc(100%+6px)] w-full z-50 overflow-hidden
          transition-all duration-200 ease-out origin-top
          ${open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
          }`}
        style={{
          boxShadow: "0 16px 48px rgba(17,41,66,0.18), 0 2px 8px rgba(17,41,66,0.10)",
        }}
      >
        {/* Top accent bar */}
        <div className="h-0.75 bg-linear-to-r from-[#112942] via-[#1e4a73] to-[#112942]" />

        {/* Header label */}
        <div className="bg-[#112942] px-4 py-2.5">
          <span className="text-[9px] font-bold tracking-[0.18em] text-white/50 uppercase">
            Select region
          </span>
        </div>

        {/* Country list */}
        <div
          className="bg-white overflow-y-auto"
          style={{ maxHeight: "196px" }}
        >
          {DIAL_CODES.map((d, i) => {
            const isActive = d.code === dialCode;
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => { onDialChange(d.code); setOpen(false); }}
                className={`
                  group/row flex items-center gap-3 w-full px-4 py-2.5
                  bg-transparent border-0 cursor-pointer text-left
                  transition-colors duration-150
                  ${i !== DIAL_CODES.length - 1 ? "border-b border-[#f0f0f0]" : ""}
                  ${isActive ? "bg-[#f0f4f8]" : "hover:bg-[#f9f9f9]"}
                `}
              >
                <FlagImg iso={d.iso} size={18} />
                <span className={`flex-1 text-[12px] tracking-wide font-light transition-colors
                  ${isActive ? "text-[#112942] font-medium" : "text-[#444] group-hover/row:text-[#112942]"}`}>
                  {d.name}
                </span>
                <span className={`text-[11px] font-light tabular-nums shrink-0 transition-colors
                  ${isActive ? "text-[#112942]/60" : "text-[#bbb] group-hover/row:text-[#888]"}`}>
                  {d.code}
                </span>
                {isActive && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#112942" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="h-0.5 bg-linear-to-r from-[#112942] via-[#2a6096] to-[#112942] opacity-60" />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function SubscriptionModal({ onClose }: Props) {
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const [dialCode, setDialCode] = useState("+27");

  const [stage, setStage]   = useState<Stage>("form");
  const [upsellField, setUpsellField] = useState<"email" | "phone">("email");
  const [upsellValue, setUpsellValue] = useState("");
  const [upsellDial, setUpsellDial]   = useState("+27");

  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async () => {
    setError("");
    const trimEmail = email.trim();
    const trimPhone = phone.trim();

    if (!trimEmail && !trimPhone) {
      setError("Pop in your email or phone number — whichever you prefer.");
      return;
    }

    if (trimEmail && !isValidEmail(trimEmail)) {
      setError("That email doesn't look quite right — please double-check it.");
      return;
    }

    if (trimPhone && !isValidPhone(trimPhone)) {
      setError("That number doesn't look right — please enter 7 to 11 digits.");
      return;
    }

    const fullPhone = trimPhone ? `${dialCode}${trimPhone.replace(/\D/g, "")}` : null;

    setLoading(true);

    if (trimEmail) {
      const { data } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("brand", "bodidoc")
        .eq("email", trimEmail)
        .maybeSingle();
      if (data) {
        setLoading(false);
        setError("Looks like that email is already on the list — you're all good! 🎉");
        return;
      }
    }

    if (fullPhone) {
      const { data } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("brand", "bodidoc")
        .eq("phone", fullPhone)
        .maybeSingle();
      if (data) {
        setLoading(false);
        setError("That number's already with us — you're covered! 🎉");
        return;
      }
    }

    const { error: sbError } = await supabase.from("subscriptions").insert({
      brand: "bodidoc",
      email: trimEmail || null,
      phone: fullPhone,
    });

    setLoading(false);

    if (sbError) {
      setError("Something went wrong on our end. Please try again.");
      return;
    }

    if (trimEmail && !trimPhone) {
      setUpsellField("phone");
      setStage("upsell");
    } else if (trimPhone && !trimEmail) {
      setUpsellField("email");
      setStage("upsell");
    } else {
      setStage("done");
    }
  };

  const handleUpsell = async () => {
    setError("");
    const val = upsellValue.trim();
    if (!val) { setStage("done"); return; }

    if (upsellField === "email" && !isValidEmail(val)) {
      setError("That email doesn't look quite right — please double-check it.");
      return;
    }

    if (upsellField === "phone" && !isValidPhone(val)) {
      setError("That number doesn't look right — please enter 7 to 11 digits.");
      return;
    }

    const fullPhone = upsellField === "phone"
      ? `${upsellDial}${val.replace(/\D/g, "")}`
      : null;

    setLoading(true);

    const { data: existing } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("brand", "bodidoc")
      .eq(upsellField, upsellField === "phone" ? fullPhone! : val)
      .maybeSingle();

    if (existing) {
      setLoading(false);
      setError(`That ${upsellField} is already on our list!`);
      return;
    }

    const { error: sbError } = await supabase.from("subscriptions").insert({
      brand: "bodidoc",
      email: upsellField === "email" ? val : null,
      phone: fullPhone,
    });

    setLoading(false);
    if (sbError) {
      setError("Something went wrong. You can always add it later.");
    } else {
      setStage("done");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleUpsellKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleUpsell();
  };

  const arrowBtn = "px-4 py-3 text-[#bbb] hover:text-[#112942] transition-colors bg-transparent border-0 cursor-pointer shrink-0 disabled:opacity-40";
  const arrow = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  const fieldWrap = "flex items-center border border-[#d8d8d8] focus-within:border-[#112942] transition-colors duration-200";
  const inputClass = "flex-1 px-4 py-3 text-[12px] tracking-widest uppercase placeholder:text-[#bbb] text-[#112942] bg-transparent border-0 outline-none font-light";

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />

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

        {/* ── Left: content ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-12">

          {/* ── Stage: form ── */}
          {stage === "form" && (
            <>
              <h2 className="font-display text-[28px] md:text-[27px] font-semibold text-[#112942] leading-6.25 text-center mb-3">
                Down for more?<br />We got you!
              </h2>
              <p className="text-[14px] font-normal text-[#112942] text-center leading-5.25 mb-8 italic">
                Subscribe for all the latest product drops,<br />
                limited offers and in-store event info
              </p>

              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className={fieldWrap}>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={inputClass}
                  />
                  <button onClick={handleSubmit} aria-label="Submit" disabled={loading} className={arrowBtn}>{arrow}</button>
                </div>

                {/* Phone */}
                <PhoneField
                  dialCode={dialCode}
                  onDialChange={setDialCode}
                  value={phone}
                  onChange={setPhone}
                  onKeyDown={handleKeyDown}
                  onSubmit={handleSubmit}
                  loading={loading}
                  fieldWrap={fieldWrap}
                  inputClass={inputClass}
                  arrowBtn={arrowBtn}
                  arrow={arrow}
                />
              </div>

              {error && <p className="text-[11.5px] text-red-400 text-center mt-3">{error}</p>}

              <p className="text-[12px] font-light text-[#aaa] text-center leading-4 mt-5 max-w-xs mx-auto">
                If you subscribe to Bodidoc, please note that you are agreeing to receive recurring promotional and marketing messages from us. These messages are automated, including email and text. Consent is not a condition of any purchase. Please view our{" "}
                <a href="/terms-conditions-privacy-policy" onClick={onClose} className="text-[#db73b6] underline underline-offset-2 hover:opacity-70 transition-opacity">
                  Terms of Use and Privacy Policy
                </a>
                .
              </p>
            </>
          )}

          {/* ── Stage: upsell ── */}
          {stage === "upsell" && (
            <div className="text-center">
              <p className="font-display text-[26px] font-medium text-[#112942] mb-2">You&apos;re in!</p>
              <p className="text-[13.5px] font-light text-[#555] leading-relaxed mb-7">
                {upsellField === "phone"
                  ? "Want to also get SMS updates? Drop your number and we'll keep you in the loop."
                  : "Want email updates too? Add your address and never miss a drop."}
              </p>

              <div className="max-w-xs mx-auto mb-3">
                {upsellField === "phone" ? (
                  <PhoneField
                    dialCode={upsellDial}
                    onDialChange={setUpsellDial}
                    value={upsellValue}
                    onChange={setUpsellValue}
                    onKeyDown={handleUpsellKeyDown}
                    onSubmit={handleUpsell}
                    loading={loading}
                    fieldWrap={fieldWrap}
                    inputClass={inputClass}
                    arrowBtn={arrowBtn}
                    arrow={arrow}
                  />
                ) : (
                  <div className={fieldWrap}>
                    <input
                      type="email"
                      placeholder="EMAIL"
                      value={upsellValue}
                      onChange={(e) => setUpsellValue(e.target.value)}
                      onKeyDown={handleUpsellKeyDown}
                      className={inputClass}
                    />
                    <button onClick={handleUpsell} aria-label="Submit" disabled={loading} className={arrowBtn}>{arrow}</button>
                  </div>
                )}
              </div>

              {error && <p className="text-[11.5px] text-red-400 text-center mb-2">{error}</p>}

              <button
                onClick={() => setStage("done")}
                className="text-[11.5px] text-[#bbb] hover:text-[#112942] underline underline-offset-2 transition-colors bg-transparent border-0 cursor-pointer mt-1"
              >
                No thanks, I&apos;m good
              </button>
            </div>
          )}

          {/* ── Stage: done ── */}
          {stage === "done" && (
            <div className="text-center py-8">
              <p className="font-display text-[26px] font-medium text-[#112942] mb-3">All set!</p>
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