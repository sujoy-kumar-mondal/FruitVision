// app/page.tsx — Landing Page

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import SupportedFruits from "@/components/landing/SupportedFruits";
import TechStack from "@/components/landing/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <SupportedFruits />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
