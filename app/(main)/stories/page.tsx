import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

// ─── Data ─────────────────────────────────────────────────────────────────────

const women = [
  {
    name: "Minenhle Mkhize",
    photo: "/images/moments/stories/Minenhle%20Mkhize.jpg",
    instagram: "https://www.instagram.com/tv/CSHqZ01Ds6H/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Julia Petersen",
    photo: "/images/moments/stories/Julia%20Petersen.jpg",
    instagram: "https://www.instagram.com/p/CSM0MaLIJt8/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nolwazi Thuli",
    photo: "/images/moments/stories/Nolwazi%20thuli.jpg",
    instagram: "https://www.instagram.com/tv/CSUdh2RjSdE/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nokukhanya Bulose",
    photo: "/images/moments/stories/Nokukhanya%20Bulose.jpg",
    instagram: "https://www.instagram.com/p/CSeC_CNIPvY/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Jameela",
    photo: "/images/moments/stories/Jameela.jpg",
    instagram: "https://www.instagram.com/tv/CSkA1hZjbFT/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Nobuntu Swaartbooi",
    photo: "/images/moments/stories/Nobuntu%20Swaartbooi.jpg",
    instagram: "https://www.instagram.com/p/CSuNRMbowWq/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Aaliyah Kinsey",
    photo: "/images/moments/stories/Aaliyah%20Kinsey.jpg",
    instagram: "https://www.instagram.com/tv/CSUdh2RjSdE/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Carla Pertersen",
    photo: "/images/moments/stories/Carla%20Pertersen.jpg",
    instagram: "https://www.instagram.com/p/CS6pSVyIizx/?igshid=YmMyMTA2M2Y=",
  },
  {
    name: "Jordyn Brown",
    photo: "/images/moments/stories/Jordyn%20Brown.jpg",
    instagram: "https://www.instagram.com/p/CS7OpV8olXL/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Shan Bruce",
    photo: "/images/moments/stories/Shan%20Bruce.jpg",
    instagram: "https://www.instagram.com/tv/CTC1QRDjDGU/?igshid=YmMyMTA2M2Y%3D",
  },
  {
    name: "Angel Ndimande",
    photo: "/images/moments/stories/Angel%20Ndimande.jpg",
    instagram: "https://www.instagram.com/p/CTIJYZio8z2/?igshid=YmMyMTA2M2Y%3D",
  },
];

// ─── Instagram icon ───────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 text-[#112942] dark:text-[#5b9ac8]">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

// ─── Story Card ───────────────────────────────────────────────────────────────

function StoryCard({ person, index }: { person: (typeof women)[0]; index: number }) {
  return (
    <div className="flex flex-col">
      {/* Portrait image container with specific ratio */}
      <div className="relative aspect-square overflow-hidden mb-3">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content - Name & VIEW MY STORY */}
      <p className="font-serif font-bold text-[16px] text-[#112942] dark:text-bd-dark leading-tight mb-0.5">
        {person.name}
      </p>
      
      <div className="flex flex-col gap-0.5 items-start">
        <span className="text-[9px] tracking-[0.2em] uppercase text-[#112942]/70 dark:text-fg-muted font-light">
          VIEW MY STORY
        </span>
        <a 
          href={person.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#112942] dark:text-[#5b9ac8] hover:opacity-70 transition-opacity"
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesGrid() {
  return (
    <div className="w-full bg-white dark:bg-page px-6 md:px-12 py-16 md:py-24">
      {/* Constraints the width like the original page */}
      <div className="max-w-285 mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {women.map((person, i) => (
            <StoryCard key={person.name} person={person} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}