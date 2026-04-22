import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact — SAIEN",
  description:
    "Contactez l'équipe SAIEN pour toute demande de partenariat, adhésion, presse ou information générale.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
