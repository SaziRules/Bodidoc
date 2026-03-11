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
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-9 h-9">
        <rect x="6" y="4" width="16" height="20" rx="2"/>
        <line x1="10" y1="9" x2="18" y2="9"/>
        <line x1="10" y1="13" x2="18" y2="13"/>
        <line x1="10" y1="17" x2="14" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Soap Alternative",
    description: "Ideal for sensitive skin, it cleanses without drying, helping to retain natural moisture for soft, healthy skin.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-9 h-9">
        <path d="M14 4C9 4 5 9 5 14c0 5 4 10 9 10s9-5 9-10c0-5-4-10-9-10z"/>
        <path d="M14 9v6l3 3"/>
      </svg>
    ),
  },
  {
    title: "Shaving Cream Alternative",
    description: "Provides a smooth, hydrating base for shaving, reducing irritation and leaving skin silky and moisturized.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-9 h-9">
        <path d="M10 4h8l3 8H7L10 4z"/>
        <rect x="7" y="12" width="14" height="12" rx="1"/>
        <line x1="11" y1="16" x2="17" y2="16"/>
      </svg>
    ),
  },
  {
    title: "Makeup Remover",
    description: "Gently lifts makeup without stripping your skin, perfect for sensitive or dry complexions.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-9 h-9">
        <circle cx="14" cy="14" r="10"/>
        <path d="M10 17s1.5 2 4 2 4-2 4-2"/>
        <circle cx="10" cy="11" r="1" fill="currentColor" opacity="0.3"/>
        <circle cx="18" cy="11" r="1" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: "After-Sun Care",
    description: "Soothes and hydrates sun-exposed skin, offering cooling relief and replenishing lost moisture.",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1" className="w-9 h-9">
        <circle cx="14" cy="14" r="5"/>
        <line x1="14" y1="3" x2="14" y2="5"/>
        <line x1="14" y1="23" x2="14" y2="25"/>
        <line x1="3" y1="14" x2="5" y2="14"/>
        <line x1="23" y1="14" x2="25" y2="14"/>
        <line x1="6.05" y1="6.05" x2="7.46" y2="7.46"/>
        <line x1="20.54" y1="20.54" x2="21.95" y2="21.95"/>
        <line x1="6.05" y1="21.95" x2="7.46" y2="20.54"/>
        <line x1="20.54" y1="7.46" x2="21.95" y2="6.05"/>
      </svg>
    ),
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

        </section>
      )}

      {/* ── 2. Product intro + benefits carousel ── */}
      <section>
        <div className="max-w-4xl mx-auto py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative w-full aspect-square">
              <Image
                src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/aques-2048x2048.webp"
                alt="Bodidoc Aqueous Cream"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2
                className="font-display font-medium text-[#112942] leading-tight"
                style={{ fontSize: "clamp(17px, 1.4vw, 27px)", textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                Gentle Care for the Whole Family
              </h2>
              <p className="text-[14px] font-normal text-[#444] leading-relaxed" style={{ textAlign: "justify" }}>
                Discover the ultimate solution for your skin's everyday needs with Bodidoc Aqueous Cream. Perfectly formulated for all skin types, this gentle cream is safe for the whole family, including babies. It offers 24-hour moisture and soothing care for sensitive skin. Dermatologically tested and free from harsh chemicals, it's the versatile, go-to product your skin deserves.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop/bodidoc-aqueous-cream-for-all-skin-types"
                  className="inline-flex items-center justify-center rounded-full bg-[#112942] text-white text-[11px] tracking-[0.25em] uppercase font-light px-8 py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200"
                >
                  Buy Online
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
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

        {/* ── B.P. Approved copy ── */}
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
        </div>
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