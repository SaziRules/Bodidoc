import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroSlider",
  title: "Hero Slider",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal label only",
      initialValue: "Home Page Hero Slider",
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "desktopImage",
              title: "Desktop Image",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile Image",
              type: "image",
              options: { hotspot: true },
              description: "If omitted, desktop image is used on mobile",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "Link URL",
              type: "string",
              description: "e.g. /shop/product-slug",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "alt", media: "desktopImage" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
