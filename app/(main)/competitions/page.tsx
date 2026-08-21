import type { Metadata } from "next";
import type { ReactNode } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Competitions & Giveaways | Bodidoc",
  description:
    "Win your share of R250,000 in cash prizes with the Bodidoc competition! Buy any participating Bodidoc product, enter via WhatsApp or USSD, and stand a chance to win. Open to South African residents 18+.",
  openGraph: {
    title: "Competitions & Giveaways | Bodidoc",
    description:
      "Enter the Bodidoc competition for a chance to win R250,000 in cash prizes. Buy any participating product and enter via WhatsApp or USSD. Open to SA residents 18+.",
    url: "https://www.bodidoc.com/competitions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Competitions & Giveaways | Bodidoc",
    description:
      "Win your share of R250,000! Buy a Bodidoc product and enter via WhatsApp or USSD. Open to South African residents 18+.",
  },
  alternates: {
    canonical: "https://www.bodidoc.com/competitions",
  },
};

// --- Shared link styles ---
const lx =
  "text-[#112942] underline underline-offset-2 hover:opacity-60 transition-opacity";

export default function TermsPrivacyPage() {
  return (
    <div className="w-full bg-white dark:bg-page min-h-screen pb-20">
      {/* ── Content Container ── */}
      <div className="max-w-300 mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="w-full mb-12">
          {/* Desktop Banner */}
          <img
            src="images/competition-desktop.png"
            alt="Bodidoc competition hero desktop"
            className="hidden md:block w-full object-cover rounded-lg"
          />

          {/* Mobile Banner */}
          <img
            src="images/competition-mobile.png"
            alt="Bodidoc competition hero mobile"
            className="block md:hidden w-full object-cover rounded-lg"
          />
        </div>
        {/* ── Page Header ── */}
        <div className="mb-10">
          <h1 className="text-[32px] md:text-[42px] font-display text-[#112942] dark:text-bd-dark flex items-center gap-4">
            Competitions &amp; Giveaways
          </h1>
        </div>

        {/* ── Introduction ── */}
        <div className="mb-10 text-[14px] leading-relaxed text-[#333] dark:text-fg-body space-y-4 max-w-4xl">
          <p>
            Stay in the loop with our latest competitions. Find entry details,
            prize info, and the official terms and conditions all in one place.
          </p>
          <p>
            You&#39;re already taking care of your skin—now let us reward you
            for it. We&#39;re giving away R250,000 in cash prizes to celebrate
            our best-loved products. Simply buy any participating Bodidoc
            product in-store, enter the competition, and you could win your
            share!
          </p>
        </div>

        {/* ── Sections ── */}
        <div className="space-y-12 max-w-4xl">
          {/* Collection of Information */}
          <section>
            <h2 className="text-[16px] font-bold text-[#112942] dark:text-bd-dark mb-4 uppercase tracking-tight">
              BODIDOC CONSUMER COMPETITION TERMS &amp; CONDITIONS
            </h2>
            <div className="text-[14px] leading-relaxed text-[#333] dark:text-fg-body space-y-4">
              <ol className="list-decimal pl-6 space-y-2 text-[14px] leading-relaxed text-[#333] dark:text-fg-body">
                <li>
                  This competition is run by Amka Products (Pty) Ltd (“Amka”) on
                  behalf of Bodidoc, a brand of Naturelle Brands (Pty) Ltd.
                </li>
                <li>
                  This competition is open to individuals who are permanent
                  residents or citizens of South Africa, aged 18 years and
                  older, with a valid South African ID document. This excludes
                  Amka employees, their advertising agencies, sales agents and
                  their immediate families.
                </li>
                <li>
                  This competition is open to customers at retail stores and
                  online platforms across South Africa.
                </li>
                <li>
                  The competition commences on 1 June 2026 and closes at 12am
                  (midnight) on 31 August 2026.
                </li>
                <li>
                  Participants cannot win in this competition if they have won a
                  prize from Amka within the past 12 months i.e. 12 months prior
                  to 1 June 2026.
                </li>
                <li>
                  This competition applies only to the purchase of any of the
                  following participating products:
                  <ol className="list-lower-alpha pl-6 space-y-1">
                    <li>Bodidoc Tissue Oil Body Cream 500ml</li>
                    <li>Bodidoc Tissue Oil 200ml</li>
                    <li>Bodidoc Tissue Oil Body Cream with Urea 500ml</li>
                    <li>Bodidoc Tissue Oil Body Lotion 450ml</li>
                    <li>Bodidoc Tissue Oil Lotion with Urea 450ml</li>
                    <li>Bodidoc Tissue Oil Jelly 250ml</li>
                    <li>Bodidoc Tissue Oil Jelly with Aloe Vera 250ml</li>
                    <li>Bodidoc Aqueous Cream 500ml</li>
                    <li>Bodidoc Herbal Camphor & Tissue Oil Cream 500ml</li>
                  </ol>
                </li>
                <li>
                  To enter, participants will be required to:
                  <ol className="list-lower-alpha pl-6 space-y-1">
                    <li>
                      Buy any one (1) product from Bodidoc (products listed
                      above)
                    </li>
                    <li>WhatsApp +2710 442 5331 and follow the prompts OR</li>
                    <li>Dial *120*15564# and follow the prompts</li>
                    <li>
                      Keep till slip as proof of purchase (USSD charged at 20c
                      per 20 seconds in every session and standard data cost
                      will apply to WhatsApp entries)
                    </li>
                  </ol>
                </li>
                <li>
                  Entries are limited to five (5) per cell phone number and five
                  (5) per person per month. A person can only win one (1) prize
                  for the duration of the competition.
                </li>
                <li>
                  It is the participant’s responsibility to ensure that any
                  information which is provided to Amka is accurate, complete
                  and up to date.
                </li>
                <li>
                  Proof of purchase is required in order to claim a prize.
                </li>
                <li>
                  Participants stand a chance to win:
                  <ol className="list-lower-alpha pl-6 space-y-1">
                    <li>
                      Their share of R100 000 in weekly cash prizes: one of ten
                      (10) weekly cash prizes of R10 000 each starting 15 June
                      2026 for a period of 10 weeks
                    </li>
                    <li>
                      Or their share of R150 000 in grand prizes: one of three
                      (3) grand prizes at R50 000 each
                    </li>
                    <li>The total prize value is R250 000.00</li>
                  </ol>
                </li>
                <li>
                  Winners may be required to provide their names, ID numbers and
                  contact details and to sign an acknowledgment of receipt of
                  the prize.
                </li>
                <li>Winners will be randomly drawn.</li>
                <li>
                  All cash prize winners must have a valid South African bank
                  account in their name to receive the prize.
                </li>
                <li>
                  By entering the competition, participants consent to the use
                  of their name on the Bodidoc’s website and social media
                  platforms, should they be selected as a winner.
                </li>
                <li>
                  The grand prize draw will take place no later than 09
                  September 2026.
                </li>
                <li>
                  Winners will be notified within 48 hours of the draw, subject
                  to verification. Winners’ prizes will be fulfilled within 15
                  (fifteen) working days of verification.
                </li>
                <li>
                  Winners will be notified and verified telephonically and via
                  SMS on the phone number used to enter the competition. Each
                  participant must enter using their own registered phone number
                  to prevent fraud.
                </li>
                <li>
                  Amka reserves the right to disqualify a winner if he or she
                  cannot be reached telephonically after three (3) attempts or
                  in circumstances where a winner has been contacted but is not
                  willing to provide or has not provided the requested
                  information within 72 hours. In such instances, the prize will
                  be forfeited and Amka will select a new winner.
                </li>
                <li>
                  The grand prize winners will be announced in the media by 18
                  September 2026, and weekly winners will be published on
                  Bodidoc’s social media platforms and website.
                </li>
                <li>Prizes are not transferable.</li>
                <li>
                  With a participant’s consent, Amka and/or its agents may
                  publish their photo and/or details in the media without
                  payment or compensation.
                </li>
                <li>
                  Amka reserves the right to vary, suspend, postpone, withdraw
                  or amend this competition, including prizes, for any reason,
                  including unforeseen circumstances.
                </li>
                <li>
                  Except as provided for in the Consumer Protection Act No. 68
                  of 2008 South Africa (“CPA”), the judges’ decision will be
                  final and binding.
                </li>
                <li>
                  By entering the competition, participants and winners
                  unconditionally indemnify and hold harmless Amka, the
                  organisers, their directors, employees, agents, suppliers and
                  contractors from any claims or liability resulting from
                  participation, prize acceptance, use of any prize, or
                  attending a prize handover.
                </li>
                <li>
                  Amka will not be held liable for any participant providing
                  incomplete or incorrect details or technical glitches beyond
                  its control.
                </li>
                <li>
                  All information published on promotional material forms part
                  of the terms and conditions of entry.
                </li>
                <li>
                  By entering the competition, participants agree to abide by
                  these terms and conditions.
                </li>
                <li>
                  Disputes arising from the interpretation of these terms will
                  be final and binding with no correspondence entered into.
                </li>
                <li>
                  All provisions shall be qualified as necessary to comply with
                  the CPA.
                </li>
                <li>
                  By entering, you are participating in a promotional
                  competition for the purposes of the CPA. Winners must take all
                  steps necessary to comply with CPA obligations.
                </li>
                <li>
                  By participating and in accordance with POPIA, participants
                  consent to the processing of personal information by Amka or
                  its agents, including data collection, retention, and use for
                  legal, regulatory, fraud prevention, and marketing purposes.
                </li>
                <li>
                  These terms and conditions constitute a legally binding
                  agreement made between the participants and Amka.
                </li>
                <li>
                  The competition shall be governed in accordance with the laws
                  of the Republic of South Africa.
                </li>
                <li>
                  For further information, please contact the Amka Consumer Care
                  Line on 0860 002 652 or the Consumer Relations WhatsApp number
                  on 060 996 6087. Alternatively, visit
                  www.bodidoc.com/competitions.
                </li>
              </ol>
            </div>
          </section>

          {/* Use of Information */}

          {/* Use of Cookies */}
        </div>
      </div>
    </div>
  );
}
