import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "range",
      title: "Range",
      type: "string",
      options: {
        list: [
          { title: "Tissue Oil Range", value: "tissue-oil" },
          { title: "Aqueous Range", value: "aqueous" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Body Cream", value: "body-cream" },
          { title: "Body Oil", value: "body-oil" },
          { title: "Petroleum Jelly", value: "petroleum-jelly" },
          { title: "Body Lotion", value: "body-lotion" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "skinType",
      title: "Skin Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "All Skin Types", value: "all" },
          { title: "Dry Skin", value: "dry" },
          { title: "Normal Skin", value: "normal" },
          { title: "Sensitive Skin", value: "sensitive" },
          { title: "Oily Skin", value: "oily" },
        ],
        layout: "tags",
      },
    }),
    defineField({
      name: "size",
      title: "Size / Volume",
      type: "string",
      description: "e.g. 250ML, 500ML",
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional badge e.g. NEW, BESTSELLER, AWARD WINNING",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      description: "One sentence shown on the product card and hero panel",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Product Description",
      description: "Full paragraph(s) shown on the product page below the short description — supports bold, italic, and links",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Product Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "ingredientStripImage",
      title: "Ingredient Strip / Banner Image",
      description: "The wide ingredient highlight banner shown on the product page (Featherlight / Quick Absorption etc.)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      description: "Each benefit shown with a checkmark",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "detail", type: "text", title: "Detail (optional)", rows: 2 },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "isItForMe",
      title: "Is It For Me?",
      type: "text",
      rows: 4,
      description: "Who this product is recommended for and how to use it",
    }),
    defineField({
      name: "provenResults",
      title: "Proven Results",
      description: "Dermatological testing claims and statistics (each result shown with a checkmark)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "detail", type: "text", title: "Detail (optional)", rows: 2 },
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "buyLinks",
      title: "Buy Online Links",
      description: "Links to retailers, WhatsApp, or other purchase channels",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "retailer", type: "string", title: "Retailer / Channel Name" },
            { name: "url", type: "url", title: "URL" },
            {
              name: "logo",
              type: "image",
              title: "Retailer Logo (optional)",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "retailer", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "inStoreLinks",
      title: "Find In-store Links",
      description: "Physical retail locations where this product can be found",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "retailer", type: "string", title: "Retailer / Store Name" },
            { name: "url",      type: "url",    title: "URL (store locator or info page)" },
            {
              name: "logo",
              type: "image",
              title: "Retailer Logo (optional)",
              options: { hotspot: true },
            },
          ],
          preview: { select: { title: "retailer", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "isBestseller",
      title: "Bestseller?",
      type: "boolean",
      initialValue: false,
    }),
    // ── NEW ──────────────────────────────────────────────────────────────────
    defineField({
      name: "isNewArrival",
      title: "New Arrival?",
      type: "boolean",
      initialValue: false,
    }),
    // ─────────────────────────────────────────────────────────────────────────
    defineField({
      name: "isFeatured",
      title: "Featured on homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      description: "Average star rating 0–5 (supports decimals e.g. 4.5)",
      validation: (r) => r.min(0).max(5),
      initialValue: 0,
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      description: "Total number of customer reviews",
      validation: (r) => r.min(0).integer(),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "range",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      const rangeLabel = subtitle === "tissue-oil" ? "Tissue Oil Range" : "Aqueous Range";
      return { title, subtitle: rangeLabel, media };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});