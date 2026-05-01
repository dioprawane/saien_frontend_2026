import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, UserRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleImageGallery from "@/components/actualites/ArticleImageGallery";
import { ARTICLES, getArticleBySlug } from "@/lib/articles-data";

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable — SAIEN" };
  }

  return {
    title: `${article.title} — Actualités SAIEN`,
    description: article.excerpt,
  };
}

export default async function ActualiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <header className="relative h-[360px] sm:h-[420px] overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/92 via-[#0A2540]/60 to-[#0A2540]/25" />

          <div className="absolute inset-x-0 top-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Retour aux actualités
            </Link>
          </div>

          <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <span
              className={`inline-flex items-center text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-3 ${article.categoryColor} bg-white/95`}
            >
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white max-w-4xl leading-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-white/90 max-w-3xl leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </header>

        <section className="py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10">
              <article className="space-y-8">
                {article.sections.map((section, sectionIndex) => (
                  <section
                    key={section.heading}
                    className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-sm"
                  >
                    <h2 className="text-xl font-bold text-[#0A2540] mb-4">
                      {section.heading}
                    </h2>

                    <div className="space-y-4 mb-6">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-slate-600 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.images && section.images.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-500 mb-3">
                          Galerie
                        </h3>
                        <ArticleImageGallery
                          images={section.images}
                          galleryId={`${article.slug}-${sectionIndex}`}
                        />
                      </div>
                    )}

                    {section.videos && section.videos.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-500 mb-3">
                          Vidéos
                        </h3>
                        <div className="space-y-5">
                          {section.videos.map((video) => (
                            <figure key={`${section.heading}-${video.youtubeId}`}>
                              <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 bg-brand-surface">
                                <iframe
                                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                                  title={video.title}
                                  className="h-full w-full"
                                  loading="lazy"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  referrerPolicy="strict-origin-when-cross-origin"
                                  allowFullScreen
                                />
                              </div>
                              <figcaption className="mt-2 text-sm text-slate-700 font-medium">
                                {video.title}
                              </figcaption>
                              {video.caption && (
                                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                                  {video.caption}
                                </p>
                              )}
                            </figure>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </article>

              <aside className="space-y-6 h-max lg:sticky lg:top-24">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                    Informations article
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <UserRound className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {article.author}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {article.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {article.readTime} de lecture
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A2540] rounded-2xl p-6 text-white">
                  <p className="text-sm text-white/80 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-white/10 border border-white/20 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

