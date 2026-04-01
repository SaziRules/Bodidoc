"use client";

import { useState } from "react";
import type { Product } from "@/sanity/lib/sanity";

const tabs = [
  { id: "benefits", label: "Benefits" },
  { id: "for-me", label: "Is It For Me?" },
  { id: "proven", label: "Proven Results" },
  { id: "ingredients", label: "Ingredients" },
];

function TabContent({ product, id }: { product: Product; id: string }) {
  return (
    <>
      {/* --- Benefits Section --- */}
{id === "benefits" && product.benefits && (
  <ul className="flex flex-col gap-6 max-w-2xl">
    {product.benefits.map((b, i) => (
      <li key={i} className="flex items-start gap-3">
        {/* Render a simple Checkmark instead of a rounded circle */}
        {b.heading && (
          <span className="shrink-0 mt-1">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#112942" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
        <div>
          {b.heading && (
            <h4 className="text-[16px] font-semibold text-[#4a4a4a] leading-tight mb-1">
              {b.heading}
            </h4>
          )}
          {b.detail && (
            <p className="text-[13px] font-normal text-[#4a4a4a] leading-5">
              {b.detail}
            </p>
          )}
        </div>
      </li>
    ))}
  </ul>
)}

      {id === "for-me" && (
        <p className="text-[13px] font-normal text-[#2f2f2f] leading-5.25 whitespace-pre-line max-w-2xl">
          {product.isItForMe ?? "Information coming soon."}
        </p>
      )}

      {/* --- Proven Results Section (Matches structure but NO bullets) --- */}
      {id === "proven" && (
        <div className="max-w-2xl">
          {product.provenResults && Array.isArray(product.provenResults) ? (
            <div className="flex flex-col gap-5">
              {product.provenResults.map((res, i) => (
                <div key={i} className="flex flex-col">
                  {res.heading && (
                    <p className="text-[14px] font-semibold text-[#112942] mb-0.5">
                      {res.heading}
                    </p>
                  )}
                  {res.detail && (
                    <p className="text-[13px] font-normal text-[#2f2f2f] leading-5.25">
                      {res.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] font-normal text-[#2f2f2f]">
              {typeof product.provenResults === "string" 
                ? product.provenResults 
                : "Information coming soon."}
            </p>
          )}
        </div>
      )}

      {id === "ingredients" && (
        <p className="text-[13px] font-normal text-[#2f2f2f] leading-loose max-w-2xl">
          {product.ingredients ?? "Information coming soon."}
        </p>
      )}
    </>
  );
}

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState("benefits");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) =>
    setOpenAccordion((prev) => (prev === id ? null : id));

  return (
    <>
      {/* ── Mobile: accordion ── */}
      <div className="block md:hidden border-t border-[#121212]/30">
        {tabs.map((tab) => {
          const isOpen = openAccordion === tab.id;
          return (
            <div key={tab.id} className="border-b border-[#121212]/30">
              <button
                onClick={() => toggleAccordion(tab.id)}
                className="w-full flex items-center justify-between py-6 text-[22px] tracking-widest uppercase bg-transparent border-0 cursor-pointer text-left"
              >
                <span className={isOpen ? "font-bold text-[#112942]" : "font-medium text-[#aaa]"}>
                  {tab.label}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-6 h-6 text-[#aaa] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="pb-5">
                  <TabContent product={product} id={tab.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Desktop: sidebar layout ── */}
      <div className="hidden md:flex gap-0">
        <div className="flex flex-col shrink-0 w-48 border-r border-[#e8e8e8] pt-6 pr-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`text-left py-3 text-[12px] tracking-normal uppercase transition-colors duration-150 bg-transparent border-0 cursor-pointer ${
                active === tab.id
                  ? "font-bold text-[#112942]"
                  : "font-medium text-[#aaa] hover:text-[#112942]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0 pt-6 pl-12">
          <TabContent product={product} id={active} />
        </div>
      </div>
    </>
  );
}