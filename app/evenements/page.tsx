import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgendaSection from "@/components/evenements/AgendaSection";

export const metadata: Metadata = {
  title: "Événements — SAIEN",
  description:
    "Retrouvez tous les événements, conférences, meetups et webinaires organisés par SAIEN autour de l'IA et de l'innovation technologique.",
};

export default function EvenementsPage() {
  return (
    <>
      <Navbar />
      <main>
        <AgendaSection />
      </main>
      <Footer />
    </>
  );
}
