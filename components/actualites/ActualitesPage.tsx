"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Clock, ArrowRight } from "lucide-react";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/lib/articles-data";

const INITIAL_VISIBLE_ARTICLES = 4;
const LOAD_MORE_STEP = 4;

export default function ActualitesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [visibleArticles, setVisibleArticles] = useState(INITIAL_VISIBLE_ARTICLES);

  useEffect(() => {
    setVisibleArticles(INITIAL_VISIBLE_ARTICLES);
  }, [query, activeCategory]);

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
  const rest = filtered.filter((a) => !a.featured);
  const sourceArticles = activeCategory === "Toutes" && !query ? rest : filtered;
  const displayedArticles = sourceArticles.slice(0, visibleArticles);

  const openArticle = (slug: string) => {
    router.push(`/actualites/${slug}`);
  };

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
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-brand-green"
              aria-label="Rechercher un article"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {ARTICLE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-brand-green text-white"
                    : "bg-brand-surface text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article à la une */}
        {featured && activeCategory === "Toutes" && !query && (
          <div className="mb-10 bg-gradient-to-br from-brand-green-soft to-brand-green-soft rounded-2xl border border-brand-green-soft-strong p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
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
                href={`/actualites/${featured.slug}`}
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-full"
              >
                Lire l&apos;article
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative w-full sm:w-56 h-40 rounded-xl overflow-hidden border border-brand-green-soft-strong shrink-0">
              <Image
                src={featured.coverImage}
                alt={featured.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 224px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* Grille d'articles */}
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-16">
            Aucun article trouvé.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => openArticle(article.slug)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openArticle(article.slug);
                    }
                  }}
                  tabIndex={0}
                  role="link"
                  aria-label={`Lire l'article ${article.title}`}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer outline-none"
                >
                  <div className="relative h-40">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/65 via-[#0A2540]/5 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col gap-3 flex-1">
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

                    <Link
                      href={`/actualites/${article.slug}`}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-hover hover:text-brand-green-hover transition-colors"
                    >
                      Lire l&apos;article
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {visibleArticles < sourceArticles.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setVisibleArticles((current) => current + LOAD_MORE_STEP);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-green-soft-strong hover:text-brand-green-hover"
                >
                  Charger plus d&apos;articles
                </button>
              </div>
            )}
          </>
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
              className="flex-1 sm:w-60 px-4 py-2.5 text-sm rounded-full bg-white/10 text-white placeholder:text-slate-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green"
              aria-label="Adresse email pour la newsletter"
            />
            <button
              type="submit"
              className="bg-brand-green hover:bg-brand-green-hover transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-full shrink-0"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


