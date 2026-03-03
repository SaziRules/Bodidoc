"use client";

import { useState } from "react";

type FAQ = { q: string; a: string };

export default function AqueousRangeClient({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto flex flex-col divide-y divide-[#e8e8e8] border-t border-b border-[#e8e8e8]">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-6 group"
          >
            <span className={`text-[15px] font-normal leading-snug transition-colors duration-200 ${open === i ? "text-[#112942]" : "text-[#555] group-hover:text-[#112942]"}`}>
              {faq.q}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#112942"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-3.5 h-3.5 shrink-0 opacity-30 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {open === i && (
            <p className="pb-5 text-[14px] font-normal text-[#888] leading-relaxed">
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}