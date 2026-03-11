"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = {
  id: number;
  slug: string;
  image: string;
  category: string;
  name: string;
  rating: number;   // 0–5, supports 0.5
  reviewCount: number;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const newArrivals: Product[] = [
  {
    id: 612,
    slug: "bodidoc-tissue-oil-jelly-with-aloe-vera-for-all-skin-types",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/7-1-600x600.png",
    category: "PETROLEUM JELLY",
    name: "Bodidoc Tissue Oil Jelly with Aloe Vera for All Skin Types",
    rating: 4,
    reviewCount: 3,
  },
  {
    id: 613,
    slug: "bodidoc-tissue-oil-for-all-skin-types",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/8-600x600.png",
    category: "BODY OIL",
    name: "Bodidoc Tissue Oil for All Skin Types",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 614,
    slug: "bodidoc-aqueous-cream-for-all-skin-types",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/9-600x600.png",
    category: "BODY CREAM",
    name: "Bodidoc Aqueous Cream for All Skin Types",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 611,
    slug: "bodidoc-tissue-oil-jelly-for-all-skin-types",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/6-600x600.png",
    category: "PETROLEUM JELLY",
    name: "Bodidoc Tissue Oil Jelly for All Skin Types",
    rating: 4.5,
    reviewCount: 2,
  },
];

const bestSelling: Product[] = [
  {
    id: 608,
    slug: "bodidoc-tissue-oil-cream-with-urea-for-dry-skin",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/2-600x600.png",
    category: "BODY CREAM",
    name: "Bodidoc Tissue Oil Cream with Urea for Dry Skin",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 598,
    slug: "bodidoc-tissue-oil-cream-for-normal-skin",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/3-600x600.png",
    category: "BODY CREAM",
    name: "Bodidoc Tissue Oil Cream for Normal Skin",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 610,
    slug: "bodidoc-tissue-oil-lotion-for-normal-skin",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/4-600x600.png",
    category: "BODY LOTION",
    name: "Bodidoc Tissue Oil Lotion for Normal Skin",
    rating: 0,
    reviewCount: 0,
  },
  {
    id: 609,
    slug: "bodidoc-tissue-oil-lotion-with-urea-for-dry-skin",
    image: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/5-600x600.png",
    category: "BODY LOTION",
    name: "Bodidoc Tissue Oil Lotion with Urea for Dry Skin",
    rating: 0,
    reviewCount: 0,
  },
];

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
  return (
    <div className="group flex flex-col">

      {/* Image container with cart badge */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block w-full aspect-square bg-[#f7f7f7] overflow-hidden mb-3"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />

        {/* Cart icon badge — appears on hover */}
        
      </Link>

      {/* Text content */}
      <div className="flex flex-col">
        <p className="text-[12px] font-light tracking-wide text-[#112942] mb-1">
          {product.category}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="text-[15px] font-normal text-[#112942] leading-snug no-underline hover:underline"
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} />
      </div>

    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<"new" | "best">("new");

  const products = activeTab === "new" ? newArrivals : bestSelling;

  return (
    <section className="w-full py-12 px-6 md:px-10 lg:px-16">

      {/* Section heading */}
      <h2 className="font-display text-center text-[28px] md:text-[42px] font-normal tracking-wide text-[#112942] mb-8">
        YOUR SKIN&apos;S NEW BEST FRIEND.
      </h2>

      {/* Tab switcher */}
      <div
        role="tablist"
        className="flex items-center justify-center gap-8 mb-10"
      >
        {(["new", "best"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`
              text-[15px] font-semibold tracking-wide uppercase pb-1
              border-b-2 transition-colors duration-200 cursor-pointer
              bg-transparent border-x-0 border-t-0
              ${activeTab === tab
                ? "text-[#112942] border-[#112942]"
                : "text-[#999] border-transparent hover:text-[#112942]"
              }
            `}
          >
            {tab === "new" ? "New Arrivals" : "Best Selling"}
          </button>
        ))}
      </div>

      {/* Product grid — 4 cols desktop, 2 cols mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-360 mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}