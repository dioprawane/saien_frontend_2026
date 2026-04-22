import type { Metadata } from "next";
import ConfidentialitePage from "@/components/legal/ConfidentialitePage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SAIEN",
  description:
    "Politique de confidentialité SAIEN : données collectées, finalités, base légale, durée de conservation et vos droits RGPD.",
};

export default function ConfidentialiteRoute() {
  return <ConfidentialitePage />;
}
