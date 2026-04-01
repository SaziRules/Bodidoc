// components/moments/ArticleSustainablePackaging.tsx
import Image from "next/image";
import ArticleShell from "./ArticleShell";

export default function ArticleSustainablePackaging() {
  return (
    <ArticleShell>
      {/* ── Title ── */}
      <div className="max-w-6xl mx-auto text-center mb-10 px-4">
        <h1 
          className="font-display font-medium text-[#112942] leading-6.75 mb-6"
          style={{ fontSize: "clamp(27px, 4vw, 27px)" }}
        >
          Bodidoc: Beautiful Skin, Beautiful Planet –{" "}
          
          Our Commitment to<br></br> Sustainable Packaging
        </h1>
      </div>

      {/* ── Intro ── */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4">
        <p className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 mb-6">
          At Bodidoc, we believe that taking care of your skin shouldn&apos;t cost the earth. That&apos;s why we&apos;re committed to taking care of our planet by implementing sustainable business practices, including the conscious use of recyclable plastics. We&apos;re excited to share our journey towards a more sustainable future and how you can easily join us.
        </p>
        <p className="text-[15px] font-bold text-[#112942] leading-5.25">
          We understand the impact plastic can have on the environment, and we&apos;ve carefully selected packaging materials that minimise this impact.
        </p>
      </div>

      {/* ── Row 1: Left text / Right image (jars) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 px-4">
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 text-center md:text-left">
          <p>
            Our Creams and Jellies are housed in jars made from polypropylene, a durable and widely recyclable plastic. This means that once you&apos;ve finished enjoying the luxurious formulas inside, you can simply rinse out the jar and pop it into your recycling bin. It&apos;s that easy to make a difference!
          </p>
        </div>
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/6-1.png"
            alt="Bodidoc jars — PET 1 recyclable"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ── Row 2: Left image / Right text (lotion bottles) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 px-4">
        {/* order-2 md:order-1 puts image below text on mobile, but left on desktop */}
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto order-2 md:order-1">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/8-1.png"
            alt="Bodidoc lotion bottles — recyclable PETG"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 text-center md:text-left order-1 md:order-2">
          <p>
            Our lotion pump bottles, are made from PETG plastic, another commonly recyclable option known for its strength and clarity. We&apos;ve also opted for tearaway shrink wrap labels, making it even easier for you to separate the label from the bottle before recycling. This small step makes a big difference in the recycling process.
          </p>
        </div>
      </div>

      {/* ── Row 3: Left text / Right image (tissue oil bottle) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 px-4">
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 text-center md:text-left">
          <p>
            Our signature Bodidoc Tissue Oil comes in a PET bottle, a highly recyclable plastic commonly used for beverage bottles. It&apos;s also packaged in a cardboard box, which can be recycled along with your paper and cardboard. By choosing these readily recyclable materials, we&apos;re making it simple for you to be a conscientious consumer and help preserve our environment.
          </p>
        </div>
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/7-1.png"
            alt="Bodidoc Tissue Oil — PP 5 recyclable"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ── Closing paragraphs ── */}
      <div className="max-w-6xl mx-auto text-center space-y-6 px-4 pb-20">
        <p className="text-[15px] font-normal text-[#333333] leading-[1.8]">
          Recycling is becoming increasingly accessible in South Africa, with numerous collection points and initiatives across the country. By recycling your Bodidoc packaging, you&apos;re contributing to a circular economy, reducing landfill waste, and conserving valuable resources. It&apos;s a small act with a significant impact.
        </p>
        <p className="text-[15px] font-normal text-[#333333] leading-[1.8]">
          We&apos;re constantly exploring new ways to improve our sustainability efforts. We believe that beauty and sustainability can go hand-in-hand, and we&apos;re dedicated to providing you with high-quality skincare products that are as good for the planet as they are for your skin.
        </p>
        <p className="text-[15px]  leading-[1.8] pt-4">
          Join us on this journey towards a more sustainable future. By choosing Bodidoc and recycling our packaging, you&apos;re not only taking care of your skin but also our planet. Together, we can make a difference.
        </p>
        <p className="text-lg font-bold text-[#112942] ">
          Let&apos;s make beautiful skin and a beautiful planet a reality!
        </p>
      </div>
    </ArticleShell>
  );
}