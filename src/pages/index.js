import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import FeaturesSection from "@/components/FeaturesSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ShowcaseDevices from "@/components/ShowcaseDevices";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Brands />
      <ShowcaseDevices />
      <FeaturesSection />
      <CTA />
      <Footer />
    </>
  );
}