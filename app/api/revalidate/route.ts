import { revalidatePath, revalidateTag } from "next/cache";
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
      revalidatePath("/shop", "page");
      revalidatePath("/shop/[slug]", "page");
      revalidatePath("/", "page");
      break;
    case "post":
      revalidateTag("posts");
      revalidatePath("/moments", "page");
      revalidatePath("/moments/[slug]", "page");
      break;
    case "rangePage":
      revalidateTag("range-pages");
      revalidatePath("/shop/tissue-oil-range", "page");
      revalidatePath("/shop/aqueous-range", "page");
      break;
    case "heroSlider":
      revalidateTag("hero-slides");
      revalidatePath("/", "page");
      break;
    case "competition":
      revalidateTag("competition");
      revalidatePath("/competitions", "page");
      break;
    default:
      revalidateTag("posts");
      revalidateTag("products");
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/moments", "page");
  }

  return NextResponse.json({ revalidated: true, type: body._type ?? "unknown" });
}
