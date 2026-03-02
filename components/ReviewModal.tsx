"use client";

import { useState, useEffect } from "react";

type Props = {
  productName: string;
  onClose: () => void;
};

export default function ReviewModal({ productName, onClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Lock scroll + Escape key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = () => {
    if (!selectedRating || !name.trim() || !review.trim()) return;
    // TODO: wire to your reviews API / Sanity mutation
    setSubmitted(true);
  };

  const displayRating = hoverRating || selectedRating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full max-w-115 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#112942]/30 hover:text-[#112942] transition-colors z-10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-7">
          {/* Header */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-1">
            Customer Review
          </p>
          <h2 className="font-display text-[19px] font-normal text-[#112942] leading-snug mb-1 pr-8">
            {productName}
          </h2>
          <div className="h-px bg-[#ebebeb] mb-6 mt-5" />

          {submitted ? (
            /* ── Success state ── */
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#112942] flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-display text-[18px] font-normal text-[#112942] mb-2">
                Thank you, {name}!
              </p>
              <p className="text-[13px] font-light text-[#999] mb-6">
                Your review has been submitted and is awaiting approval.
              </p>
              <button
                onClick={onClose}
                className="flex items-center justify-center rounded-full bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase font-light px-6 py-3 hover:bg-[#1a3a5c] transition-colors duration-200 mx-auto"
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div className="flex flex-col gap-4">

              {/* Star picker */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-2">
                  Your Rating
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-[28px] leading-none transition-colors cursor-pointer ${
                        s <= displayRating ? "text-[#112942]" : "text-[#e0e0e0]"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  {selectedRating > 0 && (
                    <span className="text-[11px] font-light text-[#999] ml-2">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selectedRating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah M."
                  className="w-full border border-[#e0e0e0] px-4 py-3 text-[13px] font-light text-[#333] placeholder-[#ccc] focus:outline-none focus:border-[#112942] transition-colors bg-white"
                />
              </div>

              {/* Review body */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#112942]/40 font-light mb-1.5">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this product…"
                  className="w-full border border-[#e0e0e0] px-4 py-3 text-[13px] font-light text-[#333] placeholder-[#ccc] focus:outline-none focus:border-[#112942] transition-colors bg-white resize-none"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!selectedRating || !name.trim() || !review.trim()}
                className="flex items-center justify-center rounded-full bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase font-light px-6 py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed self-start mt-1"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}