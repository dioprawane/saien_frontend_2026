"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";

interface BureauMember {
  name: string;
  role: string;
  badge?: "Fondateur" | "Nouveau";
  bio: string;
  initials: string;
  tone: string;
}

const BUREAU: BureauMember[] = [
  {
    name: "Amadou Diallo",
    role: "Président",
    badge: "Fondateur",
    bio: "Expert en Machine Learning avec plus de 15 ans d'expérience dans l'écosystème tech franco-africain.",
    initials: "AD",
    tone: "from-brand-green to-brand-green-hover",
  },
  {
    name: "Fatou Sow",
    role: "Vice-Présidente",
    badge: "Fondateur",
    bio: "Directrice de la stratégie Data et IA, spécialiste de l'Afrique dans les politiques numériques internationales.",
    initials: "FS",
    tone: "from-sky-400 to-blue-500",
  },
  {
    name: "Jean-Marc Kone",
    role: "Secrétaire Général",
    bio: "Architecte Cloud et spécialiste en infrastructure de données pour les systèmes distribués à grande échelle.",
    initials: "JK",
    tone: "from-amber-400 to-orange-500",
  },
  {
    name: "Awa Ndiaye",
    role: "Trésorière",
    badge: "Nouveau",
    bio: "Analyste financière et experte en levée de fonds pour les startups deep tech en Afrique subsaharienne.",
    initials: "AN",
    tone: "from-violet-400 to-purple-500",
  },
  {
    name: "Ibrahima Koné",
    role: "Responsable Partenariats",
    bio: "Pilote les collaborations stratégiques entre institutions publiques, universités et entreprises technologiques.",
    initials: "IK",
    tone: "from-cyan-400 to-brand-green-hover",
  },
  {
    name: "Mariame Touré",
    role: "Directrice Programmes",
    bio: "Coordonne l'exécution des initiatives SAIEN et le suivi d'impact de chaque programme sur le terrain.",
    initials: "MT",
    tone: "from-rose-400 to-pink-500",
  },
  {
    name: "Youssef Alaoui",
    role: "Responsable Technique",
    bio: "Supervise les standards technologiques, l'architecture des plateformes et la qualité des livrables IA.",
    initials: "YA",
    tone: "from-indigo-400 to-blue-600",
  },
];

export default function BureauSection() {
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
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="bg-brand-surface py-20 lg:py-24"
      aria-labelledby="bureau-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-green mb-3">
            Gouvernance
          </p>
          <h2
            id="bureau-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#123a5f] mb-4"
          >
            Le Bureau SAIEN
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Découvrez l&apos;équipe dirigeante qui façonne l&apos;avenir de
            notre réseau. Des experts passionnés par l&apos;intelligence
            artificielle, dédiés à l&apos;innovation et au rayonnement de la
            diaspora.
          </p>
        </div>

        <div className="flex justify-end gap-2 mb-5">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors"
            aria-label="Défiler le bureau vers la gauche"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards("right")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-brand-green-soft-strong hover:text-brand-green-hover transition-colors"
            aria-label="Défiler le bureau vers la droite"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-brand-surface to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-surface to-transparent z-10" />

          <div
            ref={railRef}
            onScroll={updateActiveFromScroll}
            className="overflow-x-auto pt-3 pb-3 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-6 pr-8">
              {BUREAU.map((member, index) => (
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
                  className={`relative snap-center min-w-[260px] max-w-[260px] rounded-2xl border pt-6 px-5 pb-5 flex flex-col items-center text-center gap-3 transition-all duration-300 cursor-pointer outline-none ${
                    activeIndex === index
                      ? "bg-white border-brand-green-soft-strong ring-2 ring-brand-green-soft-strong -translate-y-1 shadow-[0_24px_44px_-26px_rgba(16,185,129,0.55)]"
                      : "bg-white/95 border-slate-100 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-30px_rgba(15,23,42,0.7)]"
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-colors duration-300 ${
                      activeIndex === index ? "bg-brand-green" : "bg-slate-200"
                    }`}
                    aria-hidden="true"
                  />

                  {member.badge && (
                    <span
                      className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        member.badge === "Fondateur"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-brand-green-soft text-brand-green-hover border border-brand-green-soft-strong"
                      }`}
                    >
                      {member.badge}
                    </span>
                  )}

                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.tone} flex items-center justify-center text-white font-bold text-lg`}>
                    {member.initials}
                  </div>

                  <div>
                    <p className="font-bold text-[#123a5f] text-sm">{member.name}</p>
                    <p className="text-brand-green-hover text-xs font-semibold mt-0.5">{member.role}</p>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <a
                      href="#"
                      aria-label={`LinkedIn de ${member.name}`}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand-surface hover:bg-brand-green-soft hover:text-brand-green-hover transition-colors"
                    >
                      <Linkedin className="w-3 h-3" aria-hidden="true" />
                    </a>
                    <a
                      href="#"
                      aria-label={`Profil X de ${member.name}`}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand-surface hover:bg-brand-green-soft hover:text-brand-green-hover transition-colors"
                    >
                      <Twitter className="w-3 h-3" aria-hidden="true" />
                    </a>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


