import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/sanity";
import AsSeenIn from "@/components/AsSeenIn";
import { ReadMoreGrid } from "@/components/moments/ReadMoreGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Moments | Bodidoc",
  description:
    "Discover Bodidoc's latest news, sustainability initiatives, and skin-care stories. Every moment tells a story — explore articles, milestones, and tips from the Bodidoc team.",
  openGraph: {
    title: "Moments | Bodidoc",
    description:
      "Read about Bodidoc's sustainability efforts, brand milestones, and skin-care insights. Stories that inspire and inform.",
    url: "https://www.bodidoc.com/moments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moments | Bodidoc",
    description:
      "Every moment tells a story — explore Bodidoc news, sustainability initiatives, and skin-care tips.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/moments",
  },
};

// ─── The 4 original hardcoded articles, mapped to the 4 featured page slots ──
// slot 0 → Featured hero
// slot 1 → Sustainability column 2
// slot 2 → Sustainability column 3
// slot 3 → What's On
const LEGACY_SLUGS = [
  "transform-dry-uneven-skin-with-the-award-winning-bodidoc-tissue-oil-cream-with-urea",
  "beyond-the-bin-give-your-bodidoc-packaging-a-second-life",
  "our-commitment-to-sustainable-packaging",
  "embracing-your-bodi-a-journey-of-self-love-and-acceptance",
] as const;

const LEGACY_SLUG_SET = new Set<string>(LEGACY_SLUGS);

