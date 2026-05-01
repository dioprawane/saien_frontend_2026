"use client";

import Link from "next/link";
import {
  Building2,
  Cookie,
  Gavel,
  Mail,
  MapPin,
  Scale,
  Server,
  ShieldCheck,
  UserRound,
  WalletCards,
  Printer,
  ArrowLeft,
} from "lucide-react";

const SECTIONS = [
  {
    id: 1,
    icon: Building2,
    title: "Informations de l'Éditeur",
    paragraphs: [
      "Le site SAIEN (ci-après le Site) est édité par l'association SAIEN (Synergie de l'Intelligence Artificielle et de l'Entrepreneuriat Numérique), association loi 1901 à but non lucratif.",
    ],
  },
  {
    id: 2,
    icon: Server,
    title: "Hébergement du Site",
    paragraphs: [
      "Le Site est hébergé par la société CloudTech Solutions SAS, dont les serveurs sont situés en Union Européenne afin de garantir la sécurité et la souveraineté des données de notre réseau.",
      "Adresse de l'hébergeur : 42 Rue du Serveur, 69003 Lyon, France.",
      "Téléphone : +33 (0)4 XX XX XX XX",
    ],
  },
  {
    id: 3,
    icon: WalletCards,
    title: "Propriété Intellectuelle",
    paragraphs: [
      "L'ensemble de ce Site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
      "Le logo SAIEN, les icônes de réseau et les éléments graphiques liés à l'intelligence artificielle présents sur ce site sont la propriété exclusive de l'association SAIEN. Toute reproduction totale ou partielle de ces éléments, sans l'autorisation expresse de l'association, est prohibée au sens de l'article L.713-2 du Code de la propriété intellectuelle.",
    ],
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Protection des Données Personnelles (RGPD)",
    paragraphs: [
      "Dans le cadre de ses activités de mise en réseau de la diaspora et de développement de projets IA, SAIEN est amenée à collecter et traiter des données à caractère personnel.",
      "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de portabilité, d'effacement de vos données ou d'une limitation du traitement.",
      "Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter notre Délégué à la Protection des Données (DPO).",
    ],
  },
  {
    id: 5,
    icon: Cookie,
    title: "Gestion des Cookies",
    paragraphs: [
      "Le Site utilise des cookies pour améliorer l'expérience utilisateur, analyser le trafic et optimiser le fonctionnement de nos algorithmes de recommandation de réseau.",
      "Lors de votre première visite, un bandeau vous informe de la présence de ces cookies et vous invite à indiquer votre choix. Ils ne sont déposés que si vous les acceptez. Vous pouvez à tout moment vous informer et paramétrer vos cookies pour les accepter ou les refuser.",
    ],
  },
  {
    id: 6,
    icon: Gavel,
    title: "Limitation de Responsabilité",
    paragraphs: [
      "Les informations contenues sur ce Site sont aussi précises que possible et le Site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.",
      "Les projets d'intelligence artificielle ou les initiatives de réseau présentés sur le site sont donnés à titre indicatif. SAIEN ne saurait être tenue responsable des dommages directs ou indirects qui pourraient résulter de l'accès ou de l'utilisation du Site ou des informations qui y figurent.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-[#fdfef6] pt-14 pb-10 border-b border-[#0a2e4a]/10" aria-labelledby="mentions-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-white border border-slate-200 text-[#0a2e4a] inline-flex items-center justify-center">
            <Scale className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 id="mentions-heading" className="text-4xl sm:text-5xl font-extrabold text-[#0a2e4a] leading-[1.05]">
            Mentions Légales
          </h1>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Transparence et conformité au cœur de notre réseau. Veuillez lire attentivement
            les conditions régissant l&apos;utilisation de la plateforme SAIEN.
          </p>
        </div>
      </section>

      <section className="bg-[#fdfef6] pb-14 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-xs text-slate-500 mb-5">Dernière mise à jour : 15 Avril 2026</p>

            <div className="space-y-8">
              {SECTIONS.map(({ id, icon: Icon, title, paragraphs }) => (
                <section key={id} className="border-t border-slate-100 pt-7 first:border-t-0 first:pt-0">
                  <h2 className="text-3xl font-bold text-[#0a2e4a] mb-4 inline-flex items-center gap-2.5">
                    <Icon className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                    <span className="text-2xl sm:text-3xl">{id}. {title}</span>
                  </h2>

                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-600">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {id === 1 && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-sm text-slate-600">
                      <p className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                        Siège social : 15 Avenue de l&apos;Innovation, 75013 Paris, France
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                        SIRET : 123 456 789 00012
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                        Email de contact : contact@saien.network
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                        Directeur de la publication : M. Jean Dupont, en qualité de Président.
                      </p>
                    </div>
                  )}

                  {id === 4 && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 space-y-2">
                      <p>Par voie électronique : dpo@saien.network</p>
                      <p>
                        Par courrier postal : SAIEN, À l&apos;attention du DPO, 15 Avenue de l&apos;Innovation,
                        75013 Paris.
                      </p>
                      <p>
                        Pour plus de détails sur la gestion de vos données, veuillez consulter notre
                        politique de confidentialité.
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Imprimer cette page
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a2e4a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0e6f5c] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour à l&apos;accueil
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
