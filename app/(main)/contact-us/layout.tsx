import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Bodidoc",
  description:
    "Get in touch with Bodidoc. Call 0860 002 652 (Mon–Fri 08:00–17:00), WhatsApp +27 60 996 6087, or visit 14 Ellman Street, Sunderland Ridge. Product enquiries, stockist info, and general support.",
  openGraph: {
    title: "Contact Us | Bodidoc",
    description:
      "Have a question about Bodidoc skincare? Call 0860 002 652, WhatsApp us, or submit a query online. We're here Mon–Fri, 08:00–17:00.",
    url: "https://www.bodidoc.com/contact-us",
    siteName: "Bodidoc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Bodidoc",
    description:
      "Call 0860 002 652 or WhatsApp +27 60 996 6087 to reach Bodidoc skincare support.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/contact-us",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Bodidoc",
  url: "https://www.bodidoc.com/contact-us",
  description:
    "Contact the Bodidoc team via phone, WhatsApp, or our online enquiry form.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://www.bodidoc.com/#business",
    name: "Bodidoc",
    telephone: "+27-860-002-652",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Ellman Street",
      addressLocality: "Sunderland Ridge",
      postalCode: "0157",
      addressCountry: "ZA",
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
      },
      {
        "@type": "ContactPoint",
        telephone: "+27-60-996-6087",
        contactType: "customer service",
        areaServed: "ZA",
        availableLanguage: "English",
      },
    ],
  },
};

const contactFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I buy Bodidoc products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bodidoc products are available through a network of trusted retailers and distributors. To find a stockist near you or online, simply check the stockist information listed on each product page in our 'All Products' section.",
      },
    },
    {
      "@type": "Question",
      name: "How can I become a stockist or distributor of Bodidoc products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We welcome inquiries from businesses interested in becoming a stockist or distributor of Bodidoc products. Please visit Amka.co.za or email info@amka.co.za for more information.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Bodidoc customer support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For any inquiries about our products or services, you can reach our customer support team by email at info@amka.co.za, by calling 0860 002 652 (Monday–Friday 08:00–17:00), or by filling out the contact form on our website.",
      },
    },
    {
      "@type": "Question",
      name: "Are Bodidoc products cruelty-free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all Bodidoc products are cruelty-free. We do not test on animals and ensure that our products are developed ethically, with care for both the environment and the animals.",
      },
    },
    {
      "@type": "Question",
      name: "Are Bodidoc products dermatologically tested?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all Bodidoc products are dermatologically tested to ensure they meet the highest safety standards for your skin.",
      },
    },
    {
      "@type": "Question",
      name: "Are Bodidoc products made in South Africa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we are a proud South African company. All our products are manufactured locally in South Africa with only the highest-quality ingredients to provide you with the best skincare solutions.",
      },
    },
    {
      "@type": "Question",
      name: "Can I recycle Bodidoc packaging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our bottles and jars are 100% recyclable. Please follow the recycling instructions on each product's packaging. Remember to remove the labels, as they are typically not recyclable.",
      },
    },
    {
      "@type": "Question",
      name: "Does Bodidoc offer international distribution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we supply products to various international markets. If you're interested in distributing our products abroad, please contact our team for more details at info@naturelle.co.za.",
      },
    },
    {
      "@type": "Question",
      name: "How can I work for Bodidoc?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are always on the lookout for local talent for our upcoming campaigns. Please send an email to hello@bodidoc.co.za and we will be in touch.",
      },
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFAQSchema) }}
      />
      {children}
    </>
  );
}
