import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Connexion — SAIEN",
  description:
    "Connectez-vous à votre compte SAIEN pour accéder à votre espace membre.",
};

export default function ConnexionPage() {
  return (
    <AuthShell
      title="Connexion"
      description="Accédez à votre espace personnel SAIEN."
      panelLabel="Authentification"
      panelTitle="Ravi de vous revoir"
      panelDescription="Connectez-vous pour retrouver vos activités, vos demandes en cours et les services exclusifs réservés aux membres."
      panelPoints={[
        "Suivi de vos inscriptions et événements.",
        "Gestion de votre profil et de vos préférences.",
        "Accès sécurisé à l'écosystème SAIEN.",
      ]}
    >
      <form className="space-y-4">
        <label className="text-sm font-medium text-slate-700 block">
          Adresse email
          <input
            type="email"
            placeholder="vous@exemple.com"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="email"
          />
        </label>

        <label className="text-sm font-medium text-slate-700 block">
          Mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="current-password"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <label className="inline-flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            Se souvenir de moi
          </label>

          <Link href="/mot-de-passe-oublie" className="font-semibold text-brand-green-hover hover:text-brand-green-hover">
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/espace-membre"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            Se connecter
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            href="/inscription"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Créer un compte
          </Link>
        </div>
      </form>

      <p className="mt-5 text-xs text-slate-500">
        Pas encore vérifié ?
        {" "}
        <Link href="/verification-email" className="font-semibold text-brand-green-hover hover:text-brand-green-hover">
          Vérifier mon email
        </Link>
      </p>
    </AuthShell>
  );
}


