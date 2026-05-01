import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Target, BriefcaseBusiness } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PROJECTS } from "@/lib/projects-data";

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Projet introuvable — SAIEN" };
  }

  return {
    title: `${project.title} — SAIEN`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <div className="relative h-[360px] sm:h-[420px] overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/92 via-[#0A2540]/55 to-transparent" />

          <div className="absolute inset-x-0 top-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Retour aux projets
            </Link>
          </div>

          <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <span className="inline-flex items-center bg-white/90 text-[#0A2540] text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-3">
              {project.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white max-w-3xl leading-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-white/90 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <section className="py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-10">
              <div className="space-y-8">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-3">
                    Présentation du projet
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{project.fullDescription}</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-4">
                    Objectifs
                  </h2>
                  <ul className="space-y-3">
                    {project.objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-3 text-slate-600">
                        <Target className="w-5 h-5 text-brand-green mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-[#0A2540] mb-4">
                    Résultats et livrables
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.outcomes.map((outcome) => (
                      <div
                        key={outcome}
                        className="rounded-xl border border-slate-100 bg-brand-surface p-4 text-sm text-slate-700"
                      >
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="space-y-6 h-max lg:sticky lg:top-24">
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-4">Informations clés</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {project.period}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {project.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <BriefcaseBusiness className="w-4 h-4 text-brand-green shrink-0" aria-hidden="true" />
                      {project.lead}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A2540] rounded-2xl p-6 text-white">
                  <p className="text-sm text-white/80 mb-4">
                    Vous souhaitez contribuer à ce projet ?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full rounded-xl bg-brand-green hover:bg-brand-green-hover transition-colors font-semibold py-3"
                  >
                    Contacter l'équipe projet
                  </Link>
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

