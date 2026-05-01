import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ReseauCTA() {
  return (
    <section
      className="bg-white py-20 lg:py-24"
      aria-labelledby="reseau-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-[#0d2f4c] via-[#134a73] to-[#1b5e92]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_42%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center p-8 sm:p-10 lg:p-12">
            <div className="lg:col-span-3 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200 mb-3">
                Rejoindre la communauté
              </p>
              <h2
                id="reseau-cta-heading"
                className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4"
              >
                Rejoignez notre réseau
                <br className="hidden sm:block" />
                d&apos;experts IA
              </h2>
              <p className="text-cyan-50/90 text-sm sm:text-base leading-relaxed max-w-2xl">
                Vous travaillez dans l&apos;intelligence artificielle et souhaitez
                contribuer au développement de la communauté ? Le réseau SAIEN
                est ouvert aux nouveaux talents, mentors et partenaires.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/rejoindre"
                  className="inline-flex items-center gap-2 bg-white text-[#12476f] hover:bg-cyan-50 transition-colors font-semibold text-sm px-6 py-3 rounded-xl"
                >
                  Soumettre sa candidature
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/a-propos"
                  className="inline-flex items-center border border-white/35 bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl"
                >
                  En savoir plus
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border border-white/25 shadow-[0_24px_44px_-30px_rgba(2,8,23,0.9)]">
                <Image
                  src="/event-3.png"
                  alt="Communauté SAIEN en collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05243c]/55 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

