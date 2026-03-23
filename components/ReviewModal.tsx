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
  const [email, setEmail]                   = useState("");
  const [phone, setPhone]                   = useState("");
  const [title, setTitle]                   = useState("");
  const [message, setMessage]               = useState("");
  const [recommend, setRecommend]           = useState<"yes" | "no" | null>(null);
  const [gender, setGender]                 = useState<"male" | "female" | "prefer_not_to_say" | null>(null);
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState("");
  const [fieldErrors, setFieldErrors]       = useState<Record<string, string>>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[\d\s\-+()]{7,20}$/;
  const MIN_WORDS = 10;

  function validateAll() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Please enter a valid email address.";
    if (!phone.trim()) errs.phone = "Contact number is required.";
    else if (!PHONE_RE.test(phone.trim())) errs.phone = "Please enter a valid phone number.";
    if (!title.trim()) errs.title = "Please summarise your review in a few words.";
    else if (title.trim().length < 4) errs.title = "Title must be at least 4 characters.";
    const wordCount = message.trim().split(/\s+/).filter(Boolean).length;
    if (!message.trim()) errs.message = "Please write your review.";
    else if (wordCount < MIN_WORDS) errs.message = `Please write at least ${MIN_WORDS} words (${wordCount}/${MIN_WORDS} so far).`;
    if (selectedRating === 0) errs.rating = "Please select a star rating.";
    if (recommend === null) errs.recommend = "Please let us know if you would recommend this product.";
    if (gender === null) errs.gender = "Please select your gender.";
    return errs;
  }

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
    && name.trim().length >= 2
    && EMAIL_RE.test(email.trim())
    && phone.trim().length > 0 && PHONE_RE.test(phone.trim())
    && title.trim().length >= 4
    && message.trim().split(/\s+/).filter(Boolean).length >= MIN_WORDS
    && recommend !== null
    && gender !== null;

  const handleSubmit = async () => {
    const errs = validateAll();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (loading) return;
    setError("");
    setLoading(true);

    const { error: sbError } = await supabase
      .from("product_reviews")
      .insert({
        brand: "bodidoc",
        productSlug,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        title: title.trim(),
        message: message.trim(),
        rating: selectedRating,
        recommend,
        gender: gender ?? null,
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
    <p className="text-[11px] font-light text-[#112942] mb-1.5">
      {text} <span className="text-[#112942]">*</span>
    </p>
  );

  const fieldError = (key: string) =>
    fieldErrors[key] ? (
      <p className="text-[11px] text-red-400 font-light mt-1">{fieldErrors[key]}</p>
    ) : null;

  const inputClass = "w-full border border-[#d8d8d8] px-4 py-2.5 text-[13px] font-light text-[#333] placeholder:text-[#ccc] focus:outline-none focus:border-[#112942] transition-colors bg-white";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div
        className="relative z-10 bg-white w-full max-w-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
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
              <p className="font-display text-[20px] font-normal text-[#112942] mb-2">
                Thank you, {name}!
              </p>
              <p className="text-[13px] font-light text-[#999] leading-relaxed mb-6">
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
                <h2 className="font-display text-[20px] font-normal tracking-wide text-[#112942] uppercase">
                  Give Your Opinion
                </h2>
                <p className="text-[11px] font-light text-[#aaa] mt-1">{productName}</p>
                <div className="h-px bg-[#ebebeb] mt-4" />
              </div>

              <div className="flex flex-col gap-4">

                {/* Rating */}
                <div>
                  {fieldLabel("Give a rating")}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => { setSelectedRating(s); setFieldErrors(e => ({ ...e, rating: "" })); }}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`text-[28px] leading-none transition-colors duration-100 cursor-pointer bg-transparent border-0 p-0.5 ${
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
                  {fieldError("rating")}
                </div>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {fieldLabel("Your name")}
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value); setFieldErrors(er => ({ ...er, name: "" })); }} placeholder="e.g. Sarah M."
                      className={`${inputClass} ${fieldErrors.name ? "border-red-400 focus:border-red-400" : ""}`} />
                    {fieldError("name")}
                  </div>
                  <div>
                    {fieldLabel("Email address")}
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors(er => ({ ...er, email: "" })); }} placeholder="e.g. sarah@email.com"
                      className={`${inputClass} ${fieldErrors.email ? "border-red-400 focus:border-red-400" : ""}`} />
                    {fieldError("email")}
                  </div>
                </div>

                {/* Row 2: Review title + Contact number */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {fieldLabel("In a few words")}
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setFieldErrors(er => ({ ...er, title: "" })); }} placeholder="e.g. Transformed my skin"
                      className={`${inputClass} ${fieldErrors.title ? "border-red-400 focus:border-red-400" : ""}`} />
                    {fieldError("title")}
                  </div>
                  <div>
                    {fieldLabel("Contact number")}
                    <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setFieldErrors(er => ({ ...er, phone: "" })); }} placeholder="e.g. 071 234 5678"
                      className={`${inputClass} ${fieldErrors.phone ? "border-red-400 focus:border-red-400" : ""}`} />
                    {fieldError("phone")}
                  </div>
                </div>

                {/* Gender selector */}
                <div>
                  {fieldLabel("Gender")}
                  <div className="flex items-center gap-3">
                    {(["male", "female", "prefer_not_to_say"] as const).map((val) => {
                      const label = val === "prefer_not_to_say" ? "Prefer not to say" : val.charAt(0).toUpperCase() + val.slice(1);
                      const active = gender === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => { setGender(val); setFieldErrors(er => ({ ...er, gender: "" })); }}
                          className={`px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase font-light border transition-all duration-150 cursor-pointer ${
                            active
                              ? "bg-[#112942] text-white border-[#112942]"
                              : fieldErrors.gender
                              ? "bg-white text-[#112942] border-red-400 hover:border-[#112942]"
                              : "bg-white text-[#112942] border-[#d8d8d8] hover:border-[#112942]"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {fieldErrors.gender && (
                    <p className="text-[11px] text-red-400 font-light mt-1">{fieldErrors.gender}</p>
                  )}
                </div>

                {/* Message — full width */}
                <div>
                  {fieldLabel("Tell us more")}
                  <textarea rows={3} value={message} onChange={(e) => { setMessage(e.target.value); setFieldErrors(er => ({ ...er, message: "" })); }}
                    placeholder="Share your experience with this product…"
                    className={`${inputClass} resize-none ${fieldErrors.message ? "border-red-400 focus:border-red-400" : ""}`} />
                  <div className="flex items-center justify-between mt-1">
                    {fieldErrors.message
                      ? <p className="text-[11px] text-red-400 font-light">{fieldErrors.message}</p>
                      : <span />
                    }
                    <p className="text-[10px] font-light text-[#ccc]">
                      {message.trim().split(/\s+/).filter(Boolean).length} / {MIN_WORDS} words min
                    </p>
                  </div>
                </div>

                {/* Recommend */}
                <div>
                  {fieldLabel("Would you recommend this product to a friend?")}
                  <div className="flex items-center gap-5 mt-1">
                    {(["yes", "no"] as const).map((val) => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer select-none">
                        <button
                          type="button"
                          onClick={() => { setRecommend(val); setFieldErrors(er => ({ ...er, recommend: "" })); }}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-150 cursor-pointer bg-transparent p-0 shrink-0 ${
                            recommend === val ? "border-[#112942] bg-[#112942]" : "border-[#bbb] bg-white hover:border-[#112942]"
                          }`}
                          aria-label={val}
                        >
                          {recommend === val && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                        <span onClick={() => { setRecommend(val); setFieldErrors(er => ({ ...er, recommend: "" })); }} className="text-[11px] font-light tracking-widest uppercase text-[#555] cursor-pointer">
                          {val === "yes" ? "Yes" : "No"}
                        </span>
                      </label>
                    ))}
                  </div>
                  {fieldError("recommend")}
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