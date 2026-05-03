import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Email vérifié — SAIEN",
  description:
    "Votre adresse email a été vérifiée. Vous pouvez maintenant vous connecter.",
};

export default function EmailVerifiePage() {
  return (
    <AuthShell
      title="Adresse email vérifiée"
      description="Votre compte est désormais activé et prêt à l'emploi."
      panelLabel="Activation réussie"
      panelTitle="Bienvenue officiellement"
      panelDescription="Votre email est validé. Vous pouvez désormais accéder à votre espace personnel et profiter des services du réseau."
      panelPoints={[
        "Activation terminée avec succès.",
        "Connexion immédiate à votre compte.",
        "Accès à l'ensemble des fonctionnalités SAIEN.",
      ]}
    >
      <div className="rounded-2xl border border-brand-green-soft-strong bg-brand-green-soft/70 p-5 text-brand-green-hover">
        <div className="flex items-center gap-2 mb-2">
          <BadgeCheck className="h-5 w-5" aria-hidden="true" />
          <p className="font-semibold">Votre compte est activé</p>
        </div>
        <p className="text-sm leading-relaxed">
          Merci. Vous pouvez maintenant vous connecter pour finaliser votre profil.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
        >
          Aller à la connexion
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </AuthShell>
  );
}


