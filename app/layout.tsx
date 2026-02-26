import type { Metadata } from "next";
import { Open_Sans, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

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
  title: "Bodidoc — Your Skin's New Best Friend",
  description:
    "Proudly South African skincare. Cruelty-free, dermatologically tested daily body care products packed with natural ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}