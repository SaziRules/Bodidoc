import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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

  switch (body._type) {
    case "product":
      revalidateTag("products");
      break;
    case "post":
      revalidateTag("posts");
      break;
    case "rangePage":
      revalidateTag("range-pages");
      break;
    case "heroSlider":
      revalidateTag("hero-slides");
      break;
    default:
      revalidateTag("products");
      revalidateTag("posts");
      revalidateTag("range-pages");
      revalidateTag("hero-slides");
  }

  return NextResponse.json({ revalidated: true, type: body._type ?? "unknown" });
}
