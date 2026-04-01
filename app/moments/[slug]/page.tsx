// app/moments/[slug]/page.tsx
// Routing layer: checks slug and renders bespoke article or falls back to Sanity

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug } from "@/sanity/lib/sanity";

// ─── Bespoke article components ──────────────────────────────────────────────
import ArticleAwardWinning        from "@/components/moments/ArticleAwardWinning";
import ArticleSustainablePackaging from "@/components/moments/ArticleSustainablePackaging";
import ArticleBeyondTheBin        from "@/components/moments/ArticleBeyondTheBin";
import ArticleEmbracingYourBodi   from "@/components/moments/ArticleEmbracingYourBodi";

// ─── Generic Sanity renderer (your existing setup) ───────────────────────────
import GenericPost from "@/components/moments/GenericPost";

const BESPOKE: Record<string, React.ComponentType> = {
  "transform-dry-uneven-skin-with-the-award-winning-bodidoc-tissue-oil-cream-with-urea": ArticleAwardWinning,
  "our-commitment-to-sustainable-packaging": ArticleSustainablePackaging,
  "beyond-the-bin-give-your-bodidoc-packaging-a-second-life": ArticleBeyondTheBin,
  "embracing-your-bodi-a-journey-of-self-love-and-acceptance": ArticleEmbracingYourBodi,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Bodidoc`,
    description: post.excerpt ?? `${post.title} — Bodidoc.`,
  };
}

export default async function MomentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const BespokeComponent = BESPOKE[slug];
  if (BespokeComponent) {
    return <BespokeComponent />;
  }

  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <GenericPost post={post} />;
}