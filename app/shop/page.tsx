import Image from "next/image";
import Link from "next/link";
import { getAllProducts, urlFor } from "@/sanity/lib/sanity";
import type { Product } from "@/sanity/lib/sanity";
import ShopFilters from "@/components/ShopFilters";

// ─── Label maps ───────────────────────────────────────────────────────────────

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

// ─── Product Card ─────────────────────────────────────────────────────────────

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug.current}`}
      className="group flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f8f6f3] aspect-square mb-4">
        <Image
          src={urlFor(product.mainImage).width(600).height(600).url()}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#112942] text-[9px] tracking-[0.2em] uppercase text-white font-light">
            {product.badge}
          </span>
        )}
        {/* Bestseller dot */}
        {product.isBestseller && !product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white border border-[#112942]/20 text-[9px] tracking-[0.2em] uppercase text-[#112942] font-light">
            Bestseller
          </span>
        )}
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-[#112942]/0 group-hover:bg-[#112942]/5 transition-colors duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#112942] font-light bg-white px-4 py-2">
            View Product
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#112942]/40 font-light">
          {typeLabels[product.productType] ?? product.productType}
        </p>
        <h3 className="font-display text-[16px] font-normal text-[#112942] leading-snug group-hover:opacity-70 transition-opacity duration-200">
          {product.name}
        </h3>
        {product.size && (
          <p className="text-[12px] font-light text-[#999] mt-0.5">{product.size}</p>
        )}
        {product.shortDescription && (
          <p className="text-[12px] font-light text-[#777] leading-relaxed mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light group-hover:gap-2.5 transition-all duration-200">
          View Product
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ShopPage() {
  const products = await getAllProducts();

  // Build filter option lists from actual data
  const ranges = [...new Set(products.map((p) => p.range))];
  const types = [...new Set(products.map((p) => p.productType))];
  const skins = [...new Set(products.flatMap((p) => p.skinType ?? []))];

  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="relative w-full bg-[#112942] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-normal text-white/4 whitespace-nowrap leading-none"
            style={{ fontSize: "clamp(80px, 18vw, 220px)" }}
          >
            Products
          </span>
        </div>
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-5">
            Bodidoc
          </p>
          <h1
            className="font-display font-normal text-white leading-[1.05] mb-6"
            style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
          >
            All Products
          </h1>
          <p className="text-[14px] md:text-[15px] font-light text-white/50 max-w-sm leading-relaxed">
            Proudly South African skincare — crafted for every skin type, every body.
          </p>
          {/* Count */}
          <div className="mt-8 inline-flex items-center gap-2 border border-white/10 px-4 py-2">
            <span className="font-display text-[22px] text-white font-normal leading-none">
              {products.length}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-light">
              Products
            </span>
          </div>
        </div>
      </div>

      {/* ── Shop body ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-18">
        <div className="flex gap-10 lg:gap-16 items-start">

          {/* Sidebar — sticky */}
          <aside className="hidden md:block w-52 lg:w-60 shrink-0 sticky top-24 self-start">
            <ShopFilters
              ranges={ranges.map((r) => ({ value: r, label: rangeLabels[r] ?? r }))}
              types={types.map((t) => ({ value: t, label: typeLabels[t] ?? t }))}
              skins={skins.map((s) => ({ value: s, label: skinLabels[s] ?? s }))}
              products={products}
            />
          </aside>

          {/* Mobile filter bar — rendered inside ShopFilters */}
          <div className="md:hidden w-full">
            <ShopFilters
              ranges={ranges.map((r) => ({ value: r, label: rangeLabels[r] ?? r }))}
              types={types.map((t) => ({ value: t, label: typeLabels[t] ?? t }))}
              skins={skins.map((s) => ({ value: s, label: skinLabels[s] ?? s }))}
              products={products}
              mobile
            />
          </div>

          {/* Grid — controlled by ShopFilters client component */}
          <div id="shop-grid" className="flex-1 min-w-0 hidden md:block">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}