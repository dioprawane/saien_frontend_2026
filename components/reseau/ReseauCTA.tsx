import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Gem,
  Pin,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function ReseauCTA() {
  return (
    <section
      className="bg-white py-20 lg:py-24"
      aria-labelledby="reseau-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          <div className="rounded-3xl border border-slate-200 bg-brand-surface px-6 py-7 sm:px-8 sm:py-9">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-green mb-3">
              Rejoindre la communauté
            </p>

            <h2
              id="reseau-cta-heading"
              className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#123a5f]"
            >
              Trois façons de faire partie de SAIEN
            </h2>

            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Selon votre profil et votre engagement, vous pouvez rejoindre
              l&apos;association à différents niveaux. (Article 5 des statuts)
            </p>

            <div className="mt-8 space-y-7">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-[#123a5f]">
                  <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  Membre Actif
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Pour les Sénégalais (ou amis du Sénégal) travaillant ou se
                  formant en IA, Data ou Cybersécurité, qui veulent contribuer
                  activement.
                </p>

                <ul className="mt-4 space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Participer aux activités et programmes
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Voter à l&apos;Assemblée Générale
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Accéder à l&apos;annuaire et aux opportunités
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Contribuer aux missions de SAIEN
                  </li>
                </ul>

                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Pin className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  Cotisation annuelle : à définir par l&apos;AG
                </p>

                <div className="mt-5">
                  <Link
                    href="/rejoindre"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-green hover:bg-brand-green-hover px-4 py-2.5 text-sm font-semibold text-white transition-colors"
                  >
                    Devenir membre actif
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-[#123a5f]">
                  <Gem className="h-5 w-5 text-cyan-500" aria-hidden="true" />
                  Membre Bienfaiteur
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Pour les particuliers ou structures souhaitant soutenir
                  financièrement SAIEN au-delà de la cotisation standard.
                </p>

                <ul className="mt-4 space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Tous les avantages des membres actifs
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Reconnaissance publique en tant que soutien
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Invitations privilégiées aux événements
                  </li>
                </ul>

                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Pin className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  Droit d&apos;entrée + cotisation annuelle
                </p>

                <div className="mt-5">
                  <Link
                    href="/rejoindre"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors"
                  >
                    Devenir bienfaiteur
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <h3 className="inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-[#123a5f]">
                  <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  Membre d&apos;Honneur
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Personnalités reconnues pour leur contribution exceptionnelle
                  à l&apos;IA et à notre communauté.
                </p>

                <ul className="mt-4 space-y-2.5">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Désigné par décision de l&apos;Assemblée Générale
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Dispense de cotisation
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-brand-green" aria-hidden="true" />
                    Voix consultative
                  </li>
                </ul>

                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Pin className="h-4 w-4 text-brand-green" aria-hidden="true" />
                  Sur invitation uniquement
                </p>

                <div className="mt-5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors"
                  >
                    Recommander un membre d&apos;honneur
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="relative w-full aspect-[730/510] rounded-3xl overflow-hidden border border-slate-200 shadow-[0_28px_48px_-34px_rgba(15,23,42,0.8)]">
              <Image
                src="/saien_rejoindre_illustration.svg"
                alt="Illustration pour rejoindre la communauté SAIEN"
                fill
                className="object-cover scale-[1.03]"
                unoptimized
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

