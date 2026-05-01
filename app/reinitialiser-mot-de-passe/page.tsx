import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe — SAIEN",
  description:
    "Choisissez un nouveau mot de passe pour sécuriser votre compte SAIEN.",
};

export default function ReinitialiserMotDePassePage() {
  return (
    <AuthShell
      title="Nouveau mot de passe"
      description="Définissez un mot de passe robuste pour votre compte."
      panelLabel="Sécurité"
      panelTitle="Protégez votre accès"
      panelDescription="Choisissez un mot de passe unique comprenant lettres, chiffres et caractères spéciaux."
      panelPoints={[
        "Au moins 8 caractères recommandés.",
        "Évitez les informations personnelles évidentes.",
        "Conservez ce mot de passe en lieu sûr.",
      ]}
    >
      <form className="space-y-4">
        <label className="text-sm font-medium text-slate-700 block">
          Nouveau mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="new-password"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 block">
          Confirmer le nouveau mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="new-password"
          />
        </label>

        <div className="rounded-xl border border-slate-200 bg-brand-surface p-4 text-xs text-slate-600 flex items-start gap-2">
          <KeyRound className="h-4 w-4 mt-0.5 shrink-0 text-brand-green-hover" aria-hidden="true" />
          <p>
            Astuce: utilisez une phrase de passe ou un gestionnaire de mots de passe pour plus de sécurité.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/mot-de-passe-reinitialise"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            Enregistrer le nouveau mot de passe
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Annuler
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}


