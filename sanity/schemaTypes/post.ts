import { defineType, defineField } from "sanity";
import { TemplateSelector } from "../components/TemplateSelector";
import { ContentRowInput } from "../components/ContentRowInput";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    // ─── 1. Layout picker (shown first so the editor chooses the layout before anything else) ───
    defineField({
      name: "template",
      title: "Article Layout",
      type: "string",
      description:
        "Pick the layout for this article. Choose first — it controls which fields appear below.",
      initialValue: "generic",
      components: { input: TemplateSelector },
    }),

    // ─── 2. Article sections (template-based articles only) ──────────────────────────────────
    defineField({
      name: "templateSections",
      title: "Article Sections",
      description:
        "Build the article by adding sections below. Each section maps to a block in the chosen layout.",
      type: "array",
      hidden: ({ document }: any) =>
        !document?.template || document?.template === "generic",
      of: [
        // ── Intro / Lead ─────────────────────────────────────────────────────────────────────
        {
          type: "object",
          name: "introBlock",
          title: "Intro / Lead paragraph",
          fields: [
            {
              name: "body",
              title: "Intro text",
              description: "Opening paragraph(s) shown centred at the top of the article.",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: "body" },
            prepare({ title }: any) {
              const text = title?.[0]?.children?.[0]?.text ?? "Intro block";
              return { title: `📝 Intro — ${text.slice(0, 50)}` };
            },
          },
        },

        // ── Content Row (Text + Image side-by-side) ───────────────────────────────────────────
        {
          type: "object",
          name: "contentRow",
          title: "Content Row — Text + Image",
          components: { input: ContentRowInput },
          fields: [
            {
              name: "imagePosition",
              title: "Image position",
              description: "Should the image appear on the left or right side of the text?",
              type: "string",
              options: {
                list: [
                  { title: "Image on the RIGHT, text on the left", value: "right" },
                  { title: "Image on the LEFT, text on the right", value: "left" },
                ],
                layout: "radio",
              },
              initialValue: "right",
            },
            {
              name: "image",
              title: "Image",
              description: "The image that sits beside the text in this row.",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "imageAlt",
              title: "Image alt text",
              description: "Describe the image for accessibility (e.g. 'Woman applying body cream').",
              type: "string",
            },
            {
              name: "body",
              title: "Text content",
              description: "The paragraph(s) that appear beside the image. Supports bold, italic and bullet points.",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                  lists: [{ title: "Bullet", value: "bullet" }],
                },
              ],
            },
          ],
          preview: {
            select: { title: "imageAlt", subtitle: "imagePosition", media: "image" },
            prepare({ title, subtitle, media }: any) {
              const label = title ? `Row — ${title}` : "Content Row";
              const pos = subtitle === "left" ? "🖼 Image LEFT" : "🖼 Image RIGHT";
              return { title: label, subtitle: pos, media };
            },
          },
        },

        // ── Full Width Text ───────────────────────────────────────────────────────────────────
        {
          type: "object",
          name: "fullTextBlock",
          title: "Full Width Text",
          fields: [
            {
              name: "body",
              title: "Text",
              description: "A block of text that spans the full width of the article.",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                },
              ],
            },
            {
              name: "centered",
              title: "Center text",
              description: "Tick to centre the text horizontally on the page.",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: { title: "body" },
            prepare({ title }: any) {
              const text = title?.[0]?.children?.[0]?.text ?? "Text block";
              return { title: `📄 Text — ${text.slice(0, 50)}` };
            },
          },
        },

        // ── Call to Action ────────────────────────────────────────────────────────────────────
        {
          type: "object",
          name: "ctaBlock",
          title: "Call to Action button",
          fields: [
            {
              name: "body",
              title: "Closing text (optional)",
              description: "A short sentence or two above the button.",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  marks: {
                    decorators: [
                      { title: "Bold", value: "strong" },
                      { title: "Italic", value: "em" },
                    ],
                  },
                },
              ],
            },
            {
              name: "buttonLabel",
              title: "Button label",
              description: "The text that appears on the button (e.g. 'Shop Now').",
              type: "string",
            },
            {
              name: "buttonHref",
              title: "Button link",
              description: "Internal path (e.g. /shop) or a full URL.",
              type: "string",
            },
          ],
          preview: {
            select: { title: "buttonLabel" },
            prepare({ title }: any) {
              return { title: `🔘 CTA — ${title ?? "(no label yet)"}` };
            },
          },
        },
      ],
    }),

    // ─── 3. Core article fields ───────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Skin Care Tips", value: "skin-care-tips" },
          { title: "Ingredients", value: "ingredients" },
          { title: "Brand News", value: "brand-news" },
          { title: "Sustainability", value: "sustainability" },
          { title: "Community", value: "community" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description: "Used as the article hero image and for social sharing previews.",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on the blog listing card (max 200 characters).",
      type: "text",
      rows: 3,
      validation: (r) => r.max(200),
    }),

    // ─── 4. Standard (generic) article body — hidden for template articles ────────────────────
    defineField({
      name: "body",
      title: "Body",
      description: "Article body — only used when the layout is set to Standard.",
      type: "array",
      hidden: ({ document }: any) =>
        document?.template && document?.template !== "generic",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        {
          name: "videoEmbed",
          title: "Video Embed",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "Video URL (YouTube or Vimeo)" },
            { name: "caption", type: "string", title: "Caption" },
          ],
          preview: {
            select: { title: "url" },
            prepare: (value: Record<string, any>) => ({ title: `Video: ${value.title || ""}` }),
          },
        },
        {
          name: "featuredProduct",
          title: "Featured Product",
          type: "object",
          fields: [
            { name: "productName", type: "string", title: "Product Name" },
            { name: "productSlug", type: "string", title: "Product Slug (URL)" },
            { name: "productImage", type: "image", title: "Product Image", options: { hotspot: true } },
            { name: "callToAction", type: "string", title: "Button Label", initialValue: "Shop Now" },
          ],
          preview: {
            select: { title: "productName" },
            prepare: (value: Record<string, any>) => ({ title: `Featured: ${value.title || ""}` }),
          },
        },
      ],
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      description: "Optional call-to-action buttons shown at the end of a Standard article.",
      type: "array",
      hidden: ({ document }: any) =>
        document?.template && document?.template !== "generic",
      of: [
        {
          name: "ctaButton",
          title: "Button",
          type: "object",
          fields: [
            {
              name: "label",
              title: "Button Label",
              type: "string",
              validation: (r) => r.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (r) =>
                r.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
            },
            {
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Primary (Navy fill)", value: "primary" },
                  { title: "Outline (Navy border)", value: "outline" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
            },
            {
              name: "openInNewTab",
              title: "Open in new tab?",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
  orderings: [
    {
      title: "Published Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
