import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ReseauHero() {
  return (
    <section
      className="bg-white pt-8 lg:pt-10 pb-16 lg:pb-20"
      aria-labelledby="reseau-hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1
              id="reseau-hero-heading"
              className="text-4xl sm:text-5xl font-extrabold text-[#123a5f] leading-[1.04] mb-6"
            >
              Notre réseau, notre <span className="text-brand-green">force collective.</span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl">
              Découvrez la communauté SAIEN : un réseau de Sénégalais,
              étudiants, chercheurs, ingénieurs, entrepreneurs, engagés
              ensemble pour faire rayonner l&apos;expertise sénégalaise en IA,
              Data et Cybersécurité.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link
                href="#annuaire"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover transition-colors text-white font-semibold text-sm px-6 py-3 rounded-xl"
              >
                Explorer l&apos;annuaire
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/rejoindre"
                className="inline-flex items-center border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl"
              >
                Devenir membre
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-[710/610] rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_55px_-38px_rgba(15,23,42,0.75)]">
            <Image
              src="/saien_reseau_hero_illustration.svg"
              alt="Illustration du réseau SAIEN"
              fill
              className="object-cover scale-[1.04]"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}


