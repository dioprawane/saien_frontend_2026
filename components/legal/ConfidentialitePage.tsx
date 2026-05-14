"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Check,
  CircleCheck,
  Clock4,
  Gavel,
  Lock,
  Shield,
  UserRound,
} from "lucide-react";

const SECTIONS = [
  { id: "donnees", label: "Données collectées" },
  { id: "finalite", label: "Finalité des traitements" },
  { id: "base-legale", label: "Base légale" },
  { id: "duree", label: "Durée de conservation" },
  { id: "droits", label: "Vos droits utilisateurs" },
  { id: "dpo", label: "Contact RGPD" },
];

const RETENTION_ROWS = [
  ["Données de compte", "Durée de la relation contractuelle + 3 ans"],
  ["Données de facturation", "10 ans (obligation légale comptable)"],
  ["Logs de connexion", "1 an maximum"],
  ["Données d'interaction IA", "Anonymisées après 6 mois"],
];

export default function ConfidentialitePage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <section className="bg-[#fdfef6] pt-14 pb-10 border-b border-[#0a2e4a]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-white border border-slate-200 text-[#0e6f5c] inline-flex items-center justify-center">
            <Lock className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a2e4a] leading-[1.05]">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-slate-500 max-w-3xl mx-auto leading-relaxed">
            SAIEN s&apos;engage à protéger vos données personnelles. Cette politique explique
            comment nous collectons, utilisons et protégeons vos informations dans le cadre
            de nos services d&apos;intelligence artificielle et de réseau.
          </p>
          <p className="mt-4 text-xs text-slate-400">Dernière mise à jour : 6 décembre 2025</p>
        </div>
      </section>

      <section className="bg-[#fdfef6] py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-8 items-start">
          <aside className="lg:sticky lg:top-24 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">Sommaire</p>
            <nav aria-label="Sommaire confidentialité" className="space-y-1">
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    activeId === id
                      ? "bg-[#0e6f5c]/10 text-[#0e6f5c] font-semibold"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <section id="donnees" className="border-b border-slate-100 pb-8">
              <h2 className="text-3xl font-bold text-[#0a2e4a] inline-flex items-center gap-2 mb-4">
                <BookOpenText className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                1. Données collectées
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Dans le cadre de l&apos;utilisation de la plateforme SAIEN, nous sommes amenés à collecter
                différentes catégories de données personnelles. Cette collecte se fait de manière
                transparente et limitée à ce qui est strictement nécessaire dans le cadre de nos activités
                de fédération des professionnels snégalais de l&apos;IA et de la data.
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-slate-600">
                {[
                  "Données d'identification : nom, prénom, adresse email, numéro de téléphone.",
                  "Données de connexion : des informations techniques (adresse IP, type de navigateur) peuvent apparaître dans les journaux serveur de manière automatique et transitoire, sans être stockées ni exploitées dans notre base de données.",
                  "Données professionnelles : formation, secteur d'activité, poste occupé.",
                  "Données de compte : identifiants de session chiffrés (JWT) nécessaires au maintien de votre connexion.",
                ].map((line) => (
                  <li key={line} className="inline-flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0e6f5c] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="finalite" className="border-b border-slate-100 py-8">
              <h2 className="text-3xl font-bold text-[#0a2e4a] inline-flex items-center gap-2 mb-4">
                <CircleCheck className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                2. Finalité des traitements
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Les données collectées par SAIEN sont utilisées pour des finalités explicites,
                légitimes et déterminées. Nous ne traitons pas vos données de manière incompatible
                avec ces finalités.
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-[#0a2e4a] mb-2">Principales finalités :</p>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li>Fédérer les membres et gérer les adhésions et cotisations</li>
                  <li>Organisation d&apos;événements, conférences, ateliers et formations</li>
                  <li>Communication institutionnelle et envoi de newsletters</li>
                  <li>Mentorat, accompagnement professionnel et académique</li>
                  <li>Sécurisation de la plateforme contre les accès non autorisés</li>
                </ul>
              </div>
            </section>

            <section id="base-legale" className="border-b border-slate-100 py-8">
              <h2 className="text-3xl font-bold text-[#0a2e4a] inline-flex items-center gap-2 mb-4">
                <Gavel className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                3. Base légale
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), chaque
                traitement effectué par SAIEN repose sur une base légale valide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <article className="rounded-xl border border-slate-200 p-3.5">
                  <p className="font-semibold text-[#0a2e4a]">Le Consentement</p>
                  <p className="mt-1 text-slate-500">Pour l&apos;envoi de newsletters, le dépôt de cookies analytiques et l&apos;utilisation de certaines fonctionnalités IA optionnelles.</p>
                </article>
                <article className="rounded-xl border border-slate-200 p-3.5">
                  <p className="font-semibold text-[#0a2e4a]">L&apos;Exécution du Contrat</p>
                  <p className="mt-1 text-slate-500">Pour la création de votre compte, la facturation et la fourniture des services souscrits.</p>
                </article>
                <article className="rounded-xl border border-slate-200 p-3.5">
                  <p className="font-semibold text-[#0a2e4a]">L&apos;Intérêt Légitime</p>
                  <p className="mt-1 text-slate-500">Pour la sécurité du réseau, la prévention de la fraude et l&apos;amélioration globale de nos services.</p>
                </article>
                <article className="rounded-xl border border-slate-200 p-3.5">
                  <p className="font-semibold text-[#0a2e4a]">Obligation Légale</p>
                  <p className="mt-1 text-slate-500">Pour la conservation des données de facturation et la réponse aux réquisitions judiciaires.</p>
                </article>
              </div>
            </section>

            <section id="duree" className="border-b border-slate-100 py-8">
              <h2 className="text-3xl font-bold text-[#0a2e4a] inline-flex items-center gap-2 mb-4">
                <Clock4 className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                4. Durée de conservation
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                SAIEN ne conserve vos données que le temps nécessaire aux opérations pour lesquelles
                elles ont été collectées, dans le respect de la législation en vigueur.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Catégorie de données</th>
                      <th className="text-left px-4 py-3 font-semibold">Durée de conservation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {RETENTION_ROWS.map(([category, duration]) => (
                      <tr key={category}>
                        <td className="px-4 py-3">{category}</td>
                        <td className="px-4 py-3">{duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="droits" className="py-8">
              <h2 className="text-3xl font-bold text-[#0a2e4a] inline-flex items-center gap-2 mb-4">
                <UserRound className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                5. Vos droits utilisateurs
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Vous disposez de droits stricts concernant vos données personnelles. Vous pouvez les
                exercer à tout moment en contactant notre Délégué à la Protection des Données (DPO).
              </p>

              <div className="space-y-3 text-sm">
                <article className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-[#0a2e4a] inline-flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                    Droit d&apos;accès et de rectification
                  </p>
                  <p className="mt-1 text-slate-500">Vous pouvez demander à consulter les données que nous détenons sur vous et exiger leur modification si elles sont inexactes.</p>
                </article>
                <article className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-[#0a2e4a] inline-flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                    Droit à l&apos;effacement (Droit à l&apos;oubli)
                  </p>
                  <p className="mt-1 text-slate-500">Vous pouvez demander la suppression de vos données personnelles, sous réserve de nos obligations légales de conservation.</p>
                </article>
                <article className="rounded-xl border border-slate-200 p-4">
                  <p className="font-semibold text-[#0a2e4a] inline-flex items-center gap-2">
                    <BookOpenText className="h-4 w-4 text-[#0e6f5c]" aria-hidden="true" />
                    Droit à la portabilité
                  </p>
                  <p className="mt-1 text-slate-500">Vous pouvez récupérer vos données dans un format structuré et lisible par machine pour les transmettre à un autre prestataire.</p>
                </article>
              </div>
            </section>

            <section id="dpo" className="rounded-2xl bg-[#0a2e4a] text-white p-5 sm:p-6 mt-2">
              <h2 className="text-2xl font-bold inline-flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#0e6f5c]" aria-hidden="true" />
                Contactez notre DPO
              </h2>
              <p className="mt-3 text-sm text-slate-200 max-w-2xl leading-relaxed">
                Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits,
                notre Délégué à la Protection des Données est à votre disposition.
              </p>

              <div className="mt-4 rounded-xl border border-white/20 bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-300">Email direct</p>
                  <p className="text-sm font-semibold">bureau@saien.org</p>
                  <p className="text-xs text-slate-300 mt-0.5">06000 Nice, France</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0e6f5c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0c5f50] transition-colors"
                >
                  Contacter le DPO
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
