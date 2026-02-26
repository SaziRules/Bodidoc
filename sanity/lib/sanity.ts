import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

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
};

export type BodyBlock =
  | { _type: "block"; [key: string]: unknown }
  | { _type: "image"; asset: SanityImageSource; alt?: string; caption?: string }
  | { _type: "videoEmbed"; url: string; caption?: string }
  | { _type: "featuredProduct"; productName: string; productSlug: string; productImage?: SanityImageSource; callToAction?: string };

// ─── Queries ───────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt, body, ctaButtons
    }`,
    { slug }
  );
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && category == $category] | order(publishedAt desc) {
      _id, title, slug, publishedAt, author, category, coverImage, excerpt
    }`,
    { category }
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
  mainImage: SanityImageSource;
  galleryImages?: SanityImageSource[];
  ingredientStripImage?: SanityImageSource;
  benefits?: Benefit[];
  isItForMe?: string;
  provenResults?: string;
  ingredients?: string;
  buyLinks?: BuyLink[];
  isBestseller?: boolean;
  isFeatured?: boolean;
  order?: number;
};

// ─── Product Queries ──────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product"] | order(order asc) {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, mainImage, isBestseller, isFeatured, order
    }`
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, mainImage, galleryImages, ingredientStripImage,
      benefits, isItForMe, provenResults, ingredients, buyLinks,
      isBestseller, isFeatured
    }`,
    { slug }
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && isFeatured == true] | order(order asc) {
      _id, name, slug, range, productType, skinType, size, badge,
      shortDescription, mainImage, isBestseller
    }`
  );
}