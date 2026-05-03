import type { Metadata } from "next";
import MemberEventsPage from "@/components/member/MemberEventsPage";

export const metadata: Metadata = {
  title: "Mes événements — SAIEN",
  description: "Consultez vos événements à venir et vos inscriptions SAIEN.",
};

export default function EspaceMembreEvenementsPage() {
  return <MemberEventsPage />;
}
