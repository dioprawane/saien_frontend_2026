import type { Metadata } from "next";
import MemberProfileEditor from "@/components/member/MemberProfileEditor";

export const metadata: Metadata = {
  title: "Mon profil — SAIEN",
  description: "Consultez et mettez à jour vos informations membre SAIEN.",
};

export default function ProfilMembrePage() {
  return <MemberProfileEditor variant="member" />;
}
