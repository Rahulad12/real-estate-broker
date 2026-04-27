import { HeroSection } from "../component/hero-section";
import { FeatureSection } from "../component/feature-section";
import { PropertyShowcase } from "../component/property-showcase";
import { TrendingProperties } from "../component/trending-properties";
import { LandingNavbar } from "../component/landing-navbar";
import Footer from "@/modules/broker-dashboard-modules/component/footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <PropertyShowcase />
      <TrendingProperties />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default LandingPage;