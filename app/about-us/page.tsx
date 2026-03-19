"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="w-full bg-white font-sans selection:bg-[#112942] selection:text-white">

      {/* ── SECTION 1: TOP PART (Elementor ID: 2068f90) ── */}
      <section className="w-full bg-white pt-24 pb-20 overflow-hidden">
        <div className="max-w-300 mx-auto px-6">
          {/* Heading (Widget ID: 0891c79) */}
          <div className="text-center">
            <h2 className="font-display text-[42px] text-[#112942] leading-tight font-normal">
              About <em className="italic font-display font-normal">Us</em>
            </h2>
          </div>

          {/* Text Editor (Widget ID: 19bace5) */}
          <div className="max-w-250 mx-auto">
            <div className="flex flex-col gap-8 text-center text-[14px] font-normal text-[#112942] leading-5.25">
              <p>
                Life can get pretty hectic – work, social life, kids, bills… you’ve clearly got
                enough to worry about without having to worry about your skin on top of it all.
                That’s where we come in. Our job is to make sure you are confident in your skin,
                and that your everyday skincare needs are taken care of so that you can focus
                on the rest. We create dermatologically tested products that contribute towards
                glowing skin – a mark of good skin health that provide your skin with the
                nourishment it needs to get through the day.
              </p>
              <p>
                Bodidoc consists of accessible and affordable daily skincare solutions,
                formulated so that you can stop worrying about your skincare regimen,
                but also truly love the skin you’re in. Our ethos consists of celebrating
                our bodies for what they do for us every day. However, we also know that
                sometimes, skincare regimes can be expensive, adding another stress to
                your life. Good skincare shouldn’t cost the earth – not when it comes to
                your wallet or the environment. As a proudly South African business, we
                care about producing quality products as well as the beautiful people
                who use them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Mission Slider (elementor-c6beaef) ── */}
      <div className="w-full bg-[#112942] py-24 md:py-32 overflow-hidden text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-fadeInUp">
            <p className=" text-[19px] leading-6.75 font-normal italic opacity-90">
              Bodidoc is just one skincare brand, yet our mission is simple:
              <br />
              to give you a solution to your skincare problems.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Image Slide-Up Grid (Responsive 2x2 on Mobile, 4-col on Desktop) ── */}
      <div className="w-full bg-white py-16">
        <div className="max-w-300 mx-auto px-4">
          {/* Mobile: 2 columns | Tablet/Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {[
              { bottom: "firstBottom.png", top: "firstTop.png", alt: "Tissue Oil" },
              { bottom: "secondBottom.png", top: "secondTop.png", alt: "Body Lotion" },
              { bottom: "thirdBottom.png", top: "thirdTop.png", alt: "Body Creams" },
              { bottom: "fourthBottom.png", top: "FourthTop.png", alt: "Speciality" },
            ].map((card, index) => (
              <div key={index} className="group relative cursor-pointer overflow-hidden">
                {/* Bottom Image - Dictates the natural height */}
                <img
                  src={`/images/about/${card.bottom}`}
                  alt={card.alt}
                  className="w-full h-auto block"
                />

                {/* Top Image - Slides up to match bottom image height exactly */}
                <div className="absolute inset-0 z-20 translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                  <img
                    src={`/images/about/${card.top}`}
                    alt={`${card.alt} Reveal`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}