"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { register } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function InscriptionPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage("Le mot de passe doit contenir au moins 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      router.push(`/verification-email?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible de creer le compte pour le moment."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Créer votre compte"
      description="Commencez en quelques minutes et activez votre accès membre via email."
      panelLabel="Authentification"
      panelTitle="Bienvenue dans l'espace SAIEN"
      panelDescription="Un compte vous permet de suivre vos inscriptions, candidatures, événements et contenus réservés à la communauté."
      panelPoints={[
        "Inscription rapide avec vérification email.",
        "Accès à votre profil, vos candidatures et vos participations.",
        "Sécurité renforcée des données personnelles et professionnelles.",
      ]}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700">
            Prénom
            <input
              type="text"
              placeholder="Fatou"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Nom
            <input
              type="text"
              placeholder="Sow"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>
        </div>

        <label className="text-sm font-medium text-slate-700 block">
          Adresse email
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-sm font-medium text-slate-700">
            Mot de passe
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

          <label className="text-sm font-medium text-slate-700">
            Confirmer
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
        </div>

        <label className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed pt-1">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300"
              checked={acceptTerms}
              onChange={(event) => setAcceptTerms(event.target.checked)}
            />
          <span>
            J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité.
          </span>
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
                  Creation...
                </>
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            J&apos;ai déjà un compte
          </Link>
        </div>

        {errorMessage ? (
          <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </form>

      <div className="mt-6 rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/60 p-4 text-xs text-brand-green-hover flex items-start gap-2">
        <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          Après inscription, un email de vérification vous sera envoyé pour activer votre compte.
        </p>
      </div>
    </AuthShell>
  );
}


