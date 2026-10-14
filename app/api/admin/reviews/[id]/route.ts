import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body: { approved?: boolean } = await req.json();

  // Fetch the review's productSlug before updating so we can revalidate its page
  const { data: review } = await supabaseAdmin
    .from("product_reviews")
    .select("productSlug")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("product_reviews")
    .update({ approved: body.approved })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Revalidate the product page so the approved/rejected review is reflected immediately
  if (review?.productSlug) {
    revalidatePath(`/shop/${review.productSlug}`, "page");
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { data: review } = await supabaseAdmin
    .from("product_reviews")
    .select("productSlug")
    .eq("id", id)
    .single();

  const { error } = await supabaseAdmin
    .from("product_reviews")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (review?.productSlug) {
    revalidatePath(`/shop/${review.productSlug}`, "page");
  }

  return NextResponse.json({ ok: true });
}
