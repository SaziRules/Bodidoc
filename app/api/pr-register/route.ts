import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const MAX_FILE_SIZE  = 15 * 1024 * 1024;
const ALLOWED_TYPES  = ["application/pdf", "image/png", "image/jpeg"];

export async function POST(req: Request) {
  const fd = await req.formData();

  const get    = (key: string) => ((fd.get(key) as string) ?? "").trim();
  const getArr = (key: string): string[] => {
    try { return JSON.parse(get(key)); } catch { return []; }
  };

  const first_name       = get("first_name");
  const last_name        = get("last_name");
  const gender           = get("gender");
  const age_confirmed    = get("age_confirmed") === "true";
  const email            = get("email").toLowerCase();
  const phone            = get("phone");
  const city             = get("city");
  const province         = get("province");
  const brand_interests  = getArr("brand_interests");
  const active_platforms = getArr("active_platforms");
  const facebook_url     = get("facebook_url")  || null;
  const instagram_url    = get("instagram_url") || null;
  const tiktok_url       = get("tiktok_url")    || null;
  const youtube_url      = get("youtube_url")   || null;
  const twitter_url      = get("twitter_url")   || null;
  const content_niches   = getArr("content_niches");
  const popia_consent    = get("popia_consent") === "true";

  if (!first_name || !last_name || !email || !phone || !age_confirmed || !popia_consent) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Optional file upload
  let rate_card_url: string | null = null;
  const rateCard = fd.get("rate_card") as File | null;

  if (rateCard && rateCard.size > 0) {
    if (rateCard.size > MAX_FILE_SIZE || !ALLOWED_TYPES.includes(rateCard.type)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }
    const ext      = rateCard.name.split(".").pop() ?? "bin";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer   = Buffer.from(await rateCard.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from("pr-rate-cards")
      .upload(fileName, buffer, { contentType: rateCard.type });

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from("pr-rate-cards")
        .getPublicUrl(fileName);
      rate_card_url = publicUrl;
    } else {
      console.error("Storage upload error:", uploadError.message);
    }
  }

  const { error } = await supabaseAdmin.from("pr_registrations").insert({
    first_name, last_name, gender, age_confirmed,
    email, phone, city, province,
    brand_interests, active_platforms,
    facebook_url, instagram_url, tiktok_url, youtube_url, twitter_url,
    content_niches, rate_card_url, popia_consent,
    status: "new",
  });

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
