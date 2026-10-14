import { defineType, defineField } from "sanity";

export const competitionType = defineType({
  name: "competition",
  title: "Competition",
  type: "document",
  fields: [
    defineField({
      name: "isActive",
      title: "Active on website",
      type: "boolean",
      description:
        "Toggle ON to show this competition on bodidoc.com/competitions. Only one competition should be active at a time.",
      initialValue: false,
    }),
    defineField({
      name: "pageTitle",
      title: "Page Heading",
      type: "string",
      initialValue: "Competitions & Giveaways",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introParagraph1",
      title: "Intro Paragraph 1",
      type: "text",
      rows: 3,
      initialValue:
        "Stay in the loop with our latest competitions. Find entry details, prize info, and the official terms and conditions all in one place.",
    }),
    defineField({
      name: "introParagraph2",
      title: "Intro Paragraph 2",
      type: "text",
      rows: 3,
      initialValue:
        "You’re already taking care of your skin—now let us reward you for it. Simply buy any participating Bodidoc product in-store, enter the competition, and you could win your share!",
    }),
    defineField({
      name: "heroImageDesktop",
      title: "Hero Image — Desktop",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown on md+ screens. Falls back to the static competition banner if left empty.",
    }),
    defineField({
      name: "heroImageMobile",
      title: "Hero Image — Mobile",
      type: "image",
      options: { hotspot: true },
      description: "Shown on small screens. Falls back to the desktop image if left empty.",
    }),
    defineField({
      name: "competitionTitle",
      title: "Terms Section Heading",
      type: "string",
      initialValue: "BODIDOC CONSUMER COMPETITION TERMS & CONDITIONS",
    }),
    defineField({
      name: "terms",
      title: "Terms & Conditions Clauses",
      type: "array",
      description:
        "Each item is one numbered clause. Add sub-items for a, b, c… lists beneath a clause.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "clause",
              title: "Clause text",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subItems",
              title: "Sub-items (a, b, c…)",
              type: "array",
              of: [{ type: "string" }],
              description: "Optional alphabetical sub-list under this clause.",
            }),
            defineField({
              name: "note",
              title: "Follow-up note",
              type: "text",
              rows: 2,
              description:
                "Optional paragraph shown after the sub-items (e.g. USSD charges disclaimer).",
            }),
          ],
          preview: {
            select: { title: "clause" },
            prepare({ title }: { title?: string }) {
              return {
                title: title
                  ? title.length > 80
                    ? title.slice(0, 80) + "…"
                    : title
                  : "Clause",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "pageTitle", subtitle: "isActive" },
    prepare({ title, subtitle }: { title?: string; subtitle?: boolean }) {
      return {
        title: title ?? "Competition",
        subtitle: subtitle ? "🟢 Active" : "⚫ Inactive",
      };
    },
  },
});
