import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="bg-slate-50 pt-8 pb-12 lg:pt-10 lg:pb-16"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          <div className="flex flex-col gap-6 text-center lg:text-left max-w-[620px]">
            {/*<div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full">
                <span
                  className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                  aria-hidden="true"
                />
                NOTRE VISION
              </span>
            </div>*/}

            <h1
              id="vision-heading"
              className="text-4xl sm:text-5xl lg:text-[4.1rem] font-bold text-[#0c1836] leading-[1.04] tracking-[-0.02em]"
            >
              Bâtir l&apos;Avenir
              <br className="hidden sm:block" />
              de{" "}
              <span className="text-emerald-500">l&apos;IA sénégalaise</span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed max-w-[580px] mx-auto lg:mx-0">
              Nous construisons un pont durable entre la diaspora sénégalaise et son pays d&apos;origine, 
              pour faire émerger une expertise reconnue, éthique et porteuse d&apos;impact en Intelligence Artificielle, 
              Data et Cybersécurité.
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
            <div className="relative">
              <div className="relative rounded-[26px] overflow-hidden aspect-[710/610] bg-[#07142a] shadow-[0_34px_55px_-36px_rgba(7,20,42,0.9)]">
                <Image
                  src="/saien_vision_hero_illustration.svg"
                  alt="Illustration de la vision SAIEN"
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
