import { NextRequest, NextResponse } from "next/server";
import { clearSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  clearSession(res);
  return res;
}
