import type { Metadata } from "next";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Mot de passe oublié — SAIEN",
  description:
    "Demandez un lien de réinitialisation de mot de passe pour votre compte SAIEN.",
};

export default function MotDePasseOubliePage() {
  return (
    <AuthShell
      title="Mot de passe oublié"
      description="Saisissez votre email pour recevoir un lien de réinitialisation."
      panelLabel="Récupération"
      panelTitle="Nous allons vous aider"
      panelDescription="Si votre compte existe, vous recevrez un email contenant les instructions pour créer un nouveau mot de passe."
      panelPoints={[
        "Lien temporaire de réinitialisation.",
        "Protection contre les accès non autorisés.",
        "Possibilité de renvoyer un nouvel email si besoin.",
      ]}
    >
      <form className="space-y-4">
        <label className="text-sm font-medium text-slate-700 block">
          Adresse email du compte
          <input
            type="email"
            placeholder="vous@exemple.com"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="email"
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/lien-reinitialisation-envoye"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            Envoyer le lien
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Retour à la connexion
          </Link>
        </div>
      </form>

      <div className="mt-6 rounded-xl border border-slate-200 bg-brand-surface p-4 text-xs text-slate-600 flex items-start gap-2">
        <Mail className="h-4 w-4 mt-0.5 shrink-0 text-brand-green-hover" aria-hidden="true" />
        <p>
          Vérifiez aussi votre dossier spam si l&apos;email n&apos;arrive pas dans les prochaines minutes.
        </p>
      </div>
    </AuthShell>
  );
}


