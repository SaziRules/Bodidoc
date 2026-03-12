"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  productName: string;
  productSlug: string;
  onClose: () => void;
};

export default function ReviewModal({ productName, productSlug, onClose }: Props) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating]       = useState(0);
  const [name, setName]                     = useState("");
  const [title, setTitle]                   = useState("");
  const [message, setMessage]               = useState("");
  const [recommend, setRecommend]           = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const canSubmit = selectedRating > 0
    && name.trim().length > 0
    && title.trim().length > 0
    && message.trim().length > 0
    && recommend !== null;

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;
    setError("");
    setLoading(true);

    const { error: sbError } = await supabase
      .from("product_reviews")
      .insert({
        brand: "bodidoc",
        productSlug,
        name: name.trim(),
        title: title.trim(),
        message: message.trim(),
        rating: selectedRating,
        recommend,
        approved: false,
      });

    setLoading(false);

    if (sbError) {
      console.error("Review submit error:", sbError.message, sbError.code, sbError.details, sbError.hint);
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  const displayRating = hoverRating || selectedRating;

  const ratingLabel = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selectedRating] ?? "";

  const fieldLabel = (text: string) => (
    <p className="text-[13px] font-normal text-[#112942] mb-1.5">
      {text} <span className="text-[#112942]">*</span>
    </p>
  );

  const inputClass = "w-full border border-[#d8d8d8] px-4 py-2.5 text-[13px] font-light text-[#333] placeholder:text-[#ccc] focus:outline-none focus:border-[#112942] transition-colors bg-white";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        className="relative z-10 bg-white w-full max-w-md shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#112942]/30 hover:text-[#112942] transition-colors z-10 bg-transparent border-0 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-8">

          {submitted ? (
            /* ── Success ── */
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#112942] flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-display text-[20px] font-medium text-[#112942] mb-2">
                Thank you, {name}!
              </p>
              <p className="text-[14px] font-medium text-[#999] leading-relaxed mb-6">
                Your review has been submitted and is<br />awaiting approval.
              </p>
              <button
                onClick={onClose}
                className="rounded-full bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase font-light px-8 py-3 hover:bg-[#1a3a5c] transition-colors duration-200 border-0 cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div className="text-center mb-6">
                <h2 className="font-display text-[27px] font-medium tracking-wide text-[#112942] uppercase">
                  Give Your Opinion
                </h2>
                
                <div className="h-px bg-[#ebebeb] mt-4" />
              </div>

              <div className="flex flex-col gap-5">

                {/* Rating */}
                <div>
                  {fieldLabel("Give a rating")}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`text-[25px] leading-none transition-colors duration-100 cursor-pointer bg-transparent border-0 p-0.5 ${
                          s <= displayRating ? "text-[#112942]" : "text-[#ddd]"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    {ratingLabel && (
                      <span className="text-[11px] font-light text-[#aaa] ml-2">{ratingLabel}</span>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  {fieldLabel("Your name")}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah M."
                    className={inputClass}
                  />
                </div>

                {/* Title — "In a few words" */}
                <div>
                  {fieldLabel("In a few words")}
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Transformed my skin overnight"
                    className={inputClass}
                  />
                </div>

                {/* Message — "Tell us more" */}
                <div>
                  {fieldLabel("Tell us more")}
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your experience with this product…"
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-[10px] font-light text-[#ccc] text-right mt-1">* Required text</p>
                </div>

                {/* Recommend */}
                <div>
                  {fieldLabel("Would you recommend this product to a friend?")}
                  <div className="flex items-center gap-5 mt-1">
                    {(["yes", "no"] as const).map((val) => (
                      <label
                        key={val}
                        className="flex items-center gap-2 cursor-pointer select-none"
                      >
                        {/* Custom radio */}
                        <button
                          type="button"
                          onClick={() => setRecommend(val)}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-150 cursor-pointer bg-transparent p-0 shrink-0
                            ${recommend === val
                              ? "border-[#112942] bg-[#112942]"
                              : "border-[#bbb] bg-white hover:border-[#112942]"
                            }`}
                          aria-label={val}
                        >
                          {recommend === val && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </button>
                        <span
                          onClick={() => setRecommend(val)}
                          className="text-[11px] font-light tracking-widest uppercase text-[#555] cursor-pointer"
                        >
                          {val === "yes" ? "Yes" : "No"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-[11.5px] text-red-400 font-light text-center">{error}</p>
                )}

                {/* Submit */}
                <div className="flex justify-center pt-1">
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || loading}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase font-light px-10 py-3.5 hover:bg-[#1a3a5c] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed border-0 cursor-pointer"
                  >
                    {loading && (
                      <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                    )}
                    {loading ? "Submitting…" : "Share My Comment"}
                  </button>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}