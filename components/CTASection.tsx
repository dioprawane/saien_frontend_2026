import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16 lg:py-20" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#153f66] via-[#0f3256] to-[#0b2c4b] px-6 py-14 text-center shadow-[0_42px_68px_-42px_rgba(15,23,42,0.85)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -top-20 right-8 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl"
            aria-hidden="true"
          />

          <h2
            id="cta-heading"
            className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl"
          >
            Prêt à rejoindre le mouvement ?
          </h2>

          <p className="relative mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg sm:leading-relaxed lg:text-[1.55rem] lg:leading-[1.45]">
            Que vous soyez un expert de la diaspora, une entreprise tech ou un
            étudiant passionné, votre contribution est essentielle pour bâtir
            l&apos;avenir de l&apos;IA en Afrique.
          </p>

          <div className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/rejoindre"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-emerald-500 px-9 py-4 text-lg font-bold text-white transition-colors hover:bg-emerald-600"
            >
              Devenir Membre
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border border-white/20 bg-transparent px-9 py-4 text-lg font-bold text-white transition-colors hover:bg-white/10"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
