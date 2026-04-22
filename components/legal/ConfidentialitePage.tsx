"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Shield, Check, ArrowRight } from "lucide-react";

const SECTIONS = [
  {
    id: "donnees",
    title: "Données collectées",
    content: (
      <>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          Nous collectons uniquement les données nécessaires à la fourniture de
          nos services et à l&apos;amélioration de votre expérience.
        </p>
        <ul className="flex flex-col gap-2">
          {[
            "Données d'identité (nom, prénom, email)",
            "Données professionnelles (entreprise, poste, domaine)",
            "Données de paiement (traitées via prestataire certifié PCI-DSS)",
            "Données de navigation (cookies, adresse IP anonymisée)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "finalite",
    title: "Finalité des traitements",
    content: (
      <>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          Vos données sont traitées pour les finalités suivantes&nbsp;:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1.5 text-sm text-slate-600">
          <li>Gestion de votre espace membre et de votre adhésion</li>
          <li>Communication sur les événements et actualités SAIEN</li>
          <li>Amélioration des services et fonctionnalités de la plateforme</li>
          <li>Facturation et suivi des cotisations</li>
          <li>Respect de nos obligations légales et réglementaires</li>
        </ul>
      </>
    ),
  },
  {
    id: "base-legale",
    title: "Base légale",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            label: "Consentement",
            desc: "Pour les cookies non essentiels et les communications marketing.",
            color: "bg-emerald-50 border-emerald-100",
            labelColor: "text-emerald-700",
          },
          {
            label: "Exécution Contrat",
            desc: "Pour la gestion de l'adhésion et des services membres.",
            color: "bg-blue-50 border-blue-100",
            labelColor: "text-blue-700",
          },
          {
            label: "Intérêt Légitime",
            desc: "Pour l'amélioration de nos services et la sécurité du site.",
            color: "bg-purple-50 border-purple-100",
            labelColor: "text-purple-700",
          },
          {
            label: "Obligation Légale",
            desc: "Pour la conservation des données de facturation.",
            color: "bg-orange-50 border-orange-100",
            labelColor: "text-orange-700",
          },
        ].map(({ label, desc, color, labelColor }) => (
          <div key={label} className={`rounded-xl border p-4 ${color}`}>
            <p className={`text-xs font-bold mb-1 ${labelColor}`}>{label}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "duree",
    title: "Durée de conservation",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 pr-4 font-semibold text-slate-700">
                Catégorie
              </th>
              <th className="text-left py-2 font-semibold text-slate-700">
                Durée
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              ["Données de compte", "Durée de l'adhésion + 3 ans"],
              ["Données de facturation", "10 ans (obligation légale)"],
              ["Logs de connexion", "12 mois"],
              ["Interactions avec l'IA", "6 mois"],
            ].map(([cat, dur]) => (
              <tr key={cat}>
                <td className="py-2.5 pr-4 text-slate-600">{cat}</td>
                <td className="py-2.5 text-slate-500">{dur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "droits",
    title: "Vos droits utilisateurs",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-slate-500 leading-relaxed">
          Conformément au RGPD, vous disposez des droits suivants&nbsp;:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: "Accès & Rectification",
              desc: "Obtenez une copie de vos données et signalez toute inexactitude.",
            },
            {
              title: "Effacement & Oubli",
              desc: "Demandez la suppression de vos données dans les cas prévus par la loi.",
            },
            {
              title: "Portabilité",
              desc: "Recevez vos données dans un format structuré et lisible par machine.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-bold text-slate-800 mb-1.5">{title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

const NAV_ITEMS = [
  { id: "donnees", label: "Données collectées" },
  { id: "finalite", label: "Finalité" },
  { id: "base-legale", label: "Base légale" },
  { id: "duree", label: "Durée conservation" },
  { id: "droits", label: "Droits utilisateurs" },
  { id: "dpo", label: "Contact RGPD" },
];

export default function ConfidentialitePage() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
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

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-emerald-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
            Politique de confidentialité
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-2">
            Nous nous engageons à protéger vos données personnelles conformément
            au RGPD.
          </p>
          <span className="text-xs text-slate-400">
            Dernière mise à jour : 15 Avril 2026
          </span>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start">
            {/* Sidebar sticky */}
            <nav
              aria-label="Sommaire"
              className="hidden lg:flex flex-col gap-1 sticky top-24"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
                Sommaire
              </p>
              {NAV_ITEMS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`text-sm px-3 py-2 rounded-xl transition-all ${
                    activeId === id
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Sections */}
            <div className="flex flex-col gap-8">
              {SECTIONS.map(({ id, title, content }) => (
                <div
                  key={id}
                  id={id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7"
                >
                  <h2 className="font-bold text-slate-900 text-base mb-5">
                    {title}
                  </h2>
                  {content}
                </div>
              ))}

              {/* CTA DPO */}
              <div
                id="dpo"
                className="bg-[#0b1825] rounded-2xl p-7 sm:p-9 text-white"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-base">
                      Contactez notre DPO
                    </h2>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                      Pour toute question relative à vos données personnelles ou
                      pour exercer vos droits, contactez notre Délégué à la
                      Protection des Données.
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:dpo@saien.com"
                  className="block text-emerald-400 text-sm font-medium mb-6 hover:text-emerald-300 transition-colors"
                >
                  dpo@saien.com
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors"
                >
                  Contacter le DPO
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
