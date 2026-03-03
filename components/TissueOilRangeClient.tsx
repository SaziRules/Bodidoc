"use client";

import { useState } from "react";

const ingredients = [
  {
    name: "Evening Primrose Oil",
    description: "Known for its rich content of essential fatty acids, Evening Primrose Oil is often used for its soothing properties. It's recognised for supporting healthy skin by helping to maintain moisture and promoting a balanced skin appearance.",
    icon: (active: boolean) => (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className={`w-9 h-9 transition-opacity duration-200 ${active ? "opacity-80" : "opacity-20 hover:opacity-40"}`}>
        <circle cx="14" cy="14" r="3" />
        <ellipse cx="14" cy="7" rx="2.5" ry="4" />
        <ellipse cx="14" cy="21" rx="2.5" ry="4" />
        <ellipse cx="7" cy="14" rx="4" ry="2.5" />
        <ellipse cx="21" cy="14" rx="4" ry="2.5" />
        <ellipse cx="8.93" cy="8.93" rx="2.5" ry="4" transform="rotate(-45 8.93 8.93)" />
        <ellipse cx="19.07" cy="19.07" rx="2.5" ry="4" transform="rotate(-45 19.07 19.07)" />
        <ellipse cx="19.07" cy="8.93" rx="2.5" ry="4" transform="rotate(45 19.07 8.93)" />
        <ellipse cx="8.93" cy="19.07" rx="2.5" ry="4" transform="rotate(45 8.93 19.07)" />
      </svg>
    ),
  },
  {
    name: "Avocado Oil",
    description: "Avocado Oil is highly valued for its nourishing and hydrating qualities. Rich in vitamins A, D, and E, it's known for its ability to support the skin's natural barrier while leaving the skin feeling soft and replenished.",
    icon: (active: boolean) => (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className={`w-9 h-9 transition-opacity duration-200 ${active ? "opacity-80" : "opacity-20 hover:opacity-40"}`}>
        <path d="M14 4 C14 4 7 11 7 17 a7 7 0 0 0 14 0 C21 11 14 4 14 4z" />
        <circle cx="14" cy="17" r="3" />
      </svg>
    ),
  },
  {
    name: "Wheatgerm Oil",
    description: "Wheatgerm Oil is recognised for its high concentration of vitamin E and antioxidants. It's often used to help nourish and protect the skin, known for its moisturising properties and its potential to support overall skin health.",
    icon: (active: boolean) => (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className={`w-9 h-9 transition-opacity duration-200 ${active ? "opacity-80" : "opacity-20 hover:opacity-40"}`}>
        <line x1="14" y1="24" x2="14" y2="6" />
        <ellipse cx="14" cy="9" rx="3" ry="2" transform="rotate(-30 14 9)" />
        <ellipse cx="14" cy="9" rx="3" ry="2" transform="rotate(30 14 9)" />
        <ellipse cx="14" cy="13" rx="3" ry="2" transform="rotate(-30 14 13)" />
        <ellipse cx="14" cy="13" rx="3" ry="2" transform="rotate(30 14 13)" />
        <ellipse cx="14" cy="17" rx="3" ry="2" transform="rotate(-30 14 17)" />
        <ellipse cx="14" cy="17" rx="3" ry="2" transform="rotate(30 14 17)" />
      </svg>
    ),
  },
  {
    name: "Vitamin E Oil",
    description: "Vitamin E Oil is a widely used antioxidant known for its ability to protect the skin from environmental stressors. It's recognised for its nourishing and hydrating effects, often used to help maintain smooth and soft skin.",
    icon: (active: boolean) => (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className={`w-9 h-9 transition-opacity duration-200 ${active ? "opacity-80" : "opacity-20 hover:opacity-40"}`}>
        <circle cx="14" cy="14" r="10" />
        <line x1="10" y1="10" x2="10" y2="18" />
        <line x1="10" y1="10" x2="17" y2="10" />
        <line x1="10" y1="14" x2="16" y2="14" />
        <line x1="10" y1="18" x2="17" y2="18" />
      </svg>
    ),
  },
  {
    name: "Sunflower Oil",
    description: "Sunflower Oil is known for its light texture and high vitamin E content. It is recognised for its ability to hydrate the skin and help retain moisture, making it a great choice for maintaining smooth and healthy-looking skin.",
    icon: (active: boolean) => (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className={`w-9 h-9 transition-opacity duration-200 ${active ? "opacity-80" : "opacity-20 hover:opacity-40"}`}>
        <circle cx="14" cy="14" r="4" />
        <line x1="14" y1="3" x2="14" y2="6" /><line x1="14" y1="22" x2="14" y2="25" />
        <line x1="3" y1="14" x2="6" y2="14" /><line x1="22" y1="14" x2="25" y2="14" />
        <line x1="6.34" y1="6.34" x2="8.46" y2="8.46" /><line x1="19.54" y1="19.54" x2="21.66" y2="21.66" />
        <line x1="21.66" y1="6.34" x2="19.54" y2="8.46" /><line x1="8.46" y1="19.54" x2="6.34" y2="21.66" />
      </svg>
    ),
  },
];

export function TissueOilIngredients() {
  const [active, setActive] = useState(0);
  const current = ingredients[active];

  return (
    <section className="max-w-4xl mx-auto px-10 py-16 md:py-20">
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-0">

        <div className="md:w-56 shrink-0 flex flex-col gap-0 md:pr-8">
          <span className="font-display italic text-[#112942] leading-none" style={{ fontSize: "clamp(52px, 5.5vw, 72px)" }}>
            Key
          </span>
          <span className="text-[14px] font-light text-[#112942] tracking-wide mt-1">ingredients</span>
          <div className="mt-4 flex flex-col gap-0">
            {["formulated", "with 5", "beneficial", "oils!"].map((line) => (
              <span key={line} className="font-display font-normal text-[#112942] text-[17px] leading-snug">{line}</span>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-px bg-[#c8d4dc] self-stretch mx-2" />

        <div className="flex-1 md:pl-12 flex flex-col gap-6">
          <div>
            <h3 className="font-display font-normal text-[#112942] leading-snug mb-3" style={{ fontSize: "clamp(18px, 1.8vw, 24px)" }}>
              {current.name}
            </h3>
            <p className="text-[13px] font-light text-[#555] leading-relaxed">{current.description}</p>
          </div>
          <div className="flex items-center gap-6 md:gap-8 mt-2">
            {ingredients.map((ing, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={ing.name} title={ing.name} className="p-0 bg-transparent border-0 cursor-pointer text-[#112942] shrink-0">
                {ing.icon(active === i)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}