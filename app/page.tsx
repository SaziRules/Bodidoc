import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import FullWidthBanner from "@/components/FullWidthBanner";
import Testimonials from "@/components/Testimonials";
import VideoBanner from "@/components/VideoBanner";
import HomePageImages from "@/components/HomePageImages";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <ProductGrid />
      <FullWidthBanner
        src="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/7-1536x536.webp"
        alt="Bodidoc banner"
      />
      <Testimonials />
      <VideoBanner
        videoSrc="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/05/98of-women-agree.mp4"
        mobileSrc="https://bodidoc1.optimizedit.co.za/wp-content/uploads/2025/04/Helps-reduce-the-appearance-of-stretch-marks-uneven-skin-tone-dry-skin-7.webp"
        mobileWidth={2372}
        mobileHeight={1997}
        alt="98% of women agree"
      />
      <HomePageImages />
    </main>
  );
}