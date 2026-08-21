import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 3600;
import { getAllProducts, getHeroSlides, urlFor } from "@/sanity/lib/sanity";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid, { type GridProduct } from "@/components/ProductGrid";
import FullWidthBanner from "@/components/FullWidthBanner";
import Testimonials from "@/components/Testimonials";
import VideoBanner from "@/components/VideoBanner";
import HomePageImages from "@/components/HomePageImages";
import AutoSubscribeModal from "@/components/AutoSubscribeModal";
import CookieAlert from "@/components/CookieAlert";

export const metadata: Metadata = {
  title: "Bodidoc — Your Skin's New Best Friend",
  description:
    "Shop Bodidoc skincare — proudly South African, cruelty-free, dermatologically tested. Discover our Tissue Oil and Aqueous Cream ranges for the whole family.",
  openGraph: {
    title: "Bodidoc — Your Skin's New Best Friend",
    description:
      "Proudly South African skincare. Cruelty-free, dermatologically tested body care with proven results. Shop the Tissue Oil and Aqueous Cream ranges.",
    url: "https://www.bodidoc.com",
    type: "website",
    images: [
      {
        url: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/7-1536x536.webp",
        width: 1536,
        height: 536,
        alt: "Bodidoc skincare products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bodidoc — Your Skin's New Best Friend",
    description:
      "Proudly South African skincare. Shop the Tissue Oil and Aqueous Cream ranges.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.bodidoc.com/#business",
  name: "Bodidoc",
  url: "https://www.bodidoc.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.bodidoc.com/bodidoc-favicon.png",
  },
  description:
    "Bodidoc is a proudly South African skincare brand offering cruelty-free, dermatologically tested body care products — Tissue Oil and Aqueous Cream ranges — trusted by families across South Africa.",
  telephone: "+27-860-002-652",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14 Ellman Street",
    addressLocality: "Sunderland Ridge",
    postalCode: "0157",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.7075,
    longitude: 28.182,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  sameAs: [
    "https://www.facebook.com/bodidoc/",
    "https://www.instagram.com/bodidoc/",
    "https://www.tiktok.com/@bodidoc.africa",
    "https://x.com/bodidoc_sa",
    "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q/featured",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bodidoc Skincare Range",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Tissue Oil Range",
        url: "https://www.bodidoc.com/shop/tissue-oil-range",
      },
      {
        "@type": "OfferCatalog",
        name: "Aqueous Cream Range",
        url: "https://www.bodidoc.com/shop/aqueous-range",
      },
    ],
  },
};

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
  const [products, rawHeroSlides, { data: reviews }] = await Promise.all([
    getAllProducts(),
    getHeroSlides(),
    supabaseServer
      .from("product_reviews")
      .select("productSlug, rating, name, message")
      .eq("brand", "bodidoc")
      .eq("approved", true),
  ]);

  const heroSlides = rawHeroSlides
    .filter((s) => s.desktopImage)
    .map((s) => ({
      id:      s._key,
      desktop: urlFor(s.desktopImage).width(1920).url(),
      mobile:  s.mobileImage
                 ? urlFor(s.mobileImage).width(768).url()
                 : urlFor(s.desktopImage).width(768).url(),
      alt:     s.alt,
      url:     s.url,
    }));

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

  // Build slug → display name map from Sanity products
  const slugToName: Record<string, string> = {};
  for (const p of products) slugToName[p.slug.current] = p.name;

  const liveTestimonials = (reviews ?? [])
    .filter((r) => r.message && r.name)
    .map((r, i) => ({
      id:      i + 1,
      text:    r.message as string,
      product: slugToName[r.productSlug] ?? r.productSlug,
      name:    r.name as string,
    }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSlider slides={heroSlides.length ? heroSlides : undefined} />
      <AutoSubscribeModal />
      <CookieAlert />
      <ProductGrid
        newArrivals={newArrivals.length ? newArrivals : fallback}
        bestSelling={bestSelling.length ? bestSelling : fallback}
      />
      <FullWidthBanner
        src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/7-1536x536.webp"
        alt="Bodidoc banner"
        href="shop/bodidoc-aqueous-cream-for-all-skin-types"
      />
      <Testimonials testimonials={liveTestimonials.length ? liveTestimonials : undefined} />
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
<div className="relative w-full -mb-1 overflow-hidden leading-0 bg-[#112942]">
  <svg
    viewBox="0 0 1000 100"
    preserveAspectRatio="none"
    className="relative block w-[calc(100%+1.3px)] h-10 md:h-25 lg:h-35 text-white dark:text-[#111827]"
    fill="currentColor"
  >
    <path d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
  </svg>
</div>
    </main>
  );
}