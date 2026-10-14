import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const isDev = process.env.NODE_ENV === "development";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  // Bypass CDN in dev so published content is visible immediately
  useCdn: !isDev,
});

// In dev: no caching so every page load hits the Sanity API fresh.
// In prod: 1-hour ISR with tag-based on-demand revalidation via webhook.
type FetchOpts =
  | { cache: "no-store" }
  | { next: { revalidate: number; tags: string[] } };

function fetchOpts(tags: string[]): FetchOpts {
  if (isDev) return { cache: "no-store" };
  return { next: { revalidate: 3600, tags } };
}

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// ─── Types ─────────────────────────────────────────────────────────────────────

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author?: string;
  category?: string;
  coverImage: SanityImageSource;
  excerpt?: string;
  body?: BodyBlock[];
  ctaButtons?: Array<{
    label: string;
    url: string;
    style: "primary" | "outline";
    openInNewTab: boolean;
  }>;
  template?: string;
  templateSections?: TemplateSection[];
};

export type BodyBlock =
  | { _type: "block"; [key: string]: unknown }
  | { _type: "image"; asset: SanityImageSource; alt?: string; caption?: string }
  | { _type: "videoEmbed"; url: string; caption?: string }
  | { _type: "featuredProduct"; productName: string; productSlug: string; productImage?: SanityImageSource; callToAction?: string };

// ─── Template section types ───────────────────────────────────────────────────

export type SectionBody = Array<{ _type: "block"; [key: string]: unknown }>;

export type TemplateSection =
  | { _type: "introBlock";    _key: string; body?: SectionBody }
  | {
      _type: "contentRow";    _key: string;
      imagePosition?: "left" | "right";
      image?: SanityImageSource;
      imageAlt?: string;
      body?: SectionBody;
    }
  | { _type: "fullTextBlock"; _key: string; body?: SectionBody; centered?: boolean }
  | { _type: "ctaBlock";      _key: string; body?: SectionBody; buttonLabel?: string; buttonHref?: string };

// ─── Queries ───────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt
    }`,
    {},
    fetchOpts(["posts"])
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt, body, ctaButtons,
      template,
      templateSections[] {
        _type, _key,
        body,
        centered,
        imagePosition,
        imageAlt,
        image { asset-> },
        buttonLabel,
        buttonHref
      }
    }`,
    { slug },
    fetchOpts(["posts"])
  );
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && category == $category] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt
    }`,
    { category },
    fetchOpts(["posts"])
  );
}

// ─── Product Types ────────────────────────────────────────────────────────────

export type BuyLink = {
  retailer: string;
  url: string;
  logo?: SanityImageSource;
};

export type Benefit = {
  heading: string;
  detail?: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  range: "tissue-oil" | "aqueous";
  productType: "body-cream" | "body-oil" | "petroleum-jelly" | "body-lotion";
  skinType?: string[];
  size?: string;
  badge?: string;
  shortDescription?: string;
  description?: any[];          // Portable Text blocks
  mainImage: SanityImageSource;
  galleryImages?: SanityImageSource[];
  ingredientStripImage?: SanityImageSource;
  benefits?: Benefit[];
  isItForMe?: string;
  provenResults?: string;
  ingredients?: string;
  buyLinks?: BuyLink[];         // Online retailers
  inStoreLinks?: BuyLink[];     // Physical stores
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  order?: number;
  rating?: number;              // 0–5, supports 0.5 increments
  reviewCount?: number;         // total number of reviews
};

// ─── Product Queries ──────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product"] | order(order asc) {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, mainImage, isBestseller, isNewArrival, isFeatured, order,
      rating, reviewCount,
      buyLinks[] { retailer, url, logo { asset-> } },
      inStoreLinks[] { retailer, url, logo { asset-> } }
    }`,
    {},
    fetchOpts(["products"])
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, description, mainImage, galleryImages, ingredientStripImage,
      benefits, isItForMe, provenResults, ingredients,
      buyLinks[] { retailer, url, logo { asset-> } },
      inStoreLinks[] { retailer, url, logo { asset-> } },
      isBestseller, isNewArrival, isFeatured, rating, reviewCount
    }`,
    { slug },
    fetchOpts(["products"])
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && isFeatured == true] | order(order asc) {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, mainImage, isBestseller, rating, reviewCount
    }`,
    {},
    fetchOpts(["products"])
  );
}

