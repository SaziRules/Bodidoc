import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Privacy Policy | Bodidoc",
  description: "Terms and conditions and privacy policy for Bodidoc skincare products.",
};

// ─── Shared link styles ───────────────────────────────────────────────────────

const lx = "text-[#112942] underline underline-offset-2 hover:opacity-60 transition-opacity";

// ─── Section data ─────────────────────────────────────────────────────────────

const sections: {
  id: string;
  index: string;
  label: string;
  title: string;
  content: { heading: string; body: ReactNode }[];
}[] = [
  {
    id: "terms",
    index: "01",
    label: "Terms & Conditions",
    title: "Privacy Statement",
    content: [
      {
        heading: "Our Commitment",
        body: <>This statement of privacy explains how we obtain, use and disclose your personal information, as is required by the <a href="https://www.gov.za/documents/protection-personal-information-act" target="_blank" rel="noopener noreferrer" className={lx}>Protection of Personal Information Act 4 of 2013 (POPI Act)</a>. Bodidoc is committed to protecting your privacy and ensuring that your personal information is collected and used properly, lawfully and transparently.</>,
      },
      {
        heading: "Scope",
        body: "Bodidoc is committed to developing technology that gives you the most powerful and safe online experience. This statement of privacy applies to the Bodidoc website and governs data collection and usage. By using the Bodidoc website, you consent to the data practices described in this statement.",
      },
    ],
  },
  {
    id: "privacy",
    index: "02",
    label: "Privacy Policy",
    title: "Your Privacy",
    content: [
      {
        heading: "Collection of Your Personal Information",
        body: "Bodidoc collects personally identifiable information, such as your email address, name, home or work address and/or telephone number. Bodidoc also collects anonymous demographic information, which is not unique to you, such as your ZIP code, age, gender, preferences, interests and favourites. There is also information about your computer hardware and software that is automatically collected by Bodidoc. This information can include your IP address, browser type, domain names, access times and referring website addresses. This information is used by Bodidoc for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Bodidoc website. Please keep in mind that if you directly disclose personally identifiable information or personally sensitive data through Bodidoc public message boards, this information may be collected and used by others. Note: Bodidoc does not read any of your private online communications.",
      },
      {
        heading: "Use of Your Personal Information",
        body: <>Bodidoc collects and uses your personal information to operate the Bodidoc website and deliver the services you have requested. Bodidoc also uses your personally identifiable information to inform you of other products or services available from Bodidoc and its affiliates. Bodidoc does not sell, rent or lease its customer lists to third parties. Bodidoc may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these specific services to Bodidoc, and they are required to maintain the confidentiality and protection of your personal information. Bodidoc does not use or disclose sensitive personal information, such as race, religion, or political affiliations, without your explicit consent. You may opt out at any time by emailing <a href="mailto:info@clere.co.za" className={lx}>info@bodidoc.com</a>.</>,
      },
      {
        heading: "Use of Cookies",
        body: `The Bodidoc website uses "cookies" to help you personalise your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you. One of the primary purposes of cookies is to provide a convenience feature to save you time. When you return to the same Bodidoc website, the information you previously provided can be retrieved, so you can easily use the Bodidoc features that you customised. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.`,
      },
      {
        heading: "Security of Your Personal Information",
        body: "Bodidoc secures your personal information from unauthorised access, use or disclosure. Bodidoc secures the personally identifiable information you provide on computer servers in a controlled, secure environment, protected from unauthorised access, use or disclosure. When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Socket Layer (SSL) protocol. We will, on an ongoing basis, continue to review our security controls and related processes to ensure that your personal information is secure.",
      },
      {
        heading: "Access to Information",
        body: <>You have the right to request a copy of the personal information Bodidoc holds about you as well as the identity of all third parties, or categories of third parties, who have or have had, access to your personal information. To request access to such information, please contact <a href="mailto:info@clere.co.za" className={lx}>info@bodidoc.com</a>.</>,
      },
      {
        heading: "Correction of Information",
        body: <>In certain cases, you have the right to object to the processing of your personal information. You have the right to request us to update, correct, reduce or delete your personal information. You may do this by emailing <a href="mailto:info@clere.co.za" className={lx}>info@bodidoc.com</a>.</>,
      },
      {
        heading: "Changes to This Statement",
        body: "Bodidoc will occasionally update this statement of privacy to reflect company and customer feedback. Bodidoc encourages you to periodically review this statement to remain informed of how Bodidoc is protecting your information.",
      },
      {
        heading: "Contact Information",
        body: <>Bodidoc welcomes your comments or queries regarding this statement of privacy. If you believe that Bodidoc has not adhered to this statement or if you require any further information, please contact Bodidoc at <a href="mailto:info@clere.co.za" className={lx}>info@bodidoc.com</a>. We will use commercially reasonable efforts to promptly determine and remedy the problem.</>,
      },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPrivacyPage() {
  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-[#112942] overflow-hidden">

        {/* Large ghost text */}
        <div className="absolute inset-0 flex items-end justify-start pl-6 md:pl-16 pb-0 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-normal text-white/4 leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(100px, 22vw, 280px)" }}
          >
            Legal
          </span>
        </div>

        {/* Decorative vertical rule */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/5 hidden lg:block" style={{ right: "20%" }} />

        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 pt-10 pb-10 md:pt-15 md:pb-12">

         

          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-light mb-5">
              Bodidoc — Legal
            </p>
            <h1
              className="font-display font-normal text-white leading-none mb-6"
              style={{ fontSize: "clamp(44px, 8vw, 88px)" }}
            >
              Terms &amp;<br />Privacy Policy
            </h1>
            <p className="text-[14px] font-light text-white/70 leading-relaxed max-w-sm">
              Please read these documents carefully. They govern your use of our website and explain how we handle your personal information.
            </p>
          </div>

          {/* Jump links */}
          <div className="flex items-center gap-6 mt-12">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-2.5 text-[10px] tracking-[0.2em] uppercase font-light text-white/60 hover:text-white/90 transition-colors duration-200"
              >
                <span className="w-5 h-px bg-white/35 group-hover:bg-white/70 group-hover:w-8 transition-all duration-300" />
                {s.label}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Effective date bar ── */}
      <div className="border-b border-[#e8e8e8] bg-[#fafafa]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          <p className="text-[11px] font-light text-[#666] tracking-wide">
            Last updated: January 2026
          </p>
          <p className="text-[11px] font-light text-[#666] tracking-wide hidden md:block">
            Governed by South African law — POPIA compliant
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* ── Sticky sidebar TOC ── */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-32 flex flex-col gap-1">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#112942]/55 font-light mb-4">
                Contents
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 py-2 text-[11px] tracking-widest font-light text-[#112942]/65 hover:text-[#112942] transition-colors duration-200"
                >
                  <span className="text-[9px] text-[#112942]/40 group-hover:text-[#112942]/70 transition-colors font-normal tabular-nums">
                    {s.index}
                  </span>
                  {s.label}
                </a>
              ))}
              <div className="mt-8 pt-8 border-t border-[#e8e8e8]">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#112942]/50 font-light mb-3">
                  Questions?
                </p>
                <a
                  href="mailto:info@amka.co.za"
                  className="text-[11px] font-light text-[#112942]/70 hover:text-[#112942] transition-colors break-all"
                >
                  info@amka.co.za
                </a>
              </div>
            </div>
          </aside>

          {/* ── Content ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-20 md:gap-28">
            {sections.map((section, si) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">

                {/* Section header */}
                <div className="flex items-start gap-5 mb-12 pb-8 border-b border-[#e8e8e8]">
                  <span
                    className="font-display font-normal text-[#112942]/10 leading-none shrink-0 mt-1"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
                  >
                    {section.index}
                  </span>
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[#112942]/55 font-light mb-1">
                      {section.label}
                    </p>
                    <h2
                      className="font-display font-normal text-[#112942] leading-tight"
                      style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Clauses */}
                <div className="flex flex-col gap-0">
                  {section.content.map((clause, ci) => (
                    <div
                      key={clause.heading}
                      className="group flex gap-6 md:gap-10 py-7 border-b border-[#f0f0f0] hover:border-[#e0e8ee] transition-colors duration-200"
                    >
                      {/* Clause number */}
                      <span className="text-[11px] tabular-nums font-light text-[#112942]/35 shrink-0 mt-0.5 w-7 group-hover:text-[#112942]/60 transition-colors">
                        {si + 1}.{ci + 1}
                      </span>

                      {/* Clause content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] tracking-widest uppercase font-medium text-[#112942] mb-3">
                          {clause.heading}
                        </h3>
                        <p className="text-[14px] font-light text-[#333] leading-[1.85]">
                          {clause.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}

            {/* ── Contact CTA ── */}
            <div className="relative overflow-hidden bg-[#112942] px-8 py-10 md:px-12 md:py-14">
              <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.04] pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="80" cy="20" r="60" stroke="white" strokeWidth="0.5"/>
                  <circle cx="80" cy="20" r="40" stroke="white" strokeWidth="0.5"/>
                  <circle cx="80" cy="20" r="20" stroke="white" strokeWidth="0.5"/>
                </svg>
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-light mb-4">
                Still have questions?
              </p>
              <h3
                className="font-display font-normal text-white leading-tight mb-4"
                style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
              >
                We&apos;re here to help.
              </h3>
              <p className="text-[14px] font-light text-white/70 leading-relaxed max-w-md mb-8">
                If you have any questions about our terms or how we handle your data, our team is happy to assist.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="mailto:info@amka.co.za"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-light text-white border border-white/20 px-7 py-3 hover:bg-white hover:text-[#112942] transition-all duration-200"
                >
                  Email Us
                </a>
                <Link
                  href="/contact-us"
                  className="text-[11px] tracking-[0.15em] uppercase font-light text-white/60 hover:text-white/90 transition-colors inline-flex items-center gap-2"
                >
                  Contact Page
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}