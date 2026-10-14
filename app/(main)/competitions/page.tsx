import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getActiveCompetition,
  urlFor,
  type Competition,
} from "@/sanity/lib/sanity";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Competitions & Giveaways | Bodidoc",
  description:
    "Win your share of R250,000 in cash prizes with the Bodidoc competition! Buy any participating Bodidoc product, enter via WhatsApp or USSD, and stand a chance to win. Open to South African residents 18+.",
  openGraph: {
    title: "Competitions & Giveaways | Bodidoc",
    description:
      "Enter the Bodidoc competition for a chance to win R250,000 in cash prizes. Buy any participating product and enter via WhatsApp or USSD. Open to SA residents 18+.",
    url: "https://www.bodidoc.com/competitions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Competitions & Giveaways | Bodidoc",
    description:
      "Win your share of R250,000! Buy a Bodidoc product and enter via WhatsApp or USSD. Open to South African residents 18+.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/competitions",
  },
};

const lx =
  "text-[#112942] dark:text-[#5b9ac8] underline underline-offset-2 hover:opacity-60 transition-opacity";

// ─── SVG icons ────────────────────────────────────────────────────────────────

function TrophySVG() {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Cup body */}
      <path
        d="M22 10 L78 10 L68 58 Q62 80 50 84 Q38 80 32 58 Z"
        fill="white"
        fillOpacity="0.07"
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Left handle */}
      <path
        d="M24 22 Q5 22 5 42 Q5 60 24 60"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right handle */}
      <path
        d="M76 22 Q95 22 95 42 Q95 60 76 60"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Star */}
      <path
        d="M50 28 L53.5 37.5 L63 37.5 L55.8 43.2 L58.4 52.5 L50 46.8 L41.6 52.5 L44.2 43.2 L37 37.5 L46.5 37.5 Z"
        fill="white"
        fillOpacity="0.25"
        stroke="white"
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Stem */}
      <line
        x1="50" y1="84" x2="50" y2="98"
        stroke="white" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Platform */}
      <line
        x1="40" y1="98" x2="60" y2="98"
        stroke="white" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Base */}
      <rect
        x="28" y="103" width="44" height="9" rx="2.5"
        fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.5" strokeWidth="2"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <path
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function TrophySmallIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden="true">
      <path
        d="M7 4H5a1 1 0 00-1 1v1a5 5 0 004.635 4.986M17 4h2a1 1 0 011 1v1a5 5 0 01-4.635 4.986"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M7 4h10v5a5 5 0 01-10 0V4z"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="12" y1="14" x2="12" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FacebookSVG() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  );
}

function InstagramSVG() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function TikTokSVG() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
    </svg>
  );
}

function TwitterSVG() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M389.2 48H458L312.1 215.6 484 464H349.4L241.6 318.6 107.6 464H39L194.9 289.5 24 48H162.6L260.1 180.3 389.2 48zM365.6 421.8h38.1L141.8 88.5h-40.9z" />
    </svg>
  );
}

function YouTubeSVG() {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://www.facebook.com/bodidoc/", icon: <FacebookSVG />, label: "Facebook" },
  { href: "https://www.instagram.com/bodidoc/", icon: <InstagramSVG />, label: "Instagram" },
  { href: "https://www.tiktok.com/@bodidoc.africa", icon: <TikTokSVG />, label: "TikTok" },
  { href: "https://x.com/bodidoc_sa", icon: <TwitterSVG />, label: "X (Twitter)" },
  {
    href: "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q/featured",
    icon: <YouTubeSVG />,
    label: "YouTube",
  },
];

const entrySteps = [
  {
    icon: <BagIcon />,
    title: "Buy any participating product",
    desc: "Pick up any qualifying Bodidoc product at a participating retail store or online platform across South Africa.",
  },
  {
    icon: <MessageIcon />,
    title: "Enter via WhatsApp or USSD",
    desc: "WhatsApp us at +2710 442 5331 or dial *120*15564# and follow the prompts. Keep your till slip as proof of purchase.",
  },
  {
    icon: <TrophySmallIcon />,
    title: "Win your share of the prizes",
    desc: "Winners are randomly drawn and notified within 48 hours. Cash prizes are paid directly into your South African bank account.",
  },
];

// ─── No competition state ─────────────────────────────────────────────────────

