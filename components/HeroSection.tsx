import Link from "next/link";
import { ArrowDown } from "lucide-react";

const STATS = [
  { value: "50+", label: "EXPERTS", highlighted: false },
  { value: "12", label: "PAYS", highlighted: false },
  { value: "100%", label: "IMPACT", highlighted: true },
];

export default function HeroSection() {
  return (
    <section
      className="bg-slate-50 py-16 lg:py-24"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Texte ── */}
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  aria-hidden="true"
                />
                NOTRE VISION
              </span>
            </div>

            <h1
              id="vision-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
            >
              Façonner l&apos;Avenir
              <br className="hidden sm:block" />
              de{" "}
              <span className="text-emerald-500">l&apos;IA Africaine</span>
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
              Nous construisons un pont technologique entre la diaspora africaine
              et le continent. Notre vision est de créer un écosystème
              d&apos;intelligence artificielle éthique, performant et ancré dans
              les réalités locales pour propulser l&apos;innovation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link
                href="#missions"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 transition-colors text-white text-sm font-semibold px-5 py-3 rounded-full"
              >
                Découvrir nos missions
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="#initiatives"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 transition-colors text-slate-900 border border-slate-200 text-sm font-semibold px-5 py-3 rounded-full"
              >
                Voir nos initiatives
              </Link>
            </div>
          </div>

          {/* ── Visuel ── */}
          <div className="flex-1 w-full max-w-sm mx-auto lg:max-w-none">
            <div className="relative pb-6">
              {/* Carte image Afrique */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-800 via-[#0d2535] to-[#0a1e2e]">
                {/* Halo de fond */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-teal-400/20 rounded-full blur-2xl" />
                {/* Continent (placeholder — remplacer par <Image> en production) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[160px] leading-none select-none opacity-60"
                    aria-hidden="true"
                    role="img"
                  >
                    🌍
                  </span>
                </div>
              </div>

              {/* Carte statistiques */}
              <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 bg-white rounded-2xl shadow-2xl px-4 py-4">
                <dl className="grid grid-cols-3 divide-x divide-slate-100">
                  {STATS.map(({ value, label, highlighted }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center px-2 sm:px-4 py-1"
                    >
                      <dd
                        className={`text-xl lg:text-2xl font-bold ${
                          highlighted ? "text-emerald-500" : "text-slate-900"
                        }`}
                      >
                        {value}
                      </dd>
                      <dt className="text-[10px] sm:text-xs text-slate-400 font-semibold tracking-widest mt-0.5">
                        {label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
