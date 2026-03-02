"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";
import type { Product } from "@/sanity/lib/sanity";

// ─── Types ────────────────────────────────────────────────────────────────────

type BuyLink = {
  retailer: string;
  url: string;
  logo?: any;
};

type Props = {
  productName: string;
  productType: string;
  productSlug?: string; // if provided, shows "View full product details" link
  buyLinks: BuyLink[];
  onClose: () => void;
};

const typeLabels: Record<string, string> = {
  "body-cream": "Body Cream",
  "body-oil": "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion": "Body Lotion",
};

const inStoreKeywords = [
  "checkers", "shoprite", "spar",
  "clicks store", "dischem store",
  "pnp store", "pick n pay store",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BuyOnlineModal({
  productName,
  productType,
  productSlug,
  buyLinks,
  onClose,
}: Props) {
  // Lock scroll + Escape key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Split into online vs in-store by retailer name
  const onlineRetailers = buyLinks.filter(
    (b) => !inStoreKeywords.some((k) => b.retailer?.toLowerCase().includes(k))
  );
  const inStoreRetailers = buyLinks.filter(
    (b) => inStoreKeywords.some((k) => b.retailer?.toLowerCase().includes(k))
  );
  // If no split is possible, show all as online
  const showOnline = onlineRetailers.length > 0 ? onlineRetailers : buyLinks;
  const showInStore = onlineRetailers.length > 0 ? inStoreRetailers : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full max-w-105 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#112942]/30 hover:text-[#112942] transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-7">
          {/* Product identity */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-1">
            {typeLabels[productType] ?? productType}
          </p>
          <h2 className="font-display text-[19px] font-normal text-[#112942] leading-snug mb-5 pr-8">
            {productName}
          </h2>
          <div className="h-px bg-[#ebebeb] mb-6" />

          {/* Shop Online */}
          {showOnline.length > 0 && (
            <div className="mb-6">
              <p className="font-display text-[17px] font-normal text-[#112942] leading-none mb-1">
                Shop <em className="italic">Online</em>
              </p>
              <p className="text-[12px] font-light text-[#aaa] mb-3.5">
                Get your Bodidoc fix delivered to your door
              </p>
              <div className="flex flex-col gap-2">
                {showOnline.map((link, i) => (
                  <RetailerRow key={i} link={link} label="Shop online at" />
                ))}
              </div>
            </div>
          )}

          {/* Find In-store */}
          {showInStore.length > 0 && (
            <div className="mb-2">
              <p className="font-display text-[17px] font-normal text-[#112942] leading-none mb-1">
                Find <em className="italic">In-store</em>
              </p>
              <p className="text-[12px] font-light text-[#aaa] mb-3.5">
                Get your Bodidoc fix from your nearest store
              </p>
              <div className="flex flex-col gap-2">
                {showInStore.map((link, i) => (
                  <RetailerRow key={i} link={link} label="Shop in-store" />
                ))}
              </div>
            </div>
          )}

          {/* Fallback */}
          {buyLinks.length === 0 && (
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

          {/* View full product details (shop grid context only) */}
          {buyLinks.length > 0 && productSlug && (
            <>
              <div className="h-px bg-[#ebebeb] mt-4 mb-4" />
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
          )}
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
      className="flex items-center justify-between px-4 py-3.5 bg-[#f5f5f5] hover:bg-[#112942] group transition-colors duration-200"
    >
      <span className="text-[9px] tracking-[0.2em] uppercase font-light text-[#aaa] group-hover:text-white/50 transition-colors whitespace-nowrap">
        {label}
      </span>
      {link.logo ? (
        <div className="relative h-7 w-32 flex items-center justify-end shrink-0">
          <Image
            src={urlFor(link.logo).width(256).height(56).url()}
            alt={link.retailer}
            fill
            className="object-contain object-right group-hover:brightness-0 group-hover:invert transition-all duration-200"
          />
        </div>
      ) : (
        <span className="font-display text-[14px] font-normal text-[#112942] group-hover:text-white transition-colors">
          {link.retailer}
        </span>
      )}
    </a>
  );
}