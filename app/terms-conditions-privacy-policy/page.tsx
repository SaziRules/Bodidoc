import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms & Privacy Policy | Bodidoc",
  description: "Terms and conditions and privacy policy for Bodidoc skincare products.",
};

// --- Shared link styles ---
const lx = "text-[#112942] underline underline-offset-2 hover:opacity-60 transition-opacity";

export default function TermsPrivacyPage() {
  return (
    <div className="w-full bg-white min-h-screen pb-20">
      {/* ── Content Container ── */}
      <div className="max-w-300 mx-auto px-6 md:px-10 py-12 md:py-16">
        
        {/* ── Page Header ── */}
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[42px] font-display text-[#112942] flex items-center gap-4">
            Terms & Conditions <span className="text-[#ccc] font-light">|</span> Privacy Policy
          </h1>
        </div>

        {/* ── Introduction ── */}
        <div className="mb-10 text-[14px] leading-relaxed text-[#333] space-y-4 max-w-4xl">
          <p>
            This statement of privacy explains how we obtain, use and disclose your personal information, as is required by the{" "}
            <a href="https://www.gov.za/documents/protection-personal-information-act" target="_blank" rel="noopener noreferrer" className="text-[#e91e63] hover:underline">
              Protection of Personal Information Act 4 of 2013 (POPI Act)
            </a>.
          </p>
          <p>
            Bodidoc is committed to protecting your privacy and ensuring that your personal information is collected and used properly, lawfully and transparently. Bodidoc is committed to developing technology that gives you the most powerful and safe online experience. This statement of privacy applies to the Bodidoc website and governs data collection and usage. By using the Bodidoc website, you consent to the data practices described in this statement.
          </p>
        </div>

        {/* ── Sections ── */}
        <div className="space-y-12 max-w-4xl">
          
          {/* Collection of Information */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Collection of your personal information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                Bodidoc collects personally identifiable information, such as your email address, name, home or work address and/or telephone number. Bodidoc also collects anonymous demographic information, which is not unique to you, such as your ZIP code, age, gender, preferences, interests and favourites.
              </p>
              <p>
                There is also information about your computer hardware and software that is automatically collected by Bodidoc. This information can include your IP address, browser type, domain names, access times and referring website addresses. This information is used by Bodidoc for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the Bodidoc website.
              </p>
              <p>
                Please keep in mind that if you directly disclose personally identifiable information or personally sensitive data through Bodidoc public message boards, this information may be collected and used by others. Note: Bodidoc does not read any of your private online communications.
              </p>
              <p>
                Bodidoc encourages you to review the privacy statements of websites you choose to link to from Bodidoc so that you can understand how those websites collect, use and share your information. Bodidoc is not responsible for the privacy statements or other content on websites outside of the Bodidoc website and Bodidoc family of websites.
              </p>
            </div>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Use of your personal information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                Bodidoc collects and uses your personal information to operate the Bodidoc website and deliver the services you have requested. Bodidoc also uses your personally identifiable information to inform you of other products or services available from Bodidoc and its affiliates. Bodidoc may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered.
              </p>
              <p>
                Bodidoc does not sell, rent or lease its customer lists to third parties. Bodidoc may, from time to time, contact you on behalf of external business partners about a particular offering that may be of interest to you. In those cases, your unique personally identifiable information (email, name, address, telephone number) is not transferred to the third party. In addition, Bodidoc may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these specific services to Bodidoc, and they are required to maintain the confidentiality and protection of your personal information.
              </p>
              <p>
                Bodidoc does not use or disclose sensitive personal information, such as race, religion, or political affiliations, without your explicit consent.
              </p>
              <p>
                Bodidoc keeps track of the websites and pages our customers visit within Bodidoc, in order to determine what Bodidoc services are the most popular. This data is used to deliver customised content and advertising within Bodidoc to customers whose behaviour indicates that they are interested in a particular subject area.
              </p>
              <p>
                You may opt out at any time if you do not want to receive any of the above further communications. You may also give and withdraw consent regarding further communications of this nature by emailing <a href="mailto:info@bodidoc.com" className="text-[#e91e63] hover:underline">info@bodidoc.com</a>.
              </p>
              <p>
                Bodidoc websites will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on Bodidoc or the site; (b) protect and defend the rights or property of Bodidoc; and, (c) act under exigent circumstances to protect the personal safety of users of Bodidoc, or the public.
              </p>
            </div>
          </section>

          {/* Use of Cookies */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Use of cookies</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                The Bodidoc website uses &ldquo;cookies&rdquo; to help you personalise your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.
              </p>
              <p>
                One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the web server that you have returned to a specific page. For example, if you personalise Bodidoc pages, or register with the Bodidoc site or services, a cookie helps Bodidoc to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, etc. When you return to the same Bodidoc website, the information you previously provided can be retrieved, so you can easily use the Bodidoc features that you customised.
              </p>
              <p>
                You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the Bodidoc services or websites you visit.
              </p>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Security of your personal information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                Bodidoc secures your personal information from unauthorised access, use or disclosure. Bodidoc secures the personally identifiable information you provide on computer servers in a controlled, secure environment, protected from unauthorised access, use or disclosure. When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Socket Layer (SSL) protocol.
              </p>
              <p>
                We will, on an ongoing basis, continue to review our security control and related processes to ensure that your personal information is secure.
              </p>
            </div>
          </section>

          {/* Access */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Access to information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                You have the right to request a copy of the personal information Bodidoc holds about you as well as the identity of all third parties, or categories of third parties, who have or have had, access to your personal information.
              </p>
              <p>
                To request access to such information, please contact <a href="mailto:info@bodidoc.com" className="text-[#e91e63] hover:underline">info@bodidoc.com</a>.
              </p>
            </div>
          </section>

          {/* Correction */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Correction of information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                In certain cases, you have the right to object to the processing of your personal information. You have the right to request us to update, correct, reduce or delete your personal information. You may do this by emailing <a href="mailto:info@bodidoc.com" className="text-[#e91e63] hover:underline">info@bodidoc.com</a>.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Changes to this statement</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                Bodidoc will occasionally update this statement of privacy to reflect company and customer feedback. Bodidoc encourages you to periodically review this statement to remain informed of how Bodidoc is protecting your information.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] mb-4 uppercase tracking-tight">Contact information</h2>
            <div className="text-[14px] leading-relaxed text-[#333] space-y-4">
              <p>
                Bodidoc welcomes your comments or queries regarding this statement of privacy. If you believe that Bodidoc has not adhered to this statement or if you require any further information about this statement, please contact Bodidoc at <a href="mailto:info@bodidoc.com" className="text-[#e91e63] hover:underline">info@bodidoc.com</a>. We will use commercially reasonable efforts to promptly determine and remedy the problem.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}