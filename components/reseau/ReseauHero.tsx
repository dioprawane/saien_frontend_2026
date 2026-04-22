import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function ReseauHero() {
  return (
    <section
      className="bg-white pt-16 pb-20"
      aria-labelledby="reseau-hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">
              Notre Réseau
            </p>
            <h1
              id="reseau-hero-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6"
            >
              Connectez-vous avec l&apos;écosystème{" "}
              <span className="text-emerald-500">IA global</span>
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-lg">
              Découvrez les esprits brillants de la diaspora et les innovateurs
              du monde entier. Un réseau professionnel dédié à
              l&apos;intelligence artificielle et à l&apos;innovation
              technologique.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#annuaire"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-full"
              >
                Explorer l&apos;annuaire
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/rejoindre"
                className="inline-flex items-center border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-700 font-semibold text-sm px-6 py-3 rounded-full"
              >
                Devenir membre
              </Link>
            </div>
          </div>

          {/* Visuel placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-72 lg:h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50" />
            <div className="relative flex flex-col items-center gap-3 text-emerald-600">
              <Users className="w-16 h-16 opacity-25" aria-hidden="true" />
              <span className="text-xs text-slate-400 font-medium">
                Communauté SAIEN
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
