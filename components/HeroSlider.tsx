"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Slide data ───────────────────────────────────────────────────────────────

const slides = [
  {
    id: 1,
    desktop: "/images/herp-1-desktop.png",
    mobile:  "/images/hero-1-mobile.webp",
    alt:     "Bodidoc Tissue Oil Cream with Urea",
    url:     "/shop/bodidoc-tissue-oil-jelly-with-aloe-vera-for-all-skin-types",
  },
  {
    id: 2,
    desktop: "/images/hero-2-desktop.png",
    mobile:  "/images/hero-2-mobile.webp",
    alt:     "Bodidoc Tissue Oil Jelly Aloe Vera",
    url:     "/shop/bodidoc-tissue-oil-cream-with-urea-for-dry-skin",
  },
  {
    id: 3,
    desktop: "/images/hero-3-desktop.webp",
    mobile:  "/images/hero-3-mobile.webp",
    alt:     "Bodidoc Tissue Oil Range",
    url:     "/shop/tissue-oil-range",
  },
  {
    id: 4,
    desktop: "/images/hero-2-desktop.png",
    mobile:  "/images/hero-4-mobile.webp",
    alt:     "Bodidoc Aqueous Cream Range",
    url:     "/shop/bodidoc-tissue-oil-cream-with-urea-for-dry-skin",
  },
];

const AUTOPLAY_MS = 5000;

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  return (
    <section aria-label="Hero banner" className="w-full">

      {/* ── Slider track ── */}
      <div className="w-full overflow-hidden leading-none">

        {/* Rail: all slides side-by-side, shifted left by current index */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.id} aria-hidden={i !== current} className="w-full shrink-0">

              <Link href={slide.url} className="block w-full">
                {/* Desktop */}
                <div className="hidden md:block w-full">
                  <Image
                    src={slide.desktop}
                    alt={slide.alt}
                    width={1920}
                    height={500}
                    className="w-full h-auto block align-bottom"
                    priority={i === 0}
                    draggable={false}
                    spellCheck={false}
                  />
                </div>

                {/* Mobile */}
                <div className="block md:hidden w-full">
                  <Image
                    src={slide.mobile}
                    alt={slide.alt}
                    width={768}
                    height={600}
                    className="w-full h-auto block align-bottom"
                    priority={i === 0}
                    draggable={false}
                    spellCheck={false}
                  />
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>

      {/* ── Dot navigation ── */}
      <div
        role="tablist"
        aria-label="Slide navigation"
        className="flex items-center justify-center gap-2 py-3"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { goTo(i); }}
            className={`
              w-2.5 h-2.5 rounded-full border transition-all duration-300 cursor-pointer p-0
              ${i === current
                ? "bg-[#112942] border-[#112942] scale-110"
                : "bg-transparent border-[#112942]/40 hover:border-[#112942]/70"
              }
            `}
          />
        ))}
      </div>

    </section>
  );
}