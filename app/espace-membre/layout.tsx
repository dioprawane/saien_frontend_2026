"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MemberHeader from "@/components/member/MemberHeader";
import MemberFooter from "@/components/member/MemberFooter";
import { useUserSession } from "@/components/auth/UserSessionContext";

export default function EspaceMembreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isHydrated, isAuthenticated } = useUserSession();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) {
      router.replace("/connexion?next=/espace-membre");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f3f5]">
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          Chargement de votre espace membre...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f3f5]">
      <MemberHeader />
      <main className="flex-1">{children}</main>
      <MemberFooter />
    </div>
  );
}
