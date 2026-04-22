import Link from "next/link";
import { Users, Building2 } from "lucide-react";
import InitiativeCard from "@/components/InitiativeCard";

const INITIATIVES = [
  {
    badge: "Éducation",
    imageBg:
      "bg-gradient-to-br from-amber-700 via-orange-800 to-slate-900",
    title: "Bootcamp IA Dakar 2026",
    description:
      "Un programme intensif de 12 semaines formant 100 jeunes talents sénégalais aux fondamentaux du Machine Learning, encadrés par des experts de la diaspora.",
    footer: (
      <span className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        +15 Mentors
      </span>
    ),
    href: "#",
  },
  {
    badge: "Plateforme",
    imageBg:
      "bg-gradient-to-br from-teal-600 via-cyan-800 to-slate-900",
    title: "SAIEN Connect Hub",
    description:
      "Lancement de notre plateforme numérique propriétaire facilitant le matching entre porteurs de projets IA locaux et chercheurs de la diaspora internationale.",
    footer: (
      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
        <span
          className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
          aria-hidden="true"
        />
        En cours
      </span>
    ),
    href: "#",
  },
  {
    badge: "Recherche",
    imageBg:
      "bg-gradient-to-br from-green-700 via-teal-800 to-slate-900",
    title: "AgriTech IA Lab",
    description:
      "Consortium de recherche appliquant la vision par ordinateur pour l'optimisation des rendements agricoles face aux défis climatiques régionaux.",
    footer: (
      <span className="flex items-center gap-1.5">
        <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        3 Partenaires
      </span>
    ),
    href: "#",
  },
];

export default function InitiativesSection() {
  return (
    <section
      id="initiatives"
      className="py-16 lg:py-24 bg-slate-50"
      aria-labelledby="initiatives-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div className="max-w-lg">
            <h2
              id="initiatives-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
            >
              Initiatives Stratégiques
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Découvrez les projets concrets que nous déployons pour transformer
              notre vision en réalité sur le terrain.
            </p>
          </div>
          <Link
            href="/projets"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors px-4 py-2 rounded-full"
          >
            Voir tous les projets
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIATIVES.map((initiative) => (
            <InitiativeCard key={initiative.title} {...initiative} />
          ))}
        </div>
      </div>
    </section>
  );
}
