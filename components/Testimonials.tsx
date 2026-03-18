"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    text: "About a month ago I bought this product at Pep. It was my first time seeing it and I must say it was the best decision yet. This product loves my skin in this hot weather. All pigmentation gone and my skin is smooth and glowing. I just love it. I would like to try the tissue oil as well but I can't find it anywhere. Keep up the good work.",
    product: "Tissue Oil Cream with Urea - 500ml",
    name: "Charmaine N. Komane",
  },
  {
    id: 2,
    text: "This product has been my fighter throughout winter. Even now I love how thick it is. The scent is not overpowering and it leaves you feeling moisture all the time, and I can tell the difference with other brands. I love it so much.",
    product: "Tissue Oil Cream with Urea - 500ml",
    name: "Dineo Glenda",
  },
  {
    id: 3,
    text: "I've only used this product for about 4 days and I'm already loving it. That's how effective it is on the skin. My newly found day to day best friend. Take it from me: you'll thank me later.",
    product: "Tissue Oil Cream - 500ml",
    name: "Nompumelelo Gumede",
  },
  {
    id: 4,
    text: "This product has helped me a lot with this pregnancy. My stretch marks were a huge issue. I was not comfortable showing skin, but now you hardly notice any marks. My skin is glowing. Thank you so much. I've been struggling to find the oil and hope to find it soon.",
    product: "Tissue Oil Cream - 500ml",
    name: "Nolwazi",
  },
  {
    id: 5,
    text: "I swear, I struggled with my daughter's skin for 6 years. All other brands would only work for one season but ever since I started using Bodidoc her skin doesn't dry and she doesn't even get any allergic reactions from it. For the first time as a mother, I am at ease. Thank you so much for giving this mother one less thing to worry about.",
    product: "Tissue Oil Cream - 500ml",
    name: "Dashelley",
  },
  {
    id: 6,
    text: "Started using this product last week. I can feel a massive difference on my skin. The consistency is so smooth and it smells amazing. LOVE LOVE LOVE. I would recommend Bodidoc over and over again!",
    product: "Tissue Oil Cream with Urea - 500ml",
    name: "Zandalee",
  },
];

const AUTOPLAY_MS = 5000;

// ─── Chevron Icons ────────────────────────────────────────────────────────────

const ChevronLeft = () => (
  <svg viewBox="0 0 1000 1000" width="18" height="18" fill="currentColor">
    <path d="M646 125C629 125 613 133 604 142L308 442C296 454 292 471 292 487 292 504 296 521 308 533L604 854C617 867 629 875 646 875 663 875 679 871 692 858 704 846 713 829 713 812 713 796 708 779 692 767L438 487 692 225C700 217 708 204 708 187 708 171 704 154 692 142 675 129 663 125 646 125Z" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 1000 1000" width="18" height="18" fill="currentColor">
    <path d="M696 533C708 521 713 504 713 487 713 471 708 454 696 446L400 146C388 133 375 125 354 125 338 125 325 129 313 142 300 154 292 171 292 187 292 204 296 221 308 233L563 492 304 771C292 783 288 800 288 817 288 833 296 850 308 863 321 871 338 875 354 875 371 875 388 867 400 854L696 533Z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = testimonials.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!paused) timerRef.current = setTimeout(next, AUTOPLAY_MS);
  }, [next, paused]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, resetTimer]);

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center py-5">

        {/* Heading */}
        <h2 className="font-display text-[26px] md:text-[32px] font-semibold text-[#112942] mb-4">
          Taking Care of You, And Your Skin
        </h2>
        <p className="text-[14px] md:text-[14px] font-normal text-[#2f2f2f] leading-5.25 mb-12 max-w-xl mx-auto">
          Bodidoc has become a cult favourite by doing what we do best – taking care of you. Read real reviews from customers who&apos;ve made us part of their routine.
        </p>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 text-[#112942] hover:text-[#112942] transition-colors duration-200 cursor-pointer bg-transparent border-0 p-1 z-10"
          >
            <ChevronLeft />
          </button>

          {/* Slide rail */}
          <div className="overflow-hidden ">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0">
                  <blockquote>
                    <p className="text-[15px] md:text-[15px] font-light text-[#112942] leading-5.75 mb-3 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <footer>
                      <p className="text-[14px] font-display font-semibold text-[#112942] tracking-normal uppercase mb-1">
                        {t.product}
                      </p>
                      <p className="text-[14px] font-display font-normal text-[#333] tracking-wide">
                        {t.name}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 text-[#112942] hover:text-[#112942] transition-colors duration-200 cursor-pointer bg-transparent border-0 p-1 z-10"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
}