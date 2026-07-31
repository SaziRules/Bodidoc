import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PER_PAGE = 15;

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type   = searchParams.get("type");
  const filter = searchParams.get("filter") ?? "pending";
  const page   = parseInt(searchParams.get("page") ?? "1");

  if (type === "counts") {
    const [{ count: all }, { count: pending }, { count: approved }] = await Promise.all([
      supabaseAdmin.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "bodidoc"),
      supabaseAdmin.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("approved", false),
      supabaseAdmin.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("approved", true),
    ]);
    return NextResponse.json({ all: all ?? 0, pending: pending ?? 0, approved: approved ?? 0 });
  }

  const from = (page - 1) * PER_PAGE;
  const to   = from + PER_PAGE - 1;
  let q = supabaseAdmin
    .from("product_reviews")
    .select("*", { count: "exact" })
    .eq("brand", "bodidoc")
    .order("created_at", { ascending: false })
    .range(from, to);
  if (filter === "pending")  q = q.eq("approved", false);
  if (filter === "approved") q = q.eq("approved", true);
  const { data, count } = await q;
  return NextResponse.json({ data: data ?? [], count: count ?? 0 });
}
