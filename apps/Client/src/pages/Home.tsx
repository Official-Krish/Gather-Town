import { useEffect } from "react";
import HeroSection from "../components/Hero";
import FeatureSection from "../components/Feature";
import VirtualOfficeSection from "../components/VirtualOfficeaSection";
import PricingSection from "../components/Pricing";

const Home = () => {
  useEffect(() => {
    document.title = "MetaverseConvene | Virtual Office Space";
  }, []);

  return (
    <div className="min-h-screen bg-metaverse-dark-blue text-metaverse-text">
      <HeroSection />
      <FeatureSection />
      <VirtualOfficeSection />
      <PricingSection />
    </div>
  );
};

export default Home;