"use client";

import { useState, useEffect } from "react";
import BuyOnlineModal from "@/components/BuyOnlineModal";

type BuyLink = { retailer: string; url: string; logo?: any };

type Props = {
  productName: string;
  productType: string;
  productSlug: string;
  buyLinks: BuyLink[];
  inStoreLinks?: BuyLink[];
  skinType?: string[];
  isItForMe?: string;
};

const skinLabels: Record<string, string> = {
  all: "All Skin Types",
  dry: "Dry Skin",
  normal: "Normal Skin",
  sensitive: "Sensitive Skin",
  oily: "Oily Skin",
};

export default function ProductPageClient({
  productName,
  productType,
  productSlug,
  buyLinks,
  inStoreLinks = [],
  skinType,
  isItForMe,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [howToOpen, setHowToOpen] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const enc = (s: string) => encodeURIComponent(s);

  const share = {
    facebook: () =>
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${enc(pageUrl)}`, "_blank", "width=600,height=400"),
    whatsapp: () =>
      window.open(`https://wa.me/?text=${enc(productName + " " + pageUrl)}`, "_blank"),
    x: () =>
      window.open(`https://x.com/intent/tweet?text=${enc(productName)}&url=${enc(pageUrl)}`, "_blank", "width=600,height=400"),
    copy: async () => {
      try {
        await navigator.clipboard.writeText(pageUrl);
      } catch {
        const el = document.createElement("textarea");
        el.value = pageUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
  };

  return (
    <div className="flex flex-col gap-4">

      {/* ── Buy Online + Share ──
          Mobile:  button full-width on top, share icons in a row below
          Desktop: all inline in one row                                  */}
      <div className="flex flex-col md:w-xs sm:flex-row sm:items-center gap-3 sm:gap-5">

        {/* Buy Online */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full sm:flex-1 flex items-center justify-center rounded-full bg-[#112942] text-white text-[12px] tracking-[0.25em] uppercase font-semibold py-3.5 hover:bg-transparent hover:border hover:border-[#112942] hover:text-[#112942] transition-colors duration-200"
        >
          Buy Online
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <BuyOnlineModal
          productName={productName}
          productType={productType}
          productSlug={productSlug}
          buyLinks={buyLinks}
          inStoreLinks={inStoreLinks}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}