"use client";

import { useState } from "react";
import FAQAccordion, { type FAQItem } from "@/components/FAQAccordion";
import { supabase } from "@/lib/supabase";

const FacebookIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 576 512" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
  </svg>
);

type FormFields = { name: string; email: string; message: string };
type FormErrors = Partial<FormFields>;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Please enter a valid email";
  if (!fields.message.trim()) errors.message = "Message is required";
  else if (fields.message.trim().length < 10) errors.message = "Must be at least 10 characters";
  return errors;
}

function FloatingField({ label, type = "text", value, error, touched, onChange, onBlur, multiline = false }: {
  label: string; type?: string; value: string; error?: string; touched?: boolean;
  onChange: (v: string) => void; onBlur: () => void; multiline?: boolean;
}) {
  const hasError = touched && error;
  const filled = value.length > 0;
  const borderClass = hasError ? "border-red-400" : filled ? "border-[#112942]" : "border-[#e0e0e0] focus:border-[#112942]";
  const base = `w-full bg-transparent border-b-2 pt-6 pb-2 px-0 text-[14px] text-[#112942] font-light outline-none transition-all duration-300 resize-none ${borderClass}`;
  return (
    <div className="relative">
      {multiline
        ? <textarea rows={4} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={base} placeholder=" " />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} onBlur={onBlur} className={base} placeholder=" " />
      }
      <label className={`absolute left-0 pointer-events-none transition-all duration-200 font-light ${filled ? "top-0 text-[10px] tracking-[0.15em] uppercase text-[#112942]/50" : "top-6 text-[13px] text-[#999]"}`}>
        {label}
      </label>
      {hasError && <p className="mt-1.5 text-[11px] text-red-400 font-light">{error}</p>}
    </div>
  );
}

function ContactForm() {
  const [form, setForm]       = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus]   = useState<"idle" | "submitting" | "sent" | "error">("idle");

  const setField = (field: keyof FormFields) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) setErrors(e => ({ ...e, [field]: validate({ ...form, [field]: value })[field] }));
  };
  const touchField = (field: keyof FormFields) => () => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrors(e => ({ ...e, [field]: validate(form)[field] }));
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    const { error: sbError } = await supabase
      .from("contact_submissions")
      .insert({
        brand: "bodidoc",
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
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
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="w-12 h-12 rounded-full bg-[#112942]/8 flex items-center justify-center">
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
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-5 h-px bg-[#112942]/40" />
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#112942]/50 font-light">Submit a Query</p>
      </div>
      <FloatingField label="Your name" value={form.name} error={errors.name} touched={touched.name} onChange={setField("name")} onBlur={touchField("name")} />
      <FloatingField label="Email address" type="email" value={form.email} error={errors.email} touched={touched.email} onChange={setField("email")} onBlur={touchField("email")} />
      <FloatingField label="How can we help?" value={form.message} error={errors.message} touched={touched.message} onChange={setField("message")} onBlur={touchField("message")} multiline />

      {status === "error" && (
        <p className="text-[11.5px] text-red-400 font-light -mt-4">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="group relative self-start overflow-hidden px-10 py-3 border border-[#112942] text-[11px] tracking-[0.2em] uppercase font-light text-[#112942] transition-all duration-300 hover:text-white cursor-pointer bg-transparent disabled:opacity-50"
      >
        <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative">{status === "submitting" ? "Sending..." : "Send Message"}</span>
      </button>
    </div>
  );
}

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

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* ── Dark hero banner ── */}
      <div className="relative w-full bg-[#112942] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span className="font-display font-normal text-white/4 whitespace-nowrap leading-none" style={{ fontSize: "clamp(80px, 18vw, 220px)" }}>
            Let&apos;s Chat
          </span>
        </div>
        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-5">Contact Us</p>
          <h1 className="font-display font-normal text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>
            Let&apos;s Chat
          </h1>
          <p className="text-[14px] md:text-[15px] font-light text-white/55 max-w-sm leading-relaxed">
            Contact us or find out more about Bodidoc with our FAQs. We&apos;re here to take care of you.
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">

        {/* ── Row 1: Contact details | Form ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-20 pb-20 border-b border-[#e8e8e8]">

          {/* Left — contact details */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light mb-2">Customer Care</p>
              <p className="text-[14px] font-light text-[#555]">08:00 – 17:00, Monday – Friday</p>
              <p className="text-[15px] font-normal text-[#112942] mt-1">0860 002 652</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light mb-2">WhatsApp</p>
              <a href="https://wa.me/27609966087" target="_blank" rel="noopener noreferrer" className="text-[15px] font-normal text-[#112942] hover:opacity-50 transition-opacity">
                +27 (0)60 996 6087
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light mb-2">Find Us At</p>
              <p className="text-[14px] font-light text-[#555] leading-relaxed">14 Ellman Street<br />Sunderland Ridge, 0157</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light mb-3">Follow Us On</p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-full border border-[#112942]/20 flex items-center justify-center text-[#112942] hover:bg-[#112942] hover:text-white hover:border-[#112942] transition-all duration-200">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <ContactForm />
        </div>

        {/* ── Row 2: Map ── */}
        <div className="w-full mb-20 border border-[#e8e8e8] overflow-hidden" style={{ height: "380px" }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.1720%2C-25.7150%2C28.1920%2C-25.7000&layer=mapnik&marker=-25.7075%2C28.1820"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Bodidoc — 14 Ellman Street, Sunderland Ridge"
          />
        </div>

        {/* ── Row 3: FAQ ── */}
        <div>
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#112942]/40 font-light mb-2">Got Questions?</p>
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