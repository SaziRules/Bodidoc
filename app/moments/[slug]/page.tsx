import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPostBySlug, getAllPosts, urlFor } from "@/sanity/lib/sanity";
import ShareBar from "@/components/ShareBar";
import ReadingProgress from "@/components/ReadingProgress";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Bodidoc Moments`,
    description: post.excerpt ?? `Read ${post.title} on the Bodidoc Journal.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage
        ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }]
        : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage
        ? [urlFor(post.coverImage).width(1200).height(630).url()]
        : [],
    },
  };
}

// ─── Reading time ─────────────────────────────────────────────────────────────

function getReadingTime(body: unknown[]): number {
  const text = body
    .filter((b: any) => b._type === "block")
    .flatMap((b: any) => b.children?.map((c: any) => c.text ?? "") ?? [])
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ─── Category labels ──────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "skin-care-tips": "Skin Care Tips",
  "ingredients": "Ingredients",
  "brand-news": "Brand News",
  "sustainability": "Sustainability",
  "community": "Community",
};

// ─── Rich text components ─────────────────────────────────────────────────────

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[16.5px] font-light text-[#3d3d3d] leading-[1.95] mb-7 tracking-[0.01em]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-[26px] md:text-[32px] font-normal text-[#112942] mt-16 mb-5 leading-tight">
        {/* Decorative rule before h2 */}
        <span className="block w-8 h-0.5 bg-[#112942]/20 mb-4" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[20px] font-normal text-[#112942] mt-10 mb-4 leading-snug">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative my-14 mx-0">
        {/* Left bar */}
        <span className="absolute left-0 top-0 bottom-0 w-75 bg-[#112942]" />
        {/* Big decorative quote mark */}
        <span className="absolute -top-6 left-6 font-display text-[100px] leading-none text-[#112942]/08 select-none pointer-events-none">
          &ldquo;
        </span>
        <div className="pl-8 pr-4 py-2">
          <p className="font-display text-[21px] md:text-[24px] font-normal text-[#112942] leading-normal italic">
            {children}
          </p>
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#112942]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-[#555]">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-3 decoration-[#112942]/30">{children}</span>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#112942] border-b border-[#112942]/25 hover:border-[#112942] transition-colors duration-200 pb-px font-normal"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <div
          className="relative w-full overflow-hidden bg-[#f5f5f5]"
          style={{ aspectRatio: "16/12" }}
        >
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-[12px] font-light text-[#aaa] text-center tracking-wide italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    videoEmbed: ({ value }) => {
      let embedUrl = value.url;
      if (embedUrl.includes("youtube.com/watch")) {
        const id = new URL(embedUrl).searchParams.get("v");
        embedUrl = `https://www.youtube.com/embed/${id}?rel=0`;
      } else if (embedUrl.includes("youtu.be/")) {
        const id = embedUrl.split("youtu.be/")[1].split("?")[0];
        embedUrl = `https://www.youtube.com/embed/${id}?rel=0`;
      } else if (embedUrl.includes("vimeo.com/")) {
        const id = embedUrl.split("vimeo.com/")[1];
        embedUrl = `https://player.vimeo.com/video/${id}`;
      }
      return (
        <figure className="my-12">
          <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={embedUrl}
              title="Video"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-[12px] font-light text-[#aaa] text-center tracking-wide italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    featuredProduct: ({ value }) => (
      <div className="my-14 flex flex-col sm:flex-row items-center gap-6 bg-[#f8f6f3] p-6 md:p-8 border border-[#e8e4de]">
        {value.productImage && (
          <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-white">
            <Image
              src={urlFor(value.productImage).width(200).url()}
              alt={value.productName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light">
            Featured Product
          </p>
          <p className="font-display text-[20px] font-normal text-[#112942]">
            {value.productName}
          </p>
          <Link
            href={`/product/${value.productSlug}`}
            className="group relative self-center sm:self-start overflow-hidden inline-block px-7 py-2 border border-[#112942] text-[11px] tracking-[0.15em] uppercase font-light text-[#112942] hover:text-white transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">{value.callToAction ?? "Shop Now"}</span>
          </Link>
        </div>
      </div>
    ),
  },
};

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const readingTime = post.body ? getReadingTime(post.body as unknown[]) : 1;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const postUrl = `https://bodidoc.co.za/moments/${post.slug.current}`;

  return (
    <>
      <ReadingProgress />

      <article
        className="w-full"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* ── Header section — contained, not full bleed ── */}
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 pt-12 md:pt-16 pb-0">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10">
            <Link
              href="/moments"
              className="text-[11px] tracking-[0.15em] uppercase font-light text-[#999] hover:text-[#112942] transition-colors"
            >
              Moments
            </Link>
            <span className="text-[#ddd]">/</span>
            {post.category && (
              <span className="text-[11px] tracking-[0.15em] uppercase font-light text-[#112942]/60">
                {categoryLabels[post.category] ?? post.category}
              </span>
            )}
          </div>

          {/* ── Split: image left | info panel right ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-14 border border-[#e8e8e8] overflow-hidden">

            {/* Image — left */}
            {post.coverImage && (
              <div className="relative w-full overflow-hidden bg-[#f0eeeb] min-h-75 md:min-h-105">
                <Image
                  src={urlFor(post.coverImage).width(900).height(700).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                {post.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light">
                    {categoryLabels[post.category] ?? post.category}
                  </span>
                )}
              </div>
            )}

            {/* Info panel — right */}
            <div className="flex flex-col justify-between bg-[#112942] p-8 md:p-10 relative overflow-hidden">

              {/* Decorative large number / watermark */}
              <span className="absolute bottom-0 right-0 font-display text-[160px] leading-none text-white/4 select-none pointer-events-none translate-x-4 translate-y-6">
                {new Date(post.publishedAt).getFullYear()}
              </span>

              {/* Top section */}
              <div className="flex flex-col gap-6 relative z-10">
                {/* Tiny label */}
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light">
                  The Bodidoc Journal
                </p>

                {/* Title */}
                <h1
                  itemProp="headline"
                  className="font-display text-[24px] md:text-[28px] font-normal text-white leading-[1.15]"
                >
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-[13px] font-light text-white/55 leading-relaxed line-clamp-4">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Bottom meta */}
              <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col gap-3">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 opacity-60">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <span className="text-[12px] font-light text-white/60">{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-light text-white/40">{formattedDate}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-[11px] font-light text-white/40">{readingTime} min read</span>
                </div>

                {/* Decorative dots */}
                <div className="flex items-center gap-1.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="w-1 h-1 rounded-full bg-white/20"
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Body + sidebar ── */}
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 pb-20">
          <div className="flex gap-14 lg:gap-20">

            {/* Sticky share sidebar — desktop only */}
            <aside className="hidden lg:flex flex-col items-center gap-4 pt-1 sticky top-24 self-start w-10 shrink-0">
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-[#bbb] font-light whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Share
              </span>
              <div className="w-px h-6 bg-[#e8e8e8]" />
              <ShareBar url={postUrl} title={post.title} vertical />
            </aside>

            {/* Article body */}
            <div className="flex-1 min-w-0 max-w-170" itemProp="articleBody">

              <PortableText value={post.body as any} components={components} />

              {/* ── CTA Buttons ── */}
              {post.ctaButtons && post.ctaButtons.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#e8e8e8] flex flex-wrap gap-3">
                  {post.ctaButtons.map((btn, i) => (
                    <a
                      key={i}
                      href={btn.url}
                      target={btn.openInNewTab ? "_blank" : "_self"}
                      rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
                      className={`group relative overflow-hidden inline-block px-8 py-3 text-[12px] tracking-[0.15em] uppercase font-light transition-colors duration-300 ${
                        btn.style === "outline"
                          ? "border border-[#112942] text-[#112942] hover:text-white"
                          : "border border-[#112942] bg-[#112942] text-white hover:text-white"
                      }`}
                    >
                      {btn.style === "outline" && (
                        <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      )}
                      {btn.style === "primary" && (
                        <span className="absolute inset-0 bg-[#1a3a5c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      )}
                      <span className="relative flex items-center gap-2">
                        {btn.label}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              )}

              {/* Filed under */}
              {post.category && (
                <div className="mt-14 pt-8 border-t border-[#e8e8e8] flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] font-light">
                    Filed under
                  </span>
                  <Link
                    href={`/moments?category=${post.category}`}
                    className="px-3 py-1 border border-[#112942]/15 text-[11px] tracking-widest uppercase text-[#112942] font-light hover:bg-[#112942] hover:text-white hover:border-[#112942] transition-all duration-200"
                  >
                    {categoryLabels[post.category] ?? post.category}
                  </Link>
                </div>
              )}

              {/* Mobile share */}
              <div className="mt-10 lg:hidden">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#bbb] font-light mb-4">
                  Share this post
                </p>
                <ShareBar url={postUrl} title={post.title} />
              </div>

              {/* Back */}
              <div className="mt-12 pt-8 border-t border-[#e8e8e8]">
                <Link
                  href="/moments"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light hover:gap-3 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to Moments
                </Link>
              </div>

            </div>
          </div>
        </div>
      </article>
    </>
  );
}