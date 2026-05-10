import type { Metadata } from "next";
import MemberProfileEditor from "@/components/member/MemberProfileEditor";

export const metadata: Metadata = {
  title: "Profil administrateur — SAIEN",
  description: "Consultez et mettez a jour vos informations de compte administrateur.",
};

export default function AdminProfilePage() {
  return <MemberProfileEditor variant="admin" />;
}
