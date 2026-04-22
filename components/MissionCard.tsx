import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface MissionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export default function MissionCard({
  icon: Icon,
  title,
  description,
  href = "#",
}: MissionCardProps) {
  return (
    <article className="relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all overflow-hidden group">
      {/* Décoration coin haut-droit */}
      <div
        className="absolute -top-8 -right-8 w-28 h-28 bg-slate-50 rounded-full group-hover:bg-emerald-50/50 transition-colors"
        aria-hidden="true"
      />

      {/* Icône */}
      <div className="relative w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-100 transition-colors flex items-center justify-center shrink-0">
        <Icon
          className="w-5 h-5 text-slate-600 group-hover:text-emerald-600 transition-colors"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-slate-900 text-base">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-emerald-500 text-sm font-medium group/link hover:gap-2 transition-all"
      >
        En savoir plus
        <ArrowRight
          className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
