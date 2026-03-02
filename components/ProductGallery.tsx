"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function ProductGallery({
  images,
  productName,
}: {
  images: SanityImageSource[];
  productName: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative overflow-hidden bg-[#f7f7f7] aspect-square">
        <Image
          src={urlFor(images[active]).width(800).height(800).url()}
          alt={productName}
          fill
          className="object-contain p-8 transition-opacity duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 overflow-hidden bg-[#f7f7f7] border-2 transition-colors duration-150 ${
                active === i ? "border-[#112942]" : "border-transparent hover:border-[#112942]/30"
              }`}
            >
              <Image
                src={urlFor(img).width(128).height(128).url()}
                alt={`${productName} view ${i + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}