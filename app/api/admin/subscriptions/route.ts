import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PER_PAGE = 20;

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") ?? "1");

  if (type === "all") {
    const { data } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("brand", "bodidoc")
      .order("created_at", { ascending: false });
    return NextResponse.json({ data: data ?? [] });
  }

  const from = (page - 1) * PER_PAGE;
  const to   = from + PER_PAGE - 1;
  const { data, count } = await supabaseAdmin
    .from("subscriptions")
    .select("*", { count: "exact" })
    .eq("brand", "bodidoc")
    .order("created_at", { ascending: false })
    .range(from, to);
  return NextResponse.json({ data: data ?? [], count: count ?? 0 });
}
