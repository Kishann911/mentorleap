import HeroSection        from "@/components/home/HeroSection";
import VisionFounder      from "@/components/home/VisionFounder";
import ServicesSection    from "@/components/home/ServicesSection";
import JourneySection     from "@/components/home/JourneySection";
import MishaSection       from "@/components/home/MishaSection";
import IndustrySection    from "@/components/home/IndustrySection";
import ProgramsSection    from "@/components/home/ProgramsSection";
import ReviewsSection     from "@/components/home/ReviewsSection";
import LaunchSection      from "@/components/home/LaunchSection";
import CorporateSection   from "@/components/home/CorporateSection";
import FAQSection         from "@/components/home/FAQSection";
import FinalCTA           from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VisionFounder />
      <ServicesSection />
      <JourneySection />
      <MishaSection />
      <IndustrySection />
      <ProgramsSection />
      <ReviewsSection />
      <LaunchSection />
      <CorporateSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}