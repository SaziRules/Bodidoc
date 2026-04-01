// components/moments/ArticleBeyondTheBin.tsx
import Image from "next/image";
import ArticleShell from "./ArticleShell";

export default function ArticleBeyondTheBin() {
  return (
    <ArticleShell>
      {/* ── SECTION: Title ── */}
      <div className="max-w-4xl mx-auto text-center mb-10 px-4">
        <h1 
          className="font-display font-medium text-[#112942] leading-6.75 mb-6"
          style={{ fontSize: "clamp(27px, 4.5vw, 27px)" }}
        >
          Beyond The Bin: <br className="hidden md:block" />
          Give Your Bodidoc Packaging A Second Life
        </h1>
      </div>

      {/* ── SECTION: Intro ── */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <p className="text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          At Bodidoc, we&apos;re passionate about sustainability, and that goes beyond simply choosing recyclable materials. We believe in giving our packaging a second life, reducing waste and maximising resources. So, once you&apos;ve finished enjoying your favourite Bodidoc products, don&apos;t just toss the empty containers – repurpose them! Here are some creative ways to reuse those bottles and jars around your home:
        </p>
      </div>

      {/* ── SECTION: Row 1 (Jars) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-4">
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          <p className="mb-6 text-[#112942] font-bold text-lg">
            Bodidoc Creams &amp; Jelly jars:
          </p>
          <p className="mb-6">
            These sturdy jars, made from polypropylene, are incredibly versatile. Once washed, their durable, moisture-resistant nature makes them perfect for:
          </p>
          <ul className="list-disc pl-5 space-y-4 marker:text-[#112942]">
            <li><strong>Organising small items:</strong> from buttons and beads to screws and nails, these jars keep everything neat and tidy.</li>
            <li><strong>Storing homemade beauty concoctions:</strong> whip up your own scrubs, masks, or lotions and store them safely in these airtight containers.</li>
            <li><strong>Seed starting:</strong> the clear jars are ideal for starting seeds indoors, allowing you to monitor their growth.</li>
            <li><strong>Travel containers:</strong> use them for toiletries, stationary, snacks, or other small items when you&apos;re on the go.</li>
            <li><strong>Flower vases:</strong> the shorter, wider jars are perfect for creating charming, compact flower displays.</li>
          </ul>
        </div>

        {/* IMAGE CONTROL: Max-width 700 to match the original layout asset */}
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/cover-3.png"
            alt="Repurposed Bodidoc jars"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ── SECTION: Row 2 (Pumps) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-4">
        {/* Mobile order fix: image comes second on mobile to keep text on top */}
        <div className="relative w-full max-w-175 aspect-700/500 order-2 md:order-1 mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/11.png"
            alt="Reuse Recycle Graphic"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>

        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 order-1 md:order-2">
          <p className="mb-4 text-[#112942] font-bold text-lg">
            Bodidoc Lotion Pumps:
          </p>
          <p className="mb-6">
            These strong and clear bottles, made from food-safe PETG plastic, with ergonomic pump-action, are perfect for:
          </p>
          <ul className="list-disc pl-5 space-y-4 marker:text-[#112942]">
            <li><strong>DIY cleaning solutions:</strong> mix up or decant your own eco-friendly cleaning solutions and store them in these convenient pump bottles.</li>
            <li><strong>Watering plants:</strong> the pump action makes it easy to water delicate seedlings or indoor plants.</li>
            <li><strong>Storing homemade sauces or dressings:</strong> keep your culinary creations fresh and easily accessible.</li>
            <li><strong>Vases for fresh flowers:</strong> the taller pump bottles make delightful vases for showcasing longer-stemmed fresh flowers.</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION: Closing ── */}
      <div className="max-w-5xl mx-auto text-center space-y-8 px-4 pb-20">
        <p className="text-[15px] md:text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          By repurposing your recyclable Bodidoc packaging, you&apos;re not only reducing waste but also tapping into your creativity and saving money. It&apos;s a win-win for you and the planet!
        </p>
        <p className="text-[15px] md:text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          We encourage you to explore these ideas and come up with your own innovative ways to give our packaging a second life. Share your repurposing tips with us on social media using <strong>#Bodidoc</strong>.
        </p>
      </div>
    </ArticleShell>
  );
}