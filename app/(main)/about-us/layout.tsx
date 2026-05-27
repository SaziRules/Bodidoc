import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Bodidoc",
  description:
    "Learn about Bodidoc — a proudly South African skincare brand delivering cruelty-free, dermatologically tested body care trusted by families across South Africa.",
  openGraph: {
    title: "About Us | Bodidoc",
    description:
      "Proudly South African. Cruelty-free. Dermatologically tested. Discover the story behind Bodidoc skincare and our commitment to gentle, effective daily care.",
    url: "https://www.bodidoc.com/about-us",
    siteName: "Bodidoc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Bodidoc",
    description:
      "Proudly South African skincare. Discover the Bodidoc story — cruelty-free, dermatologically tested body care for the whole family.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/about-us",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
