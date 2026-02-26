"use client";

import Image from "next/image";

const publications = [
  {
    name: "Aspire Lifestyle",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/5.png",
    url: "https://aspirelifestyle.co.za/spring-skincare-myths-debunked/",
  },
  {
    name: "Tell A Friend",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/4.png",
    url: "https://tellafriend.co.za/spring-skincare-myths-debunked/",
  },
  {
    name: "SA Life",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/1.png",
    url: "https://www.salifemag.com/post/spring-skincare-myths-debunked",
  },
  {
    name: "Glamour",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/3.png",
    url: "https://www.glamour.co.za/beauty/skincare/spring-skincare-myths-debunked-97e2ec1a-c8ef-4b6a-bcea-bd01b706e33b",
  },
  {
    name: "Mother & Child",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/6.png",
    url: "https://www.motherandchild.co.za/three-in-one-solution-for-glowing-skin/",
  },
  {
    name: "Online Mags",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/8.png",
    url: "https://www.onlinemags.co.za/bodidoc/",
  },
  {
    name: "Get It",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/7.png",
    url: "https://getitmagazine.co.za/blog/2023/11/13/5-steps-to-sexy-sun-kissed-summer-skin/",
  },
  {
    name: "Get It",
    logo: "https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/2.png",
    url: "https://getitmagazine.co.za/blog/2023/11/13/5-steps-to-sexy-sun-kissed-summer-skin/",
  },
];

const doubled = [...publications, ...publications];

export default function AsSeenIn() {
  return (
    <div className="w-full py-14 overflow-hidden">
      <div className="max-w-360 mx-auto px-6 md:px-10 lg:px-16 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-5 h-px bg-[#112942]/20" />
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#112942]/40 font-light whitespace-nowrap">
            As Seen In
          </p>
          <div className="flex-1 h-px bg-[#112942]/10" />
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative marquee-container">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />

        <div className="marquee-track flex items-center" style={{ gap: "72px", width: "max-content" }}>
          {doubled.map((pub, i) => (
            <a
              key={i}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read more on ${pub.name}`}
              className="shrink-0 flex items-center opacity-40 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
              style={{ minWidth: "160px" }}
            >
              <Image
                src={pub.logo}
                alt={pub.name}
                width={180}
                height={52}
                className="object-contain w-auto"
                style={{ height: "48px" }}
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}