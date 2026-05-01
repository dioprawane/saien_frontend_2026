"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

const HONOR_MEMBERS = [
  {
    name: "Prof. Marie Desroches",
    title: "Pionnière en IA Éthique",
    bio: "Professeure émérite, ses travaux ont façonné les régulations européennes sur l'intelligence artificielle responsable.",
    initials: "MD",
    tone: "from-cyan-400 to-blue-500",
  },
  {
    name: "Dr. Jean Dupont",
    title: "Fondateur de TechForGood",
    bio: "A créé de multiples initiatives utilisant le Deep Learning pour résoudre des défis environnementaux majeurs.",
    initials: "JD",
    tone: "from-brand-green to-brand-green-hover",
  },
  {
    name: "Elena Rostova",
    title: "Auteure & Visionnaire",
    bio: "Conférencière internationale et auteure de best-sellers sur l'impact sociétal de l'automatisation cognitive.",
    initials: "ER",
    tone: "from-violet-400 to-purple-500",
  },
  {
    name: "Pr. Mamadou Sarr",
    title: "Chercheur IA Médicale",
    bio: "Ses contributions en diagnostic assisté par IA ont ouvert de nouvelles approches pour les systèmes de santé en Afrique.",
    initials: "MS",
    tone: "from-rose-400 to-pink-500",
  },
  {
    name: "Nadia El Idrissi",
    title: "Leadership & Inclusion",
    bio: "Mentore internationale, engagée pour une gouvernance technologique plus inclusive et représentative des diasporas.",
    initials: "NE",
    tone: "from-amber-400 to-orange-500",
  },
  {
    name: "Khaled Benali",
    title: "Innovation Publique",
    bio: "Conseiller stratégique auprès d'institutions publiques, il facilite l'adoption d'IA responsable dans les services citoyens.",
    initials: "KB",
    tone: "from-indigo-400 to-blue-600",
  },
];

export default function HonorSection() {
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={railRef}
            onScroll={updateActiveFromScroll}
            className="overflow-x-auto pt-3 pb-3 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-6 pr-8">
              {HONOR_MEMBERS.map((member, index) => (
                <article
                  key={member.name}
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
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.tone} flex items-center justify-center text-white font-bold text-lg`}>
                    {member.initials}
                  </div>

                  <div>
                    <p className="font-bold text-[#123a5f] text-sm">{member.name}</p>
                    <p className="text-brand-green-hover text-xs font-semibold mt-0.5">
                      {member.title}
                    </p>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-4">
                    {member.bio}
                  </p>

                  <a
                    href="#"
                    onClick={(event) => event.stopPropagation()}
                    className="mt-auto inline-flex items-center gap-1.5 border border-slate-200 bg-white hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors text-slate-600 text-xs font-medium px-4 py-2 rounded-full"
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                    Voir le profil
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


