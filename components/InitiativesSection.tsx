import Link from "next/link";
import { Building2 } from "lucide-react";
import InitiativeCard from "@/components/InitiativeCard";
import { PROJECTS, type ProjectData } from "@/lib/projects-data";

const INITIATIVES = PROJECTS.filter((project) => project.featuredOnVision);

function renderProjectFooter(project: ProjectData) {
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

  if (project.footerType === "status") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-brand-green-soft text-brand-green-hover px-2.5 py-1 rounded-md text-[11px] font-semibold">
        <span
          className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse"
          aria-hidden="true"
        />
        {project.footerValue}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5">
      <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      {project.footerValue}
    </span>
  );
}

export default function InitiativesSection() {
  return (
    <section
      id="initiatives"
      className="bg-brand-surface py-16 lg:py-24"
      aria-labelledby="initiatives-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div className="max-w-lg">
            <h2
              id="initiatives-heading"
              className="text-3xl sm:text-[2.2rem] font-extrabold text-[#163a5a] mb-2"
            >
              Initiatives Stratégiques
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Découvrez les projets concrets que nous déployons pour transformer
              notre vision en réalité sur le terrain.
            </p>
          </div>
          <Link
            href="/projets"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#3f6585] bg-white border border-slate-200 hover:bg-brand-surface transition-colors px-5 py-2.5 rounded-xl"
          >
            Voir tous les projets
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIATIVES.map((initiative) => (
            <InitiativeCard
              key={initiative.slug}
              badge={initiative.badge}
              imageUrl={initiative.imageUrl}
              title={initiative.title}
              description={initiative.description}
              footer={renderProjectFooter(initiative)}
              href={`/projets/${initiative.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


