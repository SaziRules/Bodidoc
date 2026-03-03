"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Icons ────────────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="10" viewBox="0 0 24 17" fill="currentColor">
    <path d="M23.5 2.5a3 3 0 0 0-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.4A3 3 0 0 0 .5 2.5 31 31 0 0 0 0 8.5a31 31 0 0 0 .5 6 3 3 0 0 0 2.1 2.1C4.5 17 12 17 12 17s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-6 31 31 0 0 0-.5-6z" />
    <polygon points="9.75 12.5 15.5 8.5 9.75 4.5" fill="white" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type ActiveMenu = "products" | "moments" | null;

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="bg-[#112942] h-11 py-5 w-full z-50 relative">
      <div className="max-w-full mx-auto px-15 h-full flex items-center justify-between gap-4">

        {/* LEFT — circled icons + promo text */}
        <div className="flex items-center gap-3.5 shrink-0">
          {/* Social icons with circle borders */}
          <div className="flex items-center gap-1.5">
            {[
              { href: "https://www.facebook.com/bodidoc/", label: "Facebook", icon: <FacebookIcon /> },
              { href: "https://www.instagram.com/bodidoc/", label: "Instagram", icon: <InstagramIcon /> },
              { href: "https://www.tiktok.com/@bodidoc", label: "TikTok", icon: <TikTokIcon /> },
              { href: "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q", label: "YouTube", icon: <YouTubeIcon /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-5.5 h-5.5 rounded-full border border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Promo text immediately after icons */}
          <Link
            href="/shop/?product_cat=petroleum-jelly"
            className="text-white text-[13px] font-light tracking-wide whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
          >
            Try our ALL NEW Tissue Oil Jellies
          </Link>
        </div>

        {/* RIGHT — mailing list + search */}
        <div className="flex items-center gap-4 shrink-0">

          {/* "Join our Mailing List" + icon button */}
          <div className="flex items-center gap-2">
            <span className="text-white text-[13px] font-light tracking-wide whitespace-nowrap">
              Join our Mailing List
            </span>
            <button
              aria-label="Join mailing list"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors duration-200 cursor-pointer border-0 shrink-0"
            >
              <MailIcon />
            </button>
          </div>

          {/* Search input with inset icon button */}
          <div className="flex items-center bg-white/10 rounded-full overflow-hidden w-65">
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="bg-transparent border-0 outline-none text-white text-[12px] font-light tracking-wide placeholder:text-white/50 w-full px-3 py-1.5"
            />
            <button
              aria-label="Submit search"
              className="flex items-center justify-center w-7 h-full px-1.5 py-1.5 rounded-full mr-0.5 bg-white/15 hover:bg-white/25 text-white transition-colors duration-200 cursor-pointer border-0 shrink-0"
            >
              <SearchIcon />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// ─── Mega Menu — Products ─────────────────────────────────────────────────────

function ProductsMegaMenu() {
  return (
    <div className="max-w-360 mx-auto px-10 py-7 grid grid-cols-[1fr_1px_1.4fr_1px_1.4fr] min-h-50">
      {/* Col 1: Browse */}
      <div className="px-2">
        <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3.5">
          BROWSE OUR PRODUCTS
        </p>
        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
          {[
            { label: "All Products", href: "/shop" },
            { label: "Aqueous Range", href: "/shop/aqueous-range" },
            { label: "Tissue Oil Range", href: "/shop/tissue-oil-range" },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="text-[13px] text-bd-muted hover:text-bd-dark transition-colors duration-200 no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="bg-[#e8e8e8] mx-8 self-stretch" />

      {/* Col 2: New */}
      <div className="px-2">
        <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3.5">NEW!</p>
        <Link href="/shop/?product_cat=petroleum-jelly" className="block no-underline">
          <div className="relative w-full h-38.75 overflow-hidden rounded-sm bg-gray-100 mb-2.5">
            <Image src="/images/mega-menu-new.webp" alt="Bodidoc Tissue Oil Jellies" fill className="object-cover" />
          </div>
          <p className="text-[12.5px] text-[#555] leading-relaxed m-0">
            Discover our newest edition to your daily body care must haves: Bodidoc Tissue Oil Jellies
          </p>
        </Link>
      </div>

      {/* Divider */}
      <div className="bg-[#e8e8e8] mx-8 self-stretch" />

      {/* Col 3: Bestseller */}
      <div className="px-2">
        <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3.5">
          OUR #1 BESTSELLER
        </p>
        <Link href="/shop/bodidoc-tissue-oil-cream-for-normal-skin" className="block no-underline">
          <div className="relative w-full h-43.75 overflow-hidden rounded-sm bg-gray-100">
            <Image src="/images/mega-menu-bestseller.webp" alt="Bodidoc Tissue Oil Cream" fill className="object-cover" />
          </div>
        </Link>
      </div>
    </div>
  );
}

// ─── Mega Menu — Moments ──────────────────────────────────────────────────────

function MomentsMegaMenu() {
  return (
    <div className="max-w-360 mx-auto px-10 py-7 grid grid-cols-[1fr_1px_1.4fr_1px_1.4fr] min-h-50">
      {/* Col 1: Featured article 1 */}
      <div className="px-2">
        <Link href="/moments/transform-dry-uneven-skin-with-the-award-winning-bodidoc-tissue-oil-cream-with-urea" className="block no-underline group">
          <div className="relative w-full h-40 overflow-hidden rounded-sm bg-gray-100 mb-2.5">
            <Image src="/images/moments-award.png" alt="Voted the #1 smoothing cream with urea" fill className="object-cover" />
          </div>
          <p className="text-[13.5px] font-semibold text-bd-dark leading-snug mb-1.5 group-hover:underline">
            Voted The #1 Smoothing Cream With Urea
          </p>
          <p className="text-[12px] text-[#777] leading-relaxed m-0">
            It&apos;s easy to see why Bodidoc Tissue Oil Cream with Urea for Dry Skin won …
          </p>
        </Link>
      </div>

      {/* Divider */}
      <div className="bg-[#e8e8e8] mx-8 self-stretch" />

      {/* Col 2: Featured article 2 */}
      <div className="px-2">
        <Link href="/moments/our-commitment-to-sustainable-packaging" className="block no-underline group">
          <div className="relative w-full h-40 overflow-hidden rounded-sm bg-gray-100 mb-2.5">
            <Image src="/images/moments-sustainability.png" alt="Our Commitment to Sustainable Packaging" fill className="object-cover" />
          </div>
          <p className="text-[13.5px] font-semibold text-bd-dark leading-snug mb-1.5 group-hover:underline">
            Our Commitment to Sustainable Packaging
          </p>
          <p className="text-[12px] text-[#777] leading-relaxed m-0">
            At Bodidoc, we believe that taking care of your skin shouldn&apos;t cost the earth.
          </p>
        </Link>
      </div>

      {/* Divider */}
      <div className="bg-[#e8e8e8] mx-8 self-stretch" />

      {/* Col 3: Learn More links */}
      <div className="px-2">
        <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3.5">LEARN MORE</p>
        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
          {[
            { label: "See All", href: "/moments" },
            { label: "Embracing Your Bodi: A Journey of Self-Love and Acceptance", href: "/moments/embracing-your-bodi-a-journey-of-self-love-and-acceptance" },
            { label: "Beyond The Bin: Give Your Bodidoc Packaging A Second Life", href: "/moments/beyond-the-bin-give-your-bodidoc-packaging-a-second-life" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-[13px] text-bd-muted hover:text-bd-dark transition-colors duration-200 no-underline leading-snug block">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [momentsOpen, setMomentsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) { setProductsOpen(false); setMomentsOpen(false); }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const subLinks = {
    products: [
      { label: "ALL PRODUCTS", href: "/shop" },
      { label: "AQUEOUS RANGE", href: "/products/aqueous-range" },
      { label: "TISSUE OIL RANGE", href: "/products/tissue-oil-range" },
    ],
    moments: [
      { label: "SEE ALL", href: "/blog" },
      { label: "Embracing Your Bodi: A Journey of Self-Love and Acceptance", href: "/embracing-your-bodi-a-journey-of-self-love-and-acceptance" },
      { label: "Beyond The Bin: Give Your Bodidoc Packaging A Second Life", href: "/beyond-the-bin-give-your-bodidoc-packaging-a-second-life" },
    ],
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/35 z-200 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <nav
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 w-80 max-w-full h-dvh bg-white z-201 overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close */}
        <button onClick={onClose} aria-label="Close menu" className="absolute top-3.5 right-3.5 p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center">
          <CloseIcon />
        </button>

        <div className="pt-13 pb-8">
          {/* Main nav list */}
          <ul className="list-none p-0 m-0 border-t border-[#e8e8e8]">

            {/* HOME */}
            <li className="border-b border-[#e8e8e8]">
              <Link href="/" onClick={onClose} className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase no-underline hover:bg-gray-50 transition-colors duration-150">
                HOME
              </Link>
            </li>

            {/* PRODUCTS accordion */}
            <li className="border-b border-[#e8e8e8]">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                aria-expanded={productsOpen}
                className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase bg-transparent border-0 cursor-pointer text-left hover:bg-gray-50 transition-colors duration-150"
              >
                PRODUCTS <ChevronDownIcon open={productsOpen} />
              </button>
              <div className={`overflow-hidden bg-gray-50 transition-all duration-300 ${productsOpen ? "max-h-75" : "max-h-0"}`}>
                <ul className="list-none p-0 m-0 py-1 pb-2">
                  {subLinks.products.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} onClick={onClose} className="block px-6 py-2.5 pl-9 text-[11.5px] font-normal tracking-[0.06em] text-[#666] uppercase no-underline hover:text-bd-dark transition-colors duration-150">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* MOMENTS accordion */}
            <li className="border-b border-[#e8e8e8]">
              <button
                onClick={() => setMomentsOpen(!momentsOpen)}
                aria-expanded={momentsOpen}
                className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase bg-transparent border-0 cursor-pointer text-left hover:bg-gray-50 transition-colors duration-150"
              >
                MOMENTS <ChevronDownIcon open={momentsOpen} />
              </button>
              <div className={`overflow-hidden bg-gray-50 transition-all duration-300 ${momentsOpen ? "max-h-75" : "max-h-0"}`}>
                <ul className="list-none p-0 m-0 py-1 pb-2">
                  {subLinks.moments.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} onClick={onClose} className="block px-6 py-2.5 pl-9 text-[11.5px] font-normal tracking-[0.06em] text-[#666] no-underline hover:text-bd-dark transition-colors duration-150 leading-snug">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* CONTACT US */}
            <li className="border-b border-[#e8e8e8]">
              <Link href="/contact-us" onClick={onClose} className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase no-underline hover:bg-gray-50 transition-colors duration-150">
                CONTACT US
              </Link>
            </li>
          </ul>

          {/* Bestseller feature card */}
          <div className="px-6 pt-6">
            <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3">
              OUR #1 BESTSELLER
            </p>
            <Link href="/product/bodidoc-tissue-oil-cream-2" onClick={onClose} className="block relative w-full h-37.5 rounded overflow-hidden bg-[#f0f4f8]">
              <Image src="/images/mobile-bestseller.png" alt="Bodidoc Tissue Oil Cream" fill className="object-cover object-center" />
            </Link>
          </div>

          {/* Secondary links */}
          <ul className="list-none p-0 m-0 mt-6 pt-5 border-t border-[#e8e8e8]">
            {[
              { label: "ABOUT US", href: "/about-us" },
              { label: "PRIVACY POLICY", href: "/terms-conditions-privacy-policy" },
              { label: "TERMS & CONDITIONS", href: "/terms-conditions-privacy-policy" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} onClick={onClose} className="block px-6 py-3.25 text-[11.5px] font-normal tracking-[0.07em] text-[#888] uppercase no-underline hover:text-bd-dark transition-colors duration-150">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((menu: ActiveMenu) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(menu);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 100);
  }, []);

  const handleMegaEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  // Shared nav link classes
  const navLinkBase =
    "font-sans text-[14px] font-bold tracking-[0.06em] uppercase bg-transparent border-0 cursor-pointer whitespace-nowrap flex items-center h-14 relative transition-colors duration-200";
  const navLinkIdle = "text-bd-muted hover:text-bd-dark hover:font-bold";
  const navLinkActive =
    "text-bd-dark font-bold after:content-[''] after:absolute after:bottom-[10px] after:left-0 after:right-0 after:h-[2px] after:bg-bd-dark";

  return (
    <>
      {/* ══════════════════ DESKTOP ══════════════════ */}
      <header className="hidden lg:block">
        <AnnouncementBar />

        {/* Main nav */}
        <div
          className="bg-white h-20 w-full border-b border-[#e8e8e8] relative z-99"
          onMouseLeave={handleLeave}
        >
          <div className="w-full px-10 h-full flex items-center justify-center gap-50">

            {/* Left links */}
            <nav className="flex items-center gap-7" aria-label="Primary navigation">
              <Link href="/" className={`${navLinkBase} ${navLinkActive}`}>
                HOME
              </Link>
              <button
                className={`${navLinkBase} ${activeMenu === "products" ? navLinkActive : navLinkIdle}`}
                onMouseEnter={() => handleEnter("products")}
                aria-haspopup="true"
                aria-expanded={activeMenu === "products"}
              >
                PRODUCTS
              </button>
            </nav>

            {/* Centre logo */}
            <Link href="/" aria-label="Bodidoc home" className="relative w-30 h-9 flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Bodidoc"
                fill
                className="object-contain"
                priority
              />
            </Link>

            {/* Right links */}
            <nav className="flex items-center gap-7" aria-label="Secondary navigation">
              <button
                className={`${navLinkBase} ${activeMenu === "moments" ? navLinkActive : navLinkIdle}`}
                onMouseEnter={() => handleEnter("moments")}
                aria-haspopup="true"
                aria-expanded={activeMenu === "moments"}
              >
                MOMENTS
              </button>
              <Link href="/contact-us" className={`${navLinkBase} ${navLinkIdle}`}>
                CONTACT US
              </Link>
            </nav>
          </div>

          {/* Mega menu dropdown */}
          {activeMenu && (
            <div
              className="absolute top-full left-0 right-0 z-98 bg-white border-t border-b border-[#e8e8e8] shadow-[0_4px_20px_rgba(0,0,0,0.08)] animate-[megaIn_0.18s_ease_forwards]"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleLeave}
              role="region"
              aria-label={activeMenu === "products" ? "Products menu" : "Moments menu"}
            >
              {activeMenu === "products" ? <ProductsMegaMenu /> : <MomentsMegaMenu />}
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════ MOBILE ══════════════════ */}
      <header className="lg:hidden">
        {/* Announcement bar */}
        <div className="bg-[#1a2b3c] h-8.5 flex items-center justify-center w-full">
          <Link
            href="/shop/?product_cat=petroleum-jelly"
            className="text-white text-[12px] font-normal tracking-wide no-underline"
          >
            Try our ALL NEW Tissue Oil Jellies
          </Link>
        </div>

        {/* Nav bar */}
        <div className="bg-white h-14.5 border-b border-[#e8e8e8] flex items-center justify-between px-4 relative z-99">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center"
          >
            <MenuIcon />
          </button>

          <Link href="/" aria-label="Bodidoc home" className="absolute left-1/2 -translate-x-1/2 w-25 h-8 flex items-center">
            <Image
              src="/images/logo.webp"
              alt="Bodidoc"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <button aria-label="Search" className="p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center">
            <SearchIcon />
          </button>
        </div>

        <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </header>
    </>
  );
}