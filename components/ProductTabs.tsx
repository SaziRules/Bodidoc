"use client";

import { useState } from "react";
import type { Product } from "@/sanity/lib/sanity";

const tabs = [
  { id: "benefits", label: "Benefits" },
  { id: "for-me", label: "Is It For Me?" },
  { id: "proven", label: "Proven Results" },
  { id: "ingredients", label: "Ingredients" },
];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState("benefits");

  return (
    <div>
      {/* Tab nav */}
      <div className="flex gap-0 border-b border-[#e8e8e8] mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-5 py-3 text-[11px] tracking-[0.15em] uppercase font-light whitespace-nowrap border-b-2 transition-all duration-150 ${
              active === tab.id
                ? "border-[#112942] text-[#112942]"
                : "border-transparent text-[#999] hover:text-[#112942]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="max-w-2xl">

        {active === "benefits" && product.benefits && (
          <ul className="flex flex-col gap-5">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-5 h-5 rounded-full bg-[#112942] flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div>
                  <p className="text-[14px] font-normal text-[#112942] mb-0.5">{b.heading}</p>
                  {b.detail && (
                    <p className="text-[13px] font-light text-[#666] leading-relaxed">{b.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {active === "for-me" && (
          <p className="text-[14px] font-light text-[#555] leading-relaxed whitespace-pre-line">
            {product.isItForMe ?? "Information coming soon."}
          </p>
        )}

        {active === "proven" && (
          <p className="text-[14px] font-light text-[#555] leading-relaxed whitespace-pre-line">
            {product.provenResults ?? "Information coming soon."}
          </p>
        )}

        {active === "ingredients" && (
          <p className="text-[13px] font-light text-[#777] leading-loose">
            {product.ingredients ?? "Information coming soon."}
          </p>
        )}

      </div>
    </div>
  );
}