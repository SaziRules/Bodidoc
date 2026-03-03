// sanity/schemaTypes/rangePage.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "rangePage",
  title: "Range Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", description: "Internal label e.g. Aqueous Range Page", validation: (Rule) => Rule.required() }),
    defineField({ name: "range", title: "Range", type: "string", options: { list: [{ title: "Aqueous", value: "aqueous" }, { title: "Tissue Oil", value: "tissue-oil" }] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "heroImage", title: "Hero Banner — Desktop", type: "image", description: "Ref: Hero.png. Recommended 1536x536px.", options: { hotspot: true } }),
    defineField({ name: "heroMobileImage", title: "Hero Banner — Mobile (optional)", type: "image", description: "Portrait crop. If omitted desktop image is used full-width.", options: { hotspot: true } }),
    defineField({ name: "heroBannerImage", title: "Lifestyle Banner — Desktop", type: "image", description: "Ref: SecondBanner.png. Recommended 1536x536px.", options: { hotspot: true } }),
    defineField({ name: "heroBannerMobileImage", title: "Lifestyle Banner — Mobile (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "dermBannerImage", title: "Derm-Tested Banner — Desktop", type: "image", description: "Ref: ThirdBanner.png. Recommended 1536x384px.", options: { hotspot: true } }),
    defineField({ name: "dermBannerMobileImage", title: "Derm-Tested Banner — Mobile (optional)", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "title", range: "range", media: "heroImage" },
    prepare({ title, range, media }) { return { title: title ?? "Range Page", subtitle: range, media }; },
  },
});