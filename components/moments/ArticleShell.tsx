// components/moments/ArticleShell.tsx
// Shared wrapper for all bespoke articles — provides the page chrome
// (breadcrumb, max-width container, back link) that every article shares.

import Link from "next/link";

export default function ArticleShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white">

      {/* ── Back link ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-0">
        <Link
          href="/moments"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#112942] font-light hover:gap-3 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Moments
        </Link>
      </div>

      {/* ── Article content ── */}
      <article className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        {children}
      </article>

    </div>
  );
}