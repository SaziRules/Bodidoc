"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type UseCase = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Props = {
  /** Large italic word on the left, e.g. "All" */
  headingWord: string;
  /** Smaller text below the large word, e.g. "-in-one" */
  headingSubWord: string;
  /** Stacked lines below, e.g. ["Versatile", "everyday", "care!"] */
  taglines: string[];
  tabs: UseCase[];
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AllInOneSection({
  headingWord,
  headingSubWord,
  taglines,
  tabs,
}: Props) {
  const [active, setActive] = useState(0);
  const current = tabs[active];

  return (
    <div className="max-w-4xl mx-auto px-10 py-16 md:py-20">
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-0">

        {/* ── Left: heading ── */}
        <div className="md:w-56 shrink-0 flex flex-col gap-0.5 md:pr-8">
          <span
            className="font-display italic text-[#112942] leading-none"
            style={{ fontSize: "clamp(72px, 7vw, 96px)" }}
          >
            {headingWord}
          </span>
          <span className="text-[14px] font-light text-[#112942] tracking-wide">
            {headingSubWord}
          </span>
          <div className="mt-4 flex flex-col gap-0">
            {taglines.map((line) => (
              <span
                key={line}
                className="font-display font-normal text-[#112942] text-[19px] leading-snug"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div className="hidden md:block w-px bg-[#c8d4dc] self-stretch mx-2" />

        {/* ── Right: tab content ── */}
        <div className="flex-1 md:pl-12 flex flex-col gap-8">

          {/* Active tab content */}
          <div>
            <h3
              className="font-display font-medium text-[#112942] leading-snug mb-2"
              style={{ fontSize: "clamp(20px, 2vw, 27px)" }}
            >
              {current.title}
            </h3>
            <p className="text-[14px] font-light text-[#555] leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Icon tabs */}
          <div className="flex items-center gap-8 md:gap-12">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={tab.title}
                title={tab.title}
                className={`p-0 bg-transparent border-0 cursor-pointer text-[#112942] shrink-0 transition-opacity duration-200 ${
                  active === i ? "opacity-80" : "opacity-20 hover:opacity-45"
                }`}
              >
                {tab.icon}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}