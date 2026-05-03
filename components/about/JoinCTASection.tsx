import Link from "next/link";
import Image from "next/image";

export default function JoinCTASection() {
  return (
    <section
      className="bg-brand-surface py-16 sm:py-20 lg:py-24"
      aria-labelledby="join-cta-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[18px] shadow-[0_26px_50px_-26px_rgba(15,23,42,0.7)]">
          <Image
            src="/event-2.png"
            alt="Membres SAIEN en collaboration"
            width={1600}
            height={860}
            className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[560px]"
            priority={false}
          />

          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/38 via-slate-950/42 to-slate-950/55"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-10 lg:px-16">
            <h2
              id="join-cta-heading"
              className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-[4rem]"
            >
              Rejoignez le Nœud
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-slate-100 sm:text-2xl">
              Plus qu&apos;une organisation, SAIEN est une communauté vivante de chercheurs,
              développeurs et innovateurs déterminés à façonner l&apos;avenir.
            </p>

            <Link
              href="/reseau"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-green px-9 py-4 text-lg font-bold text-white transition-colors hover:bg-brand-green-hover"
            >
              Devenir Membre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
