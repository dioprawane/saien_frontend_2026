import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MentionsLegalesPage from "@/components/legal/MentionsLegalesPage";

export const metadata: Metadata = {
  title: "Mentions Légales — SAIEN",
  description:
    "Mentions légales du site SAIEN : informations de l'éditeur, hébergement, propriété intellectuelle, RGPD et cookies.",
};

export default function MentionsLegalesRoute() {
  return (
    <>
      <Navbar />
      <main>
        <MentionsLegalesPage />
      </main>
      <Footer />
    </>
  );
}
