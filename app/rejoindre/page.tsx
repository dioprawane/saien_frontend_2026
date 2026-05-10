import AdhesionHero from "@/components/adhesion/AdhesionHero";
import AdhesionFormClient from "@/components/adhesion/AdhesionFormClient";
import FAQSection from "@/components/adhesion/FAQSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adhésion — SAIEN",
  description:
    "Rejoignez le réseau SAIEN via un parcours d'adhésion étape par étape: choix du type de membre, informations et modalités de paiement.",
};

export default function RejoindreePage() {
  return (
    <>
      <Navbar />
      <main>
        <AdhesionHero />
        <AdhesionFormClient />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}

