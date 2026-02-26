import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts, urlFor } from "@/sanity/lib/sanity";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Bodidoc`,
    description: product.shortDescription ?? `${product.name} — Bodidoc skincare.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.mainImage
        ? [{ url: urlFor(product.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

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

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

// ─── Star rating ──────────────────────────────────────────────────────────────

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill={i < count ? "#112942" : "none"}
          stroke="#112942"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allImages = [
    product.mainImage,
    ...(product.galleryImages ?? []),
  ].filter(Boolean);

  return (
    <div className="w-full">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-[#e8e8e8]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center gap-2">
          <Link href="/shop" className="text-[11px] tracking-widest uppercase font-light text-[#999] hover:text-[#112942] transition-colors">
            Products
          </Link>
          <span className="text-[#ddd]">/</span>
          <span className="text-[11px] tracking-widest uppercase font-light text-[#112942]/50">
            {rangeLabels[product.range] ?? product.range}
          </span>
          <span className="text-[#ddd]">/</span>
          <span className="text-[11px] font-light text-[#112942]/70 truncate max-w-45">
            {product.name}
          </span>
        </div>
      </div>

      {/* ── Product hero ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left — Gallery */}
          <ProductGallery images={allImages} productName={product.name} />

          {/* Right — Details */}
          <div className="flex flex-col gap-5 md:sticky md:top-24 md:self-start">

            {/* Type + range labels */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light">
                {typeLabels[product.productType] ?? product.productType}
              </span>
              <span className="text-[#e0e0e0]">·</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light">
                {rangeLabels[product.range] ?? product.range}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display font-normal text-[#112942] leading-tight" style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
              {product.name}
            </h1>

            {/* Size + badge */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.size && (
                <span className="border border-[#112942]/20 px-3 py-1 text-[11px] tracking-widest uppercase text-[#112942] font-light">
                  {product.size}
                </span>
              )}
              {product.badge && (
                <span className="bg-[#112942] px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-white font-light">
                  {product.badge}
                </span>
              )}
              {product.isBestseller && !product.badge && ( 
                <span className="bg-[#f8f6f3] border border-[#112942]/15 px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-[#112942] font-light">
                  Bestseller
                </span>
              )}
            </div> 

            {/* Stars */}
            <div className="flex items-center gap-2">
              <Stars count={5} />
              <span className="text-[11px] font-light text-[#999]">Dermatologically Tested</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#e8e8e8]" />

            {/* Short description */}
            {product.shortDescription && (
              <p className="text-[14px] font-light text-[#555] leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Benefits checklist — top 4 */}
            {product.benefits && product.benefits.length > 0 && (
              <ul className="flex flex-col gap-2.5">
                {product.benefits.slice(0, 4).map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#112942] flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-light text-[#444] leading-relaxed">
                      <strong className="font-normal text-[#112942]">{b.heading}</strong>
                      {b.detail && ` — ${b.detail}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Ingredient strip image */}
            {product.ingredientStripImage && (
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/1" }}>
                <Image
                  src={urlFor(product.ingredientStripImage).width(900).url()}
                  alt="Key ingredients"
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-[#e8e8e8]" />

            {/* Buy online */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-4">
                Buy Online
              </p>
              {product.buyLinks && product.buyLinks.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {product.buyLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden flex items-center justify-between px-5 py-3 border border-[#112942] text-[11px] tracking-[0.15em] uppercase font-light text-[#112942] hover:text-white transition-colors duration-300"
                    >
                      <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative">{link.retailer}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="relative w-3.5 h-3.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href="https://wa.me/27609966087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center justify-between px-5 py-3 border border-[#112942] text-[11px] tracking-[0.15em] uppercase font-light text-[#112942] hover:text-white transition-colors duration-300"
                >
                  <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">Order via WhatsApp</span>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="relative w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5l5.805-1.522A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.371l-.359-.214-3.724.977.994-3.629-.234-.373A9.818 9.818 0 0 1 12 2.182c5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Dermatologically tested badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full border border-[#112942]/15 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="#112942" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 opacity-50">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-normal text-[#112942]">Dermatologically Tested</p>
                <p className="text-[11px] font-light text-[#999]">100% skin-safe ingredients</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Tabs: Benefits / Is it for me / Proven Results / Ingredients ── */}
      <div className="border-t border-[#e8e8e8]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14">
          <ProductTabs product={product} />
        </div>
      </div>

      {/* ── Back to shop ── */}
      <div className="border-t border-[#e8e8e8] bg-[#f8f6f3]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-10 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light hover:gap-3 transition-all duration-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Products
          </Link>
          <p className="text-[11px] font-light text-[#999] tracking-wide">
            {rangeLabels[product.range] ?? product.range}
          </p>
        </div>
      </div>

    </div>
  );
}