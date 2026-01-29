import BrandStory from "@/components/Brandstory";
import CategoryShowcase from "@/components/Categoryshowcase";
import FeaturedProducts from "@/components/Featurproducts";
import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <BrandStory />
      <Reviews />
    </main>
  );
}
