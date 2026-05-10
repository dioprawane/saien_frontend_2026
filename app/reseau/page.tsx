import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReseauHero from "@/components/reseau/ReseauHero";
import BureauSection from "@/components/reseau/BureauSection";
import AnnuaireSection from "@/components/reseau/AnnuaireSection";
import HonorSection from "@/components/reseau/HonorSection";
import ReseauCTA from "@/components/reseau/ReseauCTA";
import {
  getShowcaseNetworkDirectory,
  type ShowcaseNetworkDirectory,
} from "@/lib/api/showcase";

export const metadata: Metadata = {
  title: "Réseau & Bureau — SAIEN",
  description:
    "Explorez l'annuaire des membres SAIEN, le bureau dirigeant et les membres d'honneur de notre réseau international dédié à l'IA.",
};

const EMPTY_DIRECTORY: ShowcaseNetworkDirectory = {
  bureau: [],
  honor: [],
  members: [],
};

export default async function ReseauPage() {
  let directory: ShowcaseNetworkDirectory = EMPTY_DIRECTORY;

  try {
    directory = await getShowcaseNetworkDirectory();
  } catch {
    // Keep empty fallback when API is temporarily unavailable.
  }

  return (
    <>
      <Navbar />
      <main>
        <ReseauHero />
        <BureauSection members={directory.bureau} />
        <HonorSection members={directory.honor} />
        <AnnuaireSection members={directory.members} />
        <ReseauCTA />
      </main>
      <Footer />
    </>
  );
}

