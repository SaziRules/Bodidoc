"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CarouselProduct = {
  id: string;
  slug: string;
  image: string;
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
};

type Props = {
  products: CarouselProduct[];
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mt-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
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

// Matches ProductGrid 4-col layout: (container - 3 gaps) / 4
const DESKTOP_CARD_WIDTH = "calc((min(100vw, 1440px) - 2 * clamp(1.5rem, 2.5vw, 4rem) - 3 * 2rem) / 4)";

function ProductCard({ product, width }: { product: CarouselProduct; width?: string }) {
  return (
    <div className="group flex flex-col shrink-0" style={{ width: width ?? DESKTOP_CARD_WIDTH }}>
      <Link
        href={`/shop/${product.slug}`}
        className="relative block w-full aspect-square bg-[#f7f7f7] overflow-hidden mb-3"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 25vw"
        />
        <button
          aria-label={`View ${product.name}`}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#112942] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-md cursor-pointer border-0"
          onClick={(e) => e.preventDefault()}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
      </Link>
      <p className="text-[11px] font-light tracking-widest uppercase text-[#112942]/50 mb-1">
        {product.category}
      </p>
      <Link
        href={`/shop/${product.slug}`}
        className="text-[14px] font-normal text-[#112942] leading-snug no-underline hover:underline"
      >
        {product.name}
      </Link>
      <StarRating rating={product.rating} count={product.reviewCount} />
    </div>
  );
}

// ─── Desktop: infinite CSS marquee ───────────────────────────────────────────

function DesktopMarquee({ products }: { products: CarouselProduct[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [...products, ...products];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = "running";
      }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: marquee ${products.length * 5.8}s linear infinite;
        }
      `}</style>
      <div ref={trackRef} className="carousel-track">
        {items.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </div>
  );
}

// ─── Mobile: single-card swipe ────────────────────────────────────────────────

function MobileSwipe({ products }: { products: CarouselProduct[] }) {
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const total = products.length;

  const goTo = useCallback(
    (i: number) => setIndex((i + total) % total),
    [total]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };
  const onTouchEnd = () => {
    if (dragOffset < -50) goTo(index + 1);
    else if (dragOffset > 50) goTo(index - 1);
    setDragOffset(0);
    setIsDragging(false);
  };

  // Mouse drag (for dev/testing convenience)
  const onMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startXRef.current);
  };
  const onMouseUp = () => {
    if (dragOffset < -50) goTo(index + 1);
    else if (dragOffset > 50) goTo(index - 1);
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Swipe track */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => {
          if (isDragging) { setDragOffset(0); setIsDragging(false); }
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-full shrink-0 px-0">
              <ProductCard product={product} width="100%" />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to product ${i + 1}`}
            className={`rounded-full border-0 transition-all duration-300 cursor-pointer ${
              i === index
                ? "w-5 h-2 bg-[#112942]"
                : "w-2 h-2 bg-[#112942]/20 hover:bg-[#112942]/40"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ProductCarousel({ products }: Props) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopMarquee products={products} />
      </div>
      <div className="block md:hidden">
        <MobileSwipe products={products} />
      </div>
    </>
  );
}