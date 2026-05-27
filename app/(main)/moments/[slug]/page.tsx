// app/moments/[slug]/page.tsx
// Routing layer: checks slug and renders bespoke article or falls back to Sanity

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts, urlFor } from "@/sanity/lib/sanity";

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

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const bespokeKeys = Object.keys(BESPOKE);
  const postSlugs = posts.map((p) => ({ slug: p.slug.current }));
  const bespokeSlugs = bespokeKeys
    .filter((s) => !postSlugs.some((p) => p.slug === s))
    .map((s) => ({ slug: s }));
  return [...postSlugs, ...bespokeSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;
  return {
    title: `${post.title} | Bodidoc`,
    description: post.excerpt ?? `${post.title} — Bodidoc.`,
    openGraph: {
      title: `${post.title} | Bodidoc`,
      description: post.excerpt ?? `${post.title} — Bodidoc.`,
      url: `https://www.bodidoc.com/moments/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Bodidoc`,
      description: post.excerpt ?? `${post.title} — Bodidoc.`,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `https://www.bodidoc.com/moments/${slug}`,
    },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Bodidoc",
      url: "https://www.bodidoc.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Bodidoc",
      url: "https://www.bodidoc.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bodidoc.com/bodidoc-favicon.png",
      },
    },
    url: `https://www.bodidoc.com/moments/${slug}`,
    ...(post.coverImage && {
      image: urlFor(post.coverImage).width(1200).height(630).url(),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <GenericPost post={post} />
    </>
  );
}