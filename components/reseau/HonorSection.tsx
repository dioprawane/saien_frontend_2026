"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import type { ShowcaseNetworkMember } from "@/lib/api/showcase";

type HonorSectionProps = {
  members: ShowcaseNetworkMember[];
};

const TONES = [
  "from-cyan-400 to-blue-500",
  "from-brand-green to-brand-green-hover",
  "from-violet-400 to-purple-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-indigo-400 to-blue-600",
];

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function HonorSection({ members }: HonorSectionProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromScroll = () => {
    const rail = railRef.current;
    if (!rail) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - railCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const scrollCards = (direction: "left" | "right") => {
    if (!railRef.current) return;
    railRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bg-white py-20 lg:py-24"
      aria-labelledby="honor-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex w-10 h-10 rounded-full bg-brand-green-soft-strong items-center justify-center mb-4">
            <span className="text-brand-green text-lg" aria-hidden="true">
              ✦
            </span>
          </div>
          <h2
            id="honor-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#123a5f] mb-3"
          >
            Membres d&apos;Honneur
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Reconnaissance de nos membres ayant apporté une contribution
            exceptionnelle à l&apos;écosystème IA et à notre communauté.
          </p>
        </div>

        <div className="flex justify-end gap-2 mb-5">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors"
            aria-label="Défiler les membres d'honneur vers la gauche"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards("right")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors"
            aria-label="Défiler les membres d'honneur vers la droite"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={railRef}
            onScroll={updateActiveFromScroll}
            className="overflow-x-auto overflow-y-visible pt-3 pb-3 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-6 pl-3 pr-8">
              {members.map((member, index) => (
                <article
                  key={member.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  onClick={() => selectCard(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectCard(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={activeIndex === index}
                  className={`snap-center min-w-[300px] max-w-[300px] rounded-2xl border p-6 text-center flex flex-col items-center gap-4 transition-all duration-300 cursor-pointer outline-none ${
                    activeIndex === index
                      ? "border-brand-green-soft-strong ring-2 ring-brand-green-soft-strong bg-white -translate-y-1 shadow-[0_24px_44px_-26px_rgba(16,185,129,0.45)]"
                      : "border-slate-200 bg-brand-surface hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-30px_rgba(15,23,42,0.65)]"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${TONES[index % TONES.length]} flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden`}>
                    {member.avatarUrl && !member.avatarUrl.includes("avatar-1.png") ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getInitials(member.fullName)
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-[#123a5f] text-sm">{member.fullName}</p>
                    <p className="text-brand-green-hover text-xs font-semibold mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>

                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="mt-auto inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors text-slate-600 text-xs font-medium px-4 py-2 rounded-full"
                    >
                      <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                      Voir le profil
                    </a>
                  ) : (
                    <span className="mt-auto inline-flex items-center gap-1.5 border border-slate-200 bg-white text-slate-400 text-xs font-medium px-4 py-2 rounded-full">
                      Profil indisponible
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>

          {members.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-brand-surface px-5 py-10 text-center text-sm text-slate-500">
              Aucun membre d'honneur n'est disponible pour le moment.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


