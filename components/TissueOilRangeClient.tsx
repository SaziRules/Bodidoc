"use client";

import { useState } from "react";

const ingredients = [
  {
    name: "Evening Primrose Oil",
    description: "Known for its rich content of essential fatty acids, Evening Primrose Oil is often used for its soothing properties. It's recognised for supporting healthy skin by helping to maintain moisture and promoting a balanced skin appearance.",
    icon: "/icons/eveningPrimrose.svg",
  },
  {
    name: "Avocado Oil",
    description: "Avocado Oil is highly valued for its nourishing and hydrating qualities. Rich in vitamins A, D, and E, it's known for its ability to support the skin's natural barrier while leaving the skin feeling soft and replenished.",
    icon: "/icons/avo.svg",
  },
  {
    name: "Wheatgerm Oil",
    description: "Wheatgerm Oil is recognised for its high concentration of vitamin E and antioxidants. It's often used to help nourish and protect the skin, known for its moisturising properties and its potential to support overall skin health.",
    icon: "/icons/wheat.svg",
  },
  {
    name: "Vitamin E Oil",
    description: "Vitamin E Oil is a widely used antioxidant known for its ability to protect the skin from environmental stressors. It's recognised for its nourishing and hydrating effects, often used to help maintain smooth and soft skin.",
    icon: "/icons/vite.svg",
  },
  {
    name: "Sunflower Oil",
    description: "Sunflower Oil is known for its light texture and high vitamin E content. It is recognised for its ability to hydrate the skin and help retain moisture, making it a great choice for maintaining smooth and healthy-looking skin.",
    icon: "/icons/sunflower.svg",
  },
];

export function TissueOilIngredients() {
  const [active, setActive] = useState(0);
  const current = ingredients[active];

  return (
    <section className="max-w-4xl mx-auto px-10 py-16 md:py-20">
      <div className="flex flex-col md:flex-row items-start gap-10 md:gap-0">

        {/* --- Left Header --- */}
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

        {/* --- Right Content --- */}
        <div className="flex-1 md:pl-12 flex flex-col gap-6">
          <div className="min-h-35 md:min-h-30">
            <h3 className="font-display  font-medium text-[#112942] leading-snug mb-3" style={{ fontSize: "clamp(18px, 1.8vw, 27px)" }}>
              {current.name}
            </h3>
            <p className="text-[14px] font-normal text-[#112942] leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="flex items-center gap-6 md:gap-8 mt-2">
            {ingredients.map((ing, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                aria-label={ing.name} 
                title={ing.name} 
                className={`p-0 bg-transparent border-0 cursor-pointer shrink-0 transition-opacity duration-200 ${
                  active === i ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
              >
                <img 
                  src={ing.icon} 
                  alt="" 
                  className="w-11 h-11" 
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}