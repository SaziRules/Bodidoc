import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PER_PAGE = 15;

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type   = searchParams.get("type");
  const filter = searchParams.get("filter") ?? "new";
  const page   = parseInt(searchParams.get("page") ?? "1", 10);

  if (type === "counts") {
    const [{ count: newC }, { count: contactedC }, { count: archivedC }, { count: allC }] =
      await Promise.all([
        supabaseAdmin.from("pr_registrations").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabaseAdmin.from("pr_registrations").select("*", { count: "exact", head: true }).eq("status", "contacted"),
        supabaseAdmin.from("pr_registrations").select("*", { count: "exact", head: true }).eq("status", "archived"),
        supabaseAdmin.from("pr_registrations").select("*", { count: "exact", head: true }),
      ]);
    return NextResponse.json({
      new: newC ?? 0,
      contacted: contactedC ?? 0,
      archived: archivedC ?? 0,
      all: allC ?? 0,
    });
  }

  let q = supabaseAdmin.from("pr_registrations").select("*", { count: "exact" });
  if (filter !== "all") q = q.eq("status", filter);
  q = q.order("created_at", { ascending: false });
  q = q.range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

  const { data, count, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data: data ?? [], count: count ?? 0 });
}
