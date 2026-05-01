import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

interface InitiativeCardProps {
  badge: string;
  imageUrl: string;
  title: string;
  description: string;
  footer: ReactNode;
  href?: string;
}

export default function InitiativeCard({
  badge,
  imageUrl,
  title,
  description,
  footer,
  href = "#",
}: InitiativeCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_38px_-30px_rgba(15,23,42,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_42px_-30px_rgba(15,23,42,0.9)]">
      <div className="relative h-44 sm:h-[11.25rem]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-md border border-slate-200/80 bg-white/92 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#3f6585]">
          {badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[1.45rem] font-bold leading-snug text-[#1a3f63]">
          {title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            {footer}
          </div>
          <Link
            href={href}
            aria-label={`En savoir plus sur ${title}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green-hover transition-colors hover:bg-brand-green-soft-strong"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}


