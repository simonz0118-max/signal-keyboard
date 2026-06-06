import NavBar from "@/components/nav-bar";
import HeroSection from "@/components/hero-section";
import ProductsSection from "@/components/products-section";
import TechnologySection from "@/components/technology-section";
import CustomizationSection from "@/components/customization-section";
import WaitlistSection from "@/components/waitlist-section";
import FooterSection from "@/components/footer-section";

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <ProductsSection />
      <TechnologySection />
      <CustomizationSection />
      <WaitlistSection />
      <FooterSection />
    </main>
  );
}
