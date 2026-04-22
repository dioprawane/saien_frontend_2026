import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="bg-white py-12 lg:py-20" aria-labelledby="hero-home-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* ── Texte ── */}
          <div className="flex-1 flex flex-col gap-6 text-left">
            <span className="inline-flex w-fit items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
              Réseau d&apos;Intelligence Artificielle
            </span>

            <h1
              id="hero-home-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight"
            >
              Connecter<br />
              l&apos;Innovation<br />
              <span className="text-emerald-500">Sans Frontières.</span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
              SAIEN fédère la diaspora experte en intelligence artificielle pour
              accélérer le développement technologique et créer des synergies mondiales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/vision"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-sm font-semibold px-6 py-3 rounded-full"
              >
                Découvrir notre mission
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reseau"
                className="inline-flex items-center justify-center bg-transparent hover:bg-slate-50 transition-colors text-slate-800 border border-slate-200 text-sm font-semibold px-6 py-3 rounded-full"
              >
                Voir les membres
              </Link>
            </div>
          </div>

          {/* ── Visuel monde ── */}
          <div className="flex-1 w-full max-w-lg mx-auto lg:max-w-none">
            <div
              className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-[#060e1c]"
              role="img"
              aria-label="Carte du monde avec réseau de connexions IA"
            >
              {/* Halos de fond */}
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl" />
              </div>

              {/* Globe placeholder — remplacer par <Image> en production */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="text-8xl sm:text-9xl select-none opacity-70">🌐</span>
              </div>

              {/* Nœuds réseau animés */}
              {[
                { x: "18%", y: "23%", pulse: true },
                { x: "44%", y: "33%", pulse: false },
                { x: "72%", y: "20%", pulse: true },
                { x: "30%", y: "56%", pulse: false },
                { x: "63%", y: "61%", pulse: true },
                { x: "82%", y: "46%", pulse: false },
                { x: "55%", y: "74%", pulse: false },
                { x: "12%", y: "60%", pulse: true },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_2px_rgba(52,211,153,0.5)] ${node.pulse ? "animate-pulse" : ""}`}
                  style={{ left: node.x, top: node.y }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
