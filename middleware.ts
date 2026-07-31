import { NextRequest, NextResponse } from "next/server";

// Aggressive scrapers/SEO crawlers — excluded: Googlebot, Bingbot (they respect robots.txt)
const BOT_RE =
  /AhrefsBot|SemrushBot|MJ12bot|DotBot|BLEXBot|DataForSeoBot|PetalBot|YandexBot|Baiduspider|serpstatbot|linkdexbot|rogerbot|exabot|SeznamBot|ZoominfoBot|turnitinbot|NordVPNBot|NetcraftSurveyAgent|masscan|zgrab|GPTBot|CCBot|Bytespider|AmazonBot|ClaudeBot|anthropic-ai|FacebookBot|Applebot-Extended|img2dataset|omgili|Diffbot/i;

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  if (BOT_RE.test(ua)) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  // Block bots on all page routes.
  // Excludes: Next.js internals, static files, API routes (so Sanity webhook works),
  // and common asset extensions.
  matcher: [
    "/((?!_next/static|_next/image|api/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|pdf|woff2?|ttf|otf|mp4|mp3)).*)",
  ],
};