function NoCompetitionPage() {
  return (
    <div className="w-full bg-white dark:bg-page min-h-screen">

      {/* 1 — Hero */}
      <section className="relative w-full bg-[#112942] py-24 md:py-36 overflow-hidden">
        {/* Subtle radial glow behind trophy */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
        />

        {/* Decorative dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute top-12 left-[18%] w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="absolute top-20 left-[32%] w-1 h-1 rounded-full bg-white/15" />
          <span className="absolute top-10 right-[22%] w-2 h-2 rounded-full bg-white/10" />
          <span className="absolute top-28 right-[35%] w-1 h-1 rounded-full bg-white/20" />
          <span className="absolute bottom-16 left-[25%] w-1.5 h-1.5 rounded-full bg-white/15" />
          <span className="absolute bottom-10 right-[28%] w-1 h-1 rounded-full bg-white/20" />
          <span className="absolute bottom-24 right-[15%] w-2 h-2 rounded-full bg-white/10" />
        </div>

        <div className="relative max-w-300 mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-8">
          {/* Trophy */}
          <div className="w-24 h-28 md:w-28 md:h-32 text-white">
            <TrophySVG />
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="font-display text-[34px] md:text-[50px] leading-tight text-white">
              No Competition Running Right Now
            </h1>
            <p className="text-[15px] md:text-[16px] text-white/70 leading-relaxed max-w-lg mx-auto">
              Check back soon — our next exciting competition could be just around
              the corner. Follow us on social to be the first to know.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white text-[#112942] text-[12px] font-bold tracking-widest uppercase hover:bg-white/90 transition-colors"
            >
              Shop the Range
            </Link>
            <a
              href="#stay-connected"
              className="px-8 py-3.5 border border-white/40 text-white text-[12px] font-bold tracking-widest uppercase hover:border-white/70 hover:bg-white/5 transition-colors"
            >
              Follow Us
            </a>
          </div>
        </div>
      </section>

      {/* 2 — How it works */}
      <section className="w-full bg-[#f7f7f7] dark:bg-subtle py-16 md:py-24">
        <div className="max-w-300 mx-auto px-6 md:px-10">
          <div className="mb-10 md:mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#112942]/50 dark:text-bd-muted uppercase mb-3">
              HOW IT WORKS
            </p>
            <h2 className="font-display text-[26px] md:text-[36px] text-[#112942] dark:text-bd-dark">
              Enter in three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {entrySteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-full bg-[#112942] dark:bg-[#1c2a3a] border-2 border-[#112942] dark:border-[#5b9ac8] flex items-center justify-center shrink-0">
                  <span className="text-white font-display text-[18px] leading-none select-none">
                    {i + 1}
                  </span>
                </div>
                <div className="w-8 h-8 text-[#112942]/50 dark:text-accent">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#112942] dark:text-bd-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#555] dark:text-fg-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Past prizes */}
      <section className="w-full bg-white dark:bg-page py-16 md:py-24">
        <div className="max-w-300 mx-auto px-6 md:px-10">
          <div className="mb-10 md:mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#112942]/50 dark:text-bd-muted uppercase mb-3">
              OUR LAST COMPETITION
            </p>
            <h2 className="font-display text-[26px] md:text-[36px] text-[#112942] dark:text-bd-dark">
              R250 000 given away
            </h2>
            <p className="text-[14px] text-[#555] dark:text-fg-secondary leading-relaxed mt-3 max-w-xl">
              In our last competition we gave thirteen lucky South Africans their
              share of R250,000 in cash prizes — and our next one could be even
              bigger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
            {/* Weekly prizes */}
            <div className="border border-[#e8e8e8] dark:border-bd-border p-7 md:p-8">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#112942]/50 dark:text-bd-muted mb-5">
                WEEKLY PRIZES
              </p>
              <p className="font-display text-[48px] md:text-[56px] text-[#112942] dark:text-bd-dark leading-none mb-3">
                R100K
              </p>
              <p className="text-[13px] text-[#555] dark:text-fg-secondary leading-relaxed">
                Ten weekly cash prizes of{" "}
                <span className="font-semibold text-[#112942] dark:text-bd-dark">R10,000 each</span>
                , drawn every week over 8 weeks.
              </p>
            </div>

            {/* Grand prizes */}
            <div className="border border-[#112942] dark:border-[#5b9ac8] bg-[#112942] dark:bg-[#1c2a3a] p-7 md:p-8">
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50 mb-5">
                GRAND PRIZES
              </p>
              <p className="font-display text-[48px] md:text-[56px] text-white leading-none mb-3">
                R150K
              </p>
              <p className="text-[13px] text-white/70 leading-relaxed">
                Three grand cash prizes of{" "}
                <span className="font-semibold text-white">R50,000 each</span>
                , drawn at the end of the competition period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — Stay connected */}
      <section
        id="stay-connected"
        className="w-full bg-[#112942] py-16 md:py-24"
      >
        <div className="max-w-300 mx-auto px-6 md:px-10 flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-4 max-w-xl">
            <h2 className="font-display text-[28px] md:text-[42px] text-white">
              Be the first to know
            </h2>
            <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed">
              Follow Bodidoc on social media for competition announcements,
              winner reveals, and exclusive giveaway news delivered straight to
              your feed.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Bodidoc on ${label}`}
                className="group w-14 h-14 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#112942] hover:border-white transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-[10px] tracking-[0.25em] uppercase text-white/25">
            Follow us to stay in the loop
          </p>
        </div>
      </section>

      {/* 5 — Explore the range */}
      <section className="w-full bg-[#f7f7f7] dark:bg-subtle py-16 md:py-24">
        <div className="max-w-300 mx-auto px-6 md:px-10 text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#112942]/50 dark:text-bd-muted mb-3">
            IN THE MEANTIME
          </p>
          <h2 className="font-display text-[26px] md:text-[36px] text-[#112942] dark:text-bd-dark mb-4">
            Discover our range
          </h2>
          <p className="text-[14px] text-[#555] dark:text-fg-secondary leading-relaxed max-w-xl mx-auto mb-8">
            Every Bodidoc product you love could be your golden ticket in our
            next competition. Shop our full range and discover what your skin
            has been missing.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-[#112942] dark:bg-[#1c2a3a] text-white px-8 py-3.5 text-[12px] font-bold tracking-widest uppercase hover:bg-[#1a3d5c] dark:hover:bg-[#243348] transition-colors"
          >
            Shop All Products
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}

// ─── Active competition page ──────────────────────────────────────────────────

function ActiveCompetitionPage({ competition }: { competition: Competition }) {
  const desktopSrc = competition.heroImageDesktop
    ? urlFor(competition.heroImageDesktop).width(1920).url()
    : null;
  const mobileSrc = competition.heroImageMobile
    ? urlFor(competition.heroImageMobile).width(768).url()
    : competition.heroImageDesktop
    ? urlFor(competition.heroImageDesktop).width(768).url()
    : null;

  const pageTitle = competition.pageTitle ?? "Competitions & Giveaways";
  const intro1 =
    competition.introParagraph1 ??
    "Stay in the loop with our latest competitions. Find entry details, prize info, and the official terms and conditions all in one place.";
  const intro2 = competition.introParagraph2;
  const termsTitle =
    competition.competitionTitle ??
    "BODIDOC CONSUMER COMPETITION TERMS & CONDITIONS";

  return (
    <div className="w-full bg-white dark:bg-page min-h-screen pb-20">
      <div className="max-w-300 mx-auto px-6 md:px-10 py-12 md:py-16">

        {/* Hero banner */}
        <div className="w-full mb-12">
          {desktopSrc ? (
            <>
              <Image
                src={desktopSrc}
                alt="Bodidoc competition hero"
                width={1920}
                height={640}
                priority
                className="hidden md:block w-full object-cover rounded-lg"
              />
              <Image
                src={mobileSrc ?? desktopSrc}
                alt="Bodidoc competition hero"
                width={768}
                height={512}
                priority
                className="block md:hidden w-full object-cover rounded-lg"
              />
            </>
          ) : (
            <>
              <img
                src="/images/competition-desktop.webp"
                alt="Bodidoc competition hero desktop"
                className="hidden md:block w-full object-cover rounded-lg"
              />
              <img
                src="/images/competition-mobile.png"
                alt="Bodidoc competition hero mobile"
                className="block md:hidden w-full object-cover rounded-lg"
              />
            </>
          )}
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[42px] font-display text-[#112942] dark:text-bd-dark">
            {pageTitle}
          </h1>
        </div>

        {/* Intro copy */}
        <div className="mb-10 text-[14px] leading-relaxed text-[#333] dark:text-fg-body space-y-4 max-w-4xl">
          {intro1 && <p>{intro1}</p>}
          {intro2 && <p>{intro2}</p>}
        </div>

        {/* T&Cs */}
        <div className="space-y-12 max-w-4xl">
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] dark:text-bd-dark mb-4 uppercase tracking-tight">
              {termsTitle}
            </h2>

            {competition.terms && competition.terms.length > 0 ? (
              <ol className="list-decimal pl-6 space-y-3 text-[14px] leading-relaxed text-[#333] dark:text-fg-body">
                {competition.terms.map((term) => (
                  <li key={term._key}>
                    {term.clause}
                    {term.subItems && term.subItems.length > 0 && (
                      <ol className="list-[lower-alpha] pl-6 space-y-1 mt-2">
                        {term.subItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ol>
                    )}
                    {term.note && <p className="mt-2">{term.note}</p>}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-[14px] text-[#555] dark:text-fg-secondary italic">
                Terms and conditions will be published shortly.
              </p>
            )}
          </section>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CompetitionsPage() {
  const competition = await getActiveCompetition();

  if (competition?.isActive) {
    return <ActiveCompetitionPage competition={competition} />;
  }

  return <NoCompetitionPage />;
}
