"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/sanity";
import type { Post } from "@/sanity/lib/sanity";

interface ReadMoreGridProps {
  immediate: Post[];  // always visible
  paginated: Post[];  // behind "Show More" (legacy articles displaced at 4+ dynamic posts)
}

export function ReadMoreGrid({ immediate, paginated }: ReadMoreGridProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? [...immediate, ...paginated] : immediate;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {visible.map((post) => (
          <Link key={post._id} href={`/moments/${post.slug.current}`} className="group flex flex-col">
            <div className="relative aspect-4/3 mb-6 overflow-hidden bg-[#f8f8f8] dark:bg-subtle">
              {post.coverImage && (
                <Image
                  src={urlFor(post.coverImage).width(600).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>
            <h3 className="font-display text-[22px] text-[#112942] dark:text-bd-dark leading-tight mb-3">
              {post.title}
            </h3>
            <p className="text-[14px] text-[#666] dark:text-fg-body font-light line-clamp-3 mb-6">
              {post.excerpt}
            </p>
            <span className="inline-block w-fit px-8 py-2.5 bg-[#112942] text-white text-[10px] tracking-wide uppercase rounded-full group-hover:bg-[#1a3a5a] transition-colors">
              Full Article
            </span>
          </Link>
        ))}
      </div>

      {!expanded && paginated.length > 0 && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setExpanded(true)}
            className="px-10 py-3 border border-[#112942] text-[#112942] dark:border-bd-dark dark:text-bd-dark text-[12px] tracking-wide font-semibold uppercase rounded-full hover:bg-[#112942] hover:text-white dark:hover:bg-bd-dark dark:hover:text-page transition-all"
          >
            Show More Articles
          </button>
        </div>
      )}
    </>
  );
}
