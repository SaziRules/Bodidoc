"use client";

import { useState } from "react";
import ReviewModal from "@/components/ReviewModal";

export default function ReviewButton({ productName }: { productName: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="mt-1 self-start flex items-center justify-center rounded-full bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase font-light px-6 py-3 hover:bg-[#1a3a5c] transition-colors duration-200"
      >
        Give Your Opinion
      </button>

      {modalOpen && (
        <ReviewModal
          productName={productName}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}