// components/moments/GenericPost.tsx
// Renders any standard Sanity post — title, cover image, body via PortableText

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { Post } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/sanity";
import ArticleShell from "./ArticleShell";

export default function GenericPost({ post }: { post: Post }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ArticleShell>

      {/* ── Title ── */}
      <h1
        className="font-display font-normal text-[#112942] text-center leading-tight mb-4"
        style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}
      >
        {post.title}
      </h1>

      {/* ── Meta ── */}
      <p className="text-[12px] tracking-[0.2em] uppercase text-[#aaa] text-center mb-8">
        {formattedDate}
        {post.author && <> &nbsp;·&nbsp; {post.author}</>}
      </p>

      {/* ── Cover image ── */}
      {post.coverImage && (
        <div className="relative w-full aspect-16/7 overflow-hidden mb-10">
          <Image
            src={urlFor(post.coverImage).width(1400).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ── Excerpt ── */}
      {post.excerpt && (
        <p className="text-[16px] font-normal text-[#333] text-center leading-relaxed mb-10 max-w-3xl mx-auto">
          {post.excerpt}
        </p>
      )}

      {/* ── Body ── */}
      {post.body && post.body.length > 0 && (
        <div className="prose prose-lg max-w-3xl mx-auto text-[#333] [&_h2]:font-display [&_h2]:font-normal [&_h2]:text-[#112942] [&_a]:text-[#112942] [&_a]:underline [&_strong]:font-semibold">
          <PortableText value={post.body} />
        </div>
      )}

    </ArticleShell>
  );
}