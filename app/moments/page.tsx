import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/sanity/lib/sanity";
import type { Post } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/sanity";
import AsSeenIn from "@/components/AsSeenIn";

// ─── Category label map ───────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "skin-care-tips": "Skin Care Tips",
  "ingredients": "Ingredients",
  "brand-news": "Brand News",
  "sustainability": "Sustainability",
  "community": "Community",
};

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-ZA", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <Link
      href={`/moments/${post.slug.current}`}
      className={`group flex flex-col overflow-hidden ${featured ? "md:flex-row md:gap-10" : ""}`}
    >
      {/* Cover image */}
      <div className={`relative overflow-hidden bg-[#f5f5f5] ${featured ? "md:w-1/2 aspect-4/3 md:aspect-auto md:h-auto" : "aspect-4/3"}`}>
        {post.coverImage && (
          <Image
            src={urlFor(post.coverImage).width(featured ? 900 : 600).height(featured ? 600 : 400).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        )}
        {post.category && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-white text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light">
            {categoryLabels[post.category] ?? post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center ${featured ? "md:w-1/2 py-6 md:py-0" : "pt-5"}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-light text-[#999] tracking-wide">{formattedDate}</span>
          {post.author && (
            <>
              <span className="text-[#e0e0e0]">·</span>
              <span className="text-[11px] font-light text-[#999]">{post.author}</span>
            </>
          )}
        </div>
        <h2 className={`font-display font-normal text-[#112942] leading-snug mb-3 group-hover:opacity-70 transition-opacity duration-200 ${featured ? "text-[26px] md:text-[32px]" : "text-[20px]"}`}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-[13px] font-light text-[#666] leading-relaxed line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light group-hover:gap-3 transition-all duration-200">
          Read More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MomentsPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="w-full">

      {/* ── Dark hero ── */}
      <div className="relative w-full bg-[#112942] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span className="font-display font-normal text-white/4 whitespace-nowrap leading-none" style={{ fontSize: "clamp(80px, 18vw, 220px)" }}>
            Moments
          </span>
        </div>
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-5">The Bodidoc Journal</p>
          <h1 className="font-display font-normal text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>
            Moments
          </h1>
          <p className="text-[14px] md:text-[15px] font-light text-white/55 max-w-sm leading-relaxed">
            Skin tips, ingredient stories, community moments and everything in between.
          </p>
        </div>
      </div>

      {/* ── Posts ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">

        {posts.length === 0 && (
          <p className="text-[14px] font-light text-[#999]">No posts yet — check back soon.</p>
        )}

        {/* Featured (latest) post */}
        {featured && (
          <div className="mb-0 pb-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-[#112942]/30" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light">Latest</p>
            </div>

            <Link
              href={`/moments/${featured.slug.current}`}
              className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-[#e8e8e8] hover:border-[#112942]/20 transition-colors duration-300"
            >
              {/* Image — tall, fills left column */}
              <div className="relative overflow-hidden bg-[#f0eeeb] min-h-85 md:min-h-105">
                {featured.coverImage && (
                  <Image
                    src={urlFor(featured.coverImage).width(900).height(800).url()}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                )}
                {featured.category && (
                  <span className="absolute top-5 left-5 px-3 py-1 bg-white text-[10px] tracking-[0.15em] uppercase text-[#112942] font-light">
                    {categoryLabels[featured.category] ?? featured.category}
                  </span>
                )}
              </div>

              {/* Content panel — navy, mirrors the article hero style */}
              <div className="relative flex flex-col justify-between bg-[#112942] px-8 py-10 md:px-12 md:py-14 overflow-hidden">
                {/* Ghosted year watermark */}
                <span className="absolute bottom-0 right-0 font-display text-[130px] leading-none text-white/4 select-none pointer-events-none translate-x-4 translate-y-4">
                  {new Date(featured.publishedAt).getFullYear()}
                </span>

                <div className="relative z-10 flex flex-col gap-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light">
                    The Bodidoc Journal
                  </p>
                  <h2 className="font-display font-normal text-white leading-[1.1]" style={{ fontSize: "clamp(26px, 3.5vw, 40px)" }}>
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-[13px] font-light text-white/50 leading-relaxed line-clamp-4">
                      {featured.excerpt}
                    </p>
                  )}
                </div>

                <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col gap-4">
                  {/* Author + date */}
                  <div className="flex items-center gap-3">
                    {featured.author && (
                      <span className="text-[12px] font-light text-white/50">{featured.author}</span>
                    )}
                    {featured.author && <span className="text-white/20">·</span>}
                    <span className="text-[12px] font-light text-white/40">
                      {new Date(featured.publishedAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>

                  {/* Read more CTA */}
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-white/60 font-light group-hover:gap-3 group-hover:text-white transition-all duration-200">
                    Read Article
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

      </div>

      {/* ── As Seen In — sits directly below Latest ── */}
      <AsSeenIn />

      {/* ── Rest of posts ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-16 md:pb-20">
        {/* Rest of posts — 3 column grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {rest.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}