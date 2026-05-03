import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import HistoireSection from "@/components/about/HistoireSection";
import FondationsSection from "@/components/about/FondationsSection";
import PontSection from "@/components/about/PontSection";
import JoinCTASection from "@/components/about/JoinCTASection";

export const metadata: Metadata = {
  title: "À propos — SAIEN",
  description:
    "Découvrez l'histoire, les fondations et la mission de SAIEN : le réseau technologique qui connecte la diaspora africaine à l'écosystème mondial de l'IA.",
};

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <HistoireSection />
        <FondationsSection />
        <PontSection />
        <JoinCTASection />
      </main>
      <Footer />
    </>
  );
}
