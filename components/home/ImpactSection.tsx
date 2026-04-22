"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Users2, Globe, Layers, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RegisterModal from "./RegisterModal";

/* ── Compteur animé ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ── Carte stat ─────────────────────────────────────────── */
interface StatCardProps {
  icon: LucideIcon;
  rawValue: number;
  suffix: string;
  label: string;
  description: string;
  visible: boolean;
  onDoubleClick: () => void;
}

function StatCard({
  icon: Icon,
  rawValue,
  suffix,
  label,
  description,
  visible,
  onDoubleClick,
}: StatCardProps) {
  const count = useCountUp(rawValue, 1400, visible);
  const [popped, setPopped] = useState(false);

  const triggerPop = useCallback(() => {
    setPopped(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPopped(true));
    });
    setTimeout(() => setPopped(false), 460);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${rawValue}${suffix} ${label} — double-clic pour s'inscrire`}
      onClick={triggerPop}
      onDoubleClick={onDoubleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") triggerPop();
        if (e.key === " ") { e.preventDefault(); onDoubleClick(); }
      }}
      className={[
        "group relative bg-white rounded-2xl border border-slate-100 p-6 sm:p-8",
        "flex flex-col gap-4 cursor-pointer select-none",
        "hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1",
        "active:scale-[0.97] transition-all duration-300 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        popped ? "animate-stat-pop" : "",
      ].join(" ")}
    >
      {/* Halo de fond au hover */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/60 group-hover:to-teal-50/40 transition-all duration-300 pointer-events-none"
        aria-hidden="true"
      />

      {/* Icône */}
      <div className="relative w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-300 flex items-center justify-center shrink-0">
        <Icon
          className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors"
          aria-hidden="true"
        />
      </div>

      {/* Valeur */}
      <div className="relative flex flex-col gap-1.5">
        <div
          className={[
            "text-4xl sm:text-5xl font-extrabold text-slate-900 leading-none",
            "group-hover:text-emerald-600 transition-colors duration-300",
            visible ? "animate-count-up" : "opacity-0",
          ].join(" ")}
        >
          {count}{suffix}
        </div>
        <div className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-500">
          {label}
        </div>
      </div>

      <p className="relative text-slate-500 text-sm leading-relaxed">{description}</p>

      {/* Indicateur double-clic desktop */}
      <span
        className="hidden lg:block absolute bottom-3 right-4 text-[10px] text-slate-300 group-hover:text-emerald-400 transition-colors"
        aria-hidden="true"
      >
        double-clic pour s&apos;inscrire
      </span>
    </div>
  );
}

/* ── Données ────────────────────────────────────────────── */
const STATS = [
  {
    icon: Users2,
    rawValue: 500,
    suffix: "+",
    label: "Membres actifs",
    description: "Experts en IA et data science répartis dans le monde entier.",
  },
  {
    icon: Globe,
    rawValue: 45,
    suffix: "",
    label: "Pays représentés",
    description: "Une présence internationale favorisant les échanges interculturels.",
  },
  {
    icon: Layers,
    rawValue: 120,
    suffix: "",
    label: "Projets collaboratifs",
    description: "Initiatives technologiques nées au sein de notre écosystème.",
  },
];

/* ── Section principale ─────────────────────────────────── */
export default function ImpactSection() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="bg-slate-50 py-16 lg:py-24"
        aria-labelledby="impact-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 max-w-xl mx-auto">
            <h2
              id="impact-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
            >
              L&apos;impact du réseau SAIEN
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Une communauté grandissante d&apos;experts dédiés à l&apos;avancement de l&apos;IA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                {...stat}
                visible={visible}
                onDoubleClick={() => setModalOpen(true)}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.97] transition-all text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-emerald-200"
            >
              S&apos;inscrire au réseau
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <p className="hidden lg:block text-xs text-slate-400 italic">
              ou double-cliquez sur une carte
            </p>
            <p className="sm:hidden text-xs text-slate-400 text-center">
              Cliquez sur une carte pour interagir
            </p>
          </div>
        </div>
      </section>

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
