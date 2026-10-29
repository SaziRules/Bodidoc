"use client";

import { useState, useRef, useCallback, useEffect, ChangeEvent, ReactNode, createContext, useContext } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROVINCES = [
  "Eastern Cape","Free State","Gauteng","KwaZulu-Natal",
  "Limpopo","Mpumalanga","North West","Northern Cape","Western Cape",
];

const BRANDS = [
  { id: "bodidoc",    label: "Bodidoc"   },
  { id: "chiskop",   label: "Chiskop"   },
  { id: "lemonvate", label: "Lemonvate" },
];

const PLATFORMS = [
  { id: "facebook",  label: "Facebook"    },
  { id: "instagram", label: "Instagram"   },
  { id: "tiktok",    label: "TikTok"      },
  { id: "youtube",   label: "YouTube"     },
  { id: "twitter",   label: "Twitter / X" },
];

type PlatformId = "facebook" | "instagram" | "tiktok" | "youtube" | "twitter";

const PLATFORM_CONFIG: Record<PlatformId, { label: string; placeholder: string; pattern: RegExp }> = {
  facebook:  { label: "Facebook Page URL",       placeholder: "https://www.facebook.com/yourpage",    pattern: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/ },
  instagram: { label: "Instagram Profile URL",   placeholder: "https://www.instagram.com/yourhandle", pattern: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/ },
  tiktok:    { label: "TikTok Profile URL",      placeholder: "https://www.tiktok.com/@yourhandle",   pattern: /^https?:\/\/(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+\/?$/ },
  youtube:   { label: "YouTube Channel URL",     placeholder: "https://www.youtube.com/@yourchannel", pattern: /^https?:\/\/(www\.)?youtube\.com\/(@[A-Za-z0-9._-]+|channel\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9._-]+)\/?$/ },
  twitter:   { label: "Twitter / X Profile URL", placeholder: "https://x.com/yourhandle",             pattern: /^https?:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]{1,15}\/?$/ },
};

const NICHES = [
  "Skincare and Beauty",
  "Men's Grooming and Hygiene",
  "Fitness and Wellness",
  "Lifestyle and Daily Vlogs",
  "Fashion and Style",
  "Family and Parenting",
  "Student / Campus Life",
];

const LETTERS = "ABCDEFGHIJ";

const TC_TEXT = `Terms and Conditions for Naturelle Personal Care CC Database

By completing and submitting this form, you hereby acknowledge and agree to the following terms and conditions ("Terms") regarding the collection, use and disclosure of your personal information by Naturelle Personal Care CC (PTY) Ltd ("Naturelle Personal Care CC").

1. COLLECTION AND USE OF PERSONAL INFORMATION
By opting into our database, you consent to Naturelle Personal Care CC collecting, storing and processing your personal information, which may include your name, contact details and other relevant information you provide. This information will be used solely for the following purposes, under the Protection of Personal Information Act 4 of 2013 (POPIA):
a) To send you marketing communications, updates and special offers related to upcoming campaigns for our brands under Naturelle Personal Care CC, specifically Bodidoc, Chiskop and Lemonvate;
b) To improve our products, services and marketing strategies.

2. NO OBLIGATION TO PARTICIPATE
Your agreement to join our database does not constitute an obligation to participate in any marketing campaign or promotional activity. Participation in each campaign will be voluntary and you will be provided with separate terms and conditions for each opportunity should you choose to engage.

3. DATA SHARING
Naturelle Personal Care CC will not share your personal information with third parties except in the following circumstances:
a) With third-party service providers who act on our behalf to perform essential functions such as email marketing, data analytics or customer support. These third parties are bound by confidentiality agreements to protect your information;
b) As required by law, regulation or court order;
c) To protect the rights, property or safety of Naturelle Personal Care CC, our customers or others.

4. INDEMNIFICATION
You hereby indemnify, defend and hold harmless Naturelle Personal Care CC, its employees, agents and affiliates from and against any and all claims, liabilities, damages, losses or expenses, including reasonable legal fees, arising out of or in connection with: (a) Your breach of these Terms. (b) Your misuse of the database or any information obtained from it. (c) Any unauthorised use or disclosure of your personal information (to the extent that it is not due to Naturelle Personal Care CC's negligence).

5. LIMITATION OF LIABILITY
In no event shall Naturelle Personal Care CC be liable for any indirect, special, incidental, consequential or punitive damages arising out of or in connection with these Terms or your use of the database.

6. GOVERNING LAW
These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any dispute shall be subject to the exclusive jurisdiction of the courts of South Africa.

7. AMENDMENTS
Naturelle Personal Care CC reserves the right to amend these Terms at any time by posting the revised Terms on our website or notifying you via email.

8. OPT-OUT
You may opt-out at any time by contacting pr@naturelle.co.za. We will process your request to delete your personal information within a reasonable timeframe, in accordance with our data retention policies and applicable laws.

By clicking "Submit Registration", you acknowledge that you have read, understood and agree to be bound by these Terms and Conditions.`;

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = [
  "welcome", "name", "about", "email", "phone",
  "location", "brands", "platforms", "urls", "niches", "upload", "legal",
] as const;
type StepId = typeof STEPS[number];

