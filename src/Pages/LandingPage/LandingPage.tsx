import LandingHeader from "./Sections/LandingHeader";
import HeroSection from "./Sections/HeroSection";
import SuccessStorySection from "./Sections/SuccessStorySection";
import ProcessSection from "./Sections/ProcessSection";
import ProofSection from "./Sections/ProofSection";
import AboutBarSection from "./Sections/AboutBarSection";
import ContactSection from "./Sections/ContactSection";
import LandingFooter from "./Sections/LandingFooter";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <HeroSection />
        <SuccessStorySection />
        <ProcessSection />
        <ProofSection />
        <AboutBarSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </>
  );
}