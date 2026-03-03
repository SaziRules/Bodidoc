import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts, getRangePage, urlFor } from "@/sanity/lib/sanity";
import FullWidthBanner from "@/components/FullWidthBanner";
import { TissueOilIngredients, TissueOilFAQs } from "@/components/TissueOilRangeClient";

export const metadata: Metadata = {
  title: "Tissue Oil Range | Bodidoc",
  description: "Discover Bodidoc's Tissue Oil range — enriched with avocado oil, vitamin E, and evening primrose oil to reduce stretch marks, scarring, and uneven skin tone.",
  openGraph: {
    title: "Tissue Oil Range | Bodidoc",
    description: "Dermatologically tested. Clinically proven. Enriched with 5 beneficial oils.",
  },
};

const faqs = [
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

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 mt-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <span key={star} className={`text-[13px] leading-none ${filled ? "text-[#112942]" : half ? "text-[#112942]/50" : "text-[#ddd]"}`}>★</span>
          );
        })}
      </div>
      <span className="text-[11px] text-[#999] leading-none">({count})</span>
    </div>
  );
}

function RangeProductCard({ slug, image, category, name, rating, reviewCount }: {
  slug: string; image: string; category: string; name: string; rating: number; reviewCount: number;
}) {
  return (
    <Link href={`/shop/${slug}`} className="group flex flex-col no-underline">
      <div className="relative w-full aspect-square bg-[#f7f7f7] overflow-hidden mb-3">
        <Image src={image} alt={name} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
      </div>
      <p className="text-[11px] font-light tracking-widest uppercase text-[#112942]/50 mb-1">{category}</p>
      <p className="text-[14px] font-normal text-[#112942] leading-snug group-hover:underline">{name}</p>
      <StarRating rating={rating} count={reviewCount} />
    </Link>
  );
}

const typeLabel: Record<string, string> = {
  "body-cream": "BODY CREAM",
  "body-oil": "BODY OIL",
  "petroleum-jelly": "PETROLEUM JELLY",
  "body-lotion": "BODY LOTION",
};

export default async function TissueOilRangePage() {
  const [allProducts, rangePage] = await Promise.all([
    getAllProducts(),
    getRangePage("tissue-oil"),
  ]);
  const products = allProducts.filter((p) => p.range === "tissue-oil");

  return (
    <div className="w-full bg-white -mt-22.5">

      {/* Hero */}
      {rangePage?.heroImage && (
        <section aria-label="Tissue Oil Range hero" className="relative w-full h-screen bg-white">
          <div className={rangePage.heroMobileImage ? "hidden md:block" : "block"} style={{ position: "absolute", inset: 0 }}>
            <Image src={urlFor(rangePage.heroImage).width(2560).url()} alt="Bodidoc Tissue Oil Range — enriched with 5 beneficial oils" fill className="object-contain object-center" priority draggable={false} />
          </div>
          {rangePage.heroMobileImage && (
            <div className="block md:hidden" style={{ position: "absolute", inset: 0 }}>
              <Image src={urlFor(rangePage.heroMobileImage).width(768).url()} alt="Bodidoc Tissue Oil Range — enriched with 5 beneficial oils" fill className="object-contain object-center" priority draggable={false} />
            </div>
          )}
        </section>
      )}

      {/* Lifestyle banner 1 */}
      {rangePage?.heroBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.heroBannerImage).width(1536).height(536).url()}
          mobileSrc={rangePage.heroBannerMobileImage ? urlFor(rangePage.heroBannerMobileImage).width(768).height(768).url() : undefined}
          alt="Bodidoc Tissue Oil — enriched with tissue oil"
        />
      )}

      {/* Intro + Product Grid */}
      <section>
        <div className="max-w-4xl mx-auto px-10 py-16 md:py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display font-normal text-[#112942] leading-tight mb-4" style={{ fontSize: "clamp(17px, 1.4vw, 20px)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Enriched with Tissue Oil.
            </h2>
            <p className="text-[13px] font-light text-[#444] leading-relaxed" style={{ textAlign: "justify" }}>
              Enriched with a specialised formulation of ingredients, including avocado oil, vitamin E, and evening primrose oil, each product is designed with a light, easily absorbed texture to give the skin a natural glow. Bodidoc's dermatologically tested Tissue Oil range is formulated to help moisturise the skin, reduce the appearance of stretch marks and scarring, and improve skin tone. The sensational signature scent has made Bodidoc a cult favourite for both men and women!
            </p>
          </div>
          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <RangeProductCard
                  key={product._id}
                  slug={product.slug.current}
                  image={urlFor(product.mainImage).width(600).height(600).url()}
                  category={typeLabel[product.productType] ?? product.productType}
                  name={product.name}
                  rating={product.rating ?? 0}
                  reviewCount={product.reviewCount ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Derm-tested banner */}
      {rangePage?.dermBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.dermBannerImage).width(1536).url()}
          mobileSrc={rangePage.dermBannerMobileImage ? urlFor(rangePage.dermBannerMobileImage).width(768).height(500).url() : undefined}
          alt="Bodidoc Tissue Oil Lotion — for all skin types"
        />
      )}

      {/* Key ingredients */}
      <TissueOilIngredients />

      {/* Clinically proven banner */}
      {rangePage?.heroBannerImage && (
        <FullWidthBanner
          src={urlFor(rangePage.heroBannerImage).width(1536).height(536).url()}
          mobileSrc={rangePage.heroBannerMobileImage ? urlFor(rangePage.heroBannerMobileImage).width(768).height(768).url() : undefined}
          alt="Clinically proven to reduce the appearance of stretch marks and scars in 28 days"
        />
      )}

      {/* FAQ */}
      <section>
        <div className="max-w-4xl mx-auto px-10 py-16 md:py-20">
          <div className="mb-10">
            <h2 className="font-display font-normal text-[#112942] leading-snug mb-1" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
              Frequently Asked <em className="italic">Questions</em>
            </h2>
            <p className="text-[13px] font-light text-[#888]">Find out more about Bodidoc Tissue Oil Range</p>
          </div>
          <TissueOilFAQs faqs={faqs} />
        </div>
      </section>

      {/* Bottom nav */}
      <div className="border-t border-[#e8e8e8]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-8 flex items-center justify-between">
          <Link href="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light hover:gap-3 transition-all duration-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            All Products
          </Link>
          <Link href="/shop/aqueous-range" className="text-[11px] font-light text-[#999] tracking-wide hover:text-[#112942] transition-colors">
            Aqueous Range →
          </Link>
        </div>
      </div>

    </div>
  );
}