import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

const STATS = [
  { value: "50+", label: "EXPERTS", highlighted: false },
  { value: "12", label: "PAYS", highlighted: false },
  { value: "100%", label: "IMPACT", highlighted: true },
];

export default function HeroSection() {
  return (
    <section
      className="bg-slate-50 py-14 lg:py-20"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          <div className="flex flex-col gap-6 text-center lg:text-left max-w-[620px]">
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full">
                <span
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  aria-hidden="true"
                />
                NOTRE VISION
              </span>
            </div>

            <h1
              id="vision-heading"
              className="text-4xl sm:text-5xl lg:text-[4.1rem] font-bold text-[#0c1836] leading-[1.04] tracking-[-0.02em]"
            >
              Façonner l&apos;Avenir
              <br className="hidden sm:block" />
              de{" "}
              <span className="text-emerald-500">l&apos;IA Africaine</span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-[580px] mx-auto lg:mx-0">
              Nous construisons un pont technologique entre la diaspora africaine
              et le continent. Notre vision est de créer un écosystème
              d&apos;intelligence artificielle éthique, performant et ancré dans
              les réalités locales pour propulser l&apos;innovation.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-1">
              <Link
                href="#missions"
                className="inline-flex items-center justify-center gap-2 bg-[#163f66] hover:bg-[#113455] transition-colors text-white text-base font-semibold px-7 py-3.5 rounded-xl shadow-[0_10px_22px_-14px_rgba(15,40,75,0.9)]"
              >
                Découvrir nos missions
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="#initiatives"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 transition-colors text-slate-800 border border-slate-200 text-base font-semibold px-7 py-3.5 rounded-xl"
              >
                Voir nos initiatives
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[660px] mx-auto lg:mx-0">
            <div className="relative pb-8 sm:pb-10">
              <div className="relative rounded-[26px] overflow-hidden aspect-[5/4] bg-gradient-to-br from-[#07142a] via-[#0b2741] to-[#061626] shadow-[0_34px_55px_-36px_rgba(7,20,42,0.9)]">
                <Image
                  src="/event-1.png"
                  alt="Vision SAIEN pour l'IA africaine"
                  fill
                  className="object-cover opacity-75"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#091d37]/50 via-[#07192e]/35 to-[#061426]/60" />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 rounded-full bg-emerald-400/16 blur-3xl" />
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 w-[84%] -translate-x-1/2 bg-white rounded-3xl shadow-[0_22px_34px_-22px_rgba(15,23,42,0.5)] px-4 py-4 sm:py-5">
                <dl className="grid grid-cols-3 divide-x divide-slate-100">
                  {STATS.map(({ value, label, highlighted }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center px-2 sm:px-4 py-1"
                    >
                      <dd
                        className={`text-2xl lg:text-[2rem] font-bold leading-none ${
                          highlighted ? "text-emerald-500" : "text-slate-900"
                        }`}
                      >
                        {value}
                      </dd>
                      <dt className="text-[11px] sm:text-xs text-slate-400 font-semibold tracking-[0.16em] mt-1.5">
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
