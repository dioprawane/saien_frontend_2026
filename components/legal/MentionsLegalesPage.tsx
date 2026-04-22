"use client";

import Link from "next/link";
import {
  Scale,
  Building2,
  Server,
  PenTool,
  ShieldCheck,
  Cookie,
  AlertCircle,
  Printer,
  ArrowLeft,
} from "lucide-react";

const SECTIONS = [
  {
    n: 1,
    icon: Building2,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    title: "Informations de l'Éditeur",
    content: (
      <ul className="text-sm text-slate-500 space-y-1 leading-relaxed">
        <li>
          <strong className="text-slate-700">Nom :</strong> SAIEN — Société de
          l&apos;Intelligence Artificielle et le Numérique
        </li>
        <li>
          <strong className="text-slate-700">Siège :</strong> 15 Avenue Innovation,
          75013 Paris, France
        </li>
        <li>
          <strong className="text-slate-700">SIRET :</strong> 123 456 789 00012
        </li>
        <li>
          <strong className="text-slate-700">Email :</strong>{" "}
          <a href="mailto:contact@saien.network" className="hover:text-emerald-600 underline">
            contact@saien.network
          </a>
        </li>
        <li>
          <strong className="text-slate-700">Directeur de publication :</strong>{" "}
          Jean Dupont
        </li>
      </ul>
    ),
  },
  {
    n: 2,
    icon: Server,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    title: "Hébergement du Site",
    content: (
      <ul className="text-sm text-slate-500 space-y-1 leading-relaxed">
        <li>
          <strong className="text-slate-700">Hébergeur :</strong> CloudTech Solutions
          SAS
        </li>
        <li>
          <strong className="text-slate-700">Adresse :</strong> 42 Rue du Serveur,
          69001 Lyon, France
        </li>
      </ul>
    ),
  },
  {
    n: 3,
    icon: PenTool,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    title: "Propriété Intellectuelle",
    content: (
      <p className="text-sm text-slate-500 leading-relaxed">
        L&apos;ensemble des contenus présents sur ce site (textes, images,
        graphismes, logos) est la propriété exclusive de SAIEN ou de ses
        partenaires. Toute reproduction, distribution ou utilisation sans
        autorisation préalable écrite est strictement interdite.
      </p>
    ),
  },
  {
    n: 4,
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    title: "Protection des Données Personnelles (RGPD)",
    content: (
      <p className="text-sm text-slate-500 leading-relaxed">
        Conformément au Règlement Général sur la Protection des Données
        (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et
        de suppression de vos données personnelles. Pour exercer ces droits,
        contactez notre DPO à{" "}
        <a href="mailto:dpo@saien.network" className="underline hover:text-emerald-600">
          dpo@saien.network
        </a>
        .
      </p>
    ),
  },
  {
    n: 5,
    icon: Cookie,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
    title: "Gestion des Cookies",
    content: (
      <p className="text-sm text-slate-500 leading-relaxed">
        Ce site utilise des cookies essentiels au bon fonctionnement des
        services et des cookies analytiques anonymisés. Vous pouvez gérer vos
        préférences à tout moment via les paramètres de votre navigateur.
      </p>
    ),
  },
  {
    n: 6,
    icon: AlertCircle,
    iconColor: "text-red-400",
    iconBg: "bg-red-50",
    title: "Limitation de Responsabilité",
    content: (
      <p className="text-sm text-slate-500 leading-relaxed">
        SAIEN s&apos;efforce de maintenir les informations publiées à jour.
        Cependant, l&apos;association ne saurait être tenue responsable des
        erreurs ou omissions, ni des dommages découlant de l&apos;utilisation
        du site.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white pt-16 pb-12" aria-labelledby="mentions-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
            <Scale className="w-7 h-7 text-emerald-500" aria-hidden="true" />
          </div>
          <h1
            id="mentions-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight"
          >
            Mentions Légales
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Transparence et conformité légale pour l&apos;ensemble de nos
            services numériques.
          </p>
        </div>
      </section>

      {/* Carte principale */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* En-tête date */}
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex items-center gap-2 text-xs text-slate-500">
              <Scale className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Dernière mise à jour : 15 Avril 2026</span>
            </div>

            <div className="flex flex-col divide-y divide-slate-50 px-6 sm:px-8">
              {SECTIONS.map(({ n, icon: Icon, iconColor, iconBg, title, content }) => (
                <div key={n} className="py-7 flex gap-5">
                  <div
                    className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-slate-400">
                        {String(n).padStart(2, "0")}
                      </span>
                      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
                    </div>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons bas */}
            <div className="border-t border-slate-100 px-6 sm:px-8 py-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:border-slate-400 text-sm font-medium transition-colors"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Imprimer cette page
              </button>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
