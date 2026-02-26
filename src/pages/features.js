import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import FeaturesSection from "@/components/FeaturesSection";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      {/* Content spacing because navbar fixed hai */}
      <main className="pt-24">
        <FeaturesSection />
      </main>

      <Footer />
    </>
  );
}