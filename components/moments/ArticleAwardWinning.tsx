// components/moments/ArticleAwardWinning.tsx
import Image from "next/image";
import Link from "next/link";
import ArticleShell from "./ArticleShell";

export default function ArticleAwardWinning() {
  return (
    <ArticleShell>
      {/* ── SECTION: Title ── */}
      {/* Elementor's boxed width is roughly 1140px, translated to max-w-6xl */}
      <div className="max-w-4xl mx-auto text-center mb-10 px-4">
        <h1 
          className="font-display font-normal text-[#112942] leading-tight mb-6"
          style={{ fontSize: "clamp(26px, 4vw, 27px)" }} // Adjusted to match h2.elementor-heading-title
        >
          Transform dry, uneven skin with the award-winning 
          Bodidoc<br className="hidden md:block" /> Tissue Oil Cream with Urea
        </h1>
      </div>

      {/* ── SECTION: Intro Paragraph ── */}
      <div className="max-w-3xl mx-auto text-center mb-10 px-4">
        <p className="text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          Struggling with dry, ashy skin? You&apos;re not alone. Many individuals face this challenge, particularly in the South African climate. But there&apos;s a solution that&apos;s not only effective but also award-winning: <strong className="font-bold">Bodidoc Tissue Oil Cream with Urea for Dry Skin</strong>.
        </p>
      </div>

      {/* ── SECTION: The Award Row ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 px-4">
        <div className="text-[15px] text-center md:text-left font-normal text-[#333333] leading-[1.6] space-y-6">
          <p>
            It&apos;s easy to see why Bodidoc Tissue Oil Cream with Urea for Dry Skin won the <em>Women and Home</em> Beauty Award for Best Smoothing Cream: it&apos;s more than just a moisturiser; it&apos;s a transformative solution for those battling dryness and uneven skin. Building upon the beloved original Bodidoc Tissue Oil Cream, this enhanced version elevates hydration to a new level.
          </p>
          <p>
            The secret lies in the powerful boost of 2% urea and added glycerine. Urea, a humectant, draws moisture from the air and binds it to your skin. Working synergistically with glycerine, another potent humectant, this duo provides long-lasting hydration. 
          </p>
        </div>

        {/* PIXEL CONTROL: Parent container controls the Image size */}
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/cover-4.png"
            alt="Bodidoc Award Winning Cream"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain" // Contain ensures no part of the 700x500 award graphic is cropped
          />
        </div>
      </div>

      {/* ── SECTION: Detailed Benefits ── */}
      <div className="max-w-6xl mx-auto space-y-6 px-4 text-[15px] font-normal text-[#333333] leading-[1.6] mb-16">
        <p>
          The benefits don&apos;t stop there. Bodidoc Tissue Oil Cream with Urea is enriched with a nourishing blend of five beneficial oils, including Vitamin E Oil, Avocado Oil, and Evening Primrose Oil. These oils work to replenish your skin&apos;s natural moisture barrier, resulting in a finish that 9/10 women agreed, left their skin feeling and looking soft &amp; smooth.*
        </p>
        <p>
          Beyond addressing dryness, the tissue oils in this cream&apos;s formula help reduce the appearance of stretch marks and uneven skin tone. The result is skin that not only feels amazing but looks radiant and glowing!
        </p>
        <p>
          The effectiveness of Bodidoc Tissue Oil Cream with Urea is supported by impressive results: 98% of women report an improvement in the appearance of dry, ashy skin*. Whether you experience everyday dryness, stretch marks, or uneven skin tone, this cream is your solution for achieving radiant skin.
        </p>
        <p className="font-normal text-[#2f2f2f] pt-1">
          Experience the difference today.
        </p>
        <p className="font-normal text-[#2f2f2f] pt-1">
          *Bodidoc 12-week in-home testing
        </p>
      </div>

    </ArticleShell>
  );
}