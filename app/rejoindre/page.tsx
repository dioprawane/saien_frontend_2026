import AdhesionHero from "@/components/adhesion/AdhesionHero";
import TarifsSection from "@/components/adhesion/TarifsSection";
import AdhesionForm from "@/components/adhesion/AdhesionForm";
import FAQSection from "@/components/adhesion/FAQSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adhésion — SAIEN",
  description:
    "Rejoignez le réseau SAIEN. Choisissez votre statut (Membre Actif ou Bienfaiteur) et contribuez à l'essor de l'IA dans la diaspora africaine.",
};

export default function RejoindreePage() {
  return (
    <>
      <Navbar />
      <main>
        <AdhesionHero />
        <TarifsSection />
        <AdhesionForm />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

