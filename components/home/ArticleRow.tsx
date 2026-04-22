import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ArticleRowProps {
  category: string;
  categoryColor: string;
  date: string;
  imageBg: string;
  title: string;
  description: string;
  href?: string;
}

export default function ArticleRow({
  category,
  categoryColor,
  date,
  imageBg,
  title,
  description,
  href = "#",
}: ArticleRowProps) {
  return (
    <article className="flex gap-4 py-5 border-b border-slate-100 last:border-0">
      {/* Vignette */}
      <div
        className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${imageBg}`}
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor}`}
          >
            {category}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>

        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="hidden sm:block text-slate-500 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-emerald-500 hover:text-emerald-600 transition-colors text-xs sm:text-sm font-medium mt-auto"
        >
          Lire l&apos;article
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
