import Image from "next/image";

export default function HomePageImages() {
  return (
    <div className="w-full max-w-3xl mx-auto px-8 py-15 md:py-32">

      {/* Image — always visible on all breakpoints */}
      <div className="w-full mb-6">
        <Image
          src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2024/12/home-page-images.png"
          alt="Bodidoc product range"
          width={1784}
          height={432}
          className="w-full h-auto block"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Brand text — hidden on mobile only */}
      <p className=" md:block text-center text-[15px] font-light text-[#112942] leading-relaxed">
        Bodidoc is a proudly South African skincare brand that prioritises accessibility and
        affordability because good skin shouldn&apos;t cost the earth. Our cruelty-free, functional daily
        skincare products are packed with natural ingredients to enhance skin health, highlight
        beauty, and give you the confidence you need to love the skin you&apos;re in.
      </p>

    </div>
  );
}