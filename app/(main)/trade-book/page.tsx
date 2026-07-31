import type { Metadata } from "next";
import LandscapeBookViewer from "@/components/LandscapeBookViewer";
import TradeBookViewer      from "@/components/TradeBookViewer";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Trade Book | Bodidoc",
  description:
    "Browse the complete Bodidoc 2025 and 2026 trade catalogues. Discover our full product range, latest launches, and key trade material — all in one place.",
  openGraph: {
    title: "Trade Book | Bodidoc",
    description:
      "Explore Bodidoc's 2025 and 2026 trade presenter catalogues. Full product range, exciting innovations, and key trade material.",
    url: "https://www.bodidoc.com/trade-book",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Book | Bodidoc",
    description:
      "Browse the complete Bodidoc trade catalogues — 2025 and 2026 editions.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/trade-book",
  },
};

export default function TradeBookPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 md:px-12 py-16 md:py-24">

        {/* Heading */}
        <div className="text-center mb-16 md:mb-24">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-[#112942] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Something for Every Bodi
          </h1>
          <p className="text-[#112942]/60 text-sm md:text-base max-w-sm mx-auto leading-relaxed"
             style={{ fontFamily: "var(--font-sans)" }}>
            Discover the latest product launches, exciting innovations, and key
            trade material from Bodidoc
          </p>
        </div>

        {/* 2026 Trade Presenter */}
        <section className="mb-6">
          <LandscapeBookViewer
            src="/docs/trade-book.pdf"
            title="Bodidoc Trade Presenter 2026"
          />
          <p className="text-center text-sm text-[#112942]/50 mt-4"
             style={{ fontFamily: "var(--font-sans)" }}>
            Bodidoc Trade Presenter 2026
          </p>
        </section>

        <div className="w-24 h-px bg-[#112942]/10 mx-auto my-20 md:my-28" />

        {/* 2025 Trade Presenter */}
        <section className="mb-6">
          <TradeBookViewer
            src="/docs/trade-book-2025.pdf"
            title="Bodidoc Trade Presenter 2025"
          />
          <p className="text-center text-sm text-[#112942]/50 mt-4"
             style={{ fontFamily: "var(--font-sans)" }}>
            Bodidoc Trade Presenter 2025
          </p>
        </section>

      </div>
    </main>
  );
}
