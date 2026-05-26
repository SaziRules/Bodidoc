import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { getAllProducts, getRangePage, urlFor } from "@/sanity/lib/sanity";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import FullWidthBanner from "@/components/FullWidthBanner";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";
import ProductCarousel, { type CarouselProduct } from "@/components/ProductCarousel";
import { TissueOilIngredients } from "@/components/TissueOilRangeClient";

export const metadata: Metadata = {
  title: "Tissue Oil Range | Bodidoc",
  description:
    "Discover Bodidoc's Tissue Oil range — enriched with avocado oil, vitamin E, and evening primrose oil to reduce stretch marks, scarring, and uneven skin tone.",
  openGraph: {
    title: "Tissue Oil Range | Bodidoc",
    description: "Dermatologically tested. Clinically proven. Enriched with 5 beneficial oils.",
  },
};

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const faqs: FAQItem[] = [
  { q: "Does this remove stretch marks?", a: "While there is no definitive product that can completely 'remove' stretch marks, 9/10 women agree that Bodidoc Tissue Oil, Cream, & Lotion helps reduce the appearance of stretch marks. Our Tissue Oil is also clinically proven to reduce the appearance of stretch marks in 28 days." },
  { q: "Does this help uneven skin tone?", a: "While there is no definitive product that can completely even skin tone, 9/10 women agree that Bodidoc Tissue Oil, Cream, & Lotion helps reduce the appearance of uneven skin tone." },
  { q: "Does this help dry skin?", a: "9/10 women agree that Bodidoc Tissue Oil, Cream, & Lotion helps reduce the appearance of dry skin. Should you require a little extra moisture our Urea range is specifically formulated with added Urea & Glycerine for dry skin." },
  { q: "Does this help reduce scars?", a: "Our Tissue Oil is also clinically proven to reduce the appearance of scars in 28 days. Apply daily for best results." },
  { q: "What are Bodidoc Tissue Oil products used for?", a: "The Bodidoc Tissue Oil range is formulated with a blend of 5 beneficial oils to help reduce the appearance of stretch marks, uneven skin tone & dry skin. Our range of unisex products has an offering for all skin types and is loved by many for its signature scent, lightweight formula and effective results." },
  { q: "Can Bodidoc be used on the face?", a: "Bodidoc Tissue Oil Cream is not formulated for use on the face. That said, if you wish to try it out, we suggest that you do so at night. Use a very small amount and ensure that you avoid the area around your eyes." },
  { q: "Can kids use Bodidoc tissue oil products?", a: "Both pre-teens and teens can use Bodidoc Tissue Oil products, and our ingredients should be completely safe for this age group. For younger kids, we recommend doing a patch test on your child's forearm to ensure that there is no adverse reaction." },
  { q: "Can babies use Bodidoc Tissue Oil cream?", a: "Bodidoc Tissue Oil products are not designed for infants or toddlers. Please do not apply our products to children in this age group." },
  { q: "How long until I see results?", a: "Using our products daily over an extended period will yield healthy, glowing skin. For fast & effective results, our Tissue Oil is clinically proven to reduce the appearance of stretch marks & scars in just 28 days." },
  { q: "Does Bodidoc tissue oil cream have UV protection?", a: "Bodidoc does not contain any SPF or UV protection. Our products are designed to be light, so any UV protection must be applied in addition to your Bodidoc products." },
];

