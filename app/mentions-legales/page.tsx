import type { Metadata } from "next";
import MentionsLegalesPage from "@/components/legal/MentionsLegalesPage";

export const metadata: Metadata = {
  title: "Mentions Légales — SAIEN",
  description:
    "Mentions légales du site SAIEN : informations de l'éditeur, hébergement, propriété intellectuelle, RGPD et cookies.",
};

export default function MentionsLegalesRoute() {
  return <MentionsLegalesPage />;
}
