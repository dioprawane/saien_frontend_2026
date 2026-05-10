"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Mail } from "lucide-react";
import ArticleRow from "./ArticleRow";
import { listShowcaseArticles } from "@/lib/api/showcase";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { type Article } from "@/lib/articles-data";

const defaultCategoryColor = "bg-brand-green-soft text-brand-green-hover";

const toHomeArticleRow = (article: Article) => ({
  category: article.category,
  categoryColor: article.categoryColor || defaultCategoryColor,
  date: article.date,
  imageUrl: article.coverImage,
  title: article.title,
  description: article.excerpt,
  href: `/actualites/${article.slug}`,
});

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
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let isCancelled = false;

    async function loadArticles() {
      try {
        const remoteArticles = await listShowcaseArticles();
        if (!isCancelled) {
          setArticles(remoteArticles);
        }
      } catch {
        if (!isCancelled) {
          setArticles([]);
        }
      }
    }

    void loadArticles();

    return () => {
      isCancelled = true;
    };
  }, []);

  const displayedArticles = useMemo(
    () => articles.slice(0, 3).map(toHomeArticleRow),
    [articles],
  );

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
              {displayedArticles.length > 0 ? (
                displayedArticles.map((article) => (
                  <ArticleRow key={article.href} {...article} />
                ))
              ) : (
                <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                  Aucune actualite publiee pour le moment.
                </p>
              )}
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email.trim() || newsletterStatus === "loading") return;
                  setNewsletterStatus("loading");
                  setNewsletterMessage(null);
                  try {
                    const res = await subscribeToNewsletter(email.trim());
                    setNewsletterStatus("success");
                    setNewsletterMessage(res.message);
                    setEmail("");
                  } catch {
                    setNewsletterStatus("error");
                    setNewsletterMessage("Une erreur est survenue. Veuillez réessayer.");
                  }
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
                {newsletterMessage && (
                  <p className={`text-xs leading-relaxed ${newsletterStatus === "success" ? "text-green-300" : "text-red-300"}`}>
                    {newsletterMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="w-full rounded-lg bg-brand-green py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-green-hover disabled:opacity-70"
                >
                  {newsletterStatus === "loading" ? "Envoi..." : "S\u2019abonner"}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
