"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, KeyRound, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { resetPassword } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token")?.trim() ?? "");
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("Le lien de reinitialisation est invalide ou incomplet.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        token,
        newPassword: password,
      });

      router.push("/mot-de-passe-reinitialise");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible de reinitialiser le mot de passe."));
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-slate-700 block">
          Nouveau mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700 block">
          Confirmer le nouveau mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>

        <div className="rounded-xl border border-slate-200 bg-brand-surface p-4 text-xs text-slate-600 flex items-start gap-2">
          <KeyRound className="h-4 w-4 mt-0.5 shrink-0 text-brand-green-hover" aria-hidden="true" />
          <p>
            Astuce: utilisez une phrase de passe ou un gestionnaire de mots de passe pour plus de sécurité.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Validation...
              </>
            ) : (
              <>
                Enregistrer le nouveau mot de passe
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Annuler
          </Link>
        </div>

        {errorMessage ? (
          <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </AuthShell>
  );
}


