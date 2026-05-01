import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck, RefreshCcw, ArrowRight } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Vérification de mail — SAIEN",
  description:
    "Confirmez votre adresse email pour activer votre compte SAIEN.",
};

export default function VerificationEmailPage() {
  return (
    <AuthShell
      title="Vérifiez votre adresse email"
      description="Un email de confirmation a été envoyé à votre adresse."
      panelLabel="Activation du compte"
      panelTitle="Dernière étape"
      panelDescription="Cliquez sur le lien reçu par email pour activer définitivement votre compte et finaliser votre inscription."
      panelPoints={[
        "Le lien de vérification peut expirer pour votre sécurité.",
        "Vous pouvez demander un nouvel email si nécessaire.",
        "Une fois vérifié, vous pourrez vous connecter immédiatement.",
      ]}
    >
      <div className="rounded-2xl border border-brand-green-soft-strong bg-brand-green-soft/70 p-5 text-brand-green-hover">
        <div className="flex items-center gap-2 mb-2">
          <MailCheck className="h-5 w-5" aria-hidden="true" />
          <p className="font-semibold">Email de vérification envoyé</p>
        </div>
        <p className="text-sm leading-relaxed">
          Ouvrez votre boîte de réception et cliquez sur le lien d&apos;activation.
        </p>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Link
          href="/email-verifie"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
        >
          J&apos;ai vérifié mon email
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Link
          href="/verification-email"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Renvoyer l&apos;email
        </Link>
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Déjà activé ?
        {" "}
        <Link href="/connexion" className="font-semibold text-brand-green-hover hover:text-brand-green-hover">
          Aller à la connexion
        </Link>
      </p>
    </AuthShell>
  );
}


