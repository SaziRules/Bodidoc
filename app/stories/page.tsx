import Image from "next/image";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const women = [
  {
    name: "Minenhle Mkhize",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Minenhle-Mkhize.jpg",
    instagram: "https://www.instagram.com/tv/CSHqZ01Ds6H/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Julia Petersen",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Julia-Petersen.jpg",
    instagram: "https://www.instagram.com/p/CSM0MaLIJt8/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nolwazi Thuli",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Nolwazi-thuli.jpg",
    instagram: "https://www.instagram.com/tv/CSUdh2RjSdE/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nokukhanya Bulose",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Nokukhanya-Bulose.jpg",
    instagram: "https://www.instagram.com/p/CSeC_CNIPvY/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Jameela",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Jameela.jpg",
    instagram: "https://www.instagram.com/tv/CSkA1hZjbFT/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nobuntu Swaartbooi",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Nobuntu-Swaartbooi.jpg",
    instagram: "https://www.instagram.com/p/CSuNRMbowWq/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Aaliyah Kinsey",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Aaliyah-Kinsey.jpg",
    instagram: "https://www.instagram.com/tv/CSUdh2RjSdE/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Carla Pertersen",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Carla-Pertersen.jpg",
    instagram: "https://www.instagram.com/p/CS6pSVyIizx/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Jordyn Brown",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Jordyn-Brown.jpg",
    instagram: "https://www.instagram.com/p/CS7OpV8olXL/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Shan Bruce",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Shan-Bruce.jpg",
    instagram: "https://www.instagram.com/tv/CTC1QRDjDGU/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Angel Ndimande",
    photo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Angel-Ndimande.jpg",
    instagram: "https://www.instagram.com/p/CTIJYZio8z2/?igshid=YmMyMTA2M2Y%3D",
  },
];

// ─── Instagram icon ───────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" fill="white" className="w-4 h-4">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

// ─── Story Card ───────────────────────────────────────────────────────────────

function StoryCard({ person, index }: { person: typeof women[0]; index: number }) {
  return (
    <a
      href={person.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden"
    >
      {/* Portrait image */}
      <div className="relative overflow-hidden bg-[#f0eeeb]" style={{ aspectRatio: "3/4" }}>
        <Image
          src={person.photo}
          alt={person.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay — always present, darkens on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-[#112942]/80 via-[#112942]/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Number — top right */}
        <span className="absolute top-4 right-4 font-display text-[11px] tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
          <p className="font-display text-[18px] font-normal text-white leading-snug mb-3">
            {person.name}
          </p>
          {/* CTA row */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <InstagramIcon />
            <span className="text-[11px] tracking-[0.15em] uppercase text-white/80 font-light">
              View Story
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-auto">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  return (
    <div className="w-full">

      {/* ── Hero ── */}
      <div className="relative w-full bg-[#112942] overflow-hidden">
        {/* Ghosted watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-normal text-white/4 whitespace-nowrap leading-none"
            style={{ fontSize: "clamp(80px, 18vw, 220px)" }}
          >
            Stories
          </span>
        </div>

        <div className="relative max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
          {/* Back breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/moments"
              className="text-[11px] tracking-[0.15em] uppercase font-light text-white/30 hover:text-white/60 transition-colors flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Moments
            </Link>
            <span className="text-white/15">/</span>
            <span className="text-[11px] tracking-[0.15em] uppercase font-light text-white/40">
              Stories
            </span>
          </div>

          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-5">
            Women's Day 2021
          </p>
          <h1
            className="font-display font-normal text-white leading-[1.05] mb-6 max-w-2xl"
            style={{ fontSize: "clamp(40px, 8vw, 72px)" }}
          >
            Embracing Your Bodi
          </h1>
          <p className="text-[14px] md:text-[15px] font-light text-white/50 max-w-md leading-relaxed">
            Real women. Real stories. A journey of self-love, confidence, and embracing the skin you're in.
          </p>

          {/* Count pill */}
          <div className="mt-8 inline-flex items-center gap-2 border border-white/10 px-4 py-2">
            <span className="font-display text-[22px] text-white font-normal leading-none">
              {women.length}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-light">
              Stories
            </span>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">

        {/* Intro line */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-5 h-px bg-[#112942]/20" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#112942]/40 font-light">
            Click any portrait to view their story on Instagram
          </p>
          <div className="flex-1 h-px bg-[#112942]/10" />
        </div>

        {/* Portrait grid — 4 col desktop, 2 col mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {women.map((person, i) => (
            <StoryCard key={person.name} person={person} index={i} />
          ))}
        </div>

      </div>

      {/* ── Campaign context strip ── */}
      <div className="bg-[#f8f6f3] border-t border-[#e8e8e8]">
        <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 py-14 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <div className="shrink-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#112942]/30 font-light mb-2">
              About the campaign
            </p>
            <p className="font-display text-[28px] md:text-[34px] font-normal text-[#112942] leading-tight">
              Imperfectly<br />Perfect
            </p>
          </div>
          <div className="w-px h-16 bg-[#112942]/10 hidden md:block shrink-0" />
          <p className="text-[14px] font-light text-[#666] leading-relaxed max-w-xl">
            Bodidoc's 2021 Women's Day campaign celebrated real women who shared their personal journeys of self-love and body positivity — challenging beauty standards and embracing their unique selves, just as they are.
          </p>
          <Link
            href={`/moments/embracing-your-bodi-a-journey-of-self-love-and-acceptance`}
            className="group relative shrink-0 overflow-hidden inline-block px-8 py-3 border border-[#112942] text-[11px] tracking-[0.15em] uppercase font-light text-[#112942] hover:text-white transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-[#112942] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Read the Article</span>
          </Link>
        </div>
      </div>

    </div>
  );
}