export default async function MomentsPage() {
  const posts = await getAllPosts();

  // Split into new dynamic articles and the original 4
  const dynamicPosts = posts.filter((p) => !LEGACY_SLUG_SET.has(p.slug.current));
  const legacyPosts  = posts.filter((p) =>  LEGACY_SLUG_SET.has(p.slug.current));
  const legacyBySlug = Object.fromEntries(legacyPosts.map((p) => [p.slug.current, p]));

  // Each of the 4 featured slots is filled by the next dynamic article,
  // falling back to its designated legacy article when there are fewer than 4 new posts.
  const slots = LEGACY_SLUGS.map((slug, i) => dynamicPosts[i] ?? legacyBySlug[slug]);
  const [featured, sustainabilityArticle, commitmentArticle, embracingBodi] = slots;

  // Displaced legacy articles (their slot was taken by a dynamic article).
  // With < 4 dynamic posts they appear immediately in "Read More".
  // With 4+ dynamic posts they move behind a "Show More" button.
  const displacedLegacy = LEGACY_SLUGS
    .slice(0, dynamicPosts.length)
    .map((slug) => legacyBySlug[slug])
    .filter(Boolean);

  const readMoreImmediate = [
    ...dynamicPosts.slice(4),                                   // dynamic articles beyond the 4 slots
    ...(dynamicPosts.length < 4 ? displacedLegacy : []),        // displaced legacy (visible immediately)
  ];
  const readMorePaginated = dynamicPosts.length >= 4 ? displacedLegacy : []; // hidden behind Show More

  const hasReadMore = readMoreImmediate.length > 0 || readMorePaginated.length > 0;

  return (
    <div className="w-full bg-white dark:bg-page font-sans overflow-x-hidden">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="max-w-300 mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="font-display italic text-[35px] md:text-[35px] text-[#112942] dark:text-bd-dark leading-[1.1] mb-4">
          Every moment tells a story
        </h1>
        <p className="text-[15px] font-normal text-[#112942] dark:text-fg-body tracking-normal">
          Discover how Bodidoc is making an impact, one milestone at a time
        </p>
      </div>

      {/* ── Featured hero ──────────────────────────────────────────────── */}
      {featured && (
        <div className="max-w-300 mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right">
              <Link href={`/moments/${featured.slug.current}`}>
                <h2 className="font-display text-[36px] md:text-[27px] text-[#112942] dark:text-bd-dark leading-[1.1] mb-6 hover:opacity-75 transition-opacity">
                  {featured.title}
                </h2>
              </Link>
              <p className="text-[14px] font-normal text-[#112942] dark:text-fg-body leading-relaxed mb-8 max-w-sm">
                {featured.excerpt}
              </p>
              <Link
                href={`/moments/${featured.slug.current}`}
                className="px-10 py-3 bg-[#112942] text-white text-[12px] tracking-wide font-semibold uppercase rounded-full hover:bg-[#1a3a5a] transition-all"
              >
                Full Article
              </Link>
            </div>
            <Link
              href={`/moments/${featured.slug.current}`}
              className="md:col-span-7 relative aspect-[1.9/1] w-full block"
            >
              {featured.coverImage && (
                <Image
                  src={urlFor(featured.coverImage).width(1000).url()}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </Link>
          </div>
        </div>
      )}

      <AsSeenIn />

      {/* ── Sustainability section ─────────────────────────────────────── */}
      <div className="w-full bg-[#f2f2f2] dark:bg-surface py-14 mt-20">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Column 1: intro copy (always static) */}
            <div className="flex flex-col">
              <h2 className="font-display italic text-[36px] text-[#112942] dark:text-bd-dark mb-6">Sustainability</h2>
              <div className="space-y-5 text-[14px] text-[#112942] dark:text-fg-body font-normal leading-relaxed">
                <p>Good skin shouldn&apos;t cost the earth. At Bodidoc, we&apos;re committed to creating products that care for your skin and the planet.</p>
                <p>Explore how we embrace eco-friendly practices, from sustainable packaging to reusability, ensuring a future that&apos;s as radiant as your skin.</p>
              </div>
            </div>
            {/* Column 2 */}
            {sustainabilityArticle && (
              <Link href={`/moments/${sustainabilityArticle.slug.current}`} className="flex flex-col group">
                <div className="relative aspect-[1.4/1] mb-6 bg-white dark:bg-elevated overflow-hidden">
                  {sustainabilityArticle.coverImage && (
                    <Image src={urlFor(sustainabilityArticle.coverImage).url()} alt="" fill className="object-cover" />
                  )}
                </div>
                <h3 className="font-display text-[20px] text-[#112942] dark:text-bd-dark leading-tight mb-4">{sustainabilityArticle.title}</h3>
                <p className="text-[13px] text-[#2f2f2f] dark:text-fg-body font-normal leading-relaxed line-clamp-4">{sustainabilityArticle.excerpt}</p>
              </Link>
            )}
            {/* Column 3 */}
            {commitmentArticle && (
              <Link href={`/moments/${commitmentArticle.slug.current}`} className="flex flex-col group">
                <div className="relative aspect-[1.4/1] mb-6 bg-white dark:bg-elevated overflow-hidden">
                  {commitmentArticle.coverImage && (
                    <Image src={urlFor(commitmentArticle.coverImage).url()} alt="" fill className="object-cover" />
                  )}
                </div>
                <h3 className="font-display text-[20px] text-[#112942] dark:text-bd-dark leading-tight mb-4">{commitmentArticle.title}</h3>
                <p className="text-[13px] text-[#2f2f2f] dark:text-fg-body font-normal leading-relaxed line-clamp-4">{commitmentArticle.excerpt}</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── What's On ──────────────────────────────────────────────────── */}
      <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="mb-6">
          <h2 className="font-display italic text-[36px] text-[#112942] dark:text-bd-dark mb-0">What&apos;s On</h2>
          <p className="text-[15px] text-[#112942] dark:text-fg-body font-normal tracking-normal">Moments that bring us together</p>
        </div>

        {embracingBodi && (
          <div className="w-full bg-[#e9e9e9] dark:bg-elevated flex flex-col md:flex-row overflow-hidden min-h-100">
            <div className="md:w-1/2 p-12 lg:p-20 flex flex-col justify-center items-start">
              <Link href={`/moments/${embracingBodi.slug.current}`}>
                <h3 className="font-display text-[32px] md:text-[23px] text-[#112942] dark:text-bd-dark leading-[1.15] mb-6 hover:opacity-75 transition-opacity">
                  {embracingBodi.title}
                </h3>
              </Link>
              <p className="text-[14px] text-[#2f2f2f] dark:text-fg-body font-normal leading-relaxed mb-10 max-w-sm">
                {embracingBodi.excerpt}
              </p>
              <Link
                href={`/moments/${embracingBodi.slug.current}`}
                className="px-10 py-3.5 bg-[#112942] text-white text-[12px] tracking-wide font-semibold uppercase rounded-full hover:bg-opacity-90 transition-all"
              >
                FULL ARTICLE
              </Link>
            </div>
            <Link
              href={`/moments/${embracingBodi.slug.current}`}
              className="md:w-1/2 relative min-h-100 bg-[#e5e5e5] dark:bg-[#253244] m-4 block"
            >
              {embracingBodi.coverImage && (
                <Image
                  src={urlFor(embracingBodi.coverImage).url()}
                  alt={embracingBodi.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </Link>
          </div>
        )}
      </div>

      {/* ── Read More ──────────────────────────────────────────────────── */}
      {hasReadMore && (
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 pb-32">
          <h2 className="font-display not-italic text-[36px] text-[#112942] dark:text-bd-dark mb-6 pt-2">
            Read <span className="font-display italic text-[#112942] dark:text-bd-dark">more</span>
          </h2>
          <ReadMoreGrid immediate={readMoreImmediate} paginated={readMorePaginated} />
        </div>
      )}
    </div>
  );
}
