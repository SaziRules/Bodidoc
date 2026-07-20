import { revalidatePath } from "next/cache";
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
      revalidatePath("/shop", "layout");   // covers /shop, /shop/[slug], range pages
      revalidatePath("/", "page");          // home page shows featured products
      break;
    case "post":
      revalidatePath("/moments", "layout"); // covers /moments and /moments/[slug]
      break;
    case "rangePage":
      revalidatePath("/shop/tissue-oil-range", "page");
      revalidatePath("/shop/aqueous-range", "page");
      break;
    case "heroSlider":
      revalidatePath("/", "page");
      break;
    default:
      revalidatePath("/", "layout");        // unknown type — revalidate everything
  }

  return NextResponse.json({ revalidated: true, type: body._type ?? "unknown" });
}
