import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact — SAIEN",
  description:
    "Contactez l'équipe SAIEN pour toute demande de partenariat, adhésion, presse ou information générale.",
};

export default function ContactRoute() {
  return (
    <>
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
