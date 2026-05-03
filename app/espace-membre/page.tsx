import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CreditCard, Users, CalendarDays, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau de bord membre — SAIEN",
  description: "Vue d'ensemble de votre activité au sein de l'espace membre SAIEN.",
};

const QUICK_CARDS = [
  {
    title: "Ma carte digitale",
    description: "Afficher, télécharger et imprimer votre carte membre.",
    href: "/espace-membre/carte",
    icon: CreditCard,
  },
  {
    title: "Mes événements",
    description: "Retrouvez vos inscriptions, invitations et prochaines sessions.",
    href: "/espace-membre/evenements",
    icon: CalendarDays,
  },
  {
    title: "Réseau privé",
    description: "Accédez aux membres, groupes thématiques et contacts clés.",
    href: "/espace-membre/reseau",
    icon: Users,
  },
];

export default function EspaceMembreDashboardPage() {
  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 mb-2">Espace membre</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123a5f]">Tableau de bord</h1>
          <p className="mt-2 text-slate-500 max-w-2xl">
            Suivez vos activités, gérez votre carte et accédez rapidement aux ressources réservées aux membres SAIEN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.href} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-[#0A3458]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h2 className="mt-3 text-lg font-bold text-[#0A3458]">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                <Link href={item.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  Ouvrir
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-emerald-600 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-emerald-800">Votre abonnement est actif</p>
            <p className="text-sm text-emerald-700 mt-1">Vous bénéficiez actuellement de tous les avantages Premium de votre carte membre.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
