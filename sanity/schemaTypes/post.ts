import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
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
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary shown on the blog listing card",
      type: "text",
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
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
        // Inline image
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        // Inline video (URL embed — YouTube/Vimeo)
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
            prepare: (value: Record<string, any>) => {
              const title = value.title || "";
              return { title: `Video: ${title}` };
            },
          },
        },
        // Featured product reference
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
            prepare: (value: Record<string, any>) => {
              const title = value.title || "";
              return { title: `Featured: ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Buttons",
      description: "Optional call-to-action buttons shown at the end of the article",
      type: "array",
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