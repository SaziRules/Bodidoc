"use client";

import { useState } from "react";
import FlipBook from "./FlipBook";

// ─── Curved arrow SVG (points from text toward the book thumbnail) ────────────
const CurvedArrow = () => (
  <svg viewBox="0 0 110 75" width="110" height="75" className="overflow-visible">
    {/* Curve from right-bottom toward book on the left */}
    <path
      d="M 100 60 C 90 20, 55 5, 12 28"
      stroke="#112942"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
    {/* Arrowhead */}
    <path
      d="M 12 28 L 26 20 M 12 28 L 17 43"
      stroke="#112942"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// ─── CSS book thumbnail ───────────────────────────────────────────────────────
const BookThumbnail = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="Open trade book"
    className="relative cursor-pointer hover:scale-105 transition-transform duration-200 shrink-0"
    style={{ width: 68, height: 94 }}
  >
    {/* Spine */}
    <div
      className="absolute left-0 top-0 bottom-0 bg-[#0d2035] rounded-l-[2px]"
      style={{ width: 10 }}
    />
    {/* Cover */}
    <div
      className="absolute right-0 top-0 bottom-0 bg-[#112942] rounded-r-[2px] flex flex-col items-center justify-center gap-1"
      style={{ left: 10, boxShadow: "3px 3px 12px rgba(0,0,0,0.35)" }}
    >
      <span className="text-white/80 font-sans font-bold text-[7px] tracking-widest uppercase">Bodidoc</span>
      <div className="w-6 h-px bg-white/30" />
      <span className="text-white/60 font-sans text-[6px] tracking-wider uppercase">Trade</span>
      <span className="text-white/60 font-sans text-[6px] tracking-wider uppercase">Catalogue</span>
    </div>
    {/* Top edge */}
    <div
      className="absolute top-0 left-0 right-0 bg-[#1a3a5c] h-[3px] rounded-t-[2px]"
      style={{ transform: "scaleY(0.5)", transformOrigin: "top" }}
    />
  </button>
);

// ─── Certification icons (matches reference bottom-left badges) ───────────────
const CertIcons = () => (
  <div className="flex items-center gap-2.5">
    {/* Dermatologically tested */}
    <div className="w-8 h-8 rounded-full border border-[#112942]/40 flex items-center justify-center" title="Dermatologically tested">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#112942" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    </div>
    {/* Cruelty free */}
    <div className="w-8 h-8 rounded-full border border-[#112942]/40 flex items-center justify-center" title="Cruelty free">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#112942" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
    {/* Natural ingredients */}
    <div className="w-8 h-8 rounded-full border border-[#112942]/40 flex items-center justify-center" title="Natural ingredients">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#112942" strokeWidth="1.5">
        <path d="M12 22V12M12 12C12 7 7 3 2 3c0 5 4 9 10 9zM12 12c0-5 5-9 10-9-1 5-5 9-10 9z" />
      </svg>
    </div>
    {/* SA Made */}
    <div className="w-8 h-8 rounded-full border border-[#112942]/40 flex items-center justify-center" title="Proudly South African">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#112942" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  </div>
);

// ─── Main teaser ──────────────────────────────────────────────────────────────

export default function TradeBookTeaser() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Teaser banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#bacbd9" }}
      >
        {/* Woman image — right side, blended in */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-2-desktop.webp"
            alt=""
            className="absolute right-0 top-0 h-full w-auto max-w-[65%] object-cover object-right"
            draggable={false}
          />
          {/* Left-to-right fade so the image blends into the bg color */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #bacbd9 35%, #bacbd9cc 52%, #bacbd944 68%, transparent 80%)",
            }}
          />
        </div>

        {/* ── CTA block — vertically centred in left half ── */}
        <div className="relative z-10 flex flex-col justify-center h-full pl-14 md:pl-20 lg:pl-28">
          <div className="flex items-start gap-0 max-w-xs">

            {/* Book thumbnail */}
            <div className="flex flex-col items-center mt-2">
              <BookThumbnail onClick={() => setOpen(true)} />
            </div>

            {/* Arrow + text */}
            <div className="relative ml-1">
              <div className="-ml-4 -mb-3">
                <CurvedArrow />
              </div>
              <button
                onClick={() => setOpen(true)}
                className="text-left cursor-pointer group"
              >
                <p className="font-sans text-[15px] leading-snug text-[#112942]">
                  <strong className="font-bold italic">Click here</strong>{" "}
                  to view our<br />
                  digital trade presenter
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom-left: logo + tagline + cert icons ── */}
        <div className="absolute bottom-7 left-14 md:left-20 lg:left-28 z-10 flex flex-col gap-1.5">
          <img
            src="/images/logo.webp"
            alt="bodidoc"
            className="h-6 w-auto object-contain object-left"
            style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(42%) saturate(705%) hue-rotate(176deg) brightness(95%) contrast(95%)" }}
          />
          <p className="font-sans text-[11px] text-[#112942]/70 tracking-wide">Taking care of you.</p>
          <CertIcons />
        </div>
      </div>

      {/* ── Flipbook modal ── */}
      {open && <FlipBook onClose={() => setOpen(false)} />}
    </>
  );
}
