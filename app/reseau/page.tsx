import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReseauHero from "@/components/reseau/ReseauHero";
import BureauSection from "@/components/reseau/BureauSection";
import AnnuaireSection from "@/components/reseau/AnnuaireSection";
import HonorSection from "@/components/reseau/HonorSection";
import ReseauCTA from "@/components/reseau/ReseauCTA";

export const metadata: Metadata = {
  title: "Réseau & Bureau — SAIEN",
  description:
    "Explorez l'annuaire des membres SAIEN, le bureau dirigeant et les membres d'honneur de notre réseau international dédié à l'IA.",
};

export default function ReseauPage() {
  return (
    <>
      <Navbar />
      <main>
        <ReseauHero />
        <BureauSection />
        <HonorSection />
        <AnnuaireSection />
        <ReseauCTA />
      </main>
      <Footer />
    </>
  );
}

