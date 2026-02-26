import Image from "next/image";

type VideoBannerProps = {
  videoSrc: string;
  mobileSrc: string;
  mobileWidth?: number;
  mobileHeight?: number;
  alt?: string;
};

export default function VideoBanner({
  videoSrc,
  mobileSrc,
  mobileWidth = 2372,
  mobileHeight = 1997,
  alt = "",
}: VideoBannerProps) {
  return (
    <section className="w-full">

      {/* Desktop — autoplay looping muted video */}
      <div className="hidden md:block w-full leading-none">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          controlsList="nodownload"
          className="w-full h-auto block align-bottom"
        />
      </div>

      {/* Mobile — static image */}
      <div className="block md:hidden w-full border-y border-[#112942]/20">
        <Image
          src={mobileSrc}
          alt={alt}
          width={mobileWidth}
          height={mobileHeight}
          className="w-full h-auto block align-bottom"
          sizes="100vw"
        />
      </div>

    </section>
  );
}