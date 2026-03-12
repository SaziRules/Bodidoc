"use client";

import { useState } from "react";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";
import { supabase } from "@/lib/supabase";

// ─── Social Icons ─────────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4">
    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

// ─── Form ─────────────────────────────────────────────────────────────────────

type FormFields = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Omit<FormFields, "phone">>;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Please enter a valid email";
  if (!fields.message.trim()) errors.message = "Message is required";
  else if (fields.message.trim().length < 10) errors.message = "Must be at least 10 characters";
  return errors;
}

function BoxField({ placeholder, type = "text", value, error, touched, onChange, onBlur, multiline = false }: {
  placeholder: string; type?: string; value: string; error?: string; touched?: boolean;
  onChange: (v: string) => void; onBlur: () => void; multiline?: boolean;
}) {
  const hasError = touched && error;
  const base = `w-full bg-white border text-[13px] text-[#112942] font-light rounded-[5px] outline-none transition-colors duration-200 px-4 py-3 placeholder:text-[#aaa] placeholder:text-[12px] placeholder:tracking-[0.08em] placeholder:uppercase ${
    hasError ? "border-red-400 focus:border-red-400" : "border-[#dde2e8] focus:border-[#112942]"
  }`;
  return (
    <div>
      {multiline
        ? <textarea rows={5} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={`${base} resize-none`} placeholder={placeholder} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={base} placeholder={placeholder} />
      }
      {hasError && <p className="mt-1 text-[11px] text-red-400 font-light">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [form, setForm]       = useState<FormFields>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus]   = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const setField = (field: keyof FormFields) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field] && field !== "phone") {
      setErrors(e => ({ ...e, [field]: validate({ ...form, [field]: value })[field as keyof FormErrors] }));
    }
  };
  const touchField = (field: keyof FormFields) => () => {
    setTouched(t => ({ ...t, [field]: true }));
    if (field !== "phone") setErrors(e => ({ ...e, [field]: validate(form)[field as keyof FormErrors] }));
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, phone: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    // Prepend phone to message if provided
    const fullMessage = form.phone.trim()
      ? `Phone: ${form.phone.trim()}\n\n${form.message.trim()}`
      : form.message.trim();

    const { error: sbError } = await supabase
      .from("contact_submissions")
      .insert({
        brand:   "bodidoc",
        name:    form.name.trim(),
        email:   form.email.trim(),
        message: fullMessage,
      });

    if (sbError) {
      console.error("Contact submit error:", sbError.message, sbError.code, sbError.details);
      setStatus("error");
      return;
    }

    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-[#112942]/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#112942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h4 className="font-display text-[22px] text-[#112942]">Message received!</h4>
        <p className="text-[13px] font-light text-[#666]">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-bold tracking-widest uppercase text-[#112942] text-right mb-1">
        Submit a Query
      </p>
      <BoxField placeholder="Name" value={form.name} error={errors.name} touched={touched.name} onChange={setField("name")} onBlur={touchField("name")} />
      <BoxField placeholder="Email" type="email" value={form.email} error={errors.email} touched={touched.email} onChange={setField("email")} onBlur={touchField("email")} />
      <BoxField placeholder="Contact Number" type="tel" value={form.phone} onChange={setField("phone")} onBlur={touchField("phone")} />
      <BoxField placeholder="Write a Message" value={form.message} error={errors.message} touched={touched.message} onChange={setField("message")} onBlur={touchField("message")} multiline />

      {status === "error" && (
        <p className="text-[11.5px] text-red-400 font-light">Something went wrong. Please try again.</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="w-full mt-1 py-3.5 rounded-full bg-[#112942] text-white text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-[#1a3a5c] transition-colors duration-200 cursor-pointer disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const socialLinks = [
  { href: "https://www.facebook.com/bodidoc/", icon: <FacebookIcon />, label: "Facebook" },
  { href: "https://www.instagram.com/bodidoc/", icon: <InstagramIcon />, label: "Instagram" },
  { href: "https://www.tiktok.com/@bodidoc.africa", icon: <TikTokIcon />, label: "TikTok" },
  { href: "https://www.youtube.com/channel/UCiY8H3AZObpv4RqKhGQJy3Q/featured", icon: <YouTubeIcon />, label: "YouTube" },
];

const faqs: FAQItem[] = [
  { q: "Where can I buy Bodidoc products?", a: "Bodidoc products are available through a network of trusted retailers and distributors. To find a stockist near you or online, simply check the stockist information listed on each product page in our \"All Products\" section." },
  { q: "How can I become a stockist or distributor of Bodidoc products?", a: "We welcome inquiries from businesses interested in becoming a stockist or distributor of Bodidoc products. Please visit Amka.co.za or email info@amka.co.za for more information." },
  { q: "How can I work for Bodidoc?", a: "We are always on the lookout for local talent for our upcoming campaigns. Please send an email to hello@bodidoc.co.za and we will be in touch. Thank you for your interest in working with us!" },
  { q: "Does Bodidoc offer international distribution?", a: "Yes, we supply products to various international markets. If you're interested in distributing our products abroad, please contact our team for more details at info@naturelle.co.za." },
  { q: "How can I contact Bodidoc customer support?", a: "For any inquiries about our products or services, you can reach our customer support team by email at info@amka.co.za or by filling out the contact form on our website." },
  { q: "Are Bodidoc products cruelty-free?", a: "Yes, all Bodidoc products are cruelty-free. We do not test on animals and ensure that our products are developed ethically, with care for both the environment and the animals." },
  { q: "Can I recycle Bodidoc packaging?", a: "Yes, our bottles and jars are 100% recyclable. Please follow the recycling instructions on each product's packaging. Remember to remove the labels, as they are typically not recyclable." },
  { q: "Are Bodidoc products dermatologically tested?", a: "Yes, all Bodidoc products are dermatologically tested to ensure they meet the highest safety standards for your skin." },
  { q: "Are Bodidoc products made in South Africa?", a: "Yes, we are a proud South African company. All our products are manufactured locally in South Africa with only the highest-quality ingredients to provide you with the best skincare solutions." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative max-w-360 mx-auto px-6 items-center justify-center text-center md:px-10 lg:px-16 py-2 md:py-18 lg:py-15">
          <h1 className="font-display font-normal text-[#112942] leading-[1.05] mb-1" style={{ fontSize: "clamp(40px, 8vw, 42px)" }}>
            Let&apos;s Chat
          </h1>
          <p className="text-[14px] md:text-[15px] font-medium text-[#2f2f2f] max-w-sm mx-auto leading-relaxed">
            Contact us or find out more about Bodidoc with our FAQs. We&apos;re here to take care of you.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-260 mx-auto px-6 md:px-6 lg:px-6 py-16 md:py-20">

        {/* ── Row 1: Contact details | Form ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-2 mb-20 pb-5">

          {/* Left — contact details */}
          <div className="flex flex-col gap-7">

            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#112942] flex items-center justify-center text-white shrink-0">
                  <PhoneIcon />
                </div>
                <p className="text-[18px] font-bold tracking-[0.08em] uppercase text-[#112942]">Contact Us</p>
              </div>
              <p className="text-[14px] font-light text-[#2f2f2f] leading-relaxed pl-9.5">
                08:00 – 17:00<br />Monday – Friday<br />0860 002 652
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#112942] flex items-center justify-center text-white shrink-0">
                  <WhatsAppIcon />
                </div>
                <p className="text-[18px] font-bold tracking-[0.08em] uppercase text-[#112942]">WhatsApp</p>
              </div>
              <a href="https://wa.me/27609966087" target="_blank" rel="noopener noreferrer"
                className="text-[14px] font-light text-[#2f2f2f] hover:text-[#112942] transition-colors pl-9.5 block">
                +27 (0)60 996 6087
              </a>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#112942] flex items-center justify-center text-white shrink-0">
                  <LocationIcon />
                </div>
                <p className="text-[18px] font-bold tracking-[0.08em] uppercase text-[#112942]">Find Us At</p>
              </div>
              <p className="text-[14px] font-light text-[#2f2f2f] leading-relaxed pl-9.5">
                14 Ellman Street<br />Sunderland Ridge<br />0157
              </p>
            </div>

            <div>
              <p className="text-[18px] font-bold tracking-[0.08em] uppercase text-[#112942] mb-3">Follow Us On</p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full bg-[#112942] flex items-center justify-center text-white hover:bg-[#1a3a5c] transition-colors duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right — form */}
          <ContactForm />
        </div>

        {/* ── Row 2: 
        <div className="w-full mb-20 border border-[#e8e8e8] overflow-hidden" style={{ height: "380px" }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.1720%2C-25.7150%2C28.1920%2C-25.7000&layer=mapnik&marker=-25.7075%2C28.1820"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Bodidoc — 14 Ellman Street, Sunderland Ridge"
          />
        </div>Map ── */}

        {/* ── Row 3: FAQ ── */}
        <div>
          <div className="mb-10">
            <h2 className="font-display text-[28px] md:text-[36px] font-normal text-[#112942]">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>

      </div>
    </div>
  );
}