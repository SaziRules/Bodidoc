"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import SubscriptionModal from "@/components/SubscriptionModal";
import { usePathname } from "next/navigation";

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

const TwitterIcon = () => (
  <svg height="9" width="9" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M389.2 48H458L312.1 215.6 484 464H349.4L241.6 318.6 107.6 464H39L194.9 289.5 24 48H162.6L260.1 180.3 389.2 48zM365.6 421.8h38.1L141.8 88.5h-40.9z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="13" height="9" viewBox="0 0 24 17" fill="currentColor">
    <path d="M23.5 2.5a3 3 0 0 0-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.4A3 3 0 0 0 .5 2.5 31 31 0 0 0 0 8.5a31 31 0 0 0 .5 6 3 3 0 0 0 2.1 2.1C4.5 17 12 17 12 17s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-6 31 31 0 0 0-.5-6z" />
    <polygon points="9.75 12.5 15.5 8.5 9.75 4.5" fill="#112942" />
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

// ─── Scroll direction hook ────────────────────────────────────────────────────

function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) { setVisible(true); lastY.current = y; return; }
      if (y < lastY.current) {
        setVisible(true);
      } else if (y > lastY.current + 4) {
        setVisible(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible;
}

// ─── Announcement Bar ─────────────────────────────────────────────────────────

function AnnouncementBar({ onSubscribeClick }: { onSubscribeClick: () => void }) {
  return (
    <div className="bg-[#112942] h-11 py-5 w-full z-50 relative">
      <div className="max-w-full mx-auto px-15 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 shrink-0">
          <div className="flex items-center gap-1.5">
            {[
              { href: "https://www.facebook.com/bodidoc/", label: "Facebook", icon: <FacebookIcon /> },
              { href: "https://www.instagram.com/bodidoc/", label: "Instagram", icon: <InstagramIcon /> },
              { href: "https://www.tiktok.com/@bodidoc", label: "TikTok", icon: <TikTokIcon /> },
              { href: "https://x.com/bodidoc_sa?s=21&t=ZnBUMmqPzP4Eva55qHJ9WQ", label: "Twitter", icon: <TwitterIcon /> },
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
          <Link
            href="/shop?type=petroleum-jelly"
            className="text-white text-[13px] font-light tracking-wide whitespace-nowrap hover:opacity-80 transition-opacity duration-200"
          >
            Try our ALL NEW Tissue Oil Jellies
          </Link>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-white text-[13px] font-light tracking-wide whitespace-nowrap">
              Join our Mailing List
            </span>
            <button
              aria-label="Join mailing list"
              onClick={onSubscribeClick}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors duration-200 cursor-pointer border-0 shrink-0"
            >
              <MailIcon />
            </button>
          </div>
          <div className="flex items-center bg-white/10 rounded-full overflow-hidden w-65">
            <form action="/search" method="GET" className="flex items-center w-full">
            <input
              type="text"
              name="q"
              placeholder="Search"
              className="bg-transparent border-0 outline-none text-white text-[12px] font-light tracking-wide placeholder:text-white/50 w-full px-3 py-1.5"
            />
            <button type="submit" className="flex items-center justify-center w-7 h-full px-1.5 py-1.5 rounded-full mr-0.5 bg-white/15 hover:bg-white/25 text-white border-0 shrink-0">
              <SearchIcon />
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Perfected Mega Menu Components ───────────────────────────────────────────

function ProductsMegaMenu({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="max-w-300 mx-auto px-10 py-10 grid grid-cols-[1.2fr_1px_1.5fr_1px_2fr] min-h-80">
      {/* Column 1: Links */}
      <div className="pr-12">
        <p className="text-[15px] font-bold tracking-normal text-bd-dark uppercase mb-2">
          BROWSE OUR PRODUCTS
        </p>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {[
            { label: "All Products", href: "/shop" },
            { label: "Aqueous Range", href: "/shop/aqueous-range" },
            { label: "Tissue Oil Range", href: "/shop/tissue-oil-range" },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link href={href} onClick={onLinkClick} className="text-[14px] font-normal text-[#888] hover:text-bd-dark transition-colors duration-200 no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#eee] self-stretch" />

      {/* Column 2: New Item */}
      <div className="px-12">
        <p className="text-[15px] font-bold tracking-normal text-bd-dark uppercase mb-2">NEW!</p>
        <Link href="/shop?type=petroleum-jelly" onClick={onLinkClick} className="block no-underline group">
          <div className="relative w-full aspect-16/8.5 overflow-hidden rounded-sm bg-gray-50 mb-5">
            <Image src="/images/mega-menu-new.webp" alt="Bodidoc Tissue Oil Jellies" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <p className="text-[13px] text-[#2f2f2f] leading-5 m-0 font-semibold">
            Discover our newest addition to your daily body care must haves: Bodidoc Tissue Oil Jellies
          </p>
        </Link>
      </div>

      <div className="bg-[#eee] self-stretch" />

      {/* Column 3: Bestseller */}
      <div className="pl-12">
        <p className="text-[15px] font-bold tracking-normal text-bd-dark uppercase mb-2">
          OUR #1 BESTSELLER
        </p>
        <Link href="/shop/bodidoc-tissue-oil-cream-for-normal-skin" onClick={onLinkClick} className="block no-underline group">
          <div className="relative w-full aspect-16/9.5 overflow-hidden rounded-sm bg-gray-50">
            <Image src="/images/mega-menu-bestseller.webp" alt="Bodidoc Tissue Oil Cream" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </Link>
      </div>
    </div>
  );
}

function MomentsMegaMenu({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="max-w-300 mx-auto px-10 py-10 grid grid-cols-[1.5fr_1px_1.5fr_1px_1.5fr] min-h-80">
      <div className="pr-12">
        <Link href="/moments/transform-dry-uneven-skin-with-the-award-winning-bodidoc-tissue-oil-cream-with-urea" onClick={onLinkClick} className="block no-underline group">
          <div className="relative w-full aspect-16/10 overflow-hidden rounded-sm bg-gray-50 mb-5">
            <Image src="/images/moments-award.png" alt="Award Winning" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <p className="text-[15px] font-medium text-bd-dark leading-3.75 mb-2.5 group-hover:text-bd-muted transition-colors">
            Voted The #1 Smoothing Cream With Urea
          </p>
          <p className="text-[13px] text-[#2f2f2f] leading-relaxed m-0">
            It&apos;s easy to see why Bodidoc Tissue Oil Cream with Urea for Dry Skin won ...
          </p>
        </Link>
      </div>

      <div className="bg-[#eee] self-stretch" />

      <div className="px-12">
        <Link href="/moments/our-commitment-to-sustainable-packaging" onClick={onLinkClick} className="block no-underline group">
          <div className="relative w-full aspect-16/10 overflow-hidden rounded-sm bg-gray-50 mb-5">
            <Image src="/images/moments-sustainability.png" alt="Sustainability" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <p className="text-[15px] font-medium text-bd-dark leading-3.75 mb-2.5 group-hover:text-bd-muted transition-colors">
            Our Commitment to Sustainable Packaging
          </p>
          <p className="text-[13px] text-[#2f2f2f] leading-relaxed m-0">
            At Bodidoc, we believe that taking care of your skin shouldn&apos;t cost the earth.
          </p>
        </Link>
      </div>

      <div className="bg-[#eee] self-stretch" />

      <div className="pl-12">
        <p className="text-[15px] font-bold tracking-normal text-bd-dark uppercase mb-2">LEARN MORE</p>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {[
            { label: "See All", href: "/moments" },
            { label: "Embracing Your Bodi: A Journey of Self-Love and Acceptance", href: "/moments/embracing-your-bodi-a-journey-of-self-love-and-acceptance" },
            { label: "Beyond The Bin: Give Your Bodidoc Packaging A Second Life", href: "/moments/beyond-the-bin-give-your-bodidoc-packaging-a-second-life" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} onClick={onLinkClick} className="text-[14px] font-normal text-[#888] hover:text-bd-dark transition-colors duration-200 no-underline leading-normal block">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Mobile Drawer (Original) ───────────────────────────────────────────────────

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
      { label: "AQUEOUS RANGE", href: "/shop/aqueous-range" },
      { label: "TISSUE OIL RANGE", href: "/shop/tissue-oil-range" },
    ],
    moments: [
      { label: "SEE ALL", href: "/moments" },
      { label: "Embracing Your Bodi: A Journey of Self-Love and Acceptance", href: "/moments/embracing-your-bodi-a-journey-of-self-love-and-acceptance" },
      { label: "Beyond The Bin: Give Your Bodidoc Packaging A Second Life", href: "/moments/beyond-the-bin-give-your-bodidoc-packaging-a-second-life" },
    ],
  };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/35 z-200 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      <nav
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 w-80 max-w-full h-dvh bg-white z-201 overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button onClick={onClose} aria-label="Close menu" className="absolute top-3.5 right-3.5 p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center">
          <CloseIcon />
        </button>

        <div className="pt-13 pb-8">
          <ul className="list-none p-0 m-0 border-t border-[#e8e8e8]">
            <li className="border-b border-[#e8e8e8]">
              <Link href="/" onClick={onClose} className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase no-underline hover:bg-gray-50 transition-colors duration-150">
                HOME
              </Link>
            </li>

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

            <li className="border-b border-[#e8e8e8]">
              <Link href="/contact-us" onClick={onClose} className="flex items-center justify-between w-full px-6 py-4.25 text-[12.5px] font-medium tracking-[0.08em] text-bd-dark uppercase no-underline hover:bg-gray-50 transition-colors duration-150">
                CONTACT US
              </Link>
            </li>
          </ul>

          <div className="px-6 pt-6">
            <p className="text-[11px] font-bold tracking-widest text-bd-dark uppercase mb-3">
              NEW!
            </p>
            <Link href="/shop?type=petroleum-jelly" onClick={onClose} className="block relative w-full h-37.5 rounded overflow-hidden bg-[#f0f4f8]">
  <Image src="/images/mega-menu-new.webp" alt="Bodidoc Tissue Oil Cream" fill className="object-cover object-center" />
</Link>
<p className="text-[11px] font-semibold text-[#2f2f2f] leading-4 mt-2">
  Discover our newest addition to your daily body care must haves: Bodidoc Tissue Oil Jellies
</p>
          </div>

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
  // Tracks the last active menu so content stays visible during the close transition
  const lastMenuRef = useRef<ActiveMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navVisible = useScrollDirection();
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleEnter = useCallback((menu: ActiveMenu) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    lastMenuRef.current = menu;
    setActiveMenu(menu);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 100);
  }, []);

  const handleMegaEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  // Keep lastMenuRef in sync so content doesn't flicker during close transition
  if (activeMenu) lastMenuRef.current = activeMenu;
  const menuToRender = activeMenu || lastMenuRef.current;

  const navLinkBase =
    "font-sans text-[14px] font-bold tracking-[0.06em] uppercase bg-transparent border-0 cursor-pointer whitespace-nowrap flex items-center h-14 relative transition-colors duration-200";

  return (
    <>
      {/* ── Desktop ── */}

      {/* Announcement bar — scrolls away with the page */}
      <div className="hidden lg:block">
        <AnnouncementBar onSubscribeClick={() => setSubscribeOpen(true)} />
      </div>

      {/* Sticky nav — sticks independently, slides out on scroll-down */}
      <header
        className={`hidden lg:block sticky top-0 z-99 bg-white border-b border-[#e8e8e8] transition-transform duration-300 ease-in-out ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseLeave={handleLeave}
      >
        <div className="w-full px-10 h-20 flex items-center justify-center gap-50">
          <nav className="flex items-center gap-7" aria-label="Primary navigation">
            {/* HOME — hovering closes any open mega menu */}
            <Link
              href="/"
              onMouseEnter={handleLeave}
              className={`${navLinkBase} ${pathname === "/" && !activeMenu ? "text-bd-dark" : "text-bd-muted hover:text-bd-dark"}`}
            >
              HOME
            </Link>

            {/* PRODUCTS */}
            <button
              className={`${navLinkBase} ${(pathname.startsWith("/shop") || activeMenu === "products") ? "text-bd-dark" : "text-bd-muted hover:text-bd-dark"}`}
              onMouseEnter={() => handleEnter("products")}
              aria-haspopup="true"
              aria-expanded={activeMenu === "products"}
            >
              PRODUCTS
            </button>
          </nav>

          <Link href="/" aria-label="Bodidoc home" className="relative w-30 h-9 flex items-center">
            <Image src="/images/logo.webp" alt="Bodidoc" fill className="object-contain" priority />
          </Link>

          <nav className="flex items-center gap-7" aria-label="Secondary navigation">
            {/* MOMENTS */}
            <button
              className={`${navLinkBase} ${(pathname.startsWith("/moments") || activeMenu === "moments") ? "text-bd-dark" : "text-bd-muted hover:text-bd-dark"}`}
              onMouseEnter={() => handleEnter("moments")}
              aria-haspopup="true"
              aria-expanded={activeMenu === "moments"}
            >
              MOMENTS
            </button>

            {/* CONTACT US — hovering closes any open mega menu */}
            <Link
              href="/contact-us"
              onMouseEnter={handleLeave}
              className={`${navLinkBase} ${pathname === "/contact-us" ? "text-bd-dark" : "text-bd-muted hover:text-bd-dark"}`}
            >
              CONTACT US
            </Link>
          </nav>
        </div>

        {/* Mega menu — always mounted, CSS transition for animate-in/out */}
        <div
          className={`absolute top-full left-0 right-0 z-98 bg-white border-t border-b border-[#e8e8e8] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-180 ease-out origin-top ${
            activeMenu
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
          }`}
          onMouseEnter={handleMegaEnter}
          onMouseLeave={handleLeave}
          role="region"
        >
          {menuToRender === "products"
            ? <ProductsMegaMenu onLinkClick={closeMenu} />
            : <MomentsMegaMenu onLinkClick={closeMenu} />
          }
        </div>
      </header>

      {/* ── Mobile ── */}

      {/* Mobile announcement strip — scrolls away */}
      <div className="lg:hidden bg-[#1a2b3c] h-8.5 flex items-center justify-center w-full">
        <Link
          href="/shop?type=petroleum-jelly"
          className="text-white text-[12px] font-normal tracking-wide no-underline"
        >
          Try our ALL NEW Tissue Oil Jellies
        </Link>
      </div>

      {/* Mobile sticky nav */}
      <header
        className={`lg:hidden sticky top-0 z-99 bg-white border-b border-[#e8e8e8] transition-transform duration-300 ease-in-out ${
          navVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="h-14.5 flex items-center justify-between px-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center"
            >
              <MenuIcon />
            </button>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 w-25 h-8 flex items-center">
              <Image src="/images/logo.webp" alt="Bodidoc" fill className="object-contain" priority />
            </Link>

            <button
              onClick={() => {
                const opening = !mobileSearchOpen;
                setMobileSearchOpen(opening);
                if (opening) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="p-1.5 text-bd-dark bg-transparent border-0 cursor-pointer flex items-center"
            >
              <SearchIcon />
            </button>
          </div>

          {/* Mobile search bar — slides in below nav */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-14" : "max-h-0"}`}>
            <form action="/search" method="GET" className="flex items-center gap-2 px-4 py-2.5 border-t border-[#e8e8e8]">
              <input
                type="text"
                name="q"
                placeholder="Search products and articles..."
                autoFocus={mobileSearchOpen}
                className="flex-1 bg-[#f5f5f5] border-0 outline-none text-[13px] text-bd-dark placeholder:text-[#aaa] px-3 py-2 rounded-full"
              />
              <button type="submit" className="flex items-center justify-center w-8 h-8 rounded-full bg-[#112942] text-white border-0 shrink-0">
                <SearchIcon />
              </button>
            </form>
          </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {subscribeOpen && <SubscriptionModal onClose={() => setSubscribeOpen(false)} />}
    </>
  );
}