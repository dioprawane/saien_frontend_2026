import { Clock, MapPin, Tag, type LucideIcon } from "lucide-react";

interface Speaker {
  name: string;
  initials: string;
}

interface EventCardProps {
  dateBadge: string;
  imageUrl: string;
  format: string;
  type?: string;
  CategoryIcon: LucideIcon;
  chronologyLabel: string;
  chronologyClassName: string;
  title: string;
  description: string;
  time: string;
  location: string;
  speakers?: Speaker[];
}

export default function EventCard({
  dateBadge,
  imageUrl,
  format,
  type,
  CategoryIcon,
  chronologyLabel,
  chronologyClassName,
  title,
  description,
  time,
  location,
  speakers,
}: EventCardProps) {
  return (
    <article className="h-full bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 shrink-0 bg-brand-surface">
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

      {/* Contenu — hauteur fixe pour uniformiser les cartes */}
      <div className="p-5 flex flex-col gap-3 flex-1 h-[260px]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1.5 text-brand-green text-xs font-semibold">
            <CategoryIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{format}</span>
            {type ? (
              <>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-slate-500 truncate">
                  <Tag className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{type}</span>
                </span>
              </>
            ) : null}
          </span>
          <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${chronologyClassName}`}>
            {chronologyLabel}
          </span>
        </div>

        <h3 className="line-clamp-2 font-bold text-[#0A2540] text-lg leading-snug">
          {title}
        </h3>

        {speakers && speakers.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {speakers.slice(0, 3).map((speaker, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-[#0A2540]/5 px-2.5 py-1 text-[11px] font-semibold text-[#0A2540]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0A2540] to-[#0d3a60] text-[9px] font-black text-white">
                  {speaker.initials || speaker.name.slice(0, 2).toUpperCase()}
                </span>
                {speaker.name}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 text-slate-400 text-xs font-medium pt-2 border-t border-slate-100">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{time}</span>
          </span>
          {location ? (
            <span className="inline-flex min-w-0 items-center gap-1.5 text-right">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{location}</span>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
