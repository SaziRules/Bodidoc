import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/sanity/lib/sanity";
import { urlFor } from "@/sanity/lib/sanity";
import AsSeenIn from "@/components/AsSeenIn";

export default async function MomentsPage() {
  const posts = await getAllPosts();
  
  // Identifying the specific articles needed for the structured sections
  const featured = posts[0];
  const sustainabilityArticle = posts.find(p => p.title.includes("Beyond The Bin")) || posts[1];
  const commitmentArticle = posts.find(p => p.title.includes("Commitment")) || posts[2];
  const embracingBodi = posts.find(p => p.title.includes("Embracing Your Bodi")) || posts[3];
  
  // "Read More" fetches EVERYTHING else
  const rest = posts.filter(p => p._id !== featured?._id);

  return (
    <div className="w-full bg-white font-sans overflow-x-hidden">
      
      {/* ── Section: Header ── */}
      <div className="max-w-300 mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="font-display italic text-[35px] md:text-[35px] text-[#112942] leading-[1.1] mb-4">
          Every moment tells a story
        </h1>
        <p className="text-[15px] font-light text-[#666] tracking-wide">
          Discover how Bodidoc is making an impact, one milestone at a time
        </p>
      </div>

      {/* ── Section: Featured (Latest) ── */}
      {featured && (
        <div className="max-w-300 mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right">
              <h2 className="font-display text-[36px] md:text-[27px] text-[#112942] leading-[1.1] mb-6">
                {featured.title}
              </h2>
              <p className="text-[14px] font-light text-[#666] leading-relaxed mb-8 max-w-sm">
                {featured.excerpt}
              </p>
              <Link
                href={`/moments/${featured.slug.current}`}
                className="px-10 py-3 bg-[#112942] text-white text-[10px] tracking-[0.25em] uppercase rounded-full hover:bg-[#1a3a5a] transition-all"
              >
                Full Article
              </Link>
            </div>
            <div className="md:col-span-7 relative aspect-[1.4/1] w-full">
              {featured.coverImage && (
                <Image
                  src={urlFor(featured.coverImage).width(1000).url()}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      )}

      <AsSeenIn />

      {/* ── SECTION: Sustainability (Exact Elementor Match) ── */}
      <div className="w-full bg-[#f2f2f2] py-24 mt-20">
        <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            {/* Column 1: Intro */}
            <div className="flex flex-col">
              <h2 className="font-display italic text-[36px] text-[#112942] mb-6">Sustainability</h2>
              <div className="space-y-5 text-[14px] text-[#444] font-light leading-relaxed">
                <p>Good skin shouldn’t cost the earth. At Bodidoc, we’re committed to creating products that care for your skin and the planet.</p>
                <p>Explore how we embrace eco-friendly practices, from sustainable packaging to reusability, ensuring a future that’s as radiant as your skin.</p>
              </div>
            </div>
            {/* Column 2: Beyond Bin */}
            <div className="flex flex-col">
              <div className="relative aspect-[1.4/1] mb-6 bg-white overflow-hidden shadow-sm">
                {sustainabilityArticle?.coverImage && (
                  <Image src={urlFor(sustainabilityArticle.coverImage).url()} alt="" fill className="object-cover" />
                )}
              </div>
              <h3 className="font-display text-[20px] text-[#112942] leading-tight mb-4">{sustainabilityArticle?.title}</h3>
              <p className="text-[13px] text-[#666] font-light leading-relaxed line-clamp-4">{sustainabilityArticle?.excerpt}</p>
            </div>
            {/* Column 3: Commitment */}
            <div className="flex flex-col">
              <div className="relative aspect-[1.4/1] mb-6 bg-white overflow-hidden shadow-sm">
                {commitmentArticle?.coverImage && (
                  <Image src={urlFor(commitmentArticle.coverImage).url()} alt="" fill className="object-cover" />
                )}
              </div>
              <h3 className="font-display text-[20px] text-[#112942] leading-tight mb-4">{commitmentArticle?.title}</h3>
              <p className="text-[13px] text-[#666] font-light leading-relaxed line-clamp-4">{commitmentArticle?.excerpt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION: What's On (Carousel/Hero Style) ── */}
      <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="mb-12">
          <h2 className="font-display italic text-[36px] text-[#112942] mb-1">What's On</h2>
          <p className="text-[15px] text-[#888] font-light tracking-wide">Moments that bring us together</p>
        </div>

        <div className="w-full bg-[#f2f2f2] flex flex-col md:flex-row overflow-hidden min-h-120">
          <div className="md:w-1/2 p-12 lg:p-20 flex flex-col justify-center items-start">
            <h3 className="font-display text-[32px] md:text-[36px] text-[#112942] leading-[1.15] mb-6">
              {embracingBodi?.title}
            </h3>
            <p className="text-[15px] text-[#555] font-light leading-relaxed mb-10 max-w-sm">
              {embracingBodi?.excerpt}
            </p>
            <Link 
              href={`/moments/${embracingBodi?.slug.current}`}
              className="px-10 py-3.5 bg-[#112942] text-white text-[10px] tracking-[0.25em] uppercase rounded-full hover:bg-opacity-90 transition-all"
            >
              FULL ARTICLE
            </Link>
          </div>
          <div className="md:w-1/2 relative min-h-100 bg-[#e5e5e5]">
            {embracingBodi?.coverImage && (
              <Image 
                src={urlFor(embracingBodi.coverImage).url()} 
                alt="Embracing Your Bodi" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </div>
      </div>

      {/* ── SECTION: Read More (Full Fetch) ── */}
      <div className="max-w-300 mx-auto px-6 md:px-12 lg:px-20 pb-32">
        <h2 className="font-display not-italic text-[36px] text-[#112942] mb-16 pt-2">
          Read <span className="font-display italic text-[#112942]">more</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {rest.map((post) => (
            <Link key={post._id} href={`/moments/${post.slug.current}`} className="group flex flex-col">
               <div className="relative aspect-4/3 mb-6 overflow-hidden bg-[#f8f8f8]">
                 {post.coverImage && (
                   <Image 
                    src={urlFor(post.coverImage).width(600).url()} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                 )}
               </div>
               <h3 className="font-display text-[22px] text-[#112942] leading-tight mb-3">
                 {post.title}
               </h3>
               <p className="text-[14px] text-[#666] font-light line-clamp-3 mb-6">
                 {post.excerpt}
               </p>
               <span className="inline-block w-fit px-8 py-2.5 bg-[#112942] text-white text-[10px] tracking-[0.2em] uppercase rounded-full group-hover:bg-[#1a3a5a] transition-colors">
                Full Article
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}