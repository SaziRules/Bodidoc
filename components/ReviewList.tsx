import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (works in RSC — anon key, public reads only)
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

export function ReviewStats({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const avg         = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const recommended = reviews.filter((r) => r.recommend === "yes").length;
  const pct         = Math.round((recommended / reviews.length) * 100);

  // Distribution
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100),
  }));

  return (
    <div className="flex flex-col gap-5">
      {/* Big number */}
      <div>
        <p
          className="font-display font-normal text-[#112942] leading-none mb-1"
          style={{ fontSize: "clamp(36px, 5vw, 48px)" }}
        >
          {pct}%
        </p>
        <p className="text-[13px] font-light text-[#666] leading-relaxed">
          of customers would recommend this product.
        </p>
      </div>

      <div className="h-px bg-[#e8e8e8]" />

      {/* Average stars */}
      <div className="flex items-center gap-2">
        <Stars rating={Math.round(avg * 2) / 2} size={15} />
        <span className="text-[12px] text-[#999] leading-none">
          {avg.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
        </span>
      </div>

      {/* Distribution bars */}
      <div className="flex flex-col gap-1.5">
        {dist.map(({ star, count, pct: p }) => (
          <div key={star} className="flex items-center gap-2">
            <span className="text-[11px] font-light text-[#999] w-3 shrink-0">{star}</span>
            <span className="text-[11px] leading-none text-[#ccc]">★</span>
            <div className="flex-1 h-1.5 bg-[#f0f0f0] overflow-hidden">
              <div
                className="h-full bg-[#112942] transition-all duration-500"
                style={{ width: `${p}%` }}
              />
            </div>
            <span className="text-[11px] font-light text-[#bbb] w-4 text-right shrink-0">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewCards({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="p-8 flex flex-col gap-2">
        <p className="text-[14px] font-normal text-[#333]">No reviews yet.</p>
        <p className="text-[13px] font-light text-[#999]">
          Be the first to share your experience with this product.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#f0f0f0]">
      {reviews.map((r) => (
        <div key={r.id} className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Stars rating={r.rating} size={13} />
                {r.recommend === "yes" && (
                  <span className="text-[10px] tracking-widest uppercase font-light text-emerald-600 bg-emerald-50 px-2 py-0.5">
                    Recommends
                  </span>
                )}
              </div>
              <p className="text-[14px] font-semibold text-[#112942]">{r.title}</p>
            </div>
            <p className="text-[11px] font-light text-[#bbb] shrink-0 mt-0.5">
              {formatDate(r.created_at)}
            </p>
          </div>

          {/* Body */}
          <p className="text-[13px] font-normal text-[#555] leading-relaxed mb-3">
            {r.message}
          </p>

          {/* Footer */}
          <p className="text-[11px] font-light text-[#aaa]">— {r.name}</p>
        </div>
      ))}
    </div>
  );
}