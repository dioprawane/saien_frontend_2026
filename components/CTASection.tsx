import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-8 lg:py-12 bg-white" aria-labelledby="cta-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#0c1f2e] rounded-3xl px-6 py-14 sm:px-12 sm:py-20 text-center flex flex-col items-center gap-6">
          {/* Halos décoratifs */}
          <div
            className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <h2
            id="cta-heading"
            className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-lg leading-tight"
          >
            Prêt à rejoindre le mouvement ?
          </h2>

          <p className="relative text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
            Que vous soyez un expert de la diaspora, une entreprise tech ou un
            étudiant passionné, votre contribution est essentielle pour bâtir
            l&apos;avenir de l&apos;IA en Afrique.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3">
            <Link
              href="/rejoindre"
              className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold text-sm px-7 py-3 rounded-full"
            >
              Devenir Membre
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-slate-500 hover:border-slate-300 hover:bg-white/5 transition-colors text-white font-semibold text-sm px-7 py-3 rounded-full"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
