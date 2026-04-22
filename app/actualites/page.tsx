import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ActualitesPage from "@/components/actualites/ActualitesPage";

export const metadata: Metadata = {
  title: "Actualités — SAIEN",
  description:
    "Articles, analyses et retours d'expérience de la communauté SAIEN sur l'IA, la data science et l'innovation technologique.",
};

export default function Actualites() {
  return (
    <>
      <Navbar />
      <main>
        <ActualitesPage />
      </main>
      <Footer />
    </>
  );
}
