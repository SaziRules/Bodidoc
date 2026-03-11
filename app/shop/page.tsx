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
      <div className="relative w-full overflow-hidden">
        
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-16">
          
          <h1 className="font-display font-normal text-[#112942] leading-[1.05] mb-2"
            style={{ fontSize: "clamp(40px, 8vw, 42px)" }}>
            Shop All Products
          </h1>
          <p className="text-[14px] md:text-[15px] font-medium text-[#2f2f2f] max-w-full leading-relaxed">
            Check out everything Bodidoc has to offer, or use the filters to help you find exactly what you need!
          </p>
          
        </div>
      </div>

      {/* ── Shop body — ShopFilters owns the full sidebar + grid layout ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-10">
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