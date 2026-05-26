import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getRangePage, urlFor } from "@/sanity/lib/sanity";
import AqueousBenefitsCarousel from "@/components/AqueousBenefitsCarousel";
import FullWidthBanner from "@/components/FullWidthBanner";
import AllInOneSection, { type UseCase } from "@/components/AllInOneSection";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Aqueous Range | Bodidoc",
  description: "Discover Bodidoc Aqueous Cream — gentle, hypoallergenic care for the whole family. SLS-free, fragrance-free, dermatologically tested, and safe for babies.",
  openGraph: {
    title: "Aqueous Range | Bodidoc",
    description: "Gentle care for the whole family. SLS-free, fragrance-free, B.P. approved.",
  },
};

// ─── Use-case tab data ────────────────────────────────────────────────────────

const useCases: UseCase[] = [
  {
    title: "Body Cream for the Whole Family",
    description: "Nourish and protect the skin of every family member, including babies, with its gentle, dermatologically tested formula.",
    icon: "/icons/bodyCream.svg",
  },
  {
    title: "Soap Alternative",
    description: "Ideal for sensitive skin, it cleanses without drying, helping to retain natural moisture for soft, healthy skin.",
    icon: "/icons/soap.svg",
  },
  {
    title: "Shaving Cream Alternative",
    description: "Provides a smooth, hydrating base for shaving, reducing irritation and leaving skin silky and moisturized.",
    icon: "/icons/shaving.svg",
  },
  {
    title: "Makeup Remover",
    description: "Gently lifts makeup without stripping your skin, perfect for sensitive or dry complexions.",
    icon: "/icons/makeupRemover.svg",
  },
  {
    title: "After-Sun Care",
    description: "Soothes and hydrates sun-exposed skin, offering cooling relief and replenishing lost moisture.",
    icon: "/icons/afterSun.svg",
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs: FAQItem[] = [
  { q: "What is Bodidoc Aqueous Cream used for?", a: "Bodidoc Aqueous Cream is a versatile, all-in-one product that can be used as a body moisturiser, a soap alternative, shaving cream, and even as an after-sun treatment. It's designed to hydrate, protect, and soothe sensitive skin for the whole family, including babies." },
  { q: "Is Bodidoc Aqueous Cream safe for babies?", a: "Yes, Bodidoc Aqueous Cream is safe for babies. Its gentle, hypoallergenic formula is dermatologically tested and free from harsh chemicals, making it perfect for your little one's delicate skin." },
  { q: "Can I use Bodidoc Aqueous Cream if I have sensitive skin?", a: "Absolutely! Our cream is specifically formulated for sensitive skin. It's hypoallergenic, fragrance-free, and SLS-free, ensuring it provides soothing hydration without causing irritation." },
  { q: "Can Bodidoc Aqueous Cream be used on the face?", a: "Bodidoc Aqueous Cream can be used on the face, especially for those with dry or sensitive skin. Apply a small amount and gently massage it in. It's best to avoid the delicate eye area." },
  { q: "How often should I apply it?", a: "For optimal results, apply daily or as needed to dry or sensitive areas. Its fast-absorbing formula provides long-lasting moisture, keeping your skin hydrated for up to 24 hours." },
  { q: "What does B.P. approved mean?", a: "B.P. (British Pharmacopoeia) approval means our product meets the highest quality, safety, and effectiveness standards. It's been carefully formulated and tested to ensure reliable, safe care for your skin." },
  { q: "Is it fragrance-free?", a: "Yes, completely fragrance-free — making it suitable for those with fragrance sensitivities or skin conditions like eczema or psoriasis." },
  { q: "Does it contain any harsh chemicals?", a: "No, Bodidoc Aqueous Cream is free from harsh chemicals like SLS, parabens, and fragrances. It's a mild, safe option for anyone looking for a gentle, effective moisturiser or multi-use product." },
  { q: "Is it tested on animals?", a: "No, Bodidoc Aqueous Cream is cruelty-free. We are committed to providing safe, effective products without testing on animals." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AqueousRangePage() {
  const [allProducts, rangePage] = await Promise.all([
    getAllProducts(),
    getRangePage("aqueous"),
  ]);
  const products = allProducts.filter((p) => p.range === "aqueous");

  return (
    <div className="w-full bg-white -mt-16 md:-mt-22.5 lg:-mt-32.5">

      {/* ── 1. Full-screen hero ── */}
      {rangePage?.heroImage && (
        <section aria-label="Aqueous Range hero" className="w-full bg-white">

  {/* Nav-height spacer — mirrors the wrapper negative margin */}
  <div className="h-16 md:h-22.5 lg:h-32.5" />

  <Link href="/shop/bodidoc-aqueous-cream-for-all-skin-types" className="block w-full" >

  {/* Desktop — natural dimensions, never cropped */}
  <div className={`w-full ${rangePage.heroMobileImage ? "hidden md:block" : "block"}`}>
            <Image
              src={urlFor(rangePage.heroImage).width(2560).url()}
              alt="Moisturise & Protect your bodi with our all new Aqueous Cream"
              width={2560}
              height={893}
              className="w-full h-auto"
              priority
              draggable={false}
            />
          </div>

          {/* Mobile — portrait fill cropped to 3:4 */}
          {rangePage.heroMobileImage && (
            <div className="relative w-full aspect-3/4 block md:hidden">
              <Image
                src={urlFor(rangePage.heroMobileImage).width(768).url()}
                alt="Moisturise & Protect your bodi with our all new Aqueous Cream"
                fill
                className="object-cover object-center"
                priority
                draggable={false}
              />
            </div>
          )}

        </Link>
        </section>
      )}

      {/* ── 2. Product intro + benefits carousel ── */}
      <section className="bg-white">
  <div className="max-w-300 mx-auto py-12 md:py-20 px-6">
    {/* Grid with custom column split to match reference proportions */}
    <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-2 items-center">
      
      {/* Image: Adjusted to center and fit the jar size perfectly */}
      <div className="relative w-full md:ml-55 justify-center items-center hidden md:block pointer-events-none">
        <div className="relative w-full max-w-65 aspect-square">
          <Image
            src="/images/acqueous.webp" 
            alt="Bodidoc Aqueous Cream"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Text Content: Constrained width to force the height match */}
      <div className="flex flex-col justify-center">
        <div className="max-w-170 md:-pl-10"> {/* This max-width is the key to the vertical height */}
          <h2
            className="font-display font-normal text-[#112942] leading-[1.15] mb-4"
            style={{ 
              fontSize: "clamp(24px, 2.2vw, 27px)", 
              textTransform: "uppercase", 
              letterSpacing: "0.02em" 
            }}
          >
            Gentle Care for the Whole Family
          </h2>
          
          <p 
            className="text-[14px] md:text-[15px] font-normal text-[#2f2f2f] leading-5.25 mb-6" 
            style={{ textAlign: "left" }}
          >
            Discover the ultimate solution for your skin's everyday needs with Bodidoc Aqueous Cream. Perfectly formulated for all skin types, this gentle cream is safe for the whole family, including babies. It offers 24-hour moisture and soothing care for sensitive skin. Dermatologically tested and free from harsh chemicals, it's the versatile, go-to product your skin deserves.
          </p>

          <div>
            <Link
              href="/shop/bodidoc-aqueous-cream-for-all-skin-types"
              className="inline-flex items-center justify-center rounded-full bg-[#112942] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-10 py-4 hover:bg-[#1a3a5c] transition-shadow duration-200 shadow-sm"
            >
              Buy Online
            </Link>
          </div>
        </div>
      </div>

    </div>
  </div>
  
  <div className="pb-16">
    <AqueousBenefitsCarousel />
  </div>
</section>

      {/* ── 3. Lifestyle banner ── */}
      {rangePage?.heroBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.heroBannerImage).width(1536).height(536).url()}
          mobileSrc={rangePage.heroBannerMobileImage
            ? urlFor(rangePage.heroBannerMobileImage).width(768).height(768).url()
            : undefined}
          alt="Gentle enough for the whole family"
          href="/shop/bodidoc-aqueous-cream-for-all-skin-types"
        />
      )}

      {/* ── 4. All-in-one use cases (interactive icon tabs) ── */}
      <section>
        <AllInOneSection
          headingWord="All"
          headingSubWord="-in-one"
          taglines={["Versatile", "everyday", "care!"]}
          tabs={useCases}
        />

        {/* ── B.P. Approved copy ── 
        <div className="max-w-4xl mx-auto px-6 pb-16 md:pb-20 text-center flex flex-col gap-5">
          <h2
            className="font-display font-medium text-[#112942] uppercase"
            style={{ fontSize: "clamp(14px, 1.8vw, 27px)", letterSpacing: "0.05em" }}
          >
            B.P. Approved for Quality You Can Trust
          </h2>
          <p className="text-[14px] font-normal text-[#2f2f2f] leading-relaxed">
            Our Bodidoc Aqueous Cream is B.P. (British Pharmacopoeia) approved, meaning it meets the highest standards of quality, safety, and effectiveness. The British Pharmacopoeia sets strict guidelines for medicines and healthcare products, ensuring they are consistently safe for use. By being B.P. approved, you can trust that our cream has been carefully formulated and tested to deliver the best care for your skin, with ingredients that are both effective and reliable. This certification provides peace of mind, knowing that you're using a product backed by trusted pharmaceutical standards.
          </p>
        </div> */}
      </section>

      {/* ── 5. Derm-tested banner ── */}
      {rangePage?.dermBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.dermBannerImage).width(1536).url()}
          mobileSrc={rangePage.dermBannerMobileImage
            ? urlFor(rangePage.dermBannerMobileImage).width(768).height(500).url()
            : undefined}
          alt="Skin safety matters — dermatologically tested and verified 100% safe"
        />
      )}

      {/* ── 6. FAQ ── */}
      <section>
        <div className="max-w-4xl mx-auto px-10 py-16 md:py-20">
          <div className="mb-10">
            <h2 className="font-display font-medium text-[#112942] leading-snug mb-1" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
              Frequently Asked{" "}
              <em className="italic">Questions</em>
            </h2>
            <p className="text-[14px] font-normal text-[#888]">
              Find out more about Bodidoc Aqueous Cream
            </p>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* ── 7. Bottom nav ── */}
      <div className="border-t border-[#e8e8e8]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-8 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light hover:gap-3 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Products
          </Link>
          <Link
            href="/shop/tissue-oil-range"
            className="text-[11px] font-light text-[#999] tracking-wide hover:text-[#112942] transition-colors"
          >
            Tissue Oil Range →
          </Link>
        </div>
      </div>

    </div>
  );
}