// app/search/page.tsx
// Bodidoc search results — searches Sanity products + posts, live ratings from Supabase

import Image from "next/image";
import Link from "next/link";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { searchProducts, searchPosts, urlFor } from "@/sanity/lib/sanity";
import type { Product, Post } from "@/sanity/lib/sanity";
import type { Metadata } from "next";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Search | Bodidoc` : "Search | Bodidoc",
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const typeLabels: Record<string, string> = {
  "body-cream":      "Body Cream",
  "body-oil":        "Body Oil",
  "petroleum-jelly": "Petroleum Jelly",
  "body-lotion":     "Body Lotion",
};

function StarRating({ rating = 0, count = 0 }: { rating?: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled  = rating >= star;
          const half    = !filled && rating >= star - 0.5;
          return (
            <span key={star} className={`text-[13px] leading-none ${filled ? "text-[#112942]" : half ? "text-[#112942]/50" : "text-[#ddd]"}`}>
              ★
            </span>
          );
        })}
      </div>
      <span className="text-[11px] text-[#aaa] leading-none">({count})</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display font-normal text-[#112942] mb-8"
      style={{ fontSize: "clamp(28px, 4vw, 38px)" }}
    >
      {children}
    </h2>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  rating,
  reviewCount,
}: {
  product: Product;
  rating: number;
  reviewCount: number;
}) {
  return (
    <Link
      href={`/shop/${product.slug.current}`}
      className="group flex flex-col no-underline"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#f8f7f5] mb-4">
        {product.mainImage && (
          <Image
            src={urlFor(product.mainImage).width(600).height(600).url()}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </div>

      {/* Meta */}
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light mb-1">
        {typeLabels[product.productType] ?? product.productType}
      </p>
      <h3 className="font-display font-normal text-[#112942] text-[16px] leading-snug mb-2 group-hover:opacity-70 transition-opacity">
        {product.name}
      </h3>
      <StarRating rating={rating} count={reviewCount} />
    </Link>
  );
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link
      href={`/moments/${post.slug.current}`}
      className="group flex flex-col no-underline"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#f0f4f8] mb-4">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(800).height(450).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#ccc] text-[12px] tracking-widest uppercase">No image</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <p className="text-[11px] tracking-[0.15em] uppercase text-[#aaa] font-light mb-1.5">{date}</p>
      <h3 className="font-display font-normal text-[#112942] text-[18px] leading-snug mb-2 group-hover:opacity-70 transition-opacity">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-[13px] font-normal text-[#555] leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      )}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  if (!query) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="font-display font-normal text-[#112942] text-[32px] mb-3">Search</h1>
        <p className="text-[14px] font-light text-[#aaa]">Enter a term above to search products and articles.</p>
      </div>
    );
  }

  // ── Fetch Sanity content + Supabase ratings in parallel ──
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [products, posts, { data: reviewRows }] = await Promise.all([
    searchProducts(query),
    searchPosts(query),
    supabase
      .from("product_reviews")
      .select("productSlug, rating")
      .eq("brand", "bodidoc")
      .eq("approved", true),
  ]);

  // Build ratingsMap
  const ratingsMap: Record<string, { sum: number; count: number }> = {};
  for (const row of reviewRows ?? []) {
    if (!ratingsMap[row.productSlug]) ratingsMap[row.productSlug] = { sum: 0, count: 0 };
    ratingsMap[row.productSlug].sum   += row.rating;
    ratingsMap[row.productSlug].count += 1;
  }
  const getProductRating = (slug: string) => {
    const r = ratingsMap[slug];
    if (!r || r.count === 0) return { rating: 0, count: 0 };
    return { rating: Math.round((r.sum / r.count) * 2) / 2, count: r.count };
  };

  const hasProducts = products.length > 0;
  const hasPosts    = posts.length > 0;
  const hasAny      = hasProducts || hasPosts;

  return (
    <div className="w-full bg-white">
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-20">

        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#aaa] font-light mb-2">
            Search results
          </p>
          <h1
            className="font-display font-normal text-[#112942] leading-tight"
            style={{ fontSize: "clamp(30px, 5vw, 48px)" }}
          >
            &ldquo;{query}&rdquo;
          </h1>
          {hasAny && (
            <p className="text-[13px] font-light text-[#888] mt-2">
              {[
                hasProducts && `${products.length} product${products.length !== 1 ? "s" : ""}`,
                hasPosts    && `${posts.length} article${posts.length !== 1 ? "s" : ""}`,
              ].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        {/* ── No results ── */}
        {!hasAny && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full border border-[#e8e8e8] flex items-center justify-center mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" className="w-6 h-6">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="font-display text-[22px] font-normal text-[#112942] mb-2">No results found</p>
            <p className="text-[13px] font-light text-[#aaa] max-w-xs leading-relaxed mb-8">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a different term or browse our full range.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-[#112942] text-white text-[11px] tracking-[0.25em] uppercase font-semibold px-8 py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* ── Products section ── */}
        {hasProducts && (
          <section className="mb-16 md:mb-20">
            <SectionHeading>Products</SectionHeading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => {
                const { rating, count } = getProductRating(product.slug.current);
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    rating={rating}
                    reviewCount={count}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Divider between sections */}
        {hasProducts && hasPosts && (
          <div className="h-px bg-[#e8e8e8] mb-16 md:mb-20" />
        )}

        {/* ── Moments section ── */}
        {hasPosts && (
          <section>
            <SectionHeading>Moments</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}