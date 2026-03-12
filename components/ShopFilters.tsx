"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";
import type { Product } from "@/sanity/lib/sanity";
import BuyOnlineModal from "@/components/BuyOnlineModal";

type FilterOption = { value: string; label: string };

type Props = {
  ranges: FilterOption[];
  types: FilterOption[];
  skins: FilterOption[];
  products: Product[];
};

const typeLabels: Record<string, string> = {
  "body-cream": "Body Cream",
  "body-oil": "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion": "Body Lotion",
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mt-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half   = !filled && rating >= star - 0.5;
          return (
            <span
              key={star}
              className={`text-[14px] leading-none ${
                filled ? "text-[#112942]" : half ? "text-[#112942]/60" : "text-[#ccc]"
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="text-[12px] text-[#999] leading-none">({count})</span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col">

        <Link
          href={`/shop/${product.slug.current}`}
          className="relative block w-full aspect-square bg-[#f7f7f7] overflow-hidden mb-3"
        >
          <Image
            src={urlFor(product.mainImage).width(600).height(600).url()}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <button
            aria-label={`Shop ${product.name}`}
            className="absolute top-3 left-3 translate-y-0 group-hover:translate-y-1 translate-x-0 group-hover:translate-x-1 transition-all duration-200 cursor-pointer border-0 z-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            <Image
              src="/icons/shopping-cart.png"
              alt="Shopping Bag"
              width={32}
              height={32}
            />
          </button>
        </Link>

        <div className="flex flex-col">
          <p className="text-[12px] font-normal uppercase tracking-wide text-[#112942] mb-1">
            {typeLabels[product.productType] ?? product.productType}
          </p>
          <Link
            href={`/shop/${product.slug.current}`}
            className="text-[15px] font-medium text-[#112942] leading-snug no-underline hover:underline"
          >
            {product.name}
          </Link>
          <StarRating
            rating={product.rating ?? 0}
            count={product.reviewCount ?? 0}
          />
        </div>

      </div>

      {modalOpen && (
        <BuyOnlineModal
          productName={product.name}
          productType={product.productType}
          productSlug={product.slug.current}
          buyLinks={product.buyLinks ?? []}
          inStoreLinks={product.inStoreLinks ?? []}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

// ─── Filter Group ─────────────────────────────────────────────────────────────

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
    <div className="border-b border-[#333333]/40 pb-5 mb-5">
      <button className="flex items-center justify-between w-full mb-4">
        <span className="text-[13px] tracking-[0.2em] uppercase text-[#112942] font-semibold">
          {title}
        </span>
      </button>

      {open && (
        <div className="flex flex-col gap-2.5">
          {options.map((opt) => {
            const active = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 cursor-pointer group/check"
                onClick={() => onToggle(opt.value)}
              >
                <span
                  className={`w-4 h-4 border rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 ${
                    active
                      ? "bg-[#112942] border-[#112942]"
                      : "border-[#112942] group-hover/check:border-[#112942]"
                  }`}
                />
                <span
                  className={`text-[13px] font-normal transition-colors duration-150 ${
                    active ? "text-[#666]" : "text-[#112942] group-hover/check:text-[#112942]"
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

// ─── Active Filter Pills ──────────────────────────────────────────────────────

function ActiveFilters({
  ranges, types, skins,
  selectedRanges, selectedTypes, selectedSkins,
  onRemoveRange, onRemoveType, onRemoveSkin, onClearAll,
}: {
  ranges: FilterOption[]; types: FilterOption[]; skins: FilterOption[];
  selectedRanges: string[]; selectedTypes: string[]; selectedSkins: string[];
  onRemoveRange: (v: string) => void; onRemoveType: (v: string) => void;
  onRemoveSkin: (v: string) => void; onClearAll: () => void;
}) {
  const all = [
    ...selectedRanges.map((v) => ({ v, label: ranges.find((r) => r.value === v)?.label ?? v, remove: onRemoveRange })),
    ...selectedTypes.map((v) => ({ v, label: types.find((t) => t.value === v)?.label ?? v, remove: onRemoveType })),
    ...selectedSkins.map((v) => ({ v, label: skins.find((s) => s.value === v)?.label ?? v, remove: onRemoveSkin })),
  ];
  if (all.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {all.map(({ v, label, remove }) => (
        <button key={v} onClick={() => remove(v)}
          className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#112942]/20 text-[10px] tracking-widest uppercase text-[#112942] font-light hover:bg-[#112942] hover:text-white hover:border-[#112942] transition-all duration-150 group">
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      ))}
      <button onClick={onClearAll} className="text-[10px] tracking-widest uppercase text-[#999] font-light hover:text-[#112942] transition-colors ml-1">
        Clear all
      </button>
    </div>
  );
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

type SortKey = "default" | "name-asc" | "name-desc";

function sortProducts(products: Product[], sort: SortKey): Product[] {
  if (sort === "name-asc") return [...products].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name-desc") return [...products].sort((a, b) => b.name.localeCompare(a.name));
  return products;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShopFilters({ ranges, types, skins, products }: Props) {
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes]   = useState<string[]>([]);
  const [selectedSkins, setSelectedSkins]   = useState<string[]>([]);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [sort, setSort]                     = useState<SortKey>("default");

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) =>
    setter((prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]);

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      const rangeMatch = selectedRanges.length === 0 || selectedRanges.includes(p.range);
      const typeMatch  = selectedTypes.length  === 0 || selectedTypes.includes(p.productType);
      const skinMatch  = selectedSkins.length  === 0 || (p.skinType ?? []).some((s) => selectedSkins.includes(s));
      return rangeMatch && typeMatch && skinMatch;
    });
    return sortProducts(base, sort);
  }, [products, selectedRanges, selectedTypes, selectedSkins, sort]);

  const activeCount = selectedRanges.length + selectedTypes.length + selectedSkins.length;
  const clearAll = () => { setSelectedRanges([]); setSelectedTypes([]); setSelectedSkins([]); };

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23112942' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;

  const sidebar = (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#112942] font-medium">Filter By</p>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-[10px] tracking-widest uppercase text-[#999] font-light hover:text-[#112942] transition-colors">
            Clear ({activeCount})
          </button>
        )}
      </div>
      <FilterGroup title="Range"        options={ranges} selected={selectedRanges} onToggle={(v) => toggle(setSelectedRanges, v)} />
      <FilterGroup title="Product Type" options={types}  selected={selectedTypes}  onToggle={(v) => toggle(setSelectedTypes, v)} />
      <FilterGroup title="Skin Type"    options={skins}  selected={selectedSkins}  onToggle={(v) => toggle(setSelectedSkins, v)} />
    </>
  );

  const sortSelect = (mobile = false) => (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value as SortKey)}
      className={`text-[11px] font-light text-[#112942] border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#112942] transition-colors appearance-none cursor-pointer ${
        mobile ? "px-2.5 py-1.5 pr-6" : "px-3 py-1.5 pr-7"
      }`}
      style={{ backgroundImage: chevronSvg, backgroundRepeat: "no-repeat", backgroundPosition: `right ${mobile ? "6px" : "8px"} center`, backgroundSize: `${mobile ? "12px" : "14px"}` }}
    >
      <option value="default">Featured</option>
      <option value="name-asc">{mobile ? "A–Z" : "Name A–Z"}</option>
      <option value="name-desc">{mobile ? "Z–A" : "Name Z–A"}</option>
    </select>
  );

  const emptyState = (
    <div className="py-20 text-center">
      <p className="font-display text-[22px] text-[#112942]/30 font-normal mb-3">No products found</p>
      <p className="text-[13px] font-light text-[#999] mb-6">Try adjusting or clearing your filters.</p>
      <button onClick={clearAll} className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light border border-[#112942]/20 px-5 py-2 hover:bg-[#112942] hover:text-white transition-all duration-200">
        Clear filters
      </button>
    </div>
  );

  return (
    <>
      {/* ── Desktop ── */}
      <div className="hidden md:flex gap-10 lg:gap-16 items-start">
        <aside className="w-52 lg:w-60 shrink-0 sticky top-24 self-start">
          {sidebar}
        </aside>
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? emptyState : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-light text-[#666]">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-3">
            {sortSelect(true)}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center gap-2 border border-[#112942]/20 px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="10" y2="18" />
              </svg>
              Filter
              {activeCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#112942] text-white text-[9px] flex items-center justify-center">{activeCount}</span>
              )}
            </button>
          </div>
        </div>

        <ActiveFilters
          ranges={ranges} types={types} skins={skins}
          selectedRanges={selectedRanges} selectedTypes={selectedTypes} selectedSkins={selectedSkins}
          onRemoveRange={(v) => toggle(setSelectedRanges, v)}
          onRemoveType={(v) => toggle(setSelectedTypes, v)}
          onRemoveSkin={(v) => toggle(setSelectedSkins, v)}
          onClearAll={clearAll}
        />

        {mobileOpen && (
          <div className="border border-[#e8e8e8] p-5 mb-6 bg-white">
            {sidebar}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-2 py-2.5 bg-[#112942] text-white text-[10px] tracking-[0.15em] uppercase font-light hover:bg-[#1a3a5c] transition-colors duration-200"
            >
              Show {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-[20px] text-[#112942]/30 font-normal mb-3">No products found</p>
            <p className="text-[13px] font-light text-[#999] mb-5">Try adjusting your filters.</p>
            <button onClick={clearAll} className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light border border-[#112942]/20 px-5 py-2">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}