// ─── Field types ──────────────────────────────────────────────────────────────

type Fields = {
  first_name: string; last_name: string;
  gender: string; age_confirmed: boolean;
  email: string; phone: string; city: string; province: string;
  brand_interests: string[]; active_platforms: string[];
  facebook_url: string; instagram_url: string; tiktok_url: string;
  youtube_url: string; twitter_url: string;
  content_niches: string[]; popia_consent: boolean;
};

const EMPTY: Fields = {
  first_name: "", last_name: "", gender: "", age_confirmed: false,
  email: "", phone: "", city: "", province: "",
  brand_interests: [], active_platforms: [],
  facebook_url: "", instagram_url: "", tiktok_url: "", youtube_url: "", twitter_url: "",
  content_niches: [], popia_consent: false,
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(id: StepId, f: Fields): string | null {
  switch (id) {
    case "name":
      if (f.first_name.trim().length < 2) return "Please enter your first name";
      if (f.last_name.trim().length < 2)  return "Please enter your last name";
      return null;
    case "about":
      if (!f.gender)        return "Please select your gender";
      if (!f.age_confirmed) return "Please confirm you are 18 years of age or older";
      return null;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return "Please enter a valid email address";
      return null;
    case "phone":
      if (!/^(\+27|0)[0-9]{9}$/.test(f.phone.replace(/\s/g, "")))
        return "Please enter a valid SA phone number (e.g. +27 82 123 4567)";
      return null;
    case "location":
      if (!f.city.trim()) return "Please enter your city";
      if (!f.province)    return "Please select your province";
      return null;
    case "brands":
      if (f.brand_interests.length === 0) return "Select at least one brand";
      return null;
    case "platforms":
      if (f.active_platforms.length === 0) return "Select at least one platform";
      return null;
    case "urls":
      for (const p of f.active_platforms) {
        const key = `${p}_url` as keyof Fields;
        const cfg = PLATFORM_CONFIG[p as PlatformId];
        if (!cfg.pattern.test(f[key] as string))
          return `Please enter a valid ${p.charAt(0).toUpperCase() + p.slice(1)} URL — it must start with https://`;
      }
      return null;
    case "niches":
      if (f.content_niches.length === 0) return "Select at least one content niche";
      return null;
    case "legal":
      if (!f.popia_consent) return "Please accept the terms to continue";
      return null;
    default:
      return null;
  }
}

// ─── Theme context ────────────────────────────────────────────────────────────

const NAVY  = "#112942";
const CREAM = "#f0ede6";
const GOLD  = "#c9a45f";
const ANTON = "var(--font-anton)";
const SPART = "var(--font-spartan)";

type ModeCtx = {
  isDark: boolean;
  bg: string;
  tx: string;
  a: (op: number) => string;     // text-colour rgba
  ba: (op: number) => string;    // bg-colour rgba
};

function makeCtx(dark: boolean): ModeCtx {
  const [tr, tg, tb] = dark ? [240, 237, 230] : [17, 41, 66];
  const [br, bg2, bb] = dark ? [17, 41, 66] : [240, 237, 230];
  return {
    isDark: dark,
    bg: dark ? NAVY  : CREAM,
    tx: dark ? CREAM : NAVY,
    a:  (op) => `rgba(${tr},${tg},${tb},${op})`,
    ba: (op) => `rgba(${br},${bg2},${bb},${op})`,
  };
}

const ModeContext = createContext<ModeCtx>(makeCtx(true));
const useMode = () => useContext(ModeContext);

function dotGrid(dark: boolean) {
  const dot = dark ? "rgba(240,237,230,0.14)" : "rgba(17,41,66,0.09)";
  return {
    backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1px)`,
    backgroundSize: "28px 28px",
  };
}

// ─── Decorative components ────────────────────────────────────────────────────

function ConcentricCircles() {
  const { a } = useMode();
  return (
    <div className="fixed top-0 right-0 pointer-events-none" aria-hidden="true">
      {[680, 450, 230].map((size, i) => (
        <div key={size} style={{
          position: "absolute", width: size, height: size, borderRadius: "50%",
          border: `1px solid ${a(i === 0 ? 0.1 : i === 1 ? 0.17 : 0.26)}`,
          top: -(size / 2), right: -(size / 2),
        }} />
      ))}
    </div>
  );
}

function GhostStepNum({ n }: { n: number }) {
  const { a } = useMode();
  if (n === 0) return null;
  return (
    <div className="fixed bottom-0 right-3 pointer-events-none select-none" aria-hidden="true">
      <span style={{
        fontFamily: ANTON, fontSize: "min(40vw, 340px)", lineHeight: 0.8,
        color: a(0.08), letterSpacing: "-0.015em", display: "block",
      }}>
        {String(n).padStart(2, "0")}
      </span>
    </div>
  );
}

function Crosshair({ className }: { className: string }) {
  const { a } = useMode();
  const line = { background: a(0.28) };
  return (
    <div className={`fixed pointer-events-none w-5 h-5 ${className}`} aria-hidden="true">
      <div className="absolute top-1/2 inset-x-0 h-px -translate-y-1/2" style={line} />
      <div className="absolute left-1/2 inset-y-0 w-px -translate-x-1/2" style={line} />
    </div>
  );
}

// ─── UI atoms ─────────────────────────────────────────────────────────────────

function StepNum({ n }: { n: number }) {
  const { a } = useMode();
  return (
    <div className="flex items-center gap-2 mb-5"
      style={{ fontFamily: SPART, fontSize: 11, letterSpacing: "0.24em", color: a(0.3), textTransform: "uppercase" }}>
      <span>{String(n).padStart(2, "0")}</span>
      <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-5 h-3">
        <path d="M1 6h19M13 1l7 5-7 5" />
      </svg>
    </div>
  );
}

function Question({ children }: { children: ReactNode }) {
  const { tx } = useMode();
  return (
    <h2 style={{ fontFamily: SPART, fontWeight: 700, fontSize: "clamp(24px,4vw,36px)", color: tx, lineHeight: 1.15, marginBottom: "1.75rem" }}>
      {children}
    </h2>
  );
}

function Hint({ children }: { children: ReactNode }) {
  const { a } = useMode();
  return (
    <p style={{ fontFamily: SPART, fontSize: 13, color: a(0.35), marginTop: "-1.25rem", marginBottom: "1.25rem" }}>
      {children}
    </p>
  );
}

function InputLine({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const { tx, a } = useMode();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? "rgba(239,68,68,0.55)" : focused ? a(0.62) : a(0.13);
  return (
    <input
      {...props}
      onFocus={e => { props.onFocus?.(e); setFocused(true); }}
      onBlur={e => { props.onBlur?.(e); setFocused(false); }}
      className="w-full bg-transparent pb-3 outline-none"
      style={{
        fontFamily: SPART, fontSize: "clamp(18px,3vw,22px)",
        color: error ? "rgba(239,68,68,0.9)" : tx,
        borderBottom: `1px solid ${borderColor}`,
        transition: "border-color 150ms",
      }}
    />
  );
}

function SelectLine({ error, children, value, onChange, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  const { tx, bg, a } = useMode();
  const { isDark } = useMode();
  const [focused, setFocused] = useState(false);
  const isEmpty = !value || value === "";
  const borderColor = error ? "rgba(239,68,68,0.55)" : focused ? a(0.62) : a(0.13);
  return (
    <div className="relative">
      <select value={value} onChange={onChange} {...props}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full bg-transparent pb-3 outline-none cursor-pointer appearance-none pr-8"
        style={{
          fontFamily: SPART, fontSize: "clamp(18px,3vw,22px)",
          color: isEmpty ? a(0.3) : tx,
          borderBottom: `1px solid ${borderColor}`,
          transition: "border-color 150ms",
          background: bg, colorScheme: isDark ? "dark" : "light",
        }}>
        {children}
      </select>
      <svg className="absolute right-1 pointer-events-none w-4 h-4" style={{ bottom: 14, stroke: a(0.35) }}
        viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function OptionBtn({ letter, label, selected, onClick }: { letter: string; label: string; selected: boolean; onClick: () => void }) {
  const { tx, bg, a, ba } = useMode();
  const [hovered, setHovered] = useState(false);
  const style = selected
    ? { background: tx, border: `1px solid ${tx}` }
    : { background: hovered ? a(0.05) : "transparent", border: `1px solid ${a(hovered ? 0.3 : 0.12)}`, transition: "background 140ms, border-color 140ms" };
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 w-full text-left px-5 py-3.5 cursor-pointer"
      style={style}>
      <kbd style={{
        fontFamily: SPART, fontSize: 10, letterSpacing: "0.1em",
        padding: "2px 6px", minWidth: 22, textAlign: "center", lineHeight: 1.6, flexShrink: 0,
        border: `1px solid ${selected ? ba(0.2) : a(0.2)}`,
        color: selected ? ba(0.55) : a(0.35),
        background: selected ? ba(0.1) : "transparent",
      }}>
        {letter}
      </kbd>
      <span style={{ fontFamily: SPART, fontSize: 13.5, lineHeight: 1.4, fontWeight: 500, color: selected ? bg : a(0.82) }}>
        {label}
      </span>
    </button>
  );
}

function OkBtn({ onClick }: { onClick: () => void }) {
  const { bg, a } = useMode();
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex items-center gap-5 mt-7">
      <button type="button" onClick={onClick}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-3 px-7 py-3 cursor-pointer"
        style={{
          fontFamily: SPART, fontWeight: 700, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
          border: `1px solid ${GOLD}`, background: hovered ? GOLD : "transparent",
          color: hovered ? bg : GOLD, transition: "background 180ms, color 180ms",
        }}>
        OK
        <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-3">
          <path d="M1 6h19M13 1l7 5-7 5" />
        </svg>
      </button>
      <span className="hidden sm:block" style={{ fontFamily: SPART, fontSize: 12, color: a(0.22) }}>
        press <span style={{ fontFamily: "monospace" }}>Enter ↵</span>
      </span>
    </div>
  );
}

function ToggleCard({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  const { bg, a } = useMode();
  const [hovered, setHovered] = useState(false);
  const style = checked
    ? { background: a(0.06), border: `1px solid ${a(0.32)}` }
    : { background: "transparent", border: `1px solid ${a(hovered ? 0.26 : 0.12)}`, transition: "border-color 140ms" };
  return (
    <button type="button" onClick={onChange}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-4 w-full text-left px-5 py-4 cursor-pointer" style={style}>
      <div style={{
        width: 16, height: 16, flexShrink: 0, marginTop: 2,
        border: checked ? `1px solid ${GOLD}` : `1px solid ${a(0.28)}`,
        background: checked ? GOLD : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 140ms, border-color 140ms",
      }}>
        {checked && (
          <svg viewBox="0 0 12 10" fill="none" strokeWidth="2.5" strokeLinecap="round" className="w-2.5 h-2"
            style={{ stroke: bg }}>
            <path d="M1 5l3.5 3.5L11 1" />
          </svg>
        )}
      </div>
      <span style={{ fontFamily: SPART, fontSize: 13, color: a(0.62), lineHeight: 1.55 }}>
        {label}
      </span>
    </button>
  );
}

function StepError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-start gap-2 text-[13px] mt-4 leading-snug" style={{ color: "#f87171", fontFamily: SPART }}>
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 mt-0.5">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

// ─── Mode toggle pill ─────────────────────────────────────────────────────────

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      width={size} height={size}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"     x2="12" y2="5"     />
      <line x1="12" y1="19"    x2="12" y2="22"    />
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"  />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2"     y1="12"    x2="5"     y2="12"    />
      <line x1="19"    y1="12"    x2="22"    y2="12"    />
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"  />
    </svg>
  );
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      width={size} height={size}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ModeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  const { a, bg } = useMode();

  // Pill dimensions
  const W = 68, H = 34, DOT = 28, PAD = 3;
  const dotLeft = isDark ? PAD : W - DOT - PAD;

  return (
    <button
      type="button"
      onClick={onToggle}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="border-0 cursor-pointer flex-shrink-0"
      style={{
        width: W, height: H, borderRadius: H / 2, position: "relative",
        border: `1px solid ${a(0.28)}`,
        background: isDark ? a(0.06) : a(0.1),
        transition: "background 250ms",
        padding: 0,
      }}
    >
      {/* Track — moon left, sun right */}
      <span style={{ position: "absolute", left: PAD + (DOT - 14) / 2, top: (H - 14) / 2, color: a(0.28), lineHeight: 0 }}>
        <MoonIcon size={14} />
      </span>
      <span style={{ position: "absolute", right: PAD + (DOT - 14) / 2, top: (H - 14) / 2, color: a(0.28), lineHeight: 0 }}>
        <SunIcon size={14} />
      </span>

      {/* Sliding dot with active icon */}
      <span style={{
        position: "absolute", width: DOT, height: DOT, borderRadius: "50%",
        top: PAD - 1, left: dotLeft,
        background: GOLD, display: "flex", alignItems: "center", justifyContent: "center",
        color: bg,
        transition: "left 260ms cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {isDark ? <MoonIcon size={13} /> : <SunIcon size={13} />}
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PRRegisterForm() {
  const [mode, setMode]               = useState<"dark" | "light">("dark");
  const [step, setStep]               = useState(0);
  const [animCls, setAnimCls]         = useState("opacity-100 translate-y-0");
  const isAnimating                   = useRef(false);

  const [fields, setFields]           = useState<Fields>(EMPTY);
  const [file, setFile]               = useState<File | null>(null);
  const [fileError, setFileError]     = useState("");
  const [stepError, setStepError]     = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileRef                       = useRef<HTMLInputElement>(null);

  const isDark = mode === "dark";
  const ctx    = makeCtx(isDark);

  // Hydrate mode from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("pr-form-mode");
    if (saved === "light" || saved === "dark") setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("pr-form-mode", mode);
  }, [mode]);

  // Focus first input after step transitions
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelector<HTMLInputElement>("input:not([type=file]):not([type=hidden])")?.focus();
    }, 320);
    return () => clearTimeout(t);
  }, [step]);

  const goTo = useCallback((next: number, forward = true) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setStepError("");
    const exitCls  = forward ? "opacity-0 -translate-y-5" : "opacity-0 translate-y-5";
    const startCls = forward ? "opacity-0 translate-y-5"  : "opacity-0 -translate-y-5";
    setAnimCls(`${exitCls} transition-all duration-[180ms] ease-in`);
    setTimeout(() => {
      setStep(next);
      setAnimCls(startCls);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimCls("opacity-100 translate-y-0 transition-all duration-[300ms] ease-out");
        setTimeout(() => { isAnimating.current = false; }, 300);
      }));
    }, 180);
  }, []);

  const tryAdvance = useCallback(() => {
    const err = validateStep(STEPS[step], fields);
    if (err) { setStepError(err); return; }
    if (step < STEPS.length - 1) goTo(step + 1, true);
  }, [step, fields, goTo]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Enter" || e.shiftKey) return;
      const tag = (document.activeElement as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "select" || tag === "button") return;
      if (step === 0) { goTo(1, true); return; }
      if (STEPS[step] === "legal") return;
      e.preventDefault();
      tryAdvance();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step, tryAdvance, goTo]);

  const set = (key: keyof Fields, value: unknown) => {
    setFields(prev => ({ ...prev, [key]: value }));
    setStepError("");
  };

  const toggle = (key: keyof Fields, id: string) => {
    setFields(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id] };
    });
    setStepError("");
  };

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 15 * 1024 * 1024)                                     { setFileError("File must be under 15 MB"); return; }
    if (!["application/pdf","image/png","image/jpeg"].includes(f.type)) { setFileError("Only PDF, PNG or JPG files are accepted"); return; }
    setFileError("");
    setFile(f);
  };

  const handleSubmit = async () => {
    const err = validateStep("legal", fields);
    if (err) { setStepError(err); return; }
    setSubmitting(true);
    setSubmitError("");
    try {
      const fd = new FormData();
      (Object.entries(fields) as [string, unknown][]).forEach(([k, v]) => {
        fd.append(k, Array.isArray(v) ? JSON.stringify(v) : String(v));
      });
      if (file) fd.append("rate_card", file);
      const res = await fetch("/api/pr-register", { method: "POST", body: fd });
      if (res.ok) setSubmitted(true);
      else        setSubmitError("Something went wrong. Please try again.");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = step === 0 ? 0 : Math.round((step / (STEPS.length - 1)) * 100);

  // ── Step renders ──────────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (STEPS[step]) {

      case "welcome":
        return (
          <div className="text-center">
            <p style={{ fontFamily: SPART, fontSize: 10, letterSpacing: "0.46em", textTransform: "uppercase", color: ctx.a(0.3), marginBottom: "1.5rem" }}>
              Naturelle Personal Care CC
            </p>
            <h1 style={{ fontFamily: ANTON, fontSize: "clamp(56px,12vw,96px)", color: ctx.tx, lineHeight: 0.9, letterSpacing: "-0.01em", marginBottom: "1.75rem" }}>
              PR &amp; CREATOR<br />NETWORK
            </h1>
            <div className="mx-auto mb-7" style={{ width: 40, height: 2, background: GOLD }} />
            <p style={{ fontFamily: SPART, fontSize: 14, color: ctx.a(0.42), lineHeight: 1.75, maxWidth: 360, margin: "0 auto 2.5rem" }}>
              Register your profile to be considered for brand collaborations, gifting and campaign opportunities across Bodidoc, Chiskop and Lemonvate.
            </p>
            <WelcomeBtn onClick={() => goTo(1, true)}>Let&apos;s begin</WelcomeBtn>
          </div>
        );

      case "name":
        return (
          <div>
            <StepNum n={1} />
            <Question>What&apos;s your name?</Question>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InputLine autoFocus value={fields.first_name} onChange={e => set("first_name", e.target.value)} placeholder="First name" />
              <InputLine value={fields.last_name} onChange={e => set("last_name", e.target.value)} placeholder="Last name" />
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "about":
        return (
          <div>
            <StepNum n={2} />
            <Question>A bit about you</Question>
            <div className="flex flex-col gap-5">
              <SelectLine value={fields.gender} onChange={e => set("gender", e.target.value)}>
                <option value="" disabled>Select your gender</option>
                <option>Female</option><option>Male</option>
                <option>Non-binary</option><option>Prefer not to say</option>
              </SelectLine>
              <ToggleCard checked={fields.age_confirmed} label="I confirm that I am 18 years of age or older" onChange={() => set("age_confirmed", !fields.age_confirmed)} />
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "email":
        return (
          <div>
            <StepNum n={3} />
            <Question>What&apos;s your email address?</Question>
            <InputLine type="email" value={fields.email} onChange={e => set("email", e.target.value)} placeholder="you@example.com" />
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "phone":
        return (
          <div>
            <StepNum n={4} />
            <Question>And your phone number?</Question>
            <InputLine type="tel" value={fields.phone} onChange={e => set("phone", e.target.value)} placeholder="+27 82 123 4567" />
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "location":
        return (
          <div>
            <StepNum n={5} />
            <Question>Where are you based?</Question>
            <div className="flex flex-col gap-8">
              <InputLine value={fields.city} onChange={e => set("city", e.target.value)} placeholder="City" />
              <SelectLine value={fields.province} onChange={e => set("province", e.target.value)}>
                <option value="" disabled>Select your province</option>
                {PROVINCES.map(p => <option key={p}>{p}</option>)}
              </SelectLine>
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "brands":
        return (
          <div>
            <StepNum n={6} />
            <Question>Which brands do you want to collaborate with?</Question>
            <Hint>Select all that apply</Hint>
            <div className="flex flex-col gap-2.5">
              {BRANDS.map((b, i) => (
                <OptionBtn key={b.id} letter={LETTERS[i]} label={b.label}
                  selected={fields.brand_interests.includes(b.id)}
                  onClick={() => toggle("brand_interests", b.id)} />
              ))}
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "platforms":
        return (
          <div>
            <StepNum n={7} />
            <Question>Where do you create content?</Question>
            <Hint>Select all that apply</Hint>
            <div className="flex flex-col gap-2.5">
              {PLATFORMS.map((p, i) => (
                <OptionBtn key={p.id} letter={LETTERS[i]} label={p.label}
                  selected={fields.active_platforms.includes(p.id)}
                  onClick={() => toggle("active_platforms", p.id)} />
              ))}
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "urls":
        return (
          <div>
            <StepNum n={8} />
            <Question>Share your profile links</Question>
            <Hint>Your full URL — not just your handle</Hint>
            <div className="flex flex-col gap-7">
              {PLATFORMS.filter(p => fields.active_platforms.includes(p.id)).map(p => {
                const cfg = PLATFORM_CONFIG[p.id as PlatformId];
                const key = `${p.id}_url` as keyof Fields;
                return (
                  <div key={p.id}>
                    <label style={{ fontFamily: SPART, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: ctx.a(0.35), display: "block", marginBottom: "0.5rem" }}>
                      {p.label}
                    </label>
                    <InputLine type="url" value={fields[key] as string} onChange={e => set(key, e.target.value)} placeholder={cfg.placeholder} />
                  </div>
                );
              })}
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "niches":
        return (
          <div>
            <StepNum n={9} />
            <Question>What kind of content do you create?</Question>
            <Hint>Select all that apply</Hint>
            <div className="grid grid-cols-2 gap-2">
              {NICHES.map((n, i) => (
                <OptionBtn key={n} letter={LETTERS[i]} label={n}
                  selected={fields.content_niches.includes(n)}
                  onClick={() => toggle("content_niches", n)} />
              ))}
            </div>
            <StepError msg={stepError} />
            <OkBtn onClick={tryAdvance} />
          </div>
        );

      case "upload":
        return (
          <div>
            <StepNum n={10} />
            <Question>Got a rate card or media kit?</Question>
            <Hint>Optional — PDF, PNG or JPG, max 15 MB</Hint>
            <div
              className="p-10 text-center cursor-pointer transition-colors"
              style={{ border: `1px dashed ${ctx.a(0.18)}` }}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0] ?? null); }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = ctx.a(0.36))}
              onMouseLeave={e => (e.currentTarget.style.borderColor = ctx.a(0.18))}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5 shrink-0" style={{ stroke: GOLD }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontFamily: SPART, fontSize: 13, color: ctx.tx }}>{file.name}</span>
                  <span style={{ fontFamily: SPART, fontSize: 12, color: ctx.a(0.32) }}>({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                  <button type="button" onClick={e => { e.stopPropagation(); setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                    className="bg-transparent border-0 cursor-pointer ml-1" style={{ color: ctx.a(0.4) }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" className="w-9 h-9 mx-auto mb-3" style={{ stroke: ctx.a(0.22) }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <p style={{ fontFamily: SPART, fontSize: 13, color: ctx.a(0.35) }}>
                    Drop here or <span style={{ color: GOLD, textDecoration: "underline", textUnderlineOffset: 3 }}>click to browse</span>
                  </p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0] ?? null)} />
            {fileError && <p style={{ fontFamily: SPART, fontSize: 12, color: "#f87171", marginTop: 8 }}>{fileError}</p>}
            <div className="flex items-center gap-6 mt-7">
              <OkBtn onClick={tryAdvance} />
              <button type="button" onClick={tryAdvance} className="bg-transparent border-0 cursor-pointer underline underline-offset-2"
                style={{ fontFamily: SPART, fontSize: 13, color: ctx.a(0.35) }}>
                Skip
              </button>
            </div>
          </div>
        );

      case "legal":
        return (
          <div>
            <StepNum n={11} />
            <Question>Almost done</Question>
            <Hint>Please read and accept our terms to complete your registration</Hint>
            <div className="overflow-y-auto p-4 mb-5 text-[12px] leading-[1.85] whitespace-pre-wrap"
              style={{
                height: "10rem", border: `1px solid ${ctx.a(0.12)}`,
                color: ctx.a(0.38), fontFamily: SPART,
                scrollbarWidth: "thin", scrollbarColor: `${ctx.a(0.15)} transparent`,
              }}>
              {TC_TEXT}
            </div>
            <ToggleCard checked={fields.popia_consent}
              label="I consent to the processing and storage of my personal information in accordance with the Protection of Personal Information Act (POPIA) as outlined in the Terms and Conditions above."
              onChange={() => set("popia_consent", !fields.popia_consent)} />
            <StepError msg={stepError} />
            {submitError && <p style={{ fontFamily: SPART, fontSize: 13, color: "#f87171", marginTop: 12 }}>{submitError}</p>}
            <SubmitBtn onClick={handleSubmit} disabled={submitting} bg={ctx.bg}>
              {submitting ? "Submitting…" : "Submit Registration"}
            </SubmitBtn>
          </div>
        );
    }
  };

  // ── Layout ────────────────────────────────────────────────────────────────────

  return (
    <ModeContext.Provider value={ctx}>
      <div className="h-[100dvh] overflow-hidden relative"
        style={{ backgroundColor: ctx.bg, ...dotGrid(isDark) }}>

        {/* Decorative */}
        <ConcentricCircles />
        <Crosshair className="top-5 left-5" />
        <Crosshair className="top-5 right-5" />
        <Crosshair className="bottom-5 left-5" />
        <Crosshair className="bottom-5 right-5" />
        <GhostStepNum n={step} />

        {/* Progress bar */}
        {step > 0 && (
          <div className="absolute top-0 left-0 right-0 z-50" style={{ height: 2, background: ctx.a(0.08) }}>
            <div className="h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${GOLD}, #d4b576)` }} />
          </div>
        )}

        {/* Top nav — always present so toggle is always accessible */}
        <div className="absolute top-0 left-0 right-0 px-5 z-40 flex items-center justify-between"
          style={{ height: 50, paddingTop: step > 0 ? 2 : 0 }}>
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1, false)}
              className="flex items-center gap-2 bg-transparent border-0 cursor-pointer"
              style={{ fontFamily: SPART, fontWeight: 700, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: ctx.a(0.35), transition: "opacity 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = ctx.a(0.8))}
              onMouseLeave={e => (e.currentTarget.style.color = ctx.a(0.35))}>
              <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-3 rotate-180">
                <path d="M1 6h19M13 1l7 5-7 5" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            {step > 0 && (
              <span style={{ fontFamily: SPART, fontSize: 11, letterSpacing: "0.12em", color: ctx.a(0.22) }}>
                {step} / {STEPS.length - 1}
              </span>
            )}
            <ModeToggle isDark={isDark} onToggle={() => setMode(m => m === "dark" ? "light" : "dark")} />
          </div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-6 overflow-y-auto"
          style={{ paddingTop: 50, scrollbarWidth: "none" }}>
          <div className="w-full max-w-[540px] py-8">
            <div className={animCls}>
              {renderStep()}
            </div>
          </div>
        </div>

        {/* Thank you screen */}
        {submitted && (
          <div className="absolute inset-0 flex items-center justify-center z-50 px-6"
            style={{ backgroundColor: ctx.bg, ...dotGrid(isDark) }}>
            <div className="text-center max-w-sm">
              <div className="flex items-center justify-center mx-auto mb-8"
                style={{ width: 56, height: 56, border: `1px solid ${GOLD}` }}>
                <svg viewBox="0 0 24 22" fill="none" strokeWidth="1.8" strokeLinecap="round" className="w-6 h-5" style={{ stroke: GOLD }}>
                  <path d="M2 11l7 7L22 2" />
                </svg>
              </div>
              <h2 style={{ fontFamily: ANTON, fontSize: "clamp(52px,13vw,92px)", color: ctx.tx, lineHeight: 0.88, letterSpacing: "-0.015em", marginBottom: "1.5rem" }}>
                THANK<br />YOU
              </h2>
              <div className="mx-auto mb-7" style={{ width: 32, height: 1, background: ctx.a(0.2) }} />
              <p style={{ fontFamily: SPART, fontSize: 14, color: ctx.a(0.45), lineHeight: 1.75 }}>
                Your profile has been added to our PR &amp; Creator Network database. We&apos;ll be in touch if your profile aligns with an upcoming campaign.
              </p>
            </div>
          </div>
        )}
      </div>
    </ModeContext.Provider>
  );
}

// ─── Small render helpers (need ctx from parent scope via prop) ───────────────

function WelcomeBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  const { bg } = useMode();
  const [hovered, setHovered] = useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-3 cursor-pointer border-0"
      style={{
        fontFamily: SPART, fontWeight: 700, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
        background: hovered ? "#d4b070" : GOLD, color: bg,
        padding: "1rem 2.5rem", transition: "background 180ms",
      }}>
      {children}
      <svg viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-5 h-3">
        <path d="M1 6h19M13 1l7 5-7 5" />
      </svg>
    </button>
  );
}

function SubmitBtn({ onClick, disabled, bg, children }: { onClick: () => void; disabled: boolean; bg: string; children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="mt-7 w-full py-4 cursor-pointer border-0 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        fontFamily: SPART, fontWeight: 700, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
        background: hovered && !disabled ? "#d4b070" : GOLD, color: bg,
        transition: "background 180ms",
      }}>
      {children}
    </button>
  );
}
