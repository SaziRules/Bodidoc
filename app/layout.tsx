import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

/*
 * Open Sans — all UI text
 * weights: 300 (search input), 400 (body), 500 (product labels),
 *          600 (subheadings), 700 (nav active, section headings), 800 (CTAs)
 */
const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

/*
 * Playfair Display — editorial / hero headings
 * e.g. "YOUR SKIN'S NEW BEST FRIEND." (42px, weight 400)
 */
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bodidoc.com"),
  title: "Bodidoc — Your Skin's New Best Friend",
  description:
    "Proudly South African skincare. Cruelty-free, dermatologically tested daily body care products packed with natural ingredients.",
  icons: {
    icon: [
      { url: "/bodidoc-favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/bodidoc-favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/bodidoc-favicon.png",
  },
  openGraph: {
    siteName: "Bodidoc",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bodidoc",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.bodidoc.com/#business",
  name: "Bodidoc",
  url: "https://www.bodidoc.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.bodidoc.com/bodidoc-favicon.png",
  },
  image: "https://www.bodidoc.com/bodidoc-favicon.png",
  description:
    "Proudly South African skincare brand. Cruelty-free, dermatologically tested body care products — Tissue Oil and Aqueous Cream ranges — trusted by families across South Africa.",
  telephone: "+27-860-002-652",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14 Ellman Street",
    addressLocality: "Sunderland Ridge",
    postalCode: "0157",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -25.7075,
    longitude: 28.182,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+27-860-002-652",
      contactType: "customer service",
      areaServed: "ZA",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
    {
      "@type": "ContactPoint",
      telephone: "+27-60-996-6087",
      contactType: "customer service",
      contactOption: "https://schema.org/TollFree",
      areaServed: "ZA",
      availableLanguage: "English",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  sameAs: [
    "https://www.facebook.com/bodidoc/",
    "https://www.instagram.com/bodidoc/",
    "https://www.tiktok.com/@bodidoc.africa",
    "https://x.com/bodidoc_sa",
    "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q/featured",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Bodidoc",
  url: "https://www.bodidoc.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.bodidoc.com/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
