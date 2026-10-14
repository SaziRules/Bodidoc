// components/moments/TemplatePost.tsx
// Renders a Sanity post using one of the 4 bespoke-inspired template layouts.

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ArticleShell from "./ArticleShell";
import { urlFor } from "@/sanity/lib/sanity";
import type { Post, TemplateSection, SectionBody } from "@/sanity/lib/sanity";

// ─── PortableText renderer — matches the bespoke article typography ───────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ptComponents: any = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[15px] font-normal text-[#2f2f2f] dark:text-fg-body leading-[1.6]">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-5 space-y-4 marker:text-[#112942] dark:marker:text-[#5b9ac8]">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[15px] font-normal text-[#2f2f2f] dark:text-fg-body leading-[1.6]">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

// ─── Template-specific max-widths (mirrors the original 4 articles) ───────────

const TITLE_WIDTH: Record<string, string> = {
  "product-spotlight": "max-w-4xl",
  "tips-list":         "max-w-4xl",
  "sustainability":    "max-w-6xl",
  "story-campaign":    "max-w-7xl",
};

const INTRO_WIDTH: Record<string, string> = {
  "product-spotlight": "max-w-3xl",
  "tips-list":         "max-w-6xl",
  "sustainability":    "max-w-3xl",
  "story-campaign":    "max-w-5xl",
};

// ─── Section renderers ────────────────────────────────────────────────────────

function IntroBlock({ section }: { section: TemplateSection & { _type: "introBlock" } }) {
  if (!section.body?.length) return null;
  return (
    <div className="space-y-6">
      <PortableText value={section.body as any} components={ptComponents} />
    </div>
  );
}

function ContentRow({ section }: { section: TemplateSection & { _type: "contentRow" } }) {
  const imgLeft = section.imagePosition === "left";

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-4">
      {/* Text column */}
      <div
        className={`text-[15px] font-normal text-[#2f2f2f] dark:text-fg-body leading-[1.6] ${
          imgLeft ? "order-1 md:order-2" : ""
        }`}
      >
        {section.body && section.body.length > 0 && (
          <div className="space-y-6">
            <PortableText value={section.body as any} components={ptComponents} />
          </div>
        )}
      </div>

      {/* Image column */}
      {section.image && (
        <div
          className={`relative w-full max-w-175 aspect-700/500 overflow-hidden mx-auto ${
            imgLeft ? "order-2 md:order-1" : ""
          }`}
        >
          <Image
            src={urlFor(section.image).width(700).url()}
            alt={section.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}

function FullTextBlock({ section }: { section: TemplateSection & { _type: "fullTextBlock" } }) {
  if (!section.body?.length) return null;
  return (
    <div
      className={`max-w-5xl mx-auto px-4 mb-16 ${
        section.centered !== false ? "text-center" : ""
      }`}
    >
      <div className="space-y-6">
        <PortableText value={section.body as any} components={ptComponents} />
      </div>
    </div>
  );
}

function CtaBlock({ section }: { section: TemplateSection & { _type: "ctaBlock" } }) {
  const hasText = section.body && section.body.length > 0;
  const hasButton = section.buttonLabel && section.buttonHref;
  if (!hasText && !hasButton) return null;

  return (
    <div className="max-w-4xl mx-auto text-center pb-4 px-4">
      {hasText && (
        <div className="space-y-6 mb-10">
          <PortableText value={section.body as any} components={ptComponents} />
        </div>
      )}
      {hasButton && (
        <Link
          href={section.buttonHref!}
          className="inline-block bg-[#112942] text-white px-10 py-4 text-[13px] rounded-full tracking-wide uppercase font-medium hover:bg-[#1a3a5c] transition-all shadow-sm"
        >
          {section.buttonLabel}
        </Link>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TemplatePost({ post }: { post: Post }) {
  const template = post.template ?? "product-spotlight";
  const titleWidth = TITLE_WIDTH[template] ?? "max-w-4xl";
  const introWidth = INTRO_WIDTH[template] ?? "max-w-3xl";

  return (
    <ArticleShell>
      {/* Title */}
      <div className={`${titleWidth} mx-auto text-center mb-10 px-4`}>
        <h1
          className="font-display font-medium text-[#112942] dark:text-bd-dark leading-tight mb-6"
          style={{ fontSize: "clamp(26px, 4vw, 27px)" }}
        >
          {post.title}
        </h1>
      </div>

      {/* Sections */}
      {post.templateSections?.map((section) => {
        switch (section._type) {
          case "introBlock":
            return (
              <div key={section._key} className={`${introWidth} mx-auto text-center mb-16 px-4`}>
                <IntroBlock section={section} />
              </div>
            );
          case "contentRow":
            return <ContentRow key={section._key} section={section} />;
          case "fullTextBlock":
            return <FullTextBlock key={section._key} section={section} />;
          case "ctaBlock":
            return <CtaBlock key={section._key} section={section} />;
          default:
            return null;
        }
      })}
    </ArticleShell>
  );
}
