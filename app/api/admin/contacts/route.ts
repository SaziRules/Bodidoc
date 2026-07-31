import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PER_PAGE = 15;

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type   = searchParams.get("type");
  const filter = searchParams.get("filter") ?? "open";
  const page   = parseInt(searchParams.get("page") ?? "1");

  if (type === "counts") {
    const [{ count: open }, { count: replied }, { count: all }] = await Promise.all([
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("status", "open"),
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("status", "replied"),
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "bodidoc"),
    ]);
    return NextResponse.json({ open: open ?? 0, replied: replied ?? 0, all: all ?? 0 });
  }

  const from = (page - 1) * PER_PAGE;
  const to   = from + PER_PAGE - 1;
  let q = supabaseAdmin
    .from("contact_submissions")
    .select("*", { count: "exact" })
    .eq("brand", "bodidoc")
    .order("created_at", { ascending: false })
    .range(from, to);
  if (filter === "open")    q = q.eq("status", "open");
  if (filter === "replied") q = q.eq("status", "replied");
  const { data, count } = await q;
  return NextResponse.json({ data: data ?? [], count: count ?? 0 });
}
