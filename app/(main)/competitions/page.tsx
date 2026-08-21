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
              <ol className=”list-decimal pl-6 space-y-2 text-[14px] leading-relaxed text-[#333] dark:text-fg-body”>
                <li>
                  This competition is run by Amka Products (Pty) Ltd
                  ("Amka") on behalf of Bodidoc, a brand of
                  Naturelle Brands (Pty) Ltd.
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
                  (midnight) on 30 September 2026.
                </li>
                <li>
                  Participants cannot win in this competition if they have won a
                  prize from Amka within the past 12 months i.e. 12 months
                  prior to 1 June 2026.
                </li>
                <li>
                  This competition applies only to the purchase of any of the
                  following participating products:
                  <ol className=”list-lower-alpha pl-6 space-y-1”>
                    <li>Bodidoc Tissue Oil Body Cream 500ml</li>
                    <li>Bodidoc Tissue Oil 200ml</li>
                    <li>Bodidoc Tissue Oil Body Cream with Urea 500ml</li>
                    <li>Bodidoc Tissue Oil Body Lotion 450ml</li>
                    <li>Bodidoc Tissue Oil Lotion with Urea 450ml</li>
                    <li>Bodidoc Tissue Oil Jelly 250ml</li>
                    <li>Bodidoc Tissue Oil Jelly with Aloe Vera 250ml</li>
                    <li>Bodidoc Aqueous Cream 500ml</li>
                    <li>Bodidoc Herbal Camphor &amp; Tissue Oil Cream 500ml</li>
                  </ol>
                </li>
                <li>
                  To enter, participants will be required to:
                  <ol className=”list-lower-alpha pl-6 space-y-1”>
                    <li>
                      Buy any one (1) product from Bodidoc (products listed
                      above)
                    </li>
                    <li>WhatsApp +2710 442 5331 and follow the prompts OR</li>
                    <li>Dial *120*15564# and follow the prompts and</li>
                    <li>Keep till slip as proof of purchase.</li>
                  </ol>
                  USSD charged at 20c per 20 seconds in every session and
                  standard data cost will apply to WhatsApp entries.
                </li>
                <li>
                  Entries are limited to five (5) per cell phone number and
                  five (5) per person per month. A person can only win one (1)
                  prize for the duration of the competition.
                </li>
                <li>
                  It is the participant&apos;s responsibility to ensure that
                  any information which is provided to Amka is accurate,
                  complete and up to date.
                </li>
                <li>
                  Proof of purchase is required in order to claim a prize.
                </li>
                <li>
                  Participants stand a chance to win:
                  <ol className=”list-lower-alpha pl-6 space-y-1”>
                    <li>
                      Their share of R100 000 in weekly cash prizes: one of ten
                      (10) weekly cash prizes of R10 000 each starting 07
                      August for a period of 8 weeks.
                    </li>
                    <li>
                      Or their share of R150 000 in grand prizes: one of three
                      (3) grand prizes at R50 000 each.
                    </li>
                    <li>The total prize value is R250 000.00.</li>
                  </ol>
                </li>
                <li>
                  Winners may be required to provide their names, ID numbers
                  and contact details and to sign an acknowledgment of receipt
                  of the prize.
                </li>
                <li>Winners will be randomly drawn.</li>
                <li>
                  All cash prize winners must have a valid South African bank
                  account in their name to receive the prize.
                </li>
                <li>
                  By entering the competition, participants consent to the use
                  of their name on Bodidoc&apos;s website and social media
                  platforms, should they be selected as a winner.
                </li>
                <li>
                  The grand prize draw will take place no later than 09 October
                  2026.
                </li>
                <li>
                  Winners will be notified within 48 hours of the draw, subject
                  to verification. Winners&apos; prizes will be fulfilled within
                  15 (fifteen) working days of verification.
                </li>
                <li>
                  Winners will be notified and verified telephonically and via
                  SMS on the phone number used to enter the competition. Each
                  participant is obliged to enter the competition using a phone
                  number that is owned by and registered to that participant. No
                  person can use another person&apos;s phone number for
                  competition entry purposes. This is to avoid fraud and
                  possible litigation between the phone owner and the
                  participant.
                </li>
                <li>
                  Amka reserves the right to disqualify a winner if he or she
                  cannot be reached telephonically after three (3) attempts or
                  in circumstances where a winner has been contacted but is not
                  willing to provide or has not provided the requested
                  information within 72 hours of having been notified that they
                  are a winner. In such instances, a winner will forfeit their
                  prize and Amka will select a new winner. If the new winner
                  cannot be reached and/or also is not willing to provide or
                  does not provide the requested information within 48 hours of
                  having been notified that they are a winner, the prize will be
                  forfeited and no further winners shall be selected by Amka.
                </li>
                <li>
                  The grand prize winners will be announced in the media by 18
                  October 2026 and the weekly winners will be published every
                  week on Bodidoc&apos;s social media platforms and website.
                </li>
                <li>Prizes are not transferable.</li>
                <li>
                  With a participant&apos;s consent, Amka and/or its agents may
                  publish their photo and/or details in the media without
                  payment or compensation.
                </li>
                <li>
                  Amka reserves the right, at any time and at its sole
                  discretion, to vary, suspend, postpone, withdraw or amend
                  this competition, including prizes or any aspect thereof, for
                  any reasons whatsoever, including in the event of any
                  unforeseen circumstances or factors beyond its control and
                  without notice.
                </li>
                <li>
                  Except as provided for in the Consumer Protection Act No. 68
                  of 2008 South Africa ("CPA"), the judges&apos;
                  decision on all matters arising out of the competition will be
                  final and binding, and no correspondence will be entered into.
                </li>
                <li>
                  By entering the competition and/or accepting the prize,
                  participants and winners hereby unconditionally and
                  irrevocably indemnify and hold harmless Amka, the organisers,
                  their directors, employees, agents, suppliers and contractors
                  from and against any actions, claims and/or liability for
                  injury, loss or damage of any kind resulting in whole or in
                  part, directly or indirectly from participation in the
                  competition, acceptance of the prize, the use of any prize
                  awarded and/or participation (or non-participation) in a
                  prize-related activity, and/or attending a ceremonial prize
                  handover, and acknowledge that Amka shall not be liable for
                  any of the aforementioned liability for injury, loss or damage
                  of any kind, save in the event of Amka&apos;s gross
                  negligence or wilful intent. This indemnity does not apply to
                  any Amka goods purchased by any participants or winners.
                </li>
                <li>
                  Amka will not be held liable for any participant that provides
                  incomplete or incorrect details and any technical glitches
                  beyond its control.
                </li>
                <li>
                  All information relating to this competition and published on
                  any promotional material shall form part of the terms and
                  conditions of entry.
                </li>
                <li>
                  By entering the competition, participants agree to abide by
                  these terms and conditions.
                </li>
                <li>
                  Should any dispute arise in relation to the interpretation of
                  these Competition terms and conditions, Amka&apos;s decision
                  shall be final and no correspondence will be entered into.
                </li>
                <li>
                  All provisions of these terms and conditions shall be deemed
                  to be qualified to the extent required in order to ensure
                  compliance with the applicable provisions of the CPA and
                  these terms and conditions must be interpreted and applied
                  accordingly.
                </li>
                <li>
                  By entering the competition in accordance with its terms, you
                  are entering a promotional competition for the purposes of the
                  CPA and the promotional competition will be conducted in
                  accordance with same. Should a participant win a prize in the
                  competition, he or she undertakes to expeditiously do all
                  things necessary to enable Amka to comply with its obligations
                  under the CPA.
                </li>
                <li>
                  By participating in this competition and in accordance with
                  the Protection of Personal Information Act No. 4 of 2013
                  ("POPIA"), participants consent to (i) the
                  processing of their personal information by Amka, any of
                  their operators, commercial partners, agents and
                  subcontractors (who may be outside South Africa) on the
                  condition that they will keep such information confidential;
                  (ii) the collection of a participant&apos;s personal
                  information from any other source to supplement the personal
                  information which Amka has about said participants; (iii) the
                  retention of their personal information for as long as
                  permitted for legal, regulatory, fraud prevention and
                  marketing purposes, only for the purposes of this competition.
                </li>
                <li>
                  These terms and conditions constitute a legally binding
                  agreement made between the participants and Amka.
                </li>
                <li>
                  The competition shall be governed and interpreted in
                  accordance with the laws of the Republic of South Africa.
                </li>
                <li>
                  For further information, please contact the Amka Consumer Care
                  Line on 0860 002 652 or the Consumer Relations WhatsApp
                  number on 060 996 6087. Alternatively, visit{“ “}
                  <a
                    href=”https://www.bodidoc.com/competitions”
                    className={lx}
                  >
                    www.bodidoc.com/competitions
                  </a>
                  .
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
