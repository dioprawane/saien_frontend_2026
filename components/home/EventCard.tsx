import { Clock, type LucideIcon } from "lucide-react";

interface EventCardProps {
  day: string;
  month: string;
  imageBg: string;
  category: string;
  CategoryIcon: LucideIcon;
  title: string;
  description: string;
  time: string;
}

export default function EventCard({
  day,
  month,
  imageBg,
  category,
  CategoryIcon,
  title,
  description,
  time,
}: EventCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all flex flex-col">
      {/* Image */}
      <div className={`relative h-44 sm:h-48 shrink-0 ${imageBg}`}>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          aria-hidden="true"
        />
        {/* Badge date */}
        <div className="absolute top-3 left-3 bg-red-500 text-white rounded-xl px-2.5 py-1.5 text-center min-w-[3.5rem]">
          <div className="text-lg font-bold leading-none">{day}</div>
          <div className="text-[9px] font-semibold uppercase tracking-wider mt-0.5">
            {month}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
          <CategoryIcon className="w-3 h-3" aria-hidden="true" />
          {category}
        </span>

        <h3 className="font-bold text-slate-900 text-base leading-snug">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex items-center gap-1.5 text-slate-400 text-xs pt-2 border-t border-slate-100">
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {time}
        </div>
      </div>
    </article>
  );
}
