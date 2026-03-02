import { getAllProducts } from "@/sanity/lib/sanity";
import ShopFilters from "@/components/ShopFilters";

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

export default async function ShopPage() {
  const products = await getAllProducts();

  const ranges = [...new Set(products.map((p) => p.range))];
  const types = [...new Set(products.map((p) => p.productType))];
  const skins = [...new Set(products.flatMap((p) => p.skinType ?? []))];

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="relative w-full bg-[#112942] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span className="font-display font-normal text-white/4 whitespace-nowrap leading-none"
            style={{ fontSize: "clamp(80px, 18vw, 220px)" }}>
            Products
          </span>
        </div>
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-5">Bodidoc</p>
          <h1 className="font-display font-normal text-white leading-[1.05] mb-6"
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>
            All Products
          </h1>
          <p className="text-[14px] md:text-[15px] font-light text-white/50 max-w-sm leading-relaxed">
            Proudly South African skincare — crafted for every skin type, every body.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 border border-white/10 px-4 py-2">
            <span className="font-display text-[22px] text-white font-normal leading-none">{products.length}</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-light">Products</span>
          </div>
        </div>
      </div>

      {/* ── Shop body — ShopFilters owns the full sidebar + grid layout ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-18">
        <ShopFilters
          ranges={ranges.map((r) => ({ value: r, label: rangeLabels[r] ?? r }))}
          types={types.map((t) => ({ value: t, label: typeLabels[t] ?? t }))}
          skins={skins.map((s) => ({ value: s, label: skinLabels[s] ?? s }))}
          products={products}
        />
      </div>

    </div>
  );
}