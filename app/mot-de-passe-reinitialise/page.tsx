import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Mot de passe réinitialisé — SAIEN",
  description:
    "Votre mot de passe SAIEN a été mis à jour avec succès.",
};

export default function MotDePasseReinitialisePage() {
  return (
    <AuthShell
      title="Mot de passe mis à jour"
      description="Votre mot de passe a été réinitialisé avec succès."
      panelLabel="Succès"
      panelTitle="Vous pouvez vous reconnecter"
      panelDescription="La mise à jour a bien été prise en compte. Utilisez votre nouveau mot de passe lors de votre prochaine connexion."
      panelPoints={[
        "Réinitialisation terminée avec succès.",
        "Votre ancien mot de passe n'est plus valide.",
        "Pensez à activer une sécurité supplémentaire si disponible.",
      ]}
    >
      <div className="rounded-2xl border border-brand-green-soft-strong bg-brand-green-soft/70 p-5 text-brand-green-hover">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          <p className="font-semibold">Réinitialisation confirmée</p>
        </div>
        <p className="text-sm leading-relaxed">
          Votre compte est prêt. Connectez-vous avec votre nouveau mot de passe.
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
        >
          Se connecter
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


