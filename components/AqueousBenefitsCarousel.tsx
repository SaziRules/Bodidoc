"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useRef } from "react";

// ─── Slide data — exact content from live site ────────────────────────────────

const slides = [
  {
    heading: "SLS Free",
    headingItalic: "Free",
    headingPrefix: "SLS ",
    body: "Bodidoc Aqueous Cream is free from Sodium Lauryl Sulfate (SLS), a common ingredient in many soaps and cleansers that can be harsh on the skin. SLS can strip away natural oils, leaving your skin feeling dry or irritated. By being SLS-free, this product cleanses gently while preserving your skin's natural moisture and softness.",
  },
  {
    heading: "Fragrance Free",
    headingItalic: "Free",
    headingPrefix: "Fragrance ",
    body: "Many skin sensitivities are irritated by fragrances, which is why our Aqueous Cream is completely fragrance-free. We believe that your skin deserves the gentlest care, and avoiding fragrance helps reduce the risk of irritation or allergic reactions. It's always better to keep things simple, especially for those with sensitive skin.",
  },
  {
    heading: "Dermatologically Tested",
    headingPrefix: "Dermatologically Tested",
    body: "Every product is dermatologically tested, meaning it's been carefully evaluated by skin experts to ensure it's safe for all skin types. Whether you have dry, oily, or sensitive skin, you can trust that our product is gentle, effective, and safe for daily use.",
  },
  {
    heading: "24-Hour Moisture",
    headingPrefix: "24-Hour Moisture",
    body: "Bodidoc Aqueous Cream doesn't just moisturise your skin for a few hours—it provides long-lasting hydration, keeping your skin soft and nourished for up to 24 hours. Whether you're at work, playing, or sleeping, you can count on it to keep your skin feeling smooth and hydrated all day long.",
  },
  {
    heading: "Safe for Sensitive Skin",
    headingPrefix: "Safe for Sensitive Skin",
    body: "If you have sensitive skin, you know how important it is to use products that won't cause irritation. Our Aqueous Cream is designed to be ultra-gentle, with ingredients that are kind to delicate skin. It soothes and hydrates without any harsh chemicals or fragrances, providing the comfort your skin deserves.",
  },
  {
    heading: "Safe for Babies",
    headingPrefix: "Safe for Babies",
    body: "We understand how delicate and sensitive baby skin can be, which is why our Aqueous Cream is safe for even the littlest ones. With its gentle formula, it helps keep baby's skin moisturised & protected without any worry of irritation. It's the perfect choice for the whole family, from babies to adults.",
  },
];

// Headings with italic suffix — matches live site HTML (<h2>SLS <i>Free</i></h2>)
function SlideHeading({ item }: { item: (typeof slides)[number] }) {
  if (item.headingItalic) {
    return (
      <h2 className="font-display font-medium text-[#112942] text-[27px] leading-6.75">
        {item.headingPrefix}
        <em className="italic">{item.headingItalic}</em>
      </h2>
    );
  }
  return (
    <h2 className="font-display font-medium text-[#112942] text-[27px] leading-6.75">
      {item.headingPrefix}
    </h2>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AqueousBenefitsCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: false,
      slidesToScroll: 1,
    },
    [autoplay.current]
  );

  const onPointerEnter = useCallback(() => autoplay.current.stop(), []);
  const onPointerLeave = useCallback(() => autoplay.current.play(), []);

  return (
    <section
      aria-label="Product benefits"
      className="w-full overflow-hidden"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        ref={emblaRef}
        className="overflow-visible"
        style={{
          paddingLeft: "max(1.5rem, calc((100vw - 1440px) / 2 + 2.5rem))",
        }}
      >
        {/* Fix for uniform spacing (from previous step) */}
        <div className="flex -ml-4.25">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="shrink-0 pl-4.25 w-[calc(100vw-80px)] md:w-[calc(50vw-40px)] lg:w-[calc(40vw-40px)] max-w-150"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
            >
              
              {/* Card Container - must be 'relative' for the background to position correctly */}
              <div className="relative h-full min-h-40 flex flex-col gap-4 p-8 md:p-6 overflow-hidden">
                
                {/* ─── NEW: Faint Background Layer ────────────────── */}
                <div 
                  className="absolute inset-0 z-0 opacity-50" // Adjust 'opacity-40' to make it more or less faint
                  style={{
                    backgroundImage: "url('/carousel-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden="true"
                />
                {/* ───────────────────────────────────────────────── */}

                {/* Text Content - Must use 'relative' and 'z-10' to stack on top of the background */}
                <div className="relative z-10">
                  <SlideHeading item={slide} />
                </div>
                <p className="relative z-10 text-[14px] font-light text-[#2f2f2f] leading-5.25">
                  {slide.body}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}