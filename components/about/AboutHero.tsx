import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-white pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <nav aria-label="Fil d'Ariane" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-brand-green hover:text-brand-green-hover font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Notre Vision
          </Link>
        </nav> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              <span className="text-[#0e3a2f]">Connecter l&apos;intelligence sénégalaise</span>
              <br />
              <span className="text-brand-green">sans frontières.</span>
            </h1>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              SAIEN (Réseau sénégalais d'excellence en intelligence artificielle) est le pont entre la communauté sénégalaise de l&apos;IA, étudiants, chercheurs, ingénieurs, entrepreneurs, professionnels,
              et l&apos;écosystème technologique mondial. Notre raison d&apos;être : faire émerger les talents, vulgariser l&apos;IA et accélérer
              le développement du Sénégal par l&apos;innovation.
            </p>
          </div>

          <div className="w-full">
            <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-3xl border border-brand-green-soft-strong bg-white shadow-sm">
              <Image
                src="/saien_about_hero_illustration.svg"
                alt="Illustration de la communauté SAIEN"
                width={610}
                height={610}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
