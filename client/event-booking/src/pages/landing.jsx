import HeroSection from "../components/landing/HeroSection";
import SpeakersSection from "../components/landing/SpeakersSection";
import AboutSection from "../components/landing/AboutSection";
import ScrollVideo from "../components/landing/ScrollVideo";
import MeetMinds from "../components/landing/MeetMinds";
import UpcomingEvents from "../components/landing/UpcomingEvents";
import CTA from "../components/landing/CTA";
import PricingSection from "../components/landing/PricingSection";
import FAQSection from "../components/landing/FaqSection";
import Footer from "../components/landing/Footer";


export default function Landing() {
  return (
    <>
      <HeroSection />
      <SpeakersSection />
      <AboutSection />
      <ScrollVideo />
      <MeetMinds />
      <UpcomingEvents />
      <CTA />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
}