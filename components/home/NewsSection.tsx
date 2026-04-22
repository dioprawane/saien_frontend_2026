"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Mail } from "lucide-react";
import ArticleRow from "./ArticleRow";

const ARTICLES = [
  {
    category: "Publication",
    categoryColor: "bg-blue-50 text-blue-600",
    date: "il y a 2 jours",
    imageBg: "bg-gradient-to-br from-teal-500 to-blue-700",
    title: "Rapport SAIEN 2024 : L'état de l'IA en Afrique francophone",
    description:
      "Notre dernière étude met en lumière les avancées majeures et les défis de l'écosystème IA sur le continent.",
  },
  {
    category: "Partenariat",
    categoryColor: "bg-amber-50 text-amber-600",
    date: "il y a 1 semaine",
    imageBg: "bg-gradient-to-br from-slate-600 to-slate-800",
    title: "Nouveau partenariat stratégique avec l'Institut de l'IA",
    description:
      "Cette collaboration permettra d'offrir des bourses de recherche aux membres de notre réseau.",
  },
  {
    category: "Technologie",
    categoryColor: "bg-purple-50 text-purple-600",
    date: "il y a 2 semaines",
    imageBg: "bg-gradient-to-br from-green-700 to-slate-900",
    title: "Lancement de la plateforme open-source SAIEN-Core",
    description:
      "Une suite d'outils développée par notre communauté pour faciliter le déploiement de modèles en production.",
  },
];

const OPPORTUNITIES = [
  {
    title: "Lead Data Scientist",
    company: "Fintech",
    location: "Montréal, Canada",
    tag: "Nouveau",
    tagColor: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Chercheur en NLP",
    company: "Lab IA",
    location: "Paris, France",
    tag: "il y a 3j",
    tagColor: "bg-slate-100 text-slate-500",
  },
  {
    title: "Appel à projets : IA & Santé",
    company: "Global",
    location: "Remote",
    tag: "Dans 6 jours",
    tagColor: "bg-orange-50 text-orange-600",
  },
];

export default function NewsSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">

          {/* ── Colonne principale : articles ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h2
                id="news-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900"
              >
                Dernières Actualités
              </h2>
              <Link
                href="/actualites"
                className="text-sm text-emerald-500 hover:text-emerald-600 font-medium transition-colors"
              >
                Tout voir
              </Link>
            </div>

            <div>
              {ARTICLES.map((article) => (
                <ArticleRow key={article.title} {...article} />
              ))}
            </div>
          </div>

          {/* ── Sidebar droite ── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 flex flex-col gap-6">

            {/* Opportunités */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Opportunités du réseau
                </h3>
              </div>

              <ul className="flex flex-col">
                {OPPORTUNITIES.map((opp) => (
                  <li
                    key={opp.title}
                    className="flex items-start justify-between gap-3 py-3 border-b border-slate-200 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 text-sm leading-snug">
                        {opp.title}
                        <span className="text-slate-400 font-normal">
                          {" "}· {opp.company}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                        {opp.location}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${opp.tagColor}`}
                    >
                      {opp.tag}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/offres"
                className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 py-2.5 rounded-xl transition-colors w-full"
              >
                Voir toutes les offres
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Restez connecté
                </h3>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Recevez notre veille technologique mensuelle et les actus du
                réseau.
              </p>
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Votre adresse email"
                  aria-label="Votre adresse email pour la newsletter"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-sm px-3 py-2.5 rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg"
                >
                  S&apos;abonner
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
