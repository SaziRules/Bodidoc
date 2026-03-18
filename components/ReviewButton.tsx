"use client";

import { useState } from "react";
import ReviewModal from "@/components/ReviewModal";

export default function ReviewButton({ productName, productSlug }: { productName: string; productSlug: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-1 self-start flex items-center justify-center rounded-full bg-[#112942] text-white text-[11px] tracking-[0.15em] uppercase font-semibold px-7 py-3 hover:bg-[#1a3a5c] transition-colors duration-200"
      >
        Give Your Opinion
      </button>

      {modalOpen && (
        <ReviewModal
          productName={productName}
          productSlug={productSlug}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}