const typeLabel: Record<string, string> = {
  "body-cream": "BODY CREAM",
  "body-oil": "BODY OIL",
  "petroleum-jelly": "PETROLEUM JELLY",
  "body-lotion": "BODY LOTION",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TissueOilRangePage() {
  const [allProducts, rangePage, { data: reviews }] = await Promise.all([
    getAllProducts(),
    getRangePage("tissue-oil"),
    supabaseServer
      .from("product_reviews")
      .select("productSlug, rating")
      .eq("brand", "bodidoc")
      .eq("approved", true),
  ]);

  const ratingsMap: Record<string, { sum: number; count: number }> = {};
  for (const r of reviews ?? []) {
    if (!ratingsMap[r.productSlug]) ratingsMap[r.productSlug] = { sum: 0, count: 0 };
    ratingsMap[r.productSlug].sum   += r.rating;
    ratingsMap[r.productSlug].count += 1;
  }

  const products = allProducts.filter((p) => p.range === "tissue-oil");

  // Serialise for the client carousel component
  const carouselProducts: CarouselProduct[] = products.map((p) => {
    const stats = ratingsMap[p.slug.current];
    return {
      id: p._id,
      slug: p.slug.current,
      image: urlFor(p.mainImage).width(600).height(600).url(),
      category: typeLabel[p.productType] ?? p.productType,
      name: p.name,
      rating:      stats ? Math.round((stats.sum / stats.count) * 2) / 2 : 0,
      reviewCount: stats?.count ?? 0,
    };
  });

  return (
    <div className="w-full bg-white -mt-16 md:-mt-22.5 lg:-mt-32.5">

      {/* ── 1. Hero banner ──
           The wrapper has a responsive negative top margin so the page slides
           behind the navbar. This spacer div mirrors that value exactly so the
           actual image starts right below the nav on every breakpoint.
           Spacer: mobile 64px | md 90px | lg 130px (nav + topbar)          */}
      {rangePage?.heroImage && (
        <section aria-label="Tissue Oil Range hero" className="w-full bg-white">

          {/* Nav-height spacer — white background blends seamlessly behind nav */}
          <div className="h-16 md:h-22.5 lg:h-32.5" />
          <Link href="/shop/bodidoc-tissue-oil-cream-with-urea-for-dry-skin" className="block w-full">

          {/* Desktop — natural dimensions, never cropped */}
          <div className={`w-full ${rangePage.heroMobileImage ? "hidden md:block" : "block"}`}>
            <Image
              src={urlFor(rangePage.heroImage).width(2560).url()}
              alt="Say goodbye to stretch marks, uneven skin tone & dry skin — 9 out of 10 women agree"
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
                alt="Say goodbye to stretch marks, uneven skin tone & dry skin — 9 out of 10 women agree"
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

      {/* ── 2. Intro + Product Carousel ── */}
      <section className="py-16 md:py-20">

        {/* Centered intro copy — constrained */}
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-display font-medium text-[#112942] leading-tight mb-4 uppercase"
              style={{ fontSize: "clamp(17px, 1.4vw, 27px)", letterSpacing: "0.1em" }}
            >
              Enriched with Tissue Oil.
            </h2>
            <p className="text-[13px] font-normal text-[#444] leading-relaxed">
              Enriched with a specialised formulation of ingredients, including avocado oil, vitamin E, and evening
              primrose oil, each product is designed with a light, easily absorbed texture to give the skin a natural
              glow. Bodidoc's dermatologically tested Tissue Oil range is formulated to help moisturise the skin,
              reduce the appearance of stretch marks and scarring, and improve skin tone. The sensational signature
              scent has made Bodidoc a cult favourite for both men and women!
            </p>
          </div>
        </div>

        {/* Carousel — full ProductGrid width */}
        {carouselProducts.length > 0 && (
          <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16">
            <ProductCarousel products={carouselProducts} />
          </div>
        )}
      </section>

      {/* ── 3. Lifestyle banner — "9 out of 10 women agree" lotion ── */}
      {rangePage?.heroBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.heroBannerImage).width(1536).height(536).url()}
          mobileSrc={
            rangePage.heroBannerMobileImage
              ? urlFor(rangePage.heroBannerMobileImage).width(768).height(768).url()
              : undefined
          }
          alt="9 out of 10 women agree — Bodidoc Tissue Oil Lotion reduces the appearance of stretch marks, uneven skin tone and dry skin"
          href="/shop/bodidoc-tissue-oil-lotion-with-urea-for-dry-skin"
        />
      )}

      {/* ── 4. Key ingredients (icon tabs) ── */}
      <TissueOilIngredients />

      {/* ── 5. Clinically proven banner ── */}
      {rangePage?.dermBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.dermBannerImage).width(1536).url()}
          mobileSrc={
            rangePage.dermBannerMobileImage
              ? urlFor(rangePage.dermBannerMobileImage).width(768).height(500).url()
              : undefined
          }
          alt="Bodidoc Tissue Oil — clinically proven to reduce stretch marks and scars in 28 days"
          href="/shop/bodidoc-tissue-oil-for-all-skin-types"
        />
      )}

      {/* ── 6. FAQ ── */}
      <section>
        <div className="max-w-4xl mx-auto px-10 py-16 md:py-20">
          <div className="mb-10">
            <h2
              className="font-display font-medium text-[#112942] leading-snug mb-1"
              style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
            >
              Frequently Asked{" "}
              <em className="italic">Questions</em>
            </h2>
            <p className="text-[14px] font-normal text-[#888]">
              Find out more about Bodidoc Tissue Oil Range
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
            href="/shop/aqueous-range"
            className="text-[11px] font-light text-[#999] tracking-wide hover:text-[#112942] transition-colors"
          >
            Aqueous Range →
          </Link>
        </div>
      </div>

    </div>
  );
}