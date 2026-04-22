import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ReseauCTA() {
  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-labelledby="reseau-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2
              id="reseau-cta-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
            >
              Rejoignez notre réseau d&apos;experts
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Vous travaillez dans le domaine de l&apos;Intelligence Artificielle
              et souhaitez contribuer au développement de la communauté ? Le
              réseau SAIEN est ouvert aux nouveaux talents.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/rejoindre"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-full"
            >
              Soumettre sa candidature
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/a-propos"
              className="inline-flex items-center border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-700 font-semibold text-sm px-6 py-3 rounded-full"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
