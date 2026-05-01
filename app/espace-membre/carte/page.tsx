import type { Metadata } from "next";
import MemberCardPage from "@/components/member/MemberCardPage";

export const metadata: Metadata = {
  title: "Ma Carte de membre — SAIEN",
  description:
    "Gérez votre carte membre SAIEN, vos avantages et vos actions de renouvellement.",
};

export default function CarteMembrePage() {
  return <MemberCardPage />;
}
