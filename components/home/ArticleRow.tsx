import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ArticleRowProps {
  category: string;
  categoryColor: string;
  date: string;
  imageBg?: string;
  imageUrl?: string;
  title: string;
  description: string;
  href?: string;
}

export default function ArticleRow({
  category,
  categoryColor,
  date,
  imageBg,
  imageUrl,
  title,
  description,
  href = "/actualites",
}: ArticleRowProps) {
  return (
    <article className="group relative flex gap-4 sm:gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_10px_34px_-26px_rgba(10,37,64,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-22px_rgba(10,37,64,0.75)]">
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-brand-surface sm:h-24 sm:w-32">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div
            className={`h-full w-full ${imageBg ?? "bg-gradient-to-br from-slate-600 to-slate-900"}`}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-1 font-semibold ${categoryColor}`}>
            {category}
          </span>
          <span className="font-medium text-slate-400">{date}</span>
        </div>

        <h3 className="line-clamp-2 text-base font-extrabold leading-snug text-[#0A2540] sm:text-[1.35rem]">
          {title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {description}
        </p>

        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-hover"
        >
          Lire l&apos;article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
