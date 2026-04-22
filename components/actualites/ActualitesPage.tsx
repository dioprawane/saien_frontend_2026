"use client";

import { useState } from "react";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

interface Article {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "Intelligence Artificielle",
    categoryColor: "bg-blue-50 text-blue-600",
    title: "L'IA générative au service du développement africain",
    excerpt:
      "Comment les modèles de langage à grande échelle transforment les secteurs de la santé, de l'agriculture et de l'éducation sur le continent.",
    author: "Amadou Diallo",
    date: "15 oct. 2024",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    category: "Réseau & Communauté",
    categoryColor: "bg-emerald-50 text-emerald-600",
    title: "Retour sur le Sommet Africain de l'IA 2024",
    excerpt:
      "Plus de 500 participants réunis à Dakar pour trois jours d'échanges intenses. Découvrez les temps forts et les engagements pris.",
    author: "Fatou Sow",
    date: "10 oct. 2024",
    readTime: "5 min",
  },
  {
    id: 3,
    category: "Data Science",
    categoryColor: "bg-purple-50 text-purple-600",
    title: "Benchmark des LLMs open-source pour les langues africaines",
    excerpt:
      "Une étude comparative approfondie sur les performances des principaux modèles open-source appliqués au wolof, swahili et amharique.",
    author: "Jean-Marc Kone",
    date: "02 oct. 2024",
    readTime: "12 min",
  },
  {
    id: 4,
    category: "Innovation",
    categoryColor: "bg-orange-50 text-orange-600",
    title: "SAIEN lance son programme de mentorat 2025",
    excerpt:
      "Vingt experts seniors accompagneront les talents de la diaspora sur des projets concrets en machine learning et MLOps.",
    author: "Awa Ndiaye",
    date: "25 sept. 2024",
    readTime: "4 min",
  },
  {
    id: 5,
    category: "Intelligence Artificielle",
    categoryColor: "bg-blue-50 text-blue-600",
    title: "Régulation de l'IA en Afrique : état des lieux 2024",
    excerpt:
      "Tour d'horizon des initiatives législatives en cours au Sénégal, Rwanda, Kenya et Côte d'Ivoire pour encadrer l'essor de l'IA.",
    author: "Prof. Marie Desroches",
    date: "18 sept. 2024",
    readTime: "10 min",
  },
  {
    id: 6,
    category: "Tutoriel",
    categoryColor: "bg-teal-50 text-teal-600",
    title: "Fine-tuner un LLM avec des données en français : guide pratique",
    excerpt:
      "De la préparation du dataset au déploiement sur Hugging Face, un guide pas-à-pas pour adapter un modèle à votre domaine.",
    author: "Thomas Laurent",
    date: "10 sept. 2024",
    readTime: "15 min",
  },
  {
    id: 7,
    category: "Réseau & Communauté",
    categoryColor: "bg-emerald-50 text-emerald-600",
    title: "Témoignage : comment SAIEN a changé ma carrière",
    excerpt:
      "Sarah Benali revient sur son parcours au sein du réseau, de membre junior à directrice innovation dans une scale-up genevoise.",
    author: "Sarah Benali",
    date: "01 sept. 2024",
    readTime: "6 min",
  },
];

const CATEGORIES = [
  "Toutes",
  "Intelligence Artificielle",
  "Data Science",
  "Réseau & Communauté",
  "Innovation",
  "Tutoriel",
];

export default function ActualitesPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const filtered = ARTICLES.filter((a) => {
    const matchCat =
      activeCategory === "Toutes" || a.category === activeCategory;
    const matchSearch =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured || activeCategory !== "Toutes" || query);

  return (
    <section className="bg-white py-12 lg:py-16" aria-labelledby="actu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-10">
          <h1
            id="actu-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          >
            Actualités
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Articles, analyses et retours d&apos;expérience de la communauté
            SAIEN.
          </p>
        </div>

        {/* Barre de recherche + filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Rechercher un article..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Rechercher un article"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article à la une */}
        {featured && activeCategory === "Toutes" && !query && (
          <div className="mb-10 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <span
                className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3 ${featured.categoryColor}`}
              >
                {featured.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {featured.readTime}
                </span>
              </div>
              <Link
                href={`/actualites/${featured.id}`}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-full"
              >
                Lire l&apos;article
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="w-full sm:w-48 h-36 rounded-xl bg-gradient-to-br from-emerald-200 to-teal-300 shrink-0 flex items-center justify-center">
              <Tag className="w-10 h-10 text-white opacity-40" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Grille d'articles */}
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-16">
            Aucun article trouvé.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "Toutes" && !query ? rest : filtered).map(
              (article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span
                    className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full ${article.categoryColor}`}
                  >
                    {article.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-auto pt-2 border-t border-slate-50">
                    <span className="font-medium text-slate-600">
                      {article.author}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {article.readTime}
                    </span>
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-[#0b1825] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Restez informé
            </p>
            <p className="text-slate-400 text-sm">
              Recevez les dernières actualités SAIEN directement dans votre boîte mail.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full sm:w-auto"
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 sm:w-60 px-4 py-2.5 text-sm rounded-full bg-white/10 text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Adresse email pour la newsletter"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full shrink-0"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