// ─── Range Page Types ─────────────────────────────────────────────────────────

export type RangePage = {
  // Banner 1 — hero splash
  heroImage?: SanityImageSource;
  heroMobileImage?: SanityImageSource;
  // Banner 2 — lifestyle (mother + baby)
  heroBannerImage?: SanityImageSource;
  heroBannerMobileImage?: SanityImageSource;
  heroBannerMobileImageDimensions?: { width: number; height: number };
  // Banner 3 — derm-tested
  dermBannerImage?: SanityImageSource;
  dermBannerMobileImage?: SanityImageSource;
  dermBannerMobileImageDimensions?: { width: number; height: number };
};

// ─── Range Page Queries ───────────────────────────────────────────────────────

export async function getRangePage(range: string): Promise<RangePage | null> {
  return client.fetch(
    `*[_type == "rangePage" && range == $range][0]{
      heroImage, heroMobileImage,
      heroBannerImage, heroBannerMobileImage,
      "heroBannerMobileImageDimensions": heroBannerMobileImage.asset->metadata.dimensions,
      dermBannerImage, dermBannerMobileImage,
      "dermBannerMobileImageDimensions": dermBannerMobileImage.asset->metadata.dimensions
    }`,
    { range },
    fetchOpts(["range-pages"])
  );
}

// ─── Hero Slider Types ────────────────────────────────────────────────────────

export type HeroSlide = {
  _key: string;
  desktopImage: SanityImageSource;
  mobileImage?: SanityImageSource;
  alt: string;
  url: string;
};

// ─── Hero Slider Query ────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const doc = await client.fetch(
    `*[_type == "heroSlider"][0] {
      slides[] {
        _key, alt, url,
        desktopImage { asset-> },
        mobileImage { asset-> }
      }
    }`,
    {},
    fetchOpts(["hero-slides"])
  );
  return doc?.slides ?? [];
}

// ─── Competition Types ────────────────────────────────────────────────────────

export type CompetitionTerm = {
  _key: string;
  clause: string;
  subItems?: string[];
  note?: string;
};

export type Competition = {
  _id: string;
  isActive: boolean;
  pageTitle?: string;
  introParagraph1?: string;
  introParagraph2?: string;
  heroImageDesktop?: SanityImageSource;
  heroImageMobile?: SanityImageSource;
  competitionTitle?: string;
  terms?: CompetitionTerm[];
};

// ─── Competition Query ────────────────────────────────────────────────────────

export async function getActiveCompetition(): Promise<Competition | null> {
  return client.fetch(
    `*[_type == "competition" && isActive == true][0] {
      _id, isActive, pageTitle, introParagraph1, introParagraph2,
      heroImageDesktop { asset-> },
      heroImageMobile { asset-> },
      competitionTitle,
      terms[] { _key, clause, subItems, note }
    }`,
    {},
    fetchOpts(["competition"])
  );
}

// ─── Search Queries ───────────────────────────────────────────────────────────

export async function searchProducts(query: string): Promise<Product[]> {
  const pattern = `*${query}*`;
  return client.fetch(
    `*[_type == "product" && (
      name match $pattern ||
      shortDescription match $pattern ||
      productType match $pattern ||
      range match $pattern
    )] | order(order asc) {
      _id, name, slug, range, productType, skinType, size,
      shortDescription, mainImage, isBestseller, isNewArrival
    }`,
    { pattern },
    fetchOpts(["products"])
  );
}

export async function searchPosts(query: string): Promise<Post[]> {
  const pattern = `*${query}*`;
  return client.fetch(
    `*[_type == "post" && (
      title match $pattern ||
      excerpt match $pattern
    )] | order(publishedAt desc) {
      _id, title, slug, publishedAt, coverImage, excerpt, category
    }`,
    { pattern },
    fetchOpts(["posts"])
  );
}