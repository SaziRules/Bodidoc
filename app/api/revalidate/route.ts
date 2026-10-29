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
      revalidatePath("/shop", "page");
      revalidatePath("/shop/[slug]", "page");
      revalidatePath("/", "page");
      break;
    case "post":
      revalidateTag("posts", "default");
      revalidatePath("/moments", "page");
      revalidatePath("/moments/[slug]", "page");
      break;
    case "rangePage":
      revalidatePath("/shop/tissue-oil-range", "page");
      revalidatePath("/shop/aqueous-range", "page");
      break;
    case "heroSlider":
      revalidatePath("/", "page");
      break;
    case "competition":
      revalidatePath("/competitions", "page");
      break;
    default:
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/moments", "page");
  }

  return NextResponse.json({ revalidated: true, type: body._type ?? "unknown" });
}
