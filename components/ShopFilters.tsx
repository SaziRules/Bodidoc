"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";
import type { Product } from "@/sanity/lib/sanity";

type FilterOption = { value: string; label: string };

type Props = {
  ranges: FilterOption[];
  types: FilterOption[];
  skins: FilterOption[];
  products: Product[];
  mobile?: boolean;
};

const typeLabels: Record<string, string> = {
  "body-cream": "Body Cream",
  "body-oil": "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion": "Body Lotion",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug.current}`} className="group flex flex-col">
      <div className="relative overflow-hidden bg-[#f8f6f3] aspect-square mb-4">
        <Image
          src={urlFor(product.mainImage).width(600).height(600).url()}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#112942] text-[9px] tracking-[0.2em] uppercase text-white font-light">
            {product.badge}
          </span>
        )}
        {product.isBestseller && !product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white border border-[#112942]/20 text-[9px] tracking-[0.2em] uppercase text-[#112942] font-light">
            Bestseller
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light bg-white px-4 py-2 shadow-sm">
            View Product
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#112942]/40 font-light">
          {typeLabels[product.productType] ?? product.productType}
        </p>
        <h3 className="font-display text-[16px] font-normal text-[#112942] leading-snug group-hover:opacity-70 transition-opacity duration-200">
          {product.name}
        </h3>
        {product.size && (
          <p className="text-[12px] font-light text-[#999]">{product.size}</p>
        )}
        {product.shortDescription && (
          <p className="text-[12px] font-light text-[#777] leading-relaxed mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light group-hover:gap-2.5 transition-all duration-200">
          View Product
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Checkbox group ───────────────────────────────────────────────────────────

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[#e8e8e8] pb-5 mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-4"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light">
          {title}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#112942"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col gap-2.5">
          {options.map((opt) => {
            const active = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 cursor-pointer group/check"
              >
                <span
                  onClick={() => onToggle(opt.value)}
                  className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                    active
                      ? "bg-[#112942] border-[#112942]"
                      : "border-[#d0d0d0] group-hover/check:border-[#112942]"
                  }`}
                >
                  {active && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span
                  onClick={() => onToggle(opt.value)}
                  className={`text-[12px] font-light transition-colors duration-150 ${
                    active ? "text-[#112942]" : "text-[#666] group-hover/check:text-[#112942]"
                  }`}
                >
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ShopFilters({ ranges, types, skins, products, mobile = false }: Props) {
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSkins, setSelectedSkins] = useState<string[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const rangeMatch = selectedRanges.length === 0 || selectedRanges.includes(p.range);
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.productType);
      const skinMatch =
        selectedSkins.length === 0 ||
        (p.skinType ?? []).some((s) => selectedSkins.includes(s));
      return rangeMatch && typeMatch && skinMatch;
    });
  }, [products, selectedRanges, selectedTypes, selectedSkins]);

  const activeCount = selectedRanges.length + selectedTypes.length + selectedSkins.length;

  const clearAll = () => {
    setSelectedRanges([]);
    setSelectedTypes([]);
    setSelectedSkins([]);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light">
          Filter By
        </p>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] tracking-widest uppercase text-[#999] font-light hover:text-[#112942] transition-colors"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterGroup
        title="Range"
        options={ranges}
        selected={selectedRanges}
        onToggle={(v) => toggle(setSelectedRanges, v)}
      />
      <FilterGroup
        title="Product Type"
        options={types}
        selected={selectedTypes}
        onToggle={(v) => toggle(setSelectedTypes, v)}
      />
      <FilterGroup
        title="Skin Type"
        options={skins}
        selected={selectedSkins}
        onToggle={(v) => toggle(setSelectedSkins, v)}
      />
    </>
  );

  // ── Mobile layout ─────────────────────────────────────────────────────────

  if (mobile) {
    return (
      <div className="w-full mb-8">
        {/* Filter toggle button */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[12px] font-light text-[#666]">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2 border border-[#112942]/20 px-4 py-2 text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="10" y2="18" />
            </svg>
            Filter
            {activeCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#112942] text-white text-[9px] flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="border border-[#e8e8e8] p-5 mb-6">
            {sidebarContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-2 py-2.5 bg-[#112942] text-white text-[10px] tracking-[0.15em] uppercase font-light"
            >
              Show {filtered.length} results
            </button>
          </div>
        )}

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-[13px] font-light text-[#999] py-10 text-center">
            No products match your filters.{" "}
            <button onClick={clearAll} className="underline text-[#112942]">
              Clear filters
            </button>
          </p>
        )}
      </div>
    );
  }

  // ── Desktop layout — sidebar only, grid rendered separately ─────────────

  return (
    <>
      {/* Sidebar */}
      <div>{sidebarContent}</div>

      {/* Desktop grid — rendered outside via portal-style sibling */}
      {/* NOTE: We use a global event approach — sidebar sets state, grid reads it via prop drilling.
          Since sidebar and grid share this component via mobile/desktop split in the server page,
          on desktop we render the grid HERE inside the client component. */}
      <style>{`#shop-grid { display: none !important; }`}</style>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[12px] font-light text-[#666]">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-[13px] font-light text-[#999] py-16">
            No products match your filters.{" "}
            <button onClick={clearAll} className="underline text-[#112942]">
              Clear filters
            </button>
          </p>
        )}
      </div>
    </>
  );
}