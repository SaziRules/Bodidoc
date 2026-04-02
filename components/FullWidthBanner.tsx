import Image from "next/image";
import Link from "next/link";

type FullWidthBannerProps = {
  src: string;
  mobileSrc?: string;
  alt: string;
  priority?: boolean;
  href?: string;
};

export default function FullWidthBanner({
  src,
  mobileSrc,
  alt,
  priority = false,
  href,
}: FullWidthBannerProps) {
  const content = (
    <>
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
    </>
  );

  return (
    <section aria-label={alt} className="w-full mt-10">
      {href ? (
        <Link href={href} className="block w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </section>
  );
}