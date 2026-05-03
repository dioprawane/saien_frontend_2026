import type { Metadata } from "next";
import { Building2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativeCard from "@/components/InitiativeCard";
import { PROJECTS, type ProjectData } from "@/lib/projects-data";

export const metadata: Metadata = {
  title: "Tous les Projets — SAIEN",
  description:
    "Découvrez l'ensemble des projets SAIEN déployés pour transformer la vision IA en réalisations concrètes.",
};

function renderProjectFooter(project: ProjectData) {
  if (project.footerType === "registrations") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
        <Users className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
        {project.footerValue}
      </span>
    );
  }

  if (project.footerType === "mentors") {
    return (
      <div className="flex items-center gap-2">
        <span className="flex -space-x-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-green text-[9px] font-bold text-white">
            AD
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-sky-500 text-[9px] font-bold text-white">
            FM
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-violet-500 text-[9px] font-bold text-white">
            MK
          </span>
        </span>
        <span className="text-slate-500">{project.footerValue}</span>
      </div>
    );
  }

  return (
    <span className="flex items-center gap-1.5">
      <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {project.footerValue}
    </span>
  );
}

export default function ProjetsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-brand-surface min-h-screen">
        <section className="py-14 lg:py-20" aria-labelledby="projects-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 lg:mb-12">
              <h1
                id="projects-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] leading-tight"
              >
                Tous les projets SAIEN
              </h1>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Une vue complète de nos initiatives en formation, recherche,
                gouvernance et innovation appliquée.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <InitiativeCard
                  key={project.slug}
                  badge={project.badge}
                  imageUrl={project.imageUrl}
                  title={project.title}
                  description={project.description}
                  footer={renderProjectFooter(project)}
                  href={`/projets/${project.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


