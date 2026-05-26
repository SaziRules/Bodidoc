import { createClient } from "@supabase/supabase-js";
import { getAllProducts } from "@/sanity/lib/sanity";
import ShopFilters from "@/components/ShopFilters";

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const rangeLabels: Record<string, string> = {
  "tissue-oil": "Tissue Oil Range",
  "aqueous": "Aqueous Range",
};
const typeLabels: Record<string, string> = {
  "body-cream": "Body Cream",
  "body-oil": "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion": "Body Lotion",
};
const skinLabels: Record<string, string> = {
  "all": "All Skin Types",
  "dry": "Dry Skin",
  "normal": "Normal Skin",
  "sensitive": "Sensitive Skin",
  "oily": "Oily Skin",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const [products, { data: reviews }] = await Promise.all([
    getAllProducts(),
    supabaseServer
      .from("product_reviews")
      .select("productSlug, rating")
      .eq("brand", "bodidoc")
      .eq("approved", true),
  ]);

  // Build a per-slug ratings map
  const ratingsMap: Record<string, { sum: number; count: number }> = {};
  for (const r of reviews ?? []) {
    if (!ratingsMap[r.productSlug]) ratingsMap[r.productSlug] = { sum: 0, count: 0 };
    ratingsMap[r.productSlug].sum   += r.rating;
    ratingsMap[r.productSlug].count += 1;
  }

  // Enrich each product with live rating + reviewCount
  const enrichedProducts = products.map((p) => {
    const stats = ratingsMap[p.slug.current];
    return {
      ...p,
      rating:      stats ? Math.round((stats.sum / stats.count) * 2) / 2 : 0,
      reviewCount: stats?.count ?? 0,
    };
  });

  const ranges = [...new Set(enrichedProducts.map((p) => p.range))];
  const types  = [...new Set(enrichedProducts.map((p) => p.productType))];
  const skins  = [...new Set(enrichedProducts.flatMap((p) => p.skinType ?? []))];

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-16">
          <h1
            className="font-display font-normal text-[#112942] leading-[1.05] mb-2"
            style={{ fontSize: "clamp(40px, 8vw, 42px)" }}
          >
            Shop All Products
          </h1>
          <p className="text-[14px] md:text-[14px] font-medium text-[#2f2f2f] max-w-full leading-relaxed">
            Check out everything Bodidoc has to offer, or use the filters to help you find exactly what you need!
          </p>
        </div>
      </div>

      {/* ── Shop body ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-10">
        <ShopFilters
          ranges={ranges.map((r) => ({ value: r, label: rangeLabels[r] ?? r }))}
          types={types.map((t) => ({ value: t, label: typeLabels[t] ?? t }))}
          skins={skins.map((s) => ({ value: s, label: skinLabels[s] ?? s }))}
          products={enrichedProducts}
          initialTypes={type ? [type] : []}
        />
      </div>

    </div>
  );
}