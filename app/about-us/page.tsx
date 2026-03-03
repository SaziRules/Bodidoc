"use client";

import Link from "next/link";
import type { Metadata } from "next";


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-[#112942] overflow-hidden">

        {/* Ghost watermark */}
        <div className="absolute inset-0 flex items-end justify-end pr-0 pb-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display italic font-normal text-white/4.5 leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(120px, 26vw, 340px)" }}
          >
            Us
          </span>
        </div>

        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute top-0 bottom-0 w-px bg-white/4" style={{ left: "33.333%" }} />
          <div className="absolute top-0 bottom-0 w-px bg-white/4" style={{ left: "66.666%" }} />
        </div>

        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-14 md:pt-15 md:pb-20">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <Link href="/" className="text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors font-light">
              Home
            </Link>
            <span className="text-white/20 text-[10px]">/</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 font-light">About Us</span>
          </div>

          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-light mb-5">
              Bodidoc — Our Story
            </p>
            <h1
              className="font-display font-normal text-white leading-none mb-0"
              style={{ fontSize: "clamp(52px, 10vw, 112px)" }}
            >
              About <em className="italic">Us</em>
            </h1>
          </div>

        </div>
      </div>

      {/* ── Thin accent line ── */}
      <div className="h-1 w-full bg-linear-to-r from-[#112942] via-[#112942]/30 to-transparent" />

      {/* ── Main content ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Left column: paragraphs ── */}
          <div className="lg:col-span-7 flex flex-col gap-8">

            {/* Paragraph 1 */}
            <p className="text-[15px] md:text-[16px] font-light text-[#222] leading-[1.9]">
              Life can get pretty hectic – work, social life, kids, bills… you&apos;ve clearly got enough to worry about without having to worry about your skin on top of it all. That&apos;s where we come in. Our job is to make sure you are confident in your skin, and that your everyday skincare needs are taken care of so that you can focus on the rest. We create dermatologically tested products that contribute towards glowing skin – a mark of good skin health that provide your skin with the nourishment it needs to get through the day.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-[#112942]/30" />
              <div className="w-2 h-2 rounded-full bg-[#112942]/15" />
              <div className="w-8 h-px bg-[#112942]/30" />
            </div>

            {/* Paragraph 2 */}
            <p className="text-[15px] md:text-[16px] font-light text-[#222] leading-[1.9]">
              Bodidoc consists of accessible and affordable daily skincare solutions, formulated so that you can stop worrying about your skincare regimen, but also truly love the skin you&apos;re in. Our ethos consists of celebrating our bodies for what they do for us every day. However, we also know that sometimes, skincare regimes can be expensive, adding another stress to your life. Good skincare shouldn&apos;t cost the earth – not when it comes to your wallet or the environment. As a proudly South African business, we care about producing quality products as well as the beautiful people who use them.
            </p>

          </div>

          {/* ── Right column: mission pull-quote ── */}
          <div className="lg:col-span-5 flex items-center">
            <div className="relative w-full border-l-2 border-[#112942] pl-8 md:pl-10 py-2">

              {/* Large opening quote mark */}
              <span
                className="absolute -top-4 -left-2 font-display text-[#112942]/10 leading-none select-none"
                style={{ fontSize: "clamp(80px, 10vw, 120px)" }}
              >
                &ldquo;
              </span>

              <p
                className="font-display font-normal text-[#112942] leading-snug relative z-10"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
              >
                Bodidoc is just one skincare brand, yet our mission is simple:
              </p>
              <p
                className="font-display italic font-normal text-[#112942] leading-snug mt-3 relative z-10"
                style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
              >
                to give you a solution to your skincare problems.
              </p>

              {/* Bottom accent */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-6 h-px bg-[#112942]/40" />
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light">Our Mission</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Stats / values bar ── */}
      <div className="border-t border-b border-[#eaeaea] bg-[#fafafa]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { value: "100%", label: "South African" },
              { value: "Derm", label: "Tested & Approved" },
              { value: "9/10", label: "Women Agree" },
              { value: "2+", label: "Ranges & Growing" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <span
                  className="font-display font-normal text-[#112942] leading-none"
                  style={{ fontSize: "clamp(28px, 4vw, 42px)" }}
                >
                  {value}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-[#112942]/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Flip card grid — hidden on mobile, slide-from-bottom animation ── */}
      <style>{`
        .flip-card { perspective: 1200px; }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card:hover .flip-card-inner { transform: rotateX(-180deg); }
        .flip-card-front, .flip-card-back {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .flip-card-back { transform: rotateX(180deg); }
      `}</style>

      <div className="hidden md:block">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flip-card aspect-square cursor-pointer">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/01/WEBSITE-BODIDOC-2025-3.png"
                      alt="Bodidoc"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="flip-card-back">
                    <img
                      src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/01/WEBSITE-BODIDOC-20259.png"
                      alt="Bodidoc"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}