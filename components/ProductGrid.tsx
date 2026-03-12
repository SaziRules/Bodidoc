"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GridProduct = {
  id: string | number;
  slug: string;
  image: string;
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
};

type Props = {
  newArrivals: GridProduct[];
  bestSelling: GridProduct[];
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

function ProductCard({ product }: { product: GridProduct }) {
  return (
    <div className="group flex flex-col">
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
      </Link>

      <div className="flex flex-col">
        <p className="text-[12px] font-light tracking-wide text-[#112942] mb-1">
          {product.category}
        </p>
        <Link
          href={`/shop/${product.slug}`}
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

export default function ProductGrid({ newArrivals, bestSelling }: Props) {
  const [activeTab, setActiveTab] = useState<"new" | "best">("new");

  const products = activeTab === "new" ? newArrivals : bestSelling;

  return (
    <section className="w-full py-12 px-6 md:px-10 lg:px-16">
      <h2 className="font-display text-center text-[28px] md:text-[42px] font-normal tracking-wide text-[#112942] mb-8">
        YOUR SKIN&apos;S NEW BEST FRIEND.
      </h2>

      <div role="tablist" className="flex items-center justify-center gap-8 mb-10">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-360 mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}