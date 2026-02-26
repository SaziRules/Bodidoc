import Image from "next/image";

type FullWidthBannerProps = {
  src: string;
  mobileSrc?: string;
  alt: string;
  priority?: boolean;
};

export default function FullWidthBanner({
  src,
  mobileSrc,
  alt,
  priority = false,
}: FullWidthBannerProps) {
  return (
    <section aria-label={alt} className="w-full mt-10">

      {/* Desktop */}
      <div className={mobileSrc ? "hidden md:block" : "block"}>
        <Image
          src={src}
          alt={alt}
          width={1536}
          height={536}
          className="w-full h-auto block align-bottom"
          priority={priority}
          draggable={false}
        />
      </div>

      {/* Mobile — only rendered if a mobile src is provided */}
      {mobileSrc && (
        <div className="block md:hidden">
          <Image
            src={mobileSrc}
            alt={alt}
            width={768}
            height={600}
            className="w-full h-auto block align-bottom"
            priority={priority}
            draggable={false}
          />
        </div>
      )}

    </section>
  );
}