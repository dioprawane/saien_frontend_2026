import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="bg-white py-10 lg:py-14" aria-labelledby="hero-home-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14">

          {/* ── Texte ── */}
          <div className="flex-1 flex flex-col gap-4 text-left">
            <span className="inline-flex w-fit items-center gap-2 bg-brand-green-soft border border-brand-green-soft-strong text-brand-green-hover text-xs font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" aria-hidden="true" />
              Réseau d&apos;Excellence en Intelligence Artificielle
            </span>

            <h1
              id="hero-home-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight"
            >
              L&apos;excellence <br />
              sénégalaise en<br />
              <span className="text-brand-green">IA, Data et Cybersécurité.</span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
              SAIEN (Senegalese Artificial Intelligence Excellence Network) rassemble étudiants, chercheurs, ingénieurs, entrepreneurs et professionnels sénégalais de l'IA, de la Data et de la Cybersécurité en France, au Sénégal et dans la diaspora, pour faire émerger les talents, accélérer l'innovation et bâtir des ponts technologiques entre la diaspora et le Sénégal.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/vision"
                className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover transition-colors text-white text-sm font-semibold px-6 py-3 rounded-full"
              >
                Découvrir notre mission
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reseau"
                className="inline-flex items-center justify-center bg-transparent hover:bg-brand-surface transition-colors text-slate-800 border border-slate-200 text-sm font-semibold px-6 py-3 rounded-full"
              >
                Voir les membres
              </Link>
            </div>
          </div>

          {/* ── Visuel monde ── */}
          <div className="flex-1 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className="relative w-full max-w-[690px] aspect-[690/530] rounded-2xl overflow-hidden"
              role="img"
              aria-label="Carte du monde avec réseau de connexions IA"
            >
              <img
                src="/saien_hero_illustration_monde_v2.svg"
                alt="Illustration du réseau mondial SAIEN"
                className="h-full w-full object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
