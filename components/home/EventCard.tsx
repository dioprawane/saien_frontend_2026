import { Clock, type LucideIcon } from "lucide-react";
import Image from "next/image";

interface EventCardProps {
  dateBadge: string;
  imageUrl: string;
  category: string;
  CategoryIcon: LucideIcon;
  title: string;
  description: string;
  time: string;
}

export default function EventCard({
  dateBadge,
  imageUrl,
  category,
  CategoryIcon,
  title,
  description,
  time,
}: EventCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 sm:h-52 shrink-0 bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Badge date */}
        <div className="absolute top-4 left-4 bg-white text-slate-800 rounded-full px-3 py-1 text-sm font-bold shadow-sm">
          {dateBadge}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <span className="flex items-center gap-1.5 text-emerald-500 text-xs font-semibold">
          <CategoryIcon className="w-4 h-4" aria-hidden="true" />
          {category}
        </span>

        <h3 className="font-bold text-[#0A2540] text-xl leading-snug">
          {title}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium pt-2">
          <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
          {time}
        </div>
      </div>
    </article>
  );
}
