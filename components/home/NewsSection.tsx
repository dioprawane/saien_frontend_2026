"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Mail } from "lucide-react";
import ArticleRow from "./ArticleRow";

const ARTICLES = [
  {
    category: "Publication",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "il y a 2 jours",
    imageUrl: "/event-1.png",
    title: "Rapport SAIEN 2024 : L'état de l'IA en Afrique francophone",
    description:
      "Notre dernière étude met en lumière les avancées majeures et les défis de l'écosystème IA sur le continent.",
    href: "/actualites",
  },
  {
    category: "Partenariat",
    categoryColor: "bg-amber-100 text-amber-700",
    date: "il y a 1 semaine",
    imageUrl: "/event-2.png",
    title: "Nouveau partenariat stratégique avec l'Institut de l'IA",
    description:
      "Cette collaboration permettra d'offrir des bourses de recherche aux membres de notre réseau.",
    href: "/actualites",
  },
  {
    category: "Technologie",
    categoryColor: "bg-brand-green-soft text-brand-green-hover",
    date: "il y a 2 semaines",
    imageUrl: "/event-3.png",
    title: "Lancement de la plateforme open-source SAIEN-Core",
    description:
      "Une suite d'outils développée par notre communauté pour faciliter le déploiement de modèles en production.",
    href: "/actualites",
  },
];

const OPPORTUNITIES = [
  {
    title: "Lead Data Scientist",
    company: "Fintech",
    location: "Montréal, Canada",
    tag: "Nouveau",
    tagColor: "text-slate-400",
  },
  {
    title: "Chercheur en NLP",
    company: "Lab IA",
    location: "Paris, France",
    tag: "il y a 3j",
    tagColor: "text-slate-400",
  },
  {
    title: "Appel à projets : IA & Santé",
    company: "Global",
    location: "Remote",
    tag: "Clôture bientôt",
    tagColor: "text-brand-green-hover",
  },
];

export default function NewsSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      className="border-y border-slate-200/70 bg-brand-surface py-16 lg:py-20"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-10">
          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-300/70 pb-4">
              <h2
                id="news-heading"
                className="text-3xl font-black tracking-tight text-[#0A2540] sm:text-4xl"
              >
                Dernières Actualités
              </h2>
              <Link
                href="/actualites"
                className="shrink-0 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-700"
              >
                Tout voir
              </Link>
            </div>

            <div className="space-y-4">
              {ARTICLES.map((article) => (
                <ArticleRow key={article.title} {...article} />
              ))}
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_42px_-30px_rgba(10,37,64,0.95)] sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-brand-green-hover" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[#0A2540]">
                  Opportunités du réseau
                </h3>
              </div>

              <ul className="flex flex-col">
                {OPPORTUNITIES.map((opp) => (
                  <li
                    key={opp.title}
                    className="flex items-start justify-between gap-4 border-b border-slate-200 py-3.5 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug text-[#0A2540]">
                        {opp.title}
                        <span className="font-medium text-slate-500">
                          {" "}· {opp.company}
                        </span>
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                        {opp.location}
                      </p>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold whitespace-nowrap ${opp.tagColor}`}>
                      {opp.tag}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/reseau"
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-surface py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-brand-green-soft"
              >
                Voir toutes les offres
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-2xl border border-[#0A3458] bg-[#0A3458] p-5 text-white shadow-[0_20px_45px_-26px_rgba(10,52,88,0.9)] sm:p-6">
              <div className="mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-green-soft-strong" aria-hidden="true" />
                <h3 className="text-xl font-bold">Restez connecté</h3>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-200">
                Recevez notre veille technologique mensuelle et les actus du réseau.
              </p>

              <form
                className="flex flex-col gap-2.5"
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
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-slate-300 focus:border-brand-green focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-green py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green-hover"
                >
                  S&apos;abonner
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
