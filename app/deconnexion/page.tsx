"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useUserSession } from "@/components/auth/UserSessionContext";

export default function DeconnexionPage() {
  const router = useRouter();
  const { signOut } = useUserSession();

  useEffect(() => {
    signOut();
    router.replace("/connexion");
  }, [router, signOut]);

  return (
    <main className="min-h-screen bg-brand-surface px-4 py-20">
      <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green-soft/70 text-brand-green-hover">
          <LogOut className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Déconnexion en cours</h1>
        <p className="mt-2 text-sm text-slate-600">
          Votre session est en train d&apos;etre fermée.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-green-hover">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Redirection vers la connexion...
        </div>
      </div>
    </main>
  );
}
