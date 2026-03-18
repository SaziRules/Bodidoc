import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

// Server-side Supabase client
const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Review = {
  id: string;
  name: string;
  title: string;
  message: string;
  rating: number;
  recommend: string | null;
  created_at: string;
};

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ fontSize: size }}
          className={`leading-none ${s <= rating ? "text-[#112942]" : "text-[#ddd]"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getProductReviews(productSlug: string): Promise<Review[]> {
  const { data } = await supabaseServer
    .from("product_reviews")
    .select("id, name, title, message, rating, recommend, created_at")
    .eq("brand", "bodidoc")
    .eq("productSlug", productSlug)
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Review[];
}

// ─── Left panel: stats ────────────────────────────────────────────────────────

export function ReviewStats({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const avg         = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const recommended = reviews.filter((r) => r.recommend === "yes").length;
  const pct         = Math.round((recommended / reviews.length) * 100);

  return (
    <div className="flex flex-col gap-5">
      {/* Big percentage */}
      <div>
        <p
          className="font-normal italic text-[#112942] leading-none mb-2"
          style={{ fontSize: "clamp(40px, 5vw, 42px)" }}
        >
          {pct}%
        </p>
        <p className="text-[15px] font-normal text-[#2f2f2f] leading-relaxed">
          Customers would recommend this product to a friend.
        </p>
      </div>

      <div className="h-px bg-[#e8e8e8]" />

      {/* Average stars + count */}
      <div className="flex items-center gap-2 flex-wrap">
        <Stars rating={Math.round(avg * 2) / 2} size={15} />
        <span className="text-[12px] text-[#999] leading-none">
          ({reviews.length} Review{reviews.length !== 1 ? "s" : ""})
        </span>
      </div>
    </div>
  );
}

// ─── Right panel: review cards ────────────────────────────────────────────────

export function ReviewCards({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="p-8 flex flex-col gap-2">
        <p className="text-[15px] font-normal text-[#333]">No reviews yet.</p>
        <p className="text-[15px] font-light text-[#999]">
          Be the first to share your experience with this product.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#e8e8e8]">
      {reviews.map((r) => (
        <div key={r.id} className="flex gap-6 py-7 px-6 md:px-8">

          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-2 shrink-0 w-28">
            <Image
              src="/icons/user.png"
              alt={r.name}
              width={56}
              height={56}
              className="rounded-full object-cover w-14 h-14"
            />
            <p className="text-[14px] font-bold text-[#112942] text-center leading-tight wrap-break-word w-full">
              {r.name}
            </p>
          </div>

          {/* Review content */}
          <div className="flex-1 min-w-0">
            {/* Title row: title left, date right */}
            <div className="flex items-start justify-between gap-4 mb-1.5">
              <p className="text-[15px] font-semibold text-[#112942] leading-snug">
                {r.title}
              </p>
              <p className="text-[11px] font-light text-[#bbb] shrink-0 mt-0.5">
                {formatDate(r.created_at)}
              </p>
            </div>

            {/* Stars + recommends badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <Stars rating={r.rating} size={16} />
              {r.recommend === "yes" && (
                <span className="text-[10px] tracking-[0.08em] uppercase font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  Recommends
                </span>
              )}
            </div>

            {/* Message */}
            <p className="text-[14px] font-normal text-[#555] leading-relaxed">
              {r.message}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
}