import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Lien envoyé — SAIEN",
  description:
    "Le lien de réinitialisation de mot de passe a été envoyé à votre adresse email.",
};

export default function LienReinitialisationEnvoyePage() {
  return (
    <AuthShell
      title="Lien de réinitialisation envoyé"
      description="Consultez votre boîte mail pour poursuivre la réinitialisation."
      panelLabel="Récupération"
      panelTitle="Vérifiez votre messagerie"
      panelDescription="Nous avons envoyé un email contenant un lien temporaire pour définir un nouveau mot de passe."
      panelPoints={[
        "Le lien est valable pour une durée limitée.",
        "Un seul clic suffit pour accéder au formulaire sécurisé.",
        "Vous pouvez demander un nouveau lien à tout moment.",
      ]}
    >
      <div className="rounded-2xl border border-brand-green-soft-strong bg-brand-green-soft/70 p-5 text-brand-green-hover">
        <div className="flex items-center gap-2 mb-2">
          <MailCheck className="h-5 w-5" aria-hidden="true" />
          <p className="font-semibold">Email envoyé avec succès</p>
        </div>
        <p className="text-sm leading-relaxed">
          Suivez les instructions reçues pour créer un nouveau mot de passe.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
        >
          Retour a la connexion
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link
          href="/mot-de-passe-oublie"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
        >
          Renvoyer le lien
        </Link>
      </div>
    </AuthShell>
  );
}


