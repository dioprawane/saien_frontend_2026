import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import ImpactSection from "@/components/home/ImpactSection";
import EventsSection from "@/components/home/EventsSection";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SAIEN – Connecter l'Innovation Sans Frontières",
  description:
    "SAIEN fédère la diaspora experte en intelligence artificielle pour accélérer le développement technologique et créer des synergies mondiales.",
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
