"use client";

import { useEffect, useRef } from "react";
import { X, ArrowRight, Users2, Globe, Layers } from "lucide-react";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Fermeture au clic backdrop + touche Echap */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="register-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panneau */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="animate-modal-in relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden focus:outline-none"
      >
        {/* Bandeau émeraude */}
        <div className="bg-gradient-to-br from-brand-green to-brand-green-hover px-6 pt-8 pb-10">
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
          <h2
            id="register-modal-title"
            className="text-white text-xl sm:text-2xl font-bold leading-snug max-w-xs"
          >
            Rejoignez le réseau SAIEN
          </h2>
          <p className="text-brand-green-soft text-sm mt-2">
            500+ experts IA · 45 pays · 120 projets
          </p>
        </div>

        {/* Mini-stats visuelles */}
        <div className="flex divide-x divide-slate-100 bg-brand-surface border-b border-slate-100">
          {[
            { icon: Users2, value: "500+", label: "Membres" },
            { icon: Globe,  value: "45",   label: "Pays" },
            { icon: Layers, value: "120",  label: "Projets" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex-1 flex flex-col items-center py-3 gap-0.5">
              <Icon className="w-4 h-4 text-brand-green mb-0.5" aria-hidden="true" />
              <span className="font-bold text-slate-900 text-base leading-none">{value}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <form
          className="px-6 py-6 flex flex-col gap-4"
          onSubmit={(e) => { e.preventDefault(); onClose(); }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600" htmlFor="reg-prenom">
                Prénom
              </label>
              <input
                id="reg-prenom"
                type="text"
                required
                placeholder="Aminata"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600" htmlFor="reg-nom">
                Nom
              </label>
              <input
                id="reg-nom"
                type="text"
                required
                placeholder="Diallo"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-green transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600" htmlFor="reg-email">
              Email professionnel
            </label>
            <input
              id="reg-email"
              type="email"
              required
              placeholder="vous@exemple.com"
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-green transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600" htmlFor="reg-expertise">
              Domaine d&apos;expertise
            </label>
            <select
              id="reg-expertise"
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-brand-green transition-colors bg-white"
            >
              <option value="">Choisir…</option>
              <option>Machine Learning</option>
              <option>NLP / LLM</option>
              <option>Computer Vision</option>
              <option>Data Engineering</option>
              <option>MLOps / Infra IA</option>
              <option>Autre</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover active:scale-[0.97] transition-all text-white font-semibold text-sm px-5 py-3.5 rounded-xl mt-1"
          >
            Rejoindre le réseau
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <p className="text-center text-[11px] text-slate-400">
            En vous inscrivant, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-slate-600 transition-colors">
              conditions d&apos;utilisation
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
