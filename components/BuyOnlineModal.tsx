"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";

// ─── Types ────────────────────────────────────────────────────────────────────

type BuyLink = {
  retailer: string;
  url: string;
  logo?: any;
};

type Props = {
  productName: string;
  productType: string;
  productSlug?: string;
  buyLinks: BuyLink[];       // Online purchase links (retailers, WhatsApp, etc.)
  inStoreLinks?: BuyLink[];  // Physical stores — from dedicated Sanity field
  onClose: () => void;
};

const typeLabels: Record<string, string> = {
  "body-cream":      "Body Cream",
  "body-oil":        "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion":     "Body Lotion",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuyOnlineModal({
  productName,
  productType,
  productSlug,
  buyLinks,
  inStoreLinks = [],
  onClose,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasAnyLinks = buyLinks.length > 0 || inStoreLinks.length > 0;

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#112942] hover:text-[#112942] transition-colors z-10 cursor-pointer bg-transparent border-0"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-7">

          {/* Product identity 
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-1">
            {typeLabels[productType] ?? productType}
          </p>
          <h2 className="font-display text-[19px] font-semibold text-[#112942] leading-snug mb-5 pr-8">
            {productName}
          </h2>  */}
          <div className=" mb-6" />

          {/* ── Shop Online ── */}
          {buyLinks.length > 0 && (
            <div className="mb-7">
              <p className="font-display text-[27px] font-normal text-[#112942] leading-none mb-1">
                Shop <em className="italic">Online</em>
              </p>
              <p className="text-[13px] font-medium text-[#2f2f2f] mb-4">
                Get your Bodidoc fix delivered to your door
              </p>
              <div className="flex flex-col gap-2">
                {buyLinks.map((link, i) => (
                  <RetailerRow key={i} link={link} label="Shop online at" />
                ))}
              </div>
            </div>
          )}

          {/* ── Find In-store ── */}
          {inStoreLinks.length > 0 && (
            <div className="mb-2">
              <p className="font-display text-[27px] font-normal text-[#112942] leading-none mb-1">
                Find <em className="italic">In-store</em>
              </p>
              <p className="text-[13px] font-medium text-[#2f2f2f] mb-4">
                Get your Bodidoc fix from your nearest store
              </p>
              <div className="flex flex-col gap-2">
                {inStoreLinks.map((link, i) => (
                  <RetailerRow key={i} link={link} label="Shop in-store" />
                ))}
              </div>
            </div>
          )}

          {/* ── No links yet ── */}
          {!hasAnyLinks && (
            <div className="py-8 text-center">
              <p className="text-[13px] font-light text-[#aaa] mb-5">
                Stockist information coming soon.
              </p>
              {productSlug && (
                <Link
                  href={`/shop/${productSlug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light border border-[#112942]/20 px-5 py-2.5 hover:bg-[#112942] hover:text-white transition-all duration-200"
                >
                  View Product
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          )}

          {/* ── View full product details (shop grid context) 
          {hasAnyLinks && productSlug && (
            <>
              <div className="h-px bg-[#ebebeb] mt-5 mb-4" />
              <Link
                href={`/shop/${productSlug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-[#112942]/40 font-light hover:text-[#112942] hover:gap-2.5 transition-all duration-200"
              >
                View full product details
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </>
          )}  ── */}

        </div>
      </div>
    </div>
  );
}

// ─── Retailer Row ─────────────────────────────────────────────────────────────

function RetailerRow({ link, label }: { link: BuyLink; label: string }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between px-5 py-2 bg-[#ececec] hover:bg-[#112942] group transition-colors duration-200 rounded-full"
    >
      <span className="text-[13px] tracking-normal uppercase font-light text-[#112942] group-hover:text-white transition-colors whitespace-nowrap shrink-0">
        {label}
      </span>

      {link.logo ? (
        <div className="relative h-8 w-28 flex items-center justify-end shrink-0">
          <Image
            src={urlFor(link.logo).width(288).height(64).url()}
            alt={link.retailer}
            fill
            className="object-contain object-right group-hover:brightness-0 group-hover:invert transition-all duration-200"
            sizes="144px"
          />
        </div>
      ) : (
        <span className="font-display text-[15px] font-normal text-[#112942] group-hover:text-white transition-colors">
          {link.retailer}
        </span>
      )}
    </a>
  );
}