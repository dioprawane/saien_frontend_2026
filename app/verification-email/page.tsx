"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MailCheck, RefreshCcw, ArrowRight, Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { resendVerification, verifyEmail } from "@/lib/api/auth";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function VerificationEmailPage() {
  const router = useRouter();

  const tokenVerificationTriggered = useRef(false);

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token")?.trim() ?? "";
    const emailFromUrl = params.get("email") ?? "";
    const statusFromUrl = params.get("status") ?? "";

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);

    if (statusFromUrl.toLowerCase() === "error") {
      setErrorMessage("Le lien de verification est invalide ou expire. Demandez un nouveau lien.");
    }
  }, []);

  useEffect(() => {
    if (!token || tokenVerificationTriggered.current) return;

    tokenVerificationTriggered.current = true;
    setErrorMessage(null);
    setStatusMessage(null);
    setIsVerifyingToken(true);

    verifyEmail({ token })
      .then(() => {
        setStatusMessage("Adresse email verifiee. Redirection en cours...");
        window.setTimeout(() => {
          router.replace("/email-verifie");
        }, 1200);
      })
      .catch((error) => {
        setErrorMessage(getApiErrorMessage(error, "Le lien de verification est invalide ou expire."));
      })
      .finally(() => {
        setIsVerifyingToken(false);
      });
  }, [router, token]);

  const handleResend = async () => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!email.trim()) {
      setErrorMessage("Saisissez votre adresse email pour recevoir un nouveau lien.");
      return;
    }

    setIsResending(true);

    try {
      const response = await resendVerification(email.trim());
      setStatusMessage(response.message || "Un nouvel email de verification vient d'etre envoye.");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Impossible de renvoyer l'email pour le moment."));
    } finally {
      setIsResending(false);
    }
  };

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
          <p className="font-semibold">Email de vérification</p>
        </div>
        <p className="text-sm leading-relaxed">
          Ouvrez votre boite de reception et cliquez sur le lien d&apos;activation.
        </p>
      </div>

      <label className="mt-5 block text-sm font-medium text-slate-700">
        Adresse email
        <input
          type="email"
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
          placeholder="vous@exemple.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
      </label>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Link
          href="/email-verifie"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-green-hover"
        >
          J&apos;ai vérifié mon email
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
        >
          {isResending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Envoi...
            </>
          ) : (
            <>
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Renvoyer l&apos;email
            </>
          )}
        </button>
      </div>

      {isVerifyingToken ? (
        <p className="mt-4 rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/70 px-3 py-2 text-sm text-brand-green-hover">
          Verification du lien en cours...
        </p>
      ) : null}

      {statusMessage ? (
        <p className="mt-4 rounded-xl border border-brand-green-soft-strong bg-brand-green-soft/70 px-3 py-2 text-sm text-brand-green-hover">
          {statusMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

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


