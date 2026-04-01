// components/moments/ArticleEmbracingYourBodi.tsx
import Image from "next/image";
import Link from "next/link";
import ArticleShell from "./ArticleShell";

export default function ArticleEmbracingYourBodi() {
  return (
    <ArticleShell>
      {/* ── SECTION: Title ── */}
      <div className="max-w-7xl mx-auto text-center mb-10 px-4">
        <h1 className="font-display font-medium text-[#112942] leading-6.75 mb-6"
          style={{ fontSize: "clamp(27px, 4.5vw, 27px)" }}>
          Embracing Your Bodi: 
          A Journey of Self-Love and<br className="hidden md:block" /> Acceptance
        </h1>
      </div>

      {/* ── SECTION: Intro Text ── */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 space-y-6">
          <p>
            Bodidoc&apos;s 2021 Women&apos;s Day campaign resonated deeply, touching on the very personal journey of self-love and body positivity. It&apos;s a journey many of us travel, navigating societal pressures, challenging our own insecurities, and ultimately, learning to embrace our unique selves, just as we are. 
          </p>
          <p>
            Bodidoc interviewed real women who shared their stories that represents the experiences women face in cultivating a positive body image. From childhood teasing to struggling with beauty standards, these testimonials reveal the vulnerability and strength inherent in the striving for self-acceptance.
          </p>
        </div>
      </div>

      {/* ── SECTION: Row 1 (Text Left / Image Right) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-4">
        <div className="text-[15px] font-normal text-[#2f2f2f] leading-5.25 text-center md:text-left">
          <p>
            But these stories also offer a powerful message of hope and personal transformation. By embracing our perceived flaws and recognising that everyone is imperfectly perfect, we open ourselves up to a world of confidence and self-acceptance. The journey may not be easy, but the rewards are immeasurable.
          </p>
        </div>
        <div className="relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/cover.png"
            alt="Bodidoc Women's Day group"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ── SECTION: Mid Text (Full Width Callout) ── */}
      <div className="max-w-5xl mx-auto text-center mb-20 px-4">
        <p className="text-[15px] md:text-[15px] font-normal text-[#2f2f2f] leading-5.25">
          And that’s where Bodidoc comes in. By focusing on ingredients that truly work, Bodidoc empowers you to care for your skin and body with confidence. It’s an act of self-love. Knowing that you’re choosing products that <strong>work for you,</strong> and that nourish and enhance your natural beauty can be a powerful act of self-care. When you feel good about your skin, that confidence radiates outwards, but it’s about more than just looking good; it’s about <strong>feeling good.</strong> It’s about taking time for yourself amidst the demands of modern living. It’s about prioritising your well-being.
        </p>
        <p className="text-[15px] md:text-[15px] font-normal text-[#2f2f2f] leading-5.25 pt-5">
         These testimonials highlight the importance of finding inspiration in others and building a supportive community. Seeing ourselves reflected in the stories of others can be incredibly validating and empowering. Surrounding ourselves with positive influences and celebrating each other’s strengths can help us to cultivate a stronger sense of self-worth.
        </p>
      </div>

      {/* ── SECTION: Row 2 (Image Left / Text Right) ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-4">
        {/* Mobile order fix: image (order-2) sits below text (order-1) on small screens */}
        <div className="relative w-full max-w-175 aspect-700/500 order-2 md:order-1 mx-auto">
          <Image
            src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/3-1.png" 
            alt="Bodidoc testimonials grid"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
        <div className="text-[15px] font-normal text-[#333333] leading-5.25 text-center md:text-left order-1 md:order-2">
          <p>
            These testimonials highlight something women do well: we are able to find inspiration in the uniqueness of others. To be able to see ourselves in the stories of other women can be incredibly validating and empowering. The testimonials showcase why it is so important to build a supportive community is so crucial to uplifting ourselves and how surrounding ourselves with positive influences and celebrating each other’s strengths helps us build a stronger sense of self-worth.
          </p>
        </div>
      </div>

      {/* ── SECTION: Final CTA ── */}
      <div className="max-w-4xl mx-auto text-center pb-4 px-4">
        <p className="text-[15px] font-normal text-[#333333] leading-5.25 mb-10">
          Bodidoc’s Women’s day campaign reminds us that true beauty lies in embracing our individuality. It’s about celebrating our unique qualities, recognising our strength, and loving ourselves just as we are. It’s a journey, not a destination, and Bodidoc is there to support you every step of the way. Because you are amazing, just the way you are.
        </p>
        <Link
          href="/stories"
          className="inline-block bg-[#112942] text-white px-10 py-4 text-[13px] rounded-full tracking-wide uppercase font-medium hover:bg-[#1a3a5c] transition-all shadow-sm"
        >
          Explore Their Stories
        </Link>
      </div>
    </ArticleShell>
  );
}