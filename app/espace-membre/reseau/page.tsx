import type { Metadata } from "next";
import Link from "next/link";
import { Users, MessageSquare, Handshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Réseau privé — SAIEN",
  description: "Explorez les groupes et contacts de votre réseau membre SAIEN.",
};

const NETWORK_BLOCKS = [
  {
    title: "Groupes thématiques",
    text: "IA Générative, Santé & IA, Gouvernance Data, MLOps Afrique.",
    icon: MessageSquare,
  },
  {
    title: "Membres suggérés",
    text: "Découvrez les profils pertinents selon vos intérêts et objectifs.",
    icon: Users,
  },
  {
    title: "Partenariats",
    text: "Accédez aux opportunités de collaboration avec les membres et institutions.",
    icon: Handshake,
  },
];

export default function EspaceMembreReseauPage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-[#123a5f]">Réseau privé</h1>
          <p className="mt-2 text-slate-500 max-w-2xl">Connectez-vous avec la communauté membre, rejoignez des cercles thématiques et développez vos collaborations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NETWORK_BLOCKS.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#0A3458]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className="mt-3 text-base font-bold text-[#0A3458]">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Besoin d&apos;accéder à l&apos;annuaire public complet ?</p>
          <Link href="/reseau#annuaire" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            Ouvrir l&apos;annuaire
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
