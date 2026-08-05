"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { useUserSession } from "@/components/auth/UserSessionContext";
import { login, toUserSession } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function ConnexionPage() {
  const router = useRouter();
  const { isHydrated, isAuthenticated, isAdmin, signIn } = useUserSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) return;
    router.replace(isAdmin ? "/admin" : "/espace-membre");
  }, [isHydrated, isAuthenticated, isAdmin, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await login({
        email: email.trim(),
        password,
      });

      if (!response.session.emailVerified) {
        router.push(`/verification-email?email=${encodeURIComponent(email.trim())}`);
        return;
      }

      signIn({
        token: response.token ?? null,
        session: toUserSession(response.session),
      });

      const nextPath =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("next")
          : null;
      if (nextPath && nextPath.startsWith("/")) {
        router.push(nextPath);
        return;
      }

      if (
        response.session.role === "admin" ||
        response.session.role === "super-admin" ||
        response.session.role === "admin-event"
      ) {
        router.push("/admin");
        return;
      }

      router.push("/espace-membre");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible de vous connecter pour le moment."));
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
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

        <label className="text-sm font-medium text-slate-700 block">
          Mot de passe
          <input
            type="password"
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Connexion...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <Link
            href="/inscription"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
          >
            Créer un compte
          </Link>
        </div>

        {errorMessage ? (
          <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
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


