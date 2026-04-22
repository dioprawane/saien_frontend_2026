import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionsSection from "@/components/MissionsSection";
import InitiativesSection from "@/components/InitiativesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vision & Missions – SAIEN",
  description:
    "Découvrez la vision et les quatre missions fondamentales de SAIEN pour façonner l'avenir de l'IA africaine.",
};

export default function VisionMissionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MissionsSection />
        <InitiativesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
