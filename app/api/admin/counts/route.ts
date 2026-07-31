import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [{ count: reviews }, { count: subscriptions }, { count: contacts }] = await Promise.all([
    supabaseAdmin.from("product_reviews").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("approved", false),
    supabaseAdmin.from("subscriptions").select("*", { count: "exact", head: true }).eq("brand", "bodidoc"),
    supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("brand", "bodidoc").eq("status", "open").eq("read", false),
  ]);

  return NextResponse.json({
    reviews: reviews ?? 0,
    subscriptions: subscriptions ?? 0,
    contacts: contacts ?? 0,
  });
}
