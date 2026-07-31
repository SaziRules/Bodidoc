import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const COOKIE = "bodidoc_admin";

function token(): string {
  return createHmac("sha256", process.env.ADMIN_PASSWORD ?? "")
    .update("bodidoc_admin_v1")
    .digest("hex");
}

export function isAdmin(req: NextRequest): boolean {
  if (!process.env.ADMIN_PASSWORD) return false;
  return req.cookies.get(COOKIE)?.value === token();
}

export function setSession(res: NextResponse): void {
  res.cookies.set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function clearSession(res: NextResponse): void {
  res.cookies.set(COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
