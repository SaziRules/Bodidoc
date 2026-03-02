"use client";

import { useState, useEffect } from "react";
import BuyOnlineModal from "@/components/BuyOnlineModal";

type BuyLink = { retailer: string; url: string; logo?: any };

type Props = {
  productName: string;
  productType: string;
  productSlug: string;
  buyLinks: BuyLink[];
  skinType?: string[];
  isItForMe?: string;
};

const skinLabels: Record<string, string> = {
  all: "All Skin Types",
  dry: "Dry Skin",
  normal: "Normal Skin",
  sensitive: "Sensitive Skin",
  oily: "Oily Skin",
};

export default function ProductPageClient({
  productName,
  productType,
  productSlug,
  buyLinks,
  skinType,
  isItForMe,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [howToOpen, setHowToOpen] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const enc = (s: string) => encodeURIComponent(s);

  const share = {
    facebook: () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`, "_blank", "width=600,height=400"),
    whatsapp: () =>
      window.open(`https://wa.me/?text=${enc(productName + " " + pageUrl)}`, "_blank"),
    x: () =>
      window.open(`https://x.com/intent/tweet?text=${enc(productName)}&url=${enc(pageUrl)}`, "_blank", "width=600,height=400"),
    copy: async () => {
      try {
        await navigator.clipboard.writeText(pageUrl);
      } catch {
        const el = document.createElement("textarea");
        el.value = pageUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
  };

  return (
    <div className="flex flex-col gap-4">

      {/* Skin type pills */}
      {skinType && skinType.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#112942]/30 font-light shrink-0">
            Suitable for
          </span>
          {skinType.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 border border-[#112942]/15 text-[10px] tracking-widest uppercase text-[#112942]/60 font-light rounded-full"
            >
              {skinLabels[s] ?? s}
            </span>
          ))}
        </div>
      )}

      {/* ── Buy Online + Share ──
          Mobile:  button full-width on top, share icons in a row below
          Desktop: all inline in one row                                  */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">

        {/* Buy Online */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full sm:flex-1 flex items-center justify-center rounded-full bg-[#112942] text-white text-[11px] tracking-[0.25em] uppercase font-light py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200"
        >
          Buy Online
        </button>

        {/* Share icons — always a horizontal row */}
        <div className="flex items-center gap-2">

          {/* Divider — desktop only */}
          <div className="hidden sm:block w-px h-6 bg-[#e0e0e0] shrink-0 mr-1" />

          {/* Facebook */}
          <ShareBtn label="Share on Facebook" onClick={share.facebook}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </ShareBtn>

          {/* WhatsApp */}
          <ShareBtn label="Share on WhatsApp" onClick={share.whatsapp}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.805-1.522A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.371l-.359-.214-3.724.977.994-3.629-.234-.373A9.818 9.818 0 0 1 12 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z" />
            </svg>
          </ShareBtn>

          {/* X */}
          <ShareBtn label="Share on X" onClick={share.x}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </ShareBtn>

          {/* Copy link */}
          <ShareBtn label={copied ? "Copied!" : "Copy link"} onClick={share.copy} active={copied}>
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
          </ShareBtn>

        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <BuyOnlineModal
          productName={productName}
          productType={productType}
          buyLinks={buyLinks}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

// ─── Share button ─────────────────────────────────────────────────────────────

function ShareBtn({
  label,
  onClick,
  active = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
        active
          ? "bg-[#112942] border-[#112942] text-white"
          : "border-[#e0e0e0] text-[#112942]/40 hover:border-[#112942]/60 hover:text-[#112942] hover:bg-[#112942]/5"
      }`}
    >
      {children}
    </button>
  );
}