import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface InitiativeCardProps {
  badge: string;
  imageBg: string;
  title: string;
  description: string;
  footer: ReactNode;
  href?: string;
}

export default function InitiativeCard({
  badge,
  imageBg,
  title,
  description,
  footer,
  href = "#",
}: InitiativeCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all">
      {/* Image */}
      <div className={`relative h-44 sm:h-48 ${imageBg}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 inline-flex items-center bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {badge}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-bold text-slate-900 text-base leading-snug">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
          <div className="text-slate-500 text-xs font-medium flex items-center gap-1.5">
            {footer}
          </div>
          <Link
            href={href}
            aria-label={`En savoir plus sur ${title}`}
            className="w-7 h-7 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-full flex items-center justify-center shrink-0"
          >
            <ArrowRight className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
