import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProducts, urlFor } from "@/sanity/lib/sanity";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import ProductPageClient from "@/components/ProductPageClient";
import ReviewButton from "@/components/ReviewButton";

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
const rangePageMap: Record<string, string> = {
  "tissue-oil": "/shop/tissue-oil-range",
  "aqueous": "/shop/aqueous-range",
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

// ─── Schema.org ───────────────────────────────────────────────────────────────

function ProductSchema({ product }: { product: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "Bodidoc" },
    image: product.mainImage
      ? urlFor(product.mainImage).width(800).height(800).url()
      : undefined,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "ZAR",
      seller: { "@type": "Organization", name: "Bodidoc" },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Star Rating (server-safe) ────────────────────────────────────────────────

function StarRating({ rating = 0, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half = !filled && rating >= star - 0.5;
          return (
            <span
              key={star}
              className={`text-[15px] leading-none ${
                filled ? "text-[#112942]" : half ? "text-[#112942]/60" : "text-[#ccc]"
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="text-[12px] text-[#999] leading-none">( {count} Reviews )</span>
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

  const allImages = [product.mainImage, ...(product.galleryImages ?? [])].filter(Boolean);
  const rangeName = rangeLabels[product.range] ?? product.range;
  const rangePage = rangePageMap[product.range] ?? "/shop";
  const typeName = typeLabels[product.productType] ?? product.productType;

  return (
    <>
      <ProductSchema product={product} />

      <div className="w-full">
        {/* ── Product Hero ── */}
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — Gallery */}
            <ProductGallery images={allImages} productName={product.name} />

            {/* Right — Details + interactive buttons (client island) */}
            <div className="flex flex-col gap-4 md:sticky md:top-24 md:self-start">

              <p className="text-[12px] tracking-[0.2em] uppercase text-[#112942] font-light">
                {typeName}
              </p>

              <h1
                className="font-display font-normal text-[#112942] leading-tight"
                style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}
              >
                {product.name}
              </h1>

              {product.size && (
                <p className="text-[13px] font-light text-[#112942] tracking-wide -mt-1">
                  {product.size}
                </p>
              )}

              <StarRating rating={product.rating ?? 0} count={product.reviewCount ?? 0} />

              {/* Short description — one-liner teaser */}
              {product.shortDescription && (
                <p className="text-[13px] md:text-[14px] font-normal text-[#333] leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Full description — Portable Text */}
              {product.description && product.description.length > 0 && (
                <div className="prose-product text-[13px] md:text-[14px] font-normal text-[#333] leading-relaxed [&_strong]:font-normal [&_strong]:text-[#112942] [&_em]:italic [&_a]:underline [&_a]:text-[#112942] [&_p+p]:mt-3">
                  <PortableText value={product.description} />
                </div>
              )}

              {/* Ingredient strip image (icons row) — sits above Buy Online */}
              {product.ingredientStripImage && (
                <div className="relative w-120 mb-4" style={{ aspectRatio: "5/1" }}>
                  <Image
                    src={urlFor(product.ingredientStripImage).width(900).url()}
                    alt="Key ingredients"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}

              {(product.badge || product.isBestseller) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {product.badge && (
                    <span className="bg-[#112942] px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-white font-light">
                      {product.badge}
                    </span>
                  )}
                  {product.isBestseller && !product.badge && (
                    <span className="border border-[#112942]/20 px-3 py-1 text-[9px] tracking-[0.2em] uppercase text-[#112942] font-light">
                      Bestseller
                    </span>
                  )}
                </div>
              )}

              {/* Client island: Buy Online button → opens BuyOnlineModal */}
              <ProductPageClient
                productName={product.name}
                productType={product.productType}
                productSlug={product.slug.current}
                buyLinks={product.buyLinks ?? []}
                inStoreLinks={product.inStoreLinks ?? []}
                skinType={product.skinType}
                isItForMe={product.isItForMe}
              />

            </div>
          </div>
        </div>

        {/* ── 3-Tab nav ── */}
        <div className="max-w-360 mx-auto px-6 md:px-10 md:py-6 lg:px-16 hidden md:block">
          <div className="border-b border-[#e8e8e8] flex items-center justify-left md:pl-42">
            <a href="#description" className="px-8 py-4 text-[14px] tracking-[0.15em] uppercase font-medium text-[#aaa] hover:text-[#112942] transition-colors">
              Description
            </a>
            <span className="text-[#ccc] select-none leading-none">|</span>
            <a href="#customer-review" className="px-8 py-4 text-[14px] tracking-[0.15em] uppercase font-medium text-[#aaa] hover:text-[#112942] transition-colors">
              Customer Review
            </a>
            <span className="text-[#ccc] select-none leading-none">|</span>
            <a href="#learn-more" className="px-8 py-4 text-[14px] tracking-[0.15em] uppercase font-medium text-[#aaa] hover:text-[#112942] transition-colors">
              Learn More
            </a>
          </div>
        </div>

        {/* ── Description / ProductTabs ── */}
        <div id="description">
          <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14">
            <ProductTabs product={product} />
          </div>
        </div>

        {/* ── Customer Review ── */}
        <div id="customer-review" className="border-none">
          <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14">

            <div className="flex items-center gap-6 mb-10">
              <div className="h-px flex-1 bg-[#e8e8e8]" />
              <h2 className="text-[20px] tracking-widest uppercase text-[#112942] font-medium whitespace-nowrap">
                Customer Review
              </h2>
              <div className="h-px flex-1 bg-[#e8e8e8]" />
            </div>

            {/* Two-panel grid */}
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] border border-[#e8e8e8]">
              <div className="border-b md:border-b-0 md:border-r border-[#e8e8e8] p-8 flex flex-col gap-4">
                <div>
                  <p
                    className="font-display font-normal text-[#112942] leading-none mb-2"
                    style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
                  >
                    100%
                  </p>
                  <p className="text-[13px] font-light text-[#666] leading-relaxed">
                    Customers would recommend this product to a friend.
                  </p>
                </div>
                <div className="h-px bg-[#e8e8e8]" />
                <StarRating rating={product.rating ?? 0} count={product.reviewCount ?? 0} />
                <ReviewButton productName={product.name} />
              </div>

              <div className="p-8 flex items-center justify-start">
                <p className="text-[13px] font-light text-[#999]">
                  No reviews yet. Be the first to review this product!
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Learn More ── */}
        <div id="learn-more" className="border-none">
          <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-6 w-full mb-8">
              <div className="h-px flex-1 bg-[#e8e8e8]" />
              <h2 className="text-[20px] tracking-widest uppercase text-[#112942] font-medium whitespace-nowrap">
                Learn More
              </h2>
              <div className="h-px flex-1 bg-[#e8e8e8]" />
            </div>
            <p className="text-[14px] font-light text-[#666] leading-relaxed max-w-xl mb-8">
              Discover the full Tissue Oil collection and find the perfect product for your skincare
              needs. Visit our {rangeName} for more details, FAQs, and expert tips.
            </p>
            <Link
              href={rangePage}
              className="flex items-center justify-center rounded-full bg-[#112942] text-white text-[10px] tracking-[0.25em] uppercase font-light px-8 py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200"
            >
              Visit Page
            </Link>
          </div>
        </div>

        {/* ── Back to shop ── */}
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
            <Link href={rangePage} className="text-[11px] font-light text-[#999] tracking-wide hover:text-[#112942] transition-colors">
              {rangeName}
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}