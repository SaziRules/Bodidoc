"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FAQItem = {
  q: string;
  a: string;
};

type Props = {
  faqs: FAQItem[];
};

// ─── Single item ──────────────────────────────────────────────────────────────

function FaqItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#112942]/25 group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-8 px-8 text-left cursor-pointer bg-transparent border-0 gap-6"
      >
        <span className="text-[15px] font-normal text-[#112942] leading-relaxed">
          {q}
        </span>
        <span
          className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border flex items-center justify-center text-sm leading-none transition-all duration-300 ${
            open
              ? "bg-[#112942] border-[#112942] text-white rotate-45"
              : "border-[#112942]/25 text-[#112942] group-hover:border-[#112942]"
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[13px] font-light text-[#666] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ─── FAQ list ─────────────────────────────────────────────────────────────────

export default function FAQAccordion({ faqs }: Props) {
  return (
    <div className="border-t border-[#112942]/25">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}