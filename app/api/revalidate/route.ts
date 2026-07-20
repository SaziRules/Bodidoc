import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Map Sanity document _type → cache tags to invalidate
const TAG_MAP: Record<string, string[]> = {
  product: ["products"],
  post: ["posts"],
  rangePage: ["range-pages"],
  heroSlider: ["hero-slides"],
};

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-webhook-secret");

  if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tags = body._type ? TAG_MAP[body._type] : null;

  if (tags) {
    tags.forEach((tag) => revalidateTag(tag));
    return NextResponse.json({ revalidated: true, tags });
  }

  // Unknown type — revalidate everything
  const allTags = Object.values(TAG_MAP).flat();
  allTags.forEach(revalidateTag);
  return NextResponse.json({ revalidated: true, tags: allTags });
}
