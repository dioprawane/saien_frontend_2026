import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import ImpactSection from "@/components/home/ImpactSection";
import EventsSection from "@/components/home/EventsSection";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SAIEN – L'excellence sénégalaise en IA, Data et Cybersécurité",
  description:
    "SAIEN rassemble étudiants, chercheurs, ingénieurs, entrepreneurs et professionnels sénégalais de l'IA, de la Data et de la Cybersécurité en France, au Sénégal et dans la diaspora — pour faire émerger les talents, accélérer l'innovation et bâtir des ponts technologiques entre les deux rives.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <ImpactSection />
        <EventsSection />
        <NewsSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
