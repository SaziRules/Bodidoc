"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 320 512" fill="currentColor" className="w-3 h-3">
    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
  </svg>
);

// ─── Shared data ──────────────────────────────────────────────────────────────

const socialLinks = [
  { href: "https://www.facebook.com/bodidoc/", icon: <FacebookIcon />, label: "Facebook" },
  { href: "https://www.instagram.com/bodidoc/", icon: <InstagramIcon />, label: "Instagram" },
  { href: "https://www.tiktok.com/@bodidoc.africa", icon: <TikTokIcon />, label: "TikTok" },
  { href: "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q/featured", icon: <YouTubeIcon />, label: "YouTube" },
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ALL PRODUCTS", href: "/shop" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "MOMENTS", href: "/moments" },
  { label: "CONTACT US", href: "/contact-us" },
  { label: "PRIVACY POLICY", href: "/terms-conditions-privacy-policy" },
  { label: "TERMS AND CONDITIONS", href: "/terms-conditions-privacy-policy" },
];

const disclaimer = "If you subscribe to Bodidoc, please note that you are agreeing to receive recurring promotional and marketing messages from us. These messages are automated, including email and text. Consent is not a condition of any purchase. Please view our";

// ─── Social Icons Row ─────────────────────────────────────────────────────────

function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 hover:text-white hover:border-white transition-colors duration-200"
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

// ─── Subscription Forms ───────────────────────────────────────────────────────

function SubscribeForm({ placeholder }: { placeholder: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex w-full border border-white/20">
      <input
        type={placeholder === "EMAIL" ? "email" : "tel"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 text-[12px] tracking-widest text-white placeholder:text-white/50 bg-transparent outline-none font-light"
      />
      <button
        type="submit"
        aria-label="Submit"
        className="px-3 py-2 bg-white text-[#112942] flex items-center justify-center hover:bg-white/90 transition-colors duration-200 cursor-pointer border-0"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

// ─── Logo + Copyright ─────────────────────────────────────────────────────────

function LogoAndCopyright() {
  return (
    <div className="flex flex-col items-start gap-2">
      <Image
        src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/Untitled-design-e1738357995562-300x120.png"
        alt="Bodidoc"
        width={300}
        height={120}
        className="w-28 h-auto"
      />
      <p className="text-[11px] text-white/50 font-light">Copyright @BODIDOC {new Date().getFullYear()}</p>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="w-full bg-[#112942]">

      {/* ── DESKTOP (hidden on mobile) ── */}
      <div className="hidden md:block w-full px-10 lg:px-16 py-14">
        <div className="max-w-360 mx-auto grid grid-cols-3 gap-12">

          {/* Col 1 — Subscribe */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-[18px] font-normal text-white">Down For More? We got You</h3>
            <p className="text-[13px] font-light text-white/70 leading-relaxed">
              Subscribe to our mailing list for all the latest product drops, limited offers and in-store event info.
            </p>
            <SubscribeForm placeholder="PHONE" />
            <SubscribeForm placeholder="EMAIL" />
            <p className="text-[11px] font-light text-white/50 leading-relaxed">
              {disclaimer}{" "}
              <Link href="/terms-conditions-privacy-policy" className="underline text-white/50 hover:text-white">
                Terms of Use and Privacy Policy.
              </Link>
            </p>
            <LogoAndCopyright />
          </div>

          {/* Col 2 — Nav links centered */}
          <div className="flex flex-col items-center gap-2.5 pt-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] font-light tracking-wide text-white hover:font-normal transition-all duration-150 no-underline"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Contact info */}
          <div className="flex flex-col gap-3 pt-1">
            <h4 className="text-[13px] font-semibold text-white">Customer Care</h4>
            <div className="text-[12px] font-light text-white/70 leading-relaxed">
              <p>08:00 – 17:00</p>
              <p>Monday – Friday</p>
              <p>0860 002 652</p>
            </div>
            <h4 className="text-[13px] font-semibold text-white mt-1">Whatsapp</h4>
            <p className="text-[12px] font-light text-white/70">+27 (0)60 996 6087</p>
            <h4 className="text-[13px] font-semibold text-white mt-1">Find us at</h4>
            <div className="text-[12px] font-light text-white/70 leading-relaxed">
              <p>14 Ellman Street</p>
              <p>Sunderland Ridge</p>
              <p>0157</p>
            </div>
            <h4 className="text-[13px] font-semibold text-white mt-1 tracking-wide uppercase">Follow Us On</h4>
            <SocialIcons />
          </div>

        </div>
      </div>

      {/* ── MOBILE (hidden on desktop/tablet) ── */}
      <div className=" md:hidden w-full px-6 py-10 flex flex-col gap-8">

        {/* Subscribe */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-[18px] font-normal text-white">Down For More? We got You</h3>
          <p className="text-[13px] font-light text-white/70 leading-relaxed">
            Subscribe to our mailing list for all the latest product drops, limited offers and in-store event info.
          </p>
          <SubscribeForm placeholder="PHONE" />
          <SubscribeForm placeholder="EMAIL" />
          <p className="text-[11px] font-light text-white/50 leading-relaxed">
            {disclaimer}{" "}
            <Link href="/terms-conditions-privacy-policy" className="underline text-white/50 hover:text-white">
              Terms of Use and Privacy Policy.
            </Link>
          </p>
        </div>

        {/* Nav — 2 columns */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-2">
            {[navLinks[0], navLinks[1], navLinks[2], navLinks[3]].map(({ label, href }) => (
              <Link key={label} href={href} className="text-[12px] font-light text-white no-underline">
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[navLinks[4], navLinks[5], navLinks[6]].map(({ label, href }) => (
              <Link key={label} href={href} className="text-[12px] font-light text-white no-underline">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact + Social */}
        <div className="flex flex-col gap-2 pt-2">
          <h4 className="text-[13px] font-semibold text-white">Contact Us</h4>
          <div className="text-[12px] font-light text-white/70 leading-relaxed">
            <p>08:00 - 17:00</p>
            <p>Monday - Friday</p>
            <p>0860 002 652</p>
          </div>
          <h4 className="text-[13px] font-semibold text-white mt-2 tracking-wide uppercase">Follow Us On</h4>
          <SocialIcons />
          <h4 className="text-[13px] font-semibold text-white mt-2">Find us at</h4>
          <div className="text-[12px] font-light text-white/70 leading-relaxed">
            <p>14 Ellman Street</p>
            <p>Sunderland Ridge</p>
            <p>0157</p>
          </div>
          <h4 className="text-[13px] font-semibold text-white mt-2">WHATSAPP</h4>
          <p className="text-[12px] font-light text-white/70">+27 (0)60 996 6087</p>
        </div>

        {/* Logo + Copyright */}
        <div className="pt-2">
          <LogoAndCopyright />
        </div>

      </div>

    </footer>
  );
}