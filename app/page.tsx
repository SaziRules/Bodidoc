import { createClient } from "@supabase/supabase-js";
import { getAllProducts, urlFor } from "@/sanity/lib/sanity";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid, { type GridProduct } from "@/components/ProductGrid";
import FullWidthBanner from "@/components/FullWidthBanner";
import Testimonials from "@/components/Testimonials";
import VideoBanner from "@/components/VideoBanner";
import HomePageImages from "@/components/HomePageImages";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const typeLabel: Record<string, string> = {
  "body-cream":      "BODY CREAM",
  "body-oil":        "BODY OIL",
  "petroleum-jelly": "PETROLEUM JELLY",
  "body-lotion":     "BODY LOTION",
};

export default async function Home() {
  const [products, { data: reviews }] = await Promise.all([
    getAllProducts(),
    supabaseServer
      .from("product_reviews")
      .select("productSlug, rating")
      .eq("brand", "bodidoc")
      .eq("approved", true),
  ]);

  // Build per-slug ratings map
  const ratingsMap: Record<string, { sum: number; count: number }> = {};
  for (const r of reviews ?? []) {
    if (!ratingsMap[r.productSlug]) ratingsMap[r.productSlug] = { sum: 0, count: 0 };
    ratingsMap[r.productSlug].sum   += r.rating;
    ratingsMap[r.productSlug].count += 1;
  }

  const toGridProduct = (p: Awaited<ReturnType<typeof getAllProducts>>[number]): GridProduct => {
    const stats = ratingsMap[p.slug.current];
    return {
      id:          p._id,
      slug:        p.slug.current,
      image:       urlFor(p.mainImage).width(600).height(600).url(),
      category:    typeLabel[p.productType] ?? p.productType.toUpperCase(),
      name:        p.name,
      rating:      stats ? Math.round((stats.sum / stats.count) * 2) / 2 : 0,
      reviewCount: stats?.count ?? 0,
    };
  };

  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4).map(toGridProduct);
  const bestSelling = products.filter((p) => p.isBestseller).slice(0, 4).map(toGridProduct);
  const fallback    = products.slice(0, 4).map(toGridProduct);

  return (
    <main>
      <HeroSlider />
      <ProductGrid
        newArrivals={newArrivals.length ? newArrivals : fallback}
        bestSelling={bestSelling.length ? bestSelling : fallback}
      />
      <FullWidthBanner
        src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/7-1536x536.webp"
        alt="Bodidoc banner"
        href="shop/bodidoc-aqueous-cream-for-all-skin-types"
      />
      <Testimonials />
      <VideoBanner
        videoSrc="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/98of-women-agree.mp4"
        mobileSrc="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Helps-reduce-the-appearance-of-stretch-marks-uneven-skin-tone-dry-skin-7.webp"
        mobileWidth={2372}
        mobileHeight={1997}
        alt="98% of women agree"
        href="shop/bodidoc-tissue-oil-for-all-skin-types"
      />
      <HomePageImages />
      {/* ── Footer Curve Divider ── */}
<div className="relative w-full -mb-1 overflow-hidden leading-0 bg-[#112942]"> {/* Dark Background */}
  <svg 
    viewBox="0 0 1000 100" 
    preserveAspectRatio="none" 
    className="relative block w-[calc(100%+1.3px)] h-10 md:h-25 lg:h-35"
    fill="#ffffff" // <── White Path cuts into the dark background
  >
    <path d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
  </svg>
</div>
    </main>
  );
}