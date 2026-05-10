"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { forgotPassword } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function MotDePasseOubliePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await forgotPassword({ email: email.trim() });
      router.push(`/lien-reinitialisation-envoye?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible d'envoyer le lien de reinitialisation."));
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-slate-700 block">
          Adresse email du compte
          <input
            type="email"
            placeholder="vous@exemple.com"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Envoi...
              </>
            ) : (
              <>
                Envoyer le lien
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Retour à la connexion
          </Link>
        </div>

        {errorMessage ? (
          <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